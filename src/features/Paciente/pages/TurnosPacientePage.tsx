import TurnoCard from "../components/TurnosPacienteComponente";
import Pagination from "../../../components/Pagination";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import ConfirmModal from "../components/ModalConfirmacionComponente";
import { useNavigate } from "react-router-dom";

// --- INTERFACES ---
interface TurnoAPI {
    id: number;
    id_medico: number;
    id_paciente: number;
    fecha_hora: string; // "YYYY-MM-DDTHH:MM:SS+00:00"
    es_monitoreo: boolean;
}

interface Turnos {
    id: number;
    fecha: string;
    hora: string;
    medico: string;
    es_monitoreo: boolean;
    
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

    const navigate = useNavigate();
    const [medicos, setMedicos] = useState<Medico[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [misTurnos, setMisTurnos] = useState<TurnoAPI[]>([]); // Almacena los datos de la API
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 2;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [turnoIdToCancel, setTurnoIdToCancel] = useState<number | null>(null);

    const userId = useSelector((state: UserState) => state.auth.user?.id);
    const userRol = useSelector((state: UserState) => state.auth.user?.rol);

    // Handlers del Modal
    const handleOpenModal = (id: number) => {
        setTurnoIdToCancel(id);
        setIsModalOpen(true); 
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTurnoIdToCancel(null);
    };

    // ID del paciente (Se obtiene del estado de Redux)
    const PACIENTE_ID = (userRol === 'PACIENTE' && userId) ? userId : null;

    // URLs de los proxies de Django
    const PROXY_CONSULTA_URL = "http://127.0.0.1:8000/api/turnos/mis_turnos/"; 
    const PROXY_CANCELAR_URL = "http://127.0.0.1:8000/api/turnos/cancelar_turno/";


    // 1. FETCH DE MÉDICOS (No bloqueante)
    const fetchMedicos = useCallback(async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/medicos/");
            if (!res.ok) throw new Error("Error al obtener datos de médicos");
            const data = await res.json();
            setMedicos(data || []);
        } catch (err) {
            console.error("Error al cargar lista de médicos:", err);
        }
    }, []);


    // 2. FETCH DE TURNOS DEL PACIENTE (Depende del ID)
    const fetchMisTurnos = useCallback(async () => {
        // 🚨 PREVENCIÓN: No intentar el fetch si el ID no es válido (null)
        if (!PACIENTE_ID) { 
            setLoading(false);
            setMisTurnos([]); 
            return;
        }
        
        setLoading(true);
        // Esperar la lista de médicos para poder mapear los nombres
        if (medicos.length === 0) {
            await fetchMedicos(); 
        }

        try {
            const url = `${PROXY_CONSULTA_URL}?id_paciente=${PACIENTE_ID}`; 
            
            const res = await fetch(url);
            if (!res.ok) throw new Error("Error al obtener tus turnos.");

            const { data } = await res.json(); 
            console.log("TURNOS DESDE API ---->", data);
            setMisTurnos(data || []);
            
        } catch (err) {
            console.error("Error al cargar turnos:", err);
            toast.error("No se pudieron cargar tus turnos.");
            setMisTurnos([]); // Limpiar en caso de fallo para evitar pantalla en blanco
        } finally {
            setLoading(false);
        }
    }, [PACIENTE_ID, fetchMedicos, medicos.length]);

    // Ejecutar fetch al cargar y cuando las dependencias cambien
    useEffect(() => {
        fetchMisTurnos();
    }, [fetchMisTurnos]);


    // --- LÓGICA DE CANCELACIÓN ---
    const handleCancelarTurno = async () => {
        const idTurno = turnoIdToCancel; 
        handleCloseModal(); // 1. Cerrar el modal

        if (!idTurno) {
            toast.error("Error: ID del turno para cancelar es nulo.");
            return;
        }
        
        try {
            const url = `${PROXY_CANCELAR_URL}?id_turno=${idTurno}`;
            const res = await fetch(url, {
                method: "PATCH", 
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                const errorMessage = errData.error || errData.message || `Fallo la cancelación. Código: ${res.status}.`;
                throw new Error(errorMessage); 
            }

            // 3. ÉXITO: MOSTRAR TOAST Y RECARGAR CON RETRASO
            toast.success('Turno cancelado exitosamente!'); 
            
            // 💡 SOLUCIÓN: Usar setTimeout para priorizar el renderizado del toast
            setTimeout(() => {
                fetchMisTurnos(); // Recargar la lista
            }, 150); 
            
        } catch (error) {
            // Mostrar error si el fetch falló
            const errorMessage = (error as Error).message || "Error desconocido al cancelar el turno.";
            toast.error(errorMessage);
        } 
    };

    // --- Mapeo de Datos y Paginación (Renderizado) ---
    const turnosParaMostrar: Turnos[] = misTurnos.map(turno => {
        const [fechaParte, horaParteConOffset] = turno.fecha_hora.split("T");
        const horaLimpia = horaParteConOffset.substring(0, 5);

        // Resolver el nombre del médico (requiere que 'medicos' esté cargado)
        const medicoEncontrado = medicos.find(m => m.id === turno.id_medico);
        
        const nombreCompleto = medicoEncontrado 
            ? `Dr. ${medicoEncontrado.first_name} ${medicoEncontrado.last_name}` 
            : "Médico Desconocido";

        return {
            id: turno.id,
            fecha: fechaParte.split("-").reverse().join("/"),
            hora: horaLimpia,
            medico: nombreCompleto,
            es_monitoreo: Boolean(turno.es_monitoreo), 
        };
    });

    const totalPages = Math.ceil(turnosParaMostrar.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTurnos = turnosParaMostrar.slice(startIndex, startIndex + itemsPerPage);
    
    // --- Renderizado Condicional ---
    if (loading) {
        return ( /* ... Mensaje de carga */
            <div className="text-center py-20 min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300">
                <p className="text-xl font-medium text-blue-700">Cargando tus turnos...</p>
            </div>
        );
    }
    
    if (misTurnos.length === 0) {
        return ( /* ... Mensaje de no turnos */
            <div className="text-center py-20 min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300">
                <h1 className="text-3xl font-bold text-blue-700">No tienes turnos agendados.</h1>
                <p className="mt-4 text-gray-600">Puedes sacar un nuevo turno desde la sección correspondiente.</p>
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-7xl mx-auto mt-16 md:mt-20 px-4 sm:px-6 py-6 min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 overflow-x-hidden">
        <Toaster position="top-center" />
{/* ... (Fondo decorativo y Header) ... */}

            <div className="relative z-10">
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
                            onReasignar={(idTurno: number) => {
                                const t = misTurnos.find(t => t.id === idTurno);
                                if (!t) {
                                    toast.error("No se encontró el turno seleccionado.");
                                    return;
                                }

                                navigate(
                                    `/sacar-turno?reasignar=1&id_turno=${t.id}&id_medico=${t.id_medico}&fecha=${t.fecha_hora}`
                                );
                            }}
                        />
                    ))}
                </motion.div>

                {/* Paginación */}
                {totalPages > 1 && ( /* ... */
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

            {/* Modal de Confirmación */}
            {isModalOpen && turnoIdToCancel !== null && (
                <ConfirmModal 
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    title="Cancelar Turno"
                    message={`¿Estás seguro de que desea cancelar el turno? Esta acción no podrá revertirse.`}
                    onConfirm={handleCancelarTurno} 
                />
            )}
        </div>
    );
}