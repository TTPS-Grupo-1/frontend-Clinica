import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { fetchTurnos } from "../../../shared/hooks/fetchTurnos";
import TurnosSkeleton from "../components/TurnosSkeleton";
import PacientCard from "../components/PacientCard";
import Pagination from "../../../components/Pagination";
import type { Turno } from "../../../types/Turno";
import { useSelector } from "react-redux";
import { getTratamientoByPaciente } from "../components/SegundaConsulta/consultasService";
import { fetchTurnoByIdExterno } from "../../../shared/hooks/fetchTurnos"; 
import type { UserState } from "../../../interfaces/Turnos";
import { marcarTurnoAtendido } from "../utils/pacienteHelpers";
import { toast } from "sonner";


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
        // 1) traer turnos remotos (proxy)
        const externos = await fetchTurnos(MEDICO_ID).catch(() => []);
        const externosNorm = Array.isArray(externos) ? externos : (externos?.results ?? externos?.data ?? []);

        // Filtrar en frontend: quedarnos sólo con los remotos que tienen paciente asignado
        const extractPacienteId = (t: any) => {
          return t?.Paciente ?? t?.paciente ?? t?.paciente_id ?? t?.id_paciente ?? null;
        };
        const externosConPaciente = externosNorm.filter((e: any) => {
          const pid = extractPacienteId(e);
          return pid !== null && pid !== undefined && pid !== '';
        });
        

        // 2) extraer id_externo de los remotos filtrados (preferimos el campo `id_externo`)
        const normalizeExternalId = (t: any) => t?.id_externo ?? t?.external_id ?? t?.turno_id ?? t?.id ?? null;
        const externalIds = externosConPaciente.map((e: any) => normalizeExternalId(e)).filter((v: any) => v != null).map((v: any) => Number(v));

        console.debug('externalIds:', externalIds);
        if (externalIds.length === 0) {
          setTurnos([]);
        } else {
          const idsParam = externalIds.join(',');
          // const token = localStorage.getItem('token');
          // const headers = token ? { Authorization: `Token ${token}` } : {};
          // 3) pedir al backend local los turnos cuyos id_externo estén en la lista y que no estén atendidos
          const localRes = await axios.get(`/api/local/turnos/por-externos/?ids=${encodeURIComponent(idsParam)}&atendido=false`).catch((e) => {
            return ({ data: [] });
          });
         
          const localList = Array.isArray(localRes.data) ? localRes.data : (localRes.data?.results ?? localRes.data ?? []);

          // fallback: si backend no devolvió nada, intentar consultar por-id-externo uno por uno (debugging)
          if ((localList.length === 0 || !localList) && externalIds.length > 0) {
            
            const promos = externalIds.map((extId: number) => fetchTurnoByIdExterno(extId).catch(() => null));
            const encontrados = (await Promise.all(promos)).filter((x: any) => x !== null && x !== undefined);
            
            // filtrar no atendidos
            const encontradosNoAtendidos = encontrados.filter((lt: any) => lt.atendido === false);
            const normalizedFallback = encontradosNoAtendidos.map((lt: any) => {
              const pacienteField = lt?.Paciente ?? lt?.paciente ?? null;
              const idPaciente = typeof pacienteField === 'object' ? (pacienteField?.id ?? null) : pacienteField;
              return {
                id: lt.id,
                id_paciente: idPaciente,
                fecha_hora: lt?.fecha_hora ?? lt?.fecha ?? lt?.fechaHora,
                es_monitoreo: lt?.es_monitoreo ?? false,
                atendido: lt?.atendido ?? false,
              };
            });
            setTurnos(normalizedFallback as unknown as Turno[]);
            setLoading(false);
            return;
          }

          const normalized = localList.map((lt: any) => {
            const pacienteField = lt?.Paciente ?? lt?.paciente ?? null;
            const idPaciente = typeof pacienteField === 'object' ? (pacienteField?.id ?? null) : pacienteField;
            return {
              id: lt.id,
              id_paciente: idPaciente,
              fecha_hora: lt?.fecha_hora ?? lt?.fecha ?? lt?.fechaHora,
              es_monitoreo: lt?.es_monitoreo ?? false,
              atendido: lt?.atendido ?? false,
            };
          });
          setTurnos(normalized as unknown as Turno[]);
        }
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
      const response = await getTratamientoByPaciente(id_paciente);

      const tratamiento = response;
 
     

      // 4. Determinar a dónde redirigir según las etapas completadas
      // helper: marcar turno como atendido en la BD local
      

      if (!tratamiento.primer_consulta) {
        // Primera consulta no completada
        const resp = await marcarTurnoAtendido(turnoId);
        if(resp) toast.success("Turno atendido.");
        else toast.error("No se pudo marcar el turno como atendido.");
        navigate(`/pacientes/${id_paciente}/primeraConsulta`);
      } else if (!tratamiento.segunda_consulta) {
        // Primera completa, segunda pendiente
        const resp = await marcarTurnoAtendido(turnoId);
        if(resp) toast.success("Turno atendido.");
        else toast.error("No se pudo marcar el turno como atendido.");
        navigate(`/pacientes/${id_paciente}/segundaConsulta/${tratamiento.id}`);
      } else if (turnoActual && turnoActual.es_monitoreo) {
        // Segunda completa y es un turno de monitoreo
        const resp = await marcarTurnoAtendido(turnoId);
        if(resp) toast.success("Turno atendido.");
        else toast.error("No se pudo marcar el turno como atendido.");
        navigate(`/monitoreo/${id_paciente}/${tratamiento.id}`);
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
