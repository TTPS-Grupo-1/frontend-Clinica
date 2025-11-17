import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTurnos } from "../../../shared/hooks/fetchTurnos";
import TurnosSkeleton from "../components/TurnosSkeleton";
import PacientCard from "../components/PacientCard";
import Pagination from "../../../components/Pagination";
import type { Turno } from "../../../types/Turno";
import { useSelector } from "react-redux";
import { getTratamientoByPaciente } from "../components/SegundaConsulta/consultasService";
import { fetchTurnoByIdExterno } from "../../../shared/hooks/fetchTurnos"; 
import { obtenerMonitoreoMasProximo } from "../../../shared/hooks/useMonitoreoMasProximo";

interface UserState {
    auth: {
        user: {
            id: number;
            rol: string;
        } | null;
    };
}

export default function ListadoTurnos() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = useSelector((state: UserState) => state.auth.user?.id);
  const userRol = useSelector((state: UserState) => state.auth.user?.rol);

  const MEDICO_ID = (userRol === 'MEDICO' && userId) ? userId : null;
  
  useEffect(() => {
    async function cargarTurnos() {
      setLoading(true);
      setError(null);
      try {
        const turnos = await fetchTurnos(MEDICO_ID);
        setTurnos(turnos);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    cargarTurnos();
  }, [MEDICO_ID]);

  const turnosConPaciente = turnos.filter(t => t.id_paciente !== null);
  const totalPages = Math.ceil(turnosConPaciente.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTurnos = turnosConPaciente.slice(startIndex, startIndex + itemsPerPage);

  const handleAtender = async (id_paciente: number, turnoId: number) => {


      const turnoActual = await fetchTurnoByIdExterno(turnoId);
      
      console.log("Atendiendo turno:", turnoActual);
      // 2. Buscar si existe un tratamiento activo para este paciente usando el endpoint correcto
      console.log("Buscando tratamiento para el paciente ID:", id_paciente);
      
      const response = await getTratamientoByPaciente(id_paciente);
      console.log("Respuesta del tratamiento:", response);
      const tratamiento = response;
 
     
      console.log("Tratamiento encontrado:", tratamiento);
      // 4. Determinar a dónde redirigir según las etapas completadas
      console.log("esto imprime: ", tratamiento.primer_consulta)
      if (!tratamiento.primera_consulta) {
        // Primera consulta no completada
        navigate(`/pacientes/${id_paciente}/primeraConsulta`);
      } else if (!tratamiento.segunda_consulta) {
        // Primera completa, segunda pendiente
        navigate(`/pacientes/${id_paciente}/segundaConsulta/`);
      } else if (turnoActual && turnoActual.es_monitoreo) {  
        const monitoreoId = await obtenerMonitoreoMasProximo(tratamiento.id);
        navigate(`/medico/monitoreos?monitoreoId=${monitoreoId}`);
      } else {
        // Segunda completa pero el turno no es de monitoreo
        alert("Este turno no requiere atención médica. Será gestionado por el operador de laboratorio.");
      }

  };

  const handleVerHistoria = (id: number) => {
    console.log(`Viendo historia clínica del paciente con ID: ${id}`);
    // Aquí iría la lógica para ver la historia clínica
  };

  return (
  <div className="w-full max-w-7xl mx-auto mt-16 md:mt-20 px-4 sm:px-6 py-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-900 text-center mb-2 tracking-tight">
          Listado de Turnos
        </h1>
        <p className="text-indigo-600 text-center text-lg">
          Gestiona los turnos de tus pacientes — <span className="font-semibold text-blue-700">{turnosConPaciente.length} turnos</span>
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
                  id: turno.id_paciente!,
                  first_name: `Paciente ${turno.id_paciente}`,
                  last_name: "",
                  edad: 0,
                  fechaTurno: new Date(turno.fecha_hora).toLocaleDateString(),
                  horaTurno: new Date(turno.fecha_hora).toLocaleTimeString(),
                }}
                onAtender={() => handleAtender(turno.id_paciente!, turno.id)} 
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
