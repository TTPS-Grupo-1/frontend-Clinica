import TurnoCard from "../components/TurnosPacienteComponente";
import Pagination from "../../../components/Pagination";
import { useState } from "react";



import { motion } from "framer-motion";

export default function MisTurnos() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    const misTurnos = [
        { id: 1, fecha: "10/10/2025", hora: "09:00", medico: "Dra. Pérez" },
        { id: 2, fecha: "12/10/2025", hora: "10:30", medico: "Dr. Gómez" },
        { id: 3, fecha: "15/10/2025", hora: "10:30", medico: "Dr. Gómez" },
        { id: 4, fecha: "19/11/2025", hora: "10:30", medico: "Dr. Gómez" },
        { id: 5, fecha: "22/11/2025", hora: "10:30", medico: "Dr. Gómez" },
    ];
    const totalPages = Math.ceil(misTurnos.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTurnos = misTurnos.slice(startIndex, startIndex + itemsPerPage);
    return (
        <div className="relative w-full max-w-7xl mx-auto mt-16 md:mt-20 px-4 sm:px-6 py-6 min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 overflow-x-hidden">
            {/* Fondo decorativo */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-2xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full opacity-30 blur-2xl" />
            </div>
            <div className="relative z-10">
                {/* Header */}
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
                            onCancelar={(id) => console.log("Cancelar turno", id)}
                        />
                    ))}
                </motion.div>

                {/* Paginación */}
                <div className="mt-8 flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        itemsPerPage={itemsPerPage}
                        totalItems={misTurnos.length}
                    />
                </div>
            </div>
        </div>
    );
}