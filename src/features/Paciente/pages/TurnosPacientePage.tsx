import TurnoCard from "../components/TurnosPacienteComponente";
import Pagination from "../../../components/Pagination";
import { useState } from "react";



export default function MisTurnos() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    
    const misTurnos = [
    { id: 1, fecha: "10/10/2025", hora: "09:00", medico: "Dra. Pérez"},
    { id: 2, fecha: "12/10/2025", hora: "10:30", medico: "Dr. Gómez" },
    { id: 3, fecha: "15/10/2025", hora: "10:30", medico: "Dr. Gómez" },
    { id: 4, fecha: "19/11/2025", hora: "10:30", medico: "Dr. Gómez" },
    { id: 5, fecha: "22/11/2025", hora: "10:30", medico: "Dr. Gómez" },
    ];

    const totalPages = Math.ceil(misTurnos.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTurnos = misTurnos.slice(startIndex, startIndex + itemsPerPage);
    return (
    <div className="w-full max-w-7xl mx-auto mt-16 md:mt-20 px-4 sm:px-6 py-6 min-h-screen">
        {/* Header */}
        <div className="mb-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Mis Turnos</h1>
        <p className="text-gray-600 text-center">
            Gestiona tus próximos turnos - Total: {misTurnos.length}
        </p>
        </div>

        {/* Turnos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {currentTurnos.map((turno) => (
            <TurnoCard
            key={turno.id}
            turno={turno}
            onCancelar={(id) => console.log("Cancelar turno", id)}
            />
        ))}
        </div>

        {/* Paginación */}
        <div className="mt-6">
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={misTurnos.length}
        />
        </div>
    </div>
);
}