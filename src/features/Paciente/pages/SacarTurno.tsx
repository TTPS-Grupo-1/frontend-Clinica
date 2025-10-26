import { useEffect, useState, useCallback } from "react";
import SelectMedico from "../components/SelectorMedicos";
import Calendario from "../components/Calendario";
import HorariosDisponibles from "../components/Horarios";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

// Interfaz para los datos del Turno que devuelve la API externa
interface TurnoAPI {
    id: number;
    id_medico: number;
    id_paciente: number | null; // null si está libre
    fecha_hora: string; // Formato ISO 8601
}

interface Medico {
    id: number;
    first_name: string;
    last_name: string;
}

// 💡 Nueva interfaz para el slot de horario que se pasa al componente hijo
interface HorarioSlot {
    id: number;
    hora: string; // HH:MM
}

interface UserState {
    auth: {
        user: {
            id: number;
            rol: string;
        } | null;
    };
}

const SacarTurno = () => {
    const [medicos, setMedicos] = useState<Medico[]>([]);
    const [medicoId, setMedicoId] = useState(""); 
    const [fecha, setFecha] = useState<Date | undefined>();
    
    const [turnosData, setTurnosData] = useState<TurnoAPI[]>([]); 
    const [turnoSeleccionado, setTurnoSeleccionado] = useState<TurnoAPI | null>(null); 
    
    const [loadingMedicos, setLoadingMedicos] = useState(false);
    const [loadingTurnos, setLoadingTurnos] = useState(false);
    const [loadingConfirm, setLoadingConfirm] = useState(false);

    const userId = useSelector((state: UserState) => state.auth.user?.id);
    const userRol = useSelector((state: UserState) => state.auth.user?.rol);

    // URLs de los proxies de Django
    const PROXY_CONSULTA_URL = "http://127.0.0.1:8000/api/turnos/consultar_medico_fecha/";
    const ENDPOINT_RESERVAR_URL = "http://127.0.0.1:8000/api/reservar_turno/"; 
    const PACIENTE_ID = (userRol === 'PACIENTE' && userId) ? userId : null;

    console.log("ID PACIENTE --> ", PACIENTE_ID)
    // 1. CARGA INICIAL DE MÉDICOS (Sin cambios)
    useEffect(() => {
        const fetchMedicos = async () => {
            setLoadingMedicos(true);
            try {
                const res = await fetch("http://127.0.0.1:8000/api/medicos/");
                if (!res.ok) throw new Error("Error al obtener médicos");
                const data = await res.json();
                setMedicos(data);
            } catch (err) {
                console.error("Error al cargar médicos:", err);
                toast.error("No se pudieron cargar los médicos");
            } finally {
                setLoadingMedicos(false);
            }
        };
        fetchMedicos();
    }, []);
    
    // 2. FUNCIÓN PARA BUSCAR TURNOS DISPONIBLES
    const fetchTurnosDisponibles = useCallback(async () => { 
        if (!medicoId || !fecha) {
            setTurnosData([]);
            setTurnoSeleccionado(null);
            return;
        }

        setLoadingTurnos(true);
        setTurnoSeleccionado(null);
        const fechaStr = fecha.toISOString().split("T")[0]; // Formato YYYY-MM-DD
    
        const url = `${PROXY_CONSULTA_URL}?id_medico=${medicoId}&fecha=${fechaStr}`;

        try {
            console.log("ESTA ES LA URL", url)
            const res = await fetch(url);
            if (!res.ok) throw new Error("Error al consultar la agenda del médico.");

            const { data } = await res.json();
            setTurnosData(data || []); 

        } catch (err) {
            console.error("Error fetching turnos:", err);
            toast.error("Error al cargar los turnos disponibles.");
            setTurnosData([]);
        } finally {
            setLoadingTurnos(false);
        }
    }, [medicoId, fecha]);

    // 3. EFECTO: Ejecutar la búsqueda cuando cambie el médico o la fecha
    useEffect(() => {
        fetchTurnosDisponibles();
    }, [fetchTurnosDisponibles]);


    // 4. PREPARACIÓN DE DATOS PARA EL COMPONENTE HIJO (Ahora objetos {id, hora})
    const horariosSlots: HorarioSlot[] = turnosData
        .filter(t => t.id_paciente === null) // Solo turnos libres
        .map(t => ({
            id: t.id,
            hora: t.fecha_hora.split("T")[1].substring(0, 5) // HH:MM
        }));


    // 5. MANEJADOR DE SELECCIÓN DE HORARIO (Recibe el ID único)
    const handleSelectHorario = (turnoId: number | null) => {
        if (!turnoId) {
            setTurnoSeleccionado(null);
            return;
        }
        
        // Encontrar el OBJETO TurnoAPI completo usando el ID único devuelto por el hijo
        const turnoEncontrado = turnosData.find(t => t.id === turnoId);

        setTurnoSeleccionado(turnoEncontrado || null);
    };

    // 6. HANDLE PARA CONFIRMAR LA RESERVA (PATCH /reservar_turno)
    const handleConfirmar = async () => {
        if (!turnoSeleccionado || !medicoId || !fecha) {
            alert("Debe seleccionar médico, fecha y horario.");
            return;
        }

        setLoadingConfirm(true);

        try {
            const body = {
                id_paciente: PACIENTE_ID,
                id_turno: turnoSeleccionado.id, // 👈 Usamos el ID de turno del objeto seleccionado
            };
            
            const res = await fetch(ENDPOINT_RESERVAR_URL, {
                method: "PATCH", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || errData.message || `Fallo la reserva. Código: ${res.status}.`);
            }

            toast.success("Turno reservado exitosamente");
            
            // Limpiar formulario y recargar la agenda
            setMedicoId("");
            setFecha(undefined);
            setTurnoSeleccionado(null);
            fetchTurnosDisponibles(); 
            
        } catch (err) {
            console.error("Error al confirmar reserva:", err);
            toast.error((err as Error).message || "Ocurrió un error al registrar el turno");
        } finally {
            setLoadingConfirm(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center pt-[80px]">
            <h1 className="text-2xl font-bold mb-6">Sacar Turno</h1>
            <Toaster position="top-center" />
            <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl space-y-6"> 
                
                <SelectMedico
                    medicos={medicos.map((m) => ({
                        id: m.id,
                        nombre: `${m.first_name} ${m.last_name}`,
                    }))}
                    selected={medicoId}
                    onChange={setMedicoId}
                />

                <Calendario selected={fecha} onSelect={setFecha} />

                {/* Horarios Disponibles */}
                {(medicoId && fecha) ? (
                    <HorariosDisponibles 
                        horarios={horariosSlots} // 👈 Pasamos el array de objetos {id, hora}
                        onSelect={handleSelectHorario} 
                        loading={loadingTurnos}
                        selectedTurnoId={turnoSeleccionado?.id || null} // Pasamos el ID seleccionado para resaltarlo
                    />
                ) : (
                    <p className="text-sm text-gray-500 text-center">Selecciona un médico y una fecha para ver los horarios.</p>
                )}

                {/* Botón de Confirmación */}
                {turnoSeleccionado && (
                    <button
                        onClick={handleConfirmar}
                        disabled={loadingConfirm}
                        className={`mx-auto flex items-center justify-center gap-2 border py-2 px-6 rounded-md font-medium transition ${
                            loadingConfirm
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-blue-600 text-white border-gray-400 hover:bg-blue-700"
                        }`}
                    >
                        {loadingConfirm ? "Reservando..." : `Confirmar Turno para ${turnoSeleccionado.fecha_hora.split("T")[1].substring(0, 5)}`}
                    </button>
                )}
            </div>
        </div>
    );
};

export default SacarTurno;