import { useEffect, useState } from "react";
import SelectMedico from "../../Paciente/components/SelectorMedicos";
import { toast, Toaster } from "react-hot-toast";

// Definición de la interfaz para el médico (sin DNI si no se usa)
interface Medico {
    id: number;
    first_name: string;
    last_name: string;
}

// Días de la semana para el selector (0=Domingo, 1=Lunes, etc.)
const DIAS_SEMANA = [
    { id: 1, nombre: "Lunes" },
    { id: 2, nombre: "Martes" },
    { id: 3, nombre: "Miércoles" },
    { id: 4, nombre: "Jueves" },
    { id: 5, nombre: "Viernes" },
    { id: 6, nombre: "Sábado" },
    { id: 0, nombre: "Domingo" },
];

const GenerarAgenda = () => {
    const [medicos, setMedicos] = useState<Medico[]>([]);
    
    // El estado guarda el ID del médico como string
    const [medicoId, setMedicoId] = useState(""); 
    const [diaSemana, setDiaSemana] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [loading, setLoading] = useState(false);

    const API_URL = "http://127.0.0.1:8000/api/turnos/grilla/";

    useEffect(() => {
        const fetchMedicos = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/medicos/");
                if (!res.ok) throw new Error("Error al obtener médicos");
                const data = await res.json();
                setMedicos(data);
            } catch (err) {
                console.error("Error al cargar médicos:", err);
                toast.error("No se pudieron cargar los médicos");
            }
        };
        fetchMedicos();
    }, []);

    // Manejador para el envío de la grilla de turnos
    const handleGenerarGrilla = async () => {
        if (!medicoId || !diaSemana || !horaInicio || !horaFin) {
            toast.error("Debe completar todos los campos.");
            return;
        }

        setLoading(true);

        try {
            // 💡 LÓGICA SIMPLIFICADA: Usamos medicoId directamente
            const body = {
                id_medico: parseInt(medicoId),
                hora_inicio: horaInicio,
                hora_fin: horaFin,
                dia_semana: parseInt(diaSemana),
            };

            const res = await fetch(API_URL, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const contentType = res.headers.get("content-type");
                let errorMessage = `Error ${res.status}: ${res.statusText}.`;
                
                if (contentType && contentType.includes("application/json")) {
                    const errData = await res.json();
                    errorMessage = errData.error || errData.message || JSON.stringify(errData);
                }
                
                throw new Error(errorMessage);
            }

            const successData = await res.json();
            toast.success(
                `Grilla generada: ${successData.summary.insertados_ok} turnos creados.`,
                { duration: 6000 }
            );

            // Opcional: Resetear el formulario después del éxito
            setDiaSemana("");
            setHoraInicio("");
            setHoraFin("");

        } catch (err) {
            console.error("Error al generar agenda:", err);
            toast.error((err as Error).message || "Ocurrió un error en la API externa.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center pt-[80px]">
            <h1 className="text-2xl font-bold mb-6">Asignar Turnos</h1>
            <Toaster position="top-center" />
            <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg space-y-6">
                
                {/* 1. Selector de Médico */}
                <SelectMedico
                    medicos={medicos.map((m) => ({
                        id: m.id, // ✅ Ahora usamos m.id como valor
                        nombre: `${m.first_name} ${m.last_name}`,
                    }))}
                    selected={medicoId}
                    onChange={setMedicoId}
                />
                
                {/* 2. Selector de Día de la Semana */}
                <div>
                    <label className="block text-sm font-medium mb-2">Día de la Semana</label>
                    <select
                        value={diaSemana}
                        onChange={(e) => setDiaSemana(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    >
                        <option value="">Seleccionar día...</option>
                        {DIAS_SEMANA.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 3. Horario de Inicio */}
                <div>
                    <label className="block text-sm font-medium mb-2">Hora de Inicio (HH:MM)</label>
                    <input
                        type="time"
                        value={horaInicio}
                        onChange={(e) => setHoraInicio(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* 4. Horario de Fin */}
                <div>
                    <label className="block text-sm font-medium mb-2">Hora de Fin (HH:MM)</label>
                    <input
                        type="time"
                        value={horaFin}
                        onChange={(e) => setHoraFin(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Botón de Envío */}
                <button
                    onClick={handleGenerarGrilla}
                    disabled={loading || !medicoId || !diaSemana || !horaInicio || !horaFin}
                    className={`mx-auto flex items-center justify-center gap-2 py-2 px-6 rounded-md font-medium transition w-full ${
                        loading
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                >
                    {loading ? "Generando..." : "Generar Turnos (Próximas 5 Semanas)"}
                </button>

            </div>
        </div>
    );
};

export default GenerarAgenda;