import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchTurnos } from '../../../shared/hooks/fetchTurnos';
import TurnosSkeleton from '../components/TurnosSkeleton';
import PacientCard from '../components/PacientCard';
import Pagination from '../../../components/Pagination';
import type { Turno } from '../../../types/Turno';
import { useSelector } from 'react-redux';
import { getTratamientoByPaciente } from '../components/SegundaConsulta/consultasService';
import { fetchTurnoByIdExterno } from '../../../shared/hooks/fetchTurnos';
import { obtenerMonitoreoMasProximo } from '../../../shared/hooks/useMonitoreoMasProximo';
import type { UserState } from '../../../interfaces/Turnos';
import { marcarTurnoAtendido } from '../utils/pacienteHelpers';
import { toast } from 'sonner';
import { fetchPacienteById } from '../../../shared/hooks/usePacienteData';

export default function ListadoTurnos() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = useSelector((state: UserState) => state.auth.user?.id);
  const userRol = useSelector((state: UserState) => state.auth.user?.rol);

  const MEDICO_ID = userRol === 'MEDICO' && userId ? userId : null;

  useEffect(() => {
    async function cargarTurnos() {
      setLoading(true);
      setError(null);
      try {
        // 1) traer turnos remotos (proxy)
        const externos = await fetchTurnos(MEDICO_ID).catch(() => []);
        const externosNorm = Array.isArray(externos)
          ? externos
          : (externos?.results ?? externos?.data ?? []);

        // Filtrar en frontend: quedarnos sólo con los remotos que tienen paciente asignado
        const extractPacienteId = (t: any) => {
          return t?.Paciente ?? t?.paciente ?? t?.paciente_id ?? t?.id_paciente ?? null;
        };
        const externosConPaciente = externosNorm.filter((e: any) => {
          const pid = extractPacienteId(e);
          return pid !== null && pid !== undefined && pid !== '';
        });

        // 2) extraer id_externo de los remotos filtrados (preferimos el campo `id_externo`)
        const normalizeExternalId = (t: any) =>
          t?.id_externo ?? t?.external_id ?? t?.turno_id ?? t?.id ?? null;
        const externalIds = externosConPaciente
          .map((e: any) => normalizeExternalId(e))
          .filter((v: any) => v != null)
          .map((v: any) => Number(v));

        console.debug('externalIds:', externalIds);
        if (externalIds.length === 0) {
          setTurnos([]);
        } else {
          const idsParam = externalIds.join(',');
          // 3) pedir al backend local los turnos cuyos id_externo estén en la lista y que no estén atendidos
          const localRes = await axios
            .get(
              `/api/local/turnos/por-externos/?ids=${encodeURIComponent(idsParam)}&atendido=false`
            )
            .catch((e) => {
              return { data: [] };
            });

          const localList = Array.isArray(localRes.data)
            ? localRes.data
            : (localRes.data?.results ?? localRes.data ?? []);

          // fallback: si backend no devolvió nada, intentar consultar por-id-externo uno por uno (debugging)
          if ((localList.length === 0 || !localList) && externalIds.length > 0) {
            const promos = externalIds.map((extId: number) =>
              fetchTurnoByIdExterno(extId).catch(() => null)
            );
            const encontrados = (await Promise.all(promos)).filter(
              (x: any) => x !== null && x !== undefined
            );

            // filtrar no atendidos
            const encontradosNoAtendidos = encontrados.filter((lt: any) => lt.atendido === false);
            const normalizedFallback = encontradosNoAtendidos.map((lt: any) => {
              const pacienteField = lt?.Paciente ?? lt?.paciente ?? null;
              const idPaciente =
                typeof pacienteField === 'object' ? (pacienteField?.id ?? null) : pacienteField;
              return {
                id: lt.id,
                id_externo: lt.id_externo ?? lt.external_id ?? lt.turno_id ?? lt.id,
                id_paciente: idPaciente,
                fecha_hora: lt?.fecha_hora ?? lt?.fecha ?? lt?.fechaHora,
                es_monitoreo: lt?.es_monitoreo ?? false,
                atendido: lt?.atendido ?? false,
              };
            });

            // ✅ Enriquecer con datos del paciente
            const turnosEnriquecidos = await Promise.all(
              normalizedFallback.map(async (turno: any) => {
                if (turno.id_paciente) {
                  const paciente = await fetchPacienteById(turno.id_paciente);
                  return {
                    ...turno,
                    paciente_data: paciente || {
                      first_name: `Paciente ${turno.id_paciente}`,
                      last_name: '',
                      edad: 0,
                    },
                  };
                }
                return turno;
              })
            );

            setTurnos(turnosEnriquecidos as unknown as Turno[]);
            setLoading(false);
            return;
          }

          const normalized = localList.map((lt: any) => {
            const pacienteField = lt?.Paciente ?? lt?.paciente ?? null;
            const idPaciente =
              typeof pacienteField === 'object' ? (pacienteField?.id ?? null) : pacienteField;
            return {
              id: lt.id,
              id_externo: lt.id_externo ?? lt.external_id ?? lt.turno_id ?? lt.id,
              id_paciente: idPaciente,
              fecha_hora: lt?.fecha_hora ?? lt?.fecha ?? lt?.fechaHora,
              es_monitoreo: lt?.es_monitoreo ?? false,
              atendido: lt?.atendido ?? false,
            };
          });

          // ✅ Enriquecer con datos del paciente
          const turnosEnriquecidos = await Promise.all(
            normalized.map(async (turno: any) => {
              if (turno.id_paciente) {
                const paciente = await fetchPacienteById(turno.id_paciente);
                return {
                  ...turno,
                  paciente_data: paciente || {
                    first_name: `Paciente ${turno.id_paciente}`,
                    last_name: '',
                    edad: 0,
                  },
                };
              }
              return turno;
            })
          );

          setTurnos(turnosEnriquecidos as unknown as Turno[]);
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    cargarTurnos();
  }, [MEDICO_ID]);

  const turnosConPaciente = turnos.filter((t) => t.id_paciente !== null);
  const totalPages = Math.ceil(turnosConPaciente.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTurnos = turnosConPaciente.slice(startIndex, startIndex + itemsPerPage);

  const handleAtender = async (id_paciente: number, turnoIdExterno: number, turnoId: number) => {
    try {
      console.log(`Atendiendo paciente ID: ${id_paciente}, turno ID: ${turnoIdExterno}`);
      const turnoActual = await fetchTurnoByIdExterno(turnoIdExterno);

      // Intentar obtener el tratamiento, si no existe es primera consulta
      let tratamiento = null;
      try {
        tratamiento = await getTratamientoByPaciente(id_paciente);
        console.log('Tratamiento encontrado:', tratamiento);
      } catch (error: any) {
        // Si es 404, el paciente no tiene tratamiento (primera consulta)
        if (error.response?.status === 404 || error.message?.includes('404')) {
          console.log('Paciente sin tratamiento - Primera consulta');
          tratamiento = null;
        } else {
          // Otro error, lanzarlo
          throw error;
        }
      }

      // Determinar a dónde redirigir según las etapas completadas
      if (!tratamiento) {
        // No hay tratamiento o primera consulta no completada
        const resp = await marcarTurnoAtendido(turnoId);
        if (resp) toast.success('Turno atendido.');
        else toast.error('No se pudo marcar el turno como atendido.');
        navigate(`/pacientes/${id_paciente}/primeraConsulta`);
      } else if (!tratamiento.segunda_consulta) {
        // Primera completa, segunda pendiente
        const resp = await marcarTurnoAtendido(turnoId);
        if (resp) toast.success('Turno atendido.');
        else toast.error('No se pudo marcar el turno como atendido.');
        navigate(`/pacientes/${id_paciente}/segundaConsulta`);
      } else if (turnoActual && turnoActual.es_monitoreo) {
        // Segunda completa y es un turno de monitoreo
        const resp = await marcarTurnoAtendido(turnoId);
        if (resp) toast.success('Turno atendido.');
        else toast.error('No se pudo marcar el turno como atendido.');

        // Buscar el monitoreo más próximo
        const monitoreoId = await obtenerMonitoreoMasProximo(tratamiento.id);
        if (monitoreoId) {
          navigate(`/medico/monitoreos?monitoreoId=${monitoreoId}`);
        } else {
          toast.error('No hay monitoreos pendientes para este tratamiento.');
        }
      } else {
        // Segunda completa pero el turno no es de monitoreo
        alert(
          'Este turno no requiere atención médica. Será gestionado por el operador de laboratorio.'
        );
      }
    } catch (error) {
      console.error('Error al atender turno:', error);
      toast.error('Error al procesar el turno.');
    }
  };



  return (
    <div className="mx-auto mt-16 min-h-screen w-full max-w-7xl bg-gray-50 px-4 py-6 sm:px-6 md:mt-20">
      {/* Header */}
      <div className="mb-6">
        <h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-blue-900">
          Listado de Turnos
        </h1>
        <p className="text-center text-lg text-indigo-600">
          Gestiona los turnos de tus pacientes —{' '}
          <span className="font-semibold text-blue-700">{turnosConPaciente.length} turnos</span>
        </p>
      </div>

      {loading ? (
        <TurnosSkeleton count={itemsPerPage} />
      ) : error ? (
        <div className="py-12 text-center text-lg text-red-500">{error}</div>
      ) : (
        <>
          {/* Grid de tarjetas */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentTurnos.map((turno) => (
              <PacientCard
                key={turno.id}
                paciente={{
                  id: turno.id_paciente!,
                  first_name: turno.paciente_data?.first_name || `Paciente ${turno.id_paciente}`,
                  last_name: turno.paciente_data?.last_name || '',
                  edad: turno.paciente_data?.edad || 0,
                  fechaTurno: new Date(turno.fecha_hora).toLocaleDateString(),
                  horaTurno: new Date(turno.fecha_hora).toLocaleTimeString(),
                }}
                onAtender={() => handleAtender(turno.id_paciente!, turno.id_externo!, turno.id)}
              
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
