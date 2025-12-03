import TurnoCard from '../components/TurnosPacienteComponente';
import TurnosSkeleton from '../components/TurnosSkeleton';
import Pagination from '../../../components/Pagination';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import ConfirmModal from '../components/ModalConfirmacionComponente';
import { useNavigate } from 'react-router-dom';
import type { Medico, Turnos, UserState } from '@/interfaces/Paciente';
import axios from 'axios';
import { fetchTurnoByIdExterno } from '../../../shared/hooks/fetchTurnos';

interface TurnoLocal {
  id: number;
  id_externo: number;
  id_paciente: number | null;
  id_medico: number | null;
  fecha_hora: string;
  es_monitoreo: boolean;
  atendido: boolean;
}

export default function MisTurnos() {
  const navigate = useNavigate();
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [turnos, setTurnos] = useState<TurnoLocal[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 2;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [turnoIdToCancel, setTurnoIdToCancel] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

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
  const PACIENTE_ID = userRol === 'PACIENTE' && userId ? userId : null;

  // URLs de los proxies de Django
  const PROXY_CONSULTA_URL = 'http://127.0.0.1:8000/api/turnos/mis_turnos/';
  const PROXY_CANCELAR_URL = 'http://127.0.0.1:8000/api/turnos/cancelar_turno/';

  // 1. FETCH DE MÉDICOS (No bloqueante)
  useEffect(() => {
    async function fetchMedicos() {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/medicos/');
        if (!res.ok) throw new Error('Error al obtener datos de médicos');
        const data = await res.json();
        setMedicos(data || []);
      } catch (err) {
        console.error('Error al cargar lista de médicos:', err);
      }
    }
    fetchMedicos();
  }, []);

  // 2. FETCH DE TURNOS DEL PACIENTE - Replicando lógica de ListadoTurnos
  useEffect(() => {
    async function cargarTurnos() {
      if (!PACIENTE_ID) {
        setLoading(false);
        setTurnos([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // 1) traer turnos remotos (proxy) del paciente
        const url = `${PROXY_CONSULTA_URL}?id_paciente=${PACIENTE_ID}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Error al obtener tus turnos.');

        const { data } = await res.json();
        const externosNorm = Array.isArray(data) ? data : [];

        console.log('TURNOS DESDE API ---->', externosNorm);

        // Filtrar turnos remotos que tengan médico asignado
        const extractMedicoId = (t: any) => {
          return t?.id_medico ?? t?.Medico ?? t?.medico ?? null;
        };
        const externosConMedico = externosNorm.filter((e: any) => {
          const mid = extractMedicoId(e);
          return mid !== null && mid !== undefined && mid !== '';
        });

        // 2) extraer id_externo de los remotos filtrados
        const normalizeExternalId = (t: any) =>
          t?.id ?? t?.id_externo ?? t?.external_id ?? t?.turno_id ?? null;
        const externalIds = externosConMedico
          .map((e: any) => normalizeExternalId(e))
          .filter((v: any) => v != null)
          .map((v: any) => Number(v));

        console.debug('externalIds:', externalIds);

        if (externalIds.length === 0) {
          setTurnos([]);
        } else {
          const idsParam = externalIds.join(',');
          // 3) pedir al backend local los turnos no atendidos
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

          // fallback: si backend no devolvió nada, intentar uno por uno
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
              return {
                id: lt.id,
                id_externo: lt.id_externo ?? lt.external_id ?? lt.turno_id ?? lt.id,
                id_paciente: lt.Paciente ?? lt.paciente ?? lt.id_paciente ?? null,
                id_medico: lt.id_medico ?? lt.Medico ?? lt.medico ?? null,
                fecha_hora: lt?.fecha_hora ?? lt?.fecha ?? lt?.fechaHora,
                es_monitoreo: lt?.es_monitoreo ?? false,
                atendido: lt?.atendido ?? false,
              };
            });

            setTurnos(normalizedFallback as TurnoLocal[]);
            setLoading(false);
            return;
          }

          const normalized = localList.map((lt: any) => {
            return {
              id: lt.id,
              id_externo: lt.id_externo ?? lt.external_id ?? lt.turno_id ?? lt.id,
              id_paciente: lt.Paciente ?? lt.paciente ?? lt.id_paciente ?? null,
              id_medico: lt.id_medico ?? lt.Medico ?? lt.medico ?? null,
              fecha_hora: lt?.fecha_hora ?? lt?.fecha ?? lt?.fechaHora,
              es_monitoreo: lt?.es_monitoreo ?? false,
              atendido: lt?.atendido ?? false,
            };
          });

          setTurnos(normalized as TurnoLocal[]);
        }
      } catch (err: any) {
        console.error('Error al cargar turnos:', err);
        setError(err.message || 'Error desconocido');
        toast.error('No se pudieron cargar tus turnos.');
        setTurnos([]);
      } finally {
        setLoading(false);
      }
    }
    cargarTurnos();
  }, [PACIENTE_ID]);

  // --- LÓGICA DE CANCELACIÓN ---
  const handleCancelarTurno = async () => {
    const idTurno = turnoIdToCancel;
    handleCloseModal(); // 1. Cerrar el modal

    if (!idTurno) {
      toast.error('Error: ID del turno para cancelar es nulo.');
      return;
    }

    try {
      const url = `${PROXY_CANCELAR_URL}?id_turno=${idTurno}`;
      const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const errorMessage =
          errData.error || errData.message || `Fallo la cancelación. Código: ${res.status}.`;
        throw new Error(errorMessage);
      }

      // 3. ÉXITO: MOSTRAR TOAST Y RECARGAR
      toast.success('Turno cancelado exitosamente!');
      
      // Recargar turnos
      window.location.reload();
    } catch (error) {
      const errorMessage = (error as Error).message || 'Error desconocido al cancelar el turno.';
      toast.error(errorMessage);
    }
  };

  // Filtrar turnos con médico asignado y no atendidos
  const turnosConMedico = turnos.filter((t) => t.id_medico !== null);

  // --- Mapeo de Datos y Paginación (Renderizado) ---
  const turnosParaMostrar: Turnos[] = turnosConMedico.map((turno) => {
    const [fechaParte, horaParteConOffset] = turno.fecha_hora.split('T');
    const horaLimpia = horaParteConOffset.substring(0, 5);

    // Resolver el nombre del médico (requiere que 'medicos' esté cargado)
    const medicoEncontrado = medicos.find((m) => m.id === turno.id_medico);

    const nombreCompleto = medicoEncontrado
      ? `${medicoEncontrado.first_name} ${medicoEncontrado.last_name}`
      : 'Médico Desconocido';

    return {
      id: turno.id_externo,
      fecha: fechaParte.split('-').reverse().join('/'),
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
    return (
      <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-100 via-white to-blue-300">
        <Toaster position="top-center" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 pt-24 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="mb-6 text-2xl font-bold text-gray-800">Mis Turnos</h1>
            <p className="text-center text-lg text-gray-700">Cargando tus próximos turnos...</p>
          </motion.div>
          <TurnosSkeleton />
        </div>
      </div>
    );
  }

  if (turnosConMedico.length === 0) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-100 via-white to-blue-300">
        <Toaster position="top-center" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 pt-24 text-center sm:px-6">
          <h1 className="text-3xl font-bold text-blue-700">No tienes turnos pendientes.</h1>
          <p className="mt-4 text-gray-600">
            Puedes sacar un nuevo turno desde la sección correspondiente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-100 via-white to-blue-300">
      <Toaster position="top-center" />
      {/* ... (Fondo decorativo y Header) ... */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 pt-24 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="mb-6 text-2xl font-bold text-gray-800">Mis Turnos</h1>
          <p className="text-center text-lg text-gray-700">
            Gestiona tus próximos turnos <span className="font-semibold">({turnosConMedico.length})</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2"
        >
          {currentTurnos.map((turno) => (
            <TurnoCard
              key={turno.id}
              turno={turno}
              onCancelar={handleOpenModal}
              onReasignar={(idTurno: number) => {
                const t = turnos.find((t) => t.id_externo === idTurno);
                if (!t) {
                  toast.error('No se encontró el turno seleccionado.');
                  return;
                }
                const fechaNormalizada = t.fecha_hora.replace(' ', '+');
                navigate(
                  `/pacientes/sacarTurno?reasignar=1&id_turno=${t.id_externo}&id_medico=${t.id_medico}&fecha=${fechaNormalizada}`
                );
              }}
            />
          ))}
        </motion.div>

        {/* Paginación */}
        {totalPages > 1 /* ... */ && (
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
