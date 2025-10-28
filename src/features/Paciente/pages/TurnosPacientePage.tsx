import TurnoCard from "../components/TurnosPacienteComponente";
import Pagination from "../../../components/Pagination";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import ConfirmModal from "../components/ModalConfirmacionComponente";

interface TurnoAPI {
    id: number;
    id_medico: number;
    id_paciente: number;
    fecha_hora: string; // "YYYY-MM-DDTHH:MM:SS+00:00"

}

interface Turnos {
    id: number;
    fecha: string;
    hora: string;
    medico: string;
}

interface UserState {
    auth: {
        user: {
            id: number;
            rol: string;
        } | null;
    };
}

interface Medico {
    id: number;
    first_name: string;
    last_name: string;
}

export default function MisTurnos() {

    const [medicos, setMedicos] = useState<Medico[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [misTurnos, setMisTurnos] = useState<TurnoAPI[]>([]); // Almacena los datos de la API
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 2;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [turnoIdToCancel, setTurnoIdToCancel] = useState<number | null>(null);

    const userId = useSelector((state: UserState) => state.auth.user?.id);
    const userRol = useSelector((state: UserState) => state.auth.user?.rol);

    const handleOpenModal = (id: number) => {
        setTurnoIdToCancel(id);
        setIsModalOpen(true);   
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTurnoIdToCancel(null);
    };

    const PACIENTE_ID = (userRol === 'PACIENTE' && userId) ? userId : null;

    // URLs de los proxies de Django
    const PROXY_CONSULTA_URL = "http://127.0.0.1:8000/api/turnos/mis_turnos/"; 
    const PROXY_CANCELAR_URL = "http://127.0.0.1:8000/api/turnos/cancelar_turno/";

    const fetchMedicos = useCallback(async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/medicos/");
            if (!res.ok) throw new Error("Error al obtener datos de médicos");
            const data = await res.json();
            setMedicos(data || []);
        } catch (err) {
            console.error("Error al cargar lista de médicos:", err);
            // Mostrar un error no crítico
        }
    }, []);

    // --- LÓGICA DE FETCH ---
    const fetchMisTurnos = useCallback(async () => {
        setLoading(true);
        await fetchMedicos();
        try {
            // Asegúrate de que este proxy acepte id_paciente como query param
            const url = `${PROXY_CONSULTA_URL}?id_paciente=${PACIENTE_ID}`; 
            
            const res = await fetch(url);
            if (!res.ok) throw new Error("Error al obtener tus turnos.");

            // La respuesta de la API externa es { data: [...] }
            const { data } = await res.json(); 
            
            // 💡 IMPORTANTE: Si necesitas el nombre del médico, deberás:
            // 1. O usar un endpoint que te devuelva el nombre junto al ID, o
            // 2. Hacer un fetch adicional aquí para buscar el nombre por id_medico
            
            setMisTurnos(data || []);
            
        } catch (err) {
            console.error("Error al cargar turnos:", err);
            toast.error("No se pudieron cargar tus turnos.");
        } finally {
            setLoading(false);
        }
    }, [fetchMedicos]);

    useEffect(() => {
        fetchMisTurnos();
    }, [fetchMisTurnos]);


    // --- LÓGICA DE PAGINACIÓN Y MOCK DE DATOS PARA LA CARD ---
    
    // Mapeo de datos (Simulamos la obtención de la fecha/hora y nombre del médico)
    const turnosParaMostrar: Turnos[] = misTurnos.map(turno => {
        const [fechaParte, horaParteConOffset] = turno.fecha_hora.split("T");
        const horaLimpia = horaParteConOffset.substring(0, 5); // HH:MM

        const medicoEncontrado = medicos.find(m => m.id === turno.id_medico);

        const nombreCompleto = medicoEncontrado 
            ? `Dr. ${medicoEncontrado.first_name} ${medicoEncontrado.last_name}` 
            : "Médico Desconocido";

        return {
            id: turno.id,
            fecha: fechaParte.split("-").reverse().join("/"), // DD/MM/YYYY
            hora: horaLimpia,
            medico: nombreCompleto, 
        };
    });

    const totalPages = Math.ceil(turnosParaMostrar.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTurnos = turnosParaMostrar.slice(startIndex, startIndex + itemsPerPage);
    
    // --- LÓGICA DE CANCELACIÓN ---
    const handleCancelarTurno = async () => {
    
        // 1. Obtener el ID del turno desde el estado
        const idTurno = turnoIdToCancel; 

        // 2. Cerrar el modal inmediatamente para mostrar el estado 'loading' del toast
        handleCloseModal();

        // 3. Validación de seguridad (aunque el modal ya lo valida)
        if (!idTurno) {
            toast.error("Error: ID del turno para cancelar es nulo.");
            return;
        }
        
        // 4. LÓGICA DE CANCELACIÓN ENCAPSULADA EN PROMESA
        const cancellationPromise = new Promise(async (resolve, reject) => {
            try {
                // El ID se usa para construir la URL (Query Parameter)
                const url = `${PROXY_CANCELAR_URL}?id_turno=${idTurno}`;

                const res = await fetch(url, {
                    method: "PATCH", 
                    headers: { "Content-Type": "application/json" },
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    const errorMessage = errData.error || errData.message || `Fallo la cancelación. Código: ${res.status}.`;
                    return reject(new Error(errorMessage)); 
                }

                resolve(true); 
            } catch (error) {
                reject(new Error("Error de conexión al servidor."));
            }
        });

        // 5. Ejecutar toast.promise
        await toast.promise(cancellationPromise, {
            loading: 'Cancelando turno...',
            success: 'Turno cancelado exitosamente!',
            error: (err) => err.message,
        });

        // 6. Recargar la lista de turnos (importante para actualizar el UI)
        fetchMisTurnos();
    };

    if (loading) {
        return (
            <div className="text-center py-20 min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300">
                <p className="text-xl font-medium text-blue-700">Cargando tus turnos...</p>
            </div>
        );
    }
    
    if (misTurnos.length === 0) {
        return (
            <div className="text-center py-20 min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300">
                <h1 className="text-3xl font-bold text-blue-700">No tienes turnos agendados.</h1>
                <p className="mt-4 text-gray-600">Puedes sacar un nuevo turno desde la sección correspondiente.</p>
            </div>
        );
    }

    // --- RENDERIZADO ---
    return (
        <div className="relative w-full max-w-7xl mx-auto mt-16 md:mt-20 px-4 sm:px-6 py-6 min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 overflow-x-hidden">
            {/* ... (Fondo decorativo y Header) ... */}
            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                >
                    <h1 className="text-3xl font-bold mb-4 text-center text-blue-700 drop-shadow-lg">Mis Turnos</h1>
                    <p className="text-gray-700 text-center text-lg">
                        Gestiona tus próximos turnos <span className="font-semibold">({misTurnos.length})</span>
                    </p>
                </motion.div>

                {/* Turnos */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-8"
                >
                    {currentTurnos.map((turno) => (
                        <TurnoCard
                            key={turno.id}
                            turno={turno}
                            onCancelar={handleOpenModal}
                        />
                    ))}
                </motion.div>

                {isModalOpen && turnoIdToCancel !== null && (
                    <ConfirmModal 
                        isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    title="Cancelar Turno"
                    message={`¿Estás seguro de que desea cancelar el turno? Esta acción no podrá revertirse.`}
                    onConfirm={handleCancelarTurno} // Llama al handler que ejecuta el fetch
                    />
                )}

                {/* Paginación */}
                {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            itemsPerPage={itemsPerPage}
                            totalItems={turnosParaMostrar.length}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}