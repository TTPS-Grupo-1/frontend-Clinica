import { useState } from "react";
import PacientCard from "../components/PacientCard";
import Pagination from "../../../components/Pagination";

interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  fechaTurno: string;
  horaTurno: string;
}

export default function ListadoTurnos() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Datos de ejemplo - en producción vendría de una API
  const [pacientes] = useState<Paciente[]>([
    { id: 1, nombre: "Ana", apellido: "García", edad: 32, fechaTurno: "2025-10-08", horaTurno: "09:00" },
    { id: 2, nombre: "María", apellido: "López", edad: 28, fechaTurno: "2025-10-08", horaTurno: "09:30" },
    { id: 3, nombre: "Carmen", apellido: "Martín", edad: 35, fechaTurno: "2025-10-08", horaTurno: "10:00" },
    { id: 4, nombre: "Laura", apellido: "Fernández", edad: 31, fechaTurno: "2025-10-08", horaTurno: "10:30" },
    { id: 5, nombre: "Elena", apellido: "Rodríguez", edad: 29, fechaTurno: "2025-10-08", horaTurno: "11:00" },
    { id: 6, nombre: "Sofía", apellido: "González", edad: 33, fechaTurno: "2025-10-08", horaTurno: "11:30" },
    { id: 7, nombre: "Patricia", apellido: "Sánchez", edad: 30, fechaTurno: "2025-10-08", horaTurno: "12:00" },
    { id: 8, nombre: "Isabel", apellido: "Pérez", edad: 34, fechaTurno: "2025-10-08", horaTurno: "14:00" },
    { id: 9, nombre: "Cristina", apellido: "Ruiz", edad: 27, fechaTurno: "2025-10-08", horaTurno: "14:30" },
    { id: 10, nombre: "Andrea", apellido: "Torres", edad: 36, fechaTurno: "2025-10-08", horaTurno: "15:00" },
    { id: 11, nombre: "Beatriz", apellido: "Morales", edad: 29, fechaTurno: "2025-10-08", horaTurno: "15:30" },
    { id: 12, nombre: "Nuria", apellido: "Castro", edad: 32, fechaTurno: "2025-10-08", horaTurno: "16:00" },
    { id: 13, nombre: "Raquel", apellido: "Ortega", edad: 28, fechaTurno: "2025-10-08", horaTurno: "16:30" },
    { id: 14, nombre: "Silvia", apellido: "Ramos", edad: 31, fechaTurno: "2025-10-08", horaTurno: "17:00" },
    { id: 15, nombre: "Mónica", apellido: "Jiménez", edad: 30, fechaTurno: "2025-10-08", horaTurno: "17:30" },
  ]);

  const totalPages = Math.ceil(pacientes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPacientes = pacientes.slice(startIndex, startIndex + itemsPerPage);

  const handleAtender = (id: number) => {
    console.log(`Atendiendo paciente con ID: ${id}`);
    // Aquí iría la lógica para atender al paciente
  };

  const handleVerHistoria = (id: number) => {
    console.log(`Viendo historia clínica del paciente con ID: ${id}`);
    // Aquí iría la lógica para ver la historia clínica
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-16 md:mt-20 px-4 sm:px-6 py-6 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white-900 text-center mb-2">
          Listado de Turnos
        </h1>
        <p className="text-gray-600 text-center">
          Gestiona los turnos de tus pacientes - Total: {pacientes.length} pacientes
        </p>
      </div>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {currentPacientes.map((paciente) => (
          <PacientCard
            key={paciente.id}
            paciente={paciente}
            onAtender={handleAtender}
            onVerHistoria={handleVerHistoria}
          />
        ))}
      </div>

      {/* Paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={pacientes.length}
      />
    </div>
  );
}
