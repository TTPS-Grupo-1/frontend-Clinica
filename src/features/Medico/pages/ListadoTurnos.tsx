import { useState, useEffect } from "react";
import { fetchTurnos } from "../../../shared/hooks/fetchTurnos";
import TurnosSkeleton from "../components/TurnosSkeleton";
import PacientCard from "../components/PacientCard";
import Pagination from "../../../components/Pagination";

interface Turno {
  id: number;
  id_grupo: number;
  id_medico: number;
  id_paciente: number | null;
  fecha_hora: string;
}


export default function ListadoTurnos() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarTurnos() {
      setLoading(true);
      setError(null);
      try {
        const turnos = await fetchTurnos(1);
        setTurnos(turnos);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    cargarTurnos();
  }, []);

  const turnosConPaciente = turnos.filter(t => t.id_paciente !== null);
  const totalPages = Math.ceil(turnosConPaciente.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTurnos = turnosConPaciente.slice(startIndex, startIndex + itemsPerPage);

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
          Gestiona los turnos de tus pacientes - Total: {turnosConPaciente.length} turnos
        </p>
      </div>

      {loading ? (
        <TurnosSkeleton count={itemsPerPage} />
      ) : error ? (
        <div className="text-center py-12 text-lg text-red-500">{error}</div>
      ) : (
        <>
          {/* Grid de tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentTurnos.map((turno) => (
              <PacientCard
                key={turno.id}
                paciente={{
                  id: turno.id,
                  first_name: turno.id_paciente ? `Paciente ${turno.id_paciente}` : "Libre",
                  last_name: "",
                  edad: 0,
                  fechaTurno: new Date(turno.fecha_hora).toLocaleDateString(),
                  horaTurno: new Date(turno.fecha_hora).toLocaleTimeString(),
                }}
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
            totalItems={turnosConPaciente.length}
          />
        </>
      )}
    </div>
  );
}
