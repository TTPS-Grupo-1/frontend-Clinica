import { useEffect, useState, useCallback } from 'react';
import SelectMedico from '../components/SelectorMedicos';
import Calendario from '../components/Calendario';
import HorariosDisponibles from '../components/Horarios';
import { toast, Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import type { Medico } from '../../../types/Medico';
import type { TurnoAPI } from '../../../types/Turno';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Interfaz para los datos del Turno que devuelve la API externa
// 💡 Nueva interfaz para el slot de horario que se pasa al componente hijo
interface HorarioSlot {
  id: number;
  hora: string; // HH:MM
}

interface UserState {
  auth: {
    user: {
      id: number;
      rol: string;
    } | null;
  };
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SacarTurno() {
  const navigate = useNavigate();

  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [medicoId, setMedicoId] = useState('');

  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>('');
  const [horaSeleccionada, setHoraSeleccionada] = useState<string>('');

  const [turnosData, setTurnosData] = useState<TurnoAPI[]>([]);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState<TurnoAPI | null>(null);

  const [loadingMedicos, setLoadingMedicos] = useState(false);
  const [loadingTurnos, setLoadingTurnos] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);

  const userId = useSelector((state: UserState) => state.auth.user?.id);
  const userRol = useSelector((state: UserState) => state.auth.user?.rol);

  const query = useQuery();
  const modoReasignar = query.get('reasignar') === '1';

  const turnoIdReasignar = query.get('id_turno');
  const medicoReasignar = query.get('id_medico');
  const fechaHora = query.get('fecha');

  const PROXY_CANCELAR_URL = 'http://127.0.0.1:8000/api/turnos/cancelar_turno/';

  let fechaReasignar = '';
  let horaReasignar = '';

  if (fechaHora) {
    const [fechaParte, horaParte] = fechaHora.split('T');
    fechaReasignar = fechaParte; // "2025-11-27"
    horaReasignar = horaParte?.slice(0, 5) || ''; // "11:20"
  }
  const [year, month, day] = fechaReasignar.split('-').map(Number);
  const fechaLocal = new Date(year, month - 1, day);

  // URLs de los proxies de Django
  const PROXY_CONSULTA_URL = 'http://127.0.0.1:8000/api/turnos/consultar_medico_fecha/';
  const ENDPOINT_RESERVAR_URL = 'http://127.0.0.1:8000/api/reservar_turno/';
  const PACIENTE_ID = userRol === 'PACIENTE' && userId ? userId : null;

  useEffect(() => {
    if (!modoReasignar) return;

    if (medicoReasignar) setMedicoId(medicoReasignar);

    if (fechaHora) {
      const [fechaParte, horaParte] = fechaHora.split('T');
      setFechaSeleccionada(fechaParte || '');
      setHoraSeleccionada(horaParte?.slice(0, 5) || '');
    }
  }, [modoReasignar, medicoReasignar]);

  // Cuando medicoId y fecha ya están restaurados, recién ahí cargar horarios
  useEffect(() => {
    if (modoReasignar && medicoId && fechaSeleccionada) {
      fetchTurnosDisponibles();
    }
  }, [modoReasignar, medicoId, fechaSeleccionada]);

  // 1. CARGA INICIAL DE MÉDICOS (Sin cambios)
  useEffect(() => {
    const fetchMedicos = async () => {
      setLoadingMedicos(true);
      try {
        const res = await fetch('http://127.0.0.1:8000/api/medicos/');
        if (!res.ok) throw new Error('Error al obtener médicos');
        const data = await res.json(); // suponemos array de médicos

        if (modoReasignar && medicoReasignar) {
          // medicoReasignar viene de query (string). Buscar por id igual (coerce a string/number según tu API)
          const doc = data.find((m: any) => String(m.id) === String(medicoReasignar));
          if (doc) {
            setMedicos([doc]); // sólo ese médico
            setMedicoId(String(doc.id)); // aseguramos que el select muestre el id
          } else {
            // No lo encontramos en el listado (pasa si la API externa devuelve distinto set).
            // Igual seteamos el medicoId para que el select quede bloqueado con ese id (puede mostrar "Seleccionar..." si no existe).
            setMedicos([]);
            setMedicoId(String(medicoReasignar));
            toast.error(
              'No se encontró el médico localmente; si no aparece, revisá la lista de médicos.'
            );
          }
        } else {
          // modo normal: todos los medicos
          setMedicos(data);
        }
      } catch (err) {
        console.error('Error al cargar médicos:', err);
        toast.error('No se pudieron cargar los médicos');
      } finally {
        setLoadingMedicos(false);
      }
    };

    fetchMedicos();
  }, [modoReasignar, medicoReasignar]);

  // 2. FUNCIÓN PARA BUSCAR TURNOS DISPONIBLES
  const fetchTurnosDisponibles = useCallback(async () => {
    if (!medicoId || !fechaSeleccionada) {
      setTurnosData([]);
      setTurnoSeleccionado(null);
      return;
    }

    setLoadingTurnos(true);
    setTurnoSeleccionado(null);

    try {
      let turnosAcumulados: TurnoAPI[] = [];

      // ================================
      //   MODO NORMAL → consulta 1 día
      // ================================
      if (!modoReasignar) {
        const url = `${PROXY_CONSULTA_URL}?id_medico=${medicoId}&fecha=${fechaSeleccionada}`;
        const res = await fetch(url);
        const { data } = await res.json();
        turnosAcumulados = data ?? [];
      }

      // =====================================
      //   MODO REASIGNAR → consulta ±1 día
      // =====================================
      else {
        const baseDate = new Date(fechaReasignar);
        const unDiaMs = 24 * 60 * 60 * 1000;
        const fechas = [
          new Date(baseDate.getTime() - unDiaMs),
          baseDate,
          new Date(baseDate.getTime() + unDiaMs),
        ];

        for (const f of fechas) {
          const fechaStr = f.toISOString().split('T')[0];
          const url = `${PROXY_CONSULTA_URL}?id_medico=${medicoId}&fecha=${fechaStr}`;
          const res = await fetch(url);
          if (res.ok) {
            const { data } = await res.json();
            turnosAcumulados.push(...(data ?? []));
          }
        }
      }

      // =====================================
      //  FILTRADO: mismo médico, misma hora
      // =====================================
      let turnosFiltrados = turnosAcumulados;

      if (modoReasignar && fechaHora) {
        const horaOriginal = fechaHora.split('T')[1].slice(0, 5);

        turnosFiltrados = turnosAcumulados.filter((t) => {
          const horaTurno = t.fecha_hora.split('T')[1].slice(0, 5);
          return (
            String(t.id_medico) === String(medicoId) &&
            horaTurno === horaOriginal &&
            t.id_paciente === null
          );
        });
      }

      setTurnosData(turnosFiltrados);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al cargar turnos');
      setTurnosData([]);
    } finally {
      setLoadingTurnos(false);
    }
  }, [medicoId, fechaSeleccionada, modoReasignar, fechaReasignar, fechaHora]);

  // 3. EFECTO: Ejecutar la búsqueda cuando cambie el médico o la fecha
  useEffect(() => {
    if (!modoReasignar) {
      fetchTurnosDisponibles();
    }
  }, [fetchTurnosDisponibles, modoReasignar]);

  // 4. PREPARACIÓN DE DATOS PARA EL COMPONENTE HIJO (Ahora objetos {id, hora})
  let horariosSlots: HorarioSlot[] = [];

  if (modoReasignar && fechaReasignar) {
    const horaOriginal = horaReasignar;

    const turnoCoincidente = turnosData.find((t) => t.fecha_hora.includes(horaOriginal));

    if (turnoCoincidente) {
      horariosSlots = [
        {
          id: turnoCoincidente.id,
          hora: horaOriginal,
        },
      ];
    }
  } else {
    // ✅ Filtrar turnos disponibles y posteriores a la hora actual si es hoy
    const hoy = new Date();
    const esHoy =
      fechaSeleccionada ===
      `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;

    horariosSlots = turnosData
      .filter((t) => {
        if (t.id_paciente !== null) return false; // Solo turnos libres

        // ✅ Si es hoy, filtrar solo horarios posteriores a la hora actual
        if (esHoy) {
          const [hora, minuto] = t.fecha_hora.split('T')[1].substring(0, 5).split(':').map(Number);
          const turnoDate = new Date();
          turnoDate.setHours(hora, minuto, 0, 0);
          return turnoDate > hoy;
        }

        return true; // Si no es hoy, mostrar todos los turnos libres
      })
      .map((t) => ({
        id: t.id,
        hora: t.fecha_hora.split('T')[1].substring(0, 5),
      }));
  }

  console.log('TURNOS DATA', turnosData);

  // 5. MANEJADOR DE SELECCIÓN DE HORARIO (Recibe el ID único)
  const handleSelectHorario = (turnoId: number | null) => {
    if (!turnoId) {
      setTurnoSeleccionado(null);
      return;
    }

    if (modoReasignar && fechaHora) {
      const horaOriginal = fechaHora.split('T')[1].substring(0, 5);
      const slot = horariosSlots.find((h) => h.id === turnoId);

      if (!slot || slot.hora !== horaOriginal) {
        toast.error('Solo puede reasignar en el mismo horario.');
        return;
      }
    }

    // Encontrar el OBJETO TurnoAPI completo usando el ID único devuelto por el hijo
    const turnoEncontrado = turnosData.find((t) => t.id === turnoId);

    setTurnoSeleccionado(turnoEncontrado || null);
  };

  // 6. HANDLE PARA CONFIRMAR LA RESERVA (PATCH /reservar_turno)
  const handleConfirmar = async () => {
    if (!turnoSeleccionado || !medicoId || !fechaSeleccionada) {
      alert('Debe seleccionar médico, fecha y horario.');
      return;
    }

    setLoadingConfirm(true);

    try {
      const body = {
        id_paciente: PACIENTE_ID,
        id_turno: turnoSeleccionado.id, // 👈 Usamos el ID de turno del objeto seleccionado
      };

      const res = await fetch(ENDPOINT_RESERVAR_URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(
          errData.error || errData.message || `Fallo la reserva. Código: ${res.status}.`
        );
      }

      toast.success('Turno reservado exitosamente');

      // Limpiar formulario y recargar la agenda
      setMedicoId('');
      setTurnoSeleccionado(null);
      fetchTurnosDisponibles();
    } catch (err) {
      console.error('Error al confirmar reserva:', err);
      toast.error((err as Error).message || 'Ocurrió un error al registrar el turno');
    } finally {
      setLoadingConfirm(false);
    }
  };

  const handleReasignarTurno = async () => {
    if (!turnoSeleccionado) {
      toast.error('Selecciona un horario para reasignar.');
      return;
    }

    if (!turnoIdReasignar) {
      toast.error('No se encontró el turno original para reasignar.');
      return;
    }

   try {
      const esMonitoreo = true;
      // 1) Cancelar el turno original
      const cancelarRes = await fetch(`${PROXY_CANCELAR_URL}?id_turno=${turnoIdReasignar}`, {
        method: 'PATCH',
      });

      if (!cancelarRes.ok) {
        const errorInfo = await cancelarRes.json().catch(() => null);
        throw new Error(errorInfo?.error || 'Error al cancelar el turno original.');
      }

      // 2) Asignar el nuevo turno
      const reasignarRes = await fetch(ENDPOINT_RESERVAR_URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_paciente: PACIENTE_ID,
          id_turno: turnoSeleccionado.id,
          ...(esMonitoreo && { es_monitoreo: true }),
        }),
      });

      if (!reasignarRes.ok) {
        const errData = await reasignarRes.json().catch(() => null);
        throw new Error(errData?.error || 'Error al asignar el nuevo turno.');
      }

      toast.success('Turno reasignado exitosamente');
      navigate('/pacientes/misTurnos');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error en la reasignación');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6 pt-[80px]">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Sacar Turno</h1>
      <Toaster position="top-center" />
      <div className="w-full max-w-2xl space-y-6 rounded-2xl bg-white p-6 text-gray-800 shadow-md">
        <SelectMedico
          medicos={medicos.map((m) => ({
            id: m.id,
            nombre: `${m.first_name} ${m.last_name}`,
          }))}
          selected={medicoId}
          onChange={setMedicoId}
          disabled={modoReasignar}
        />

        {modoReasignar && fechaHora && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-center text-sm text-blue-700">
            <p>
              <strong>Reasignando turno:</strong>
            </p>
            <p>
              {new Date(fechaLocal).toLocaleDateString('es-AR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}{' '}
              a las {fechaHora.split('T')[1].substring(0, 5)} hs
            </p>
            <p>
              <strong>
                Puede seleccionar ±1 día en el mismo horario y con el mismo médico. Si no hay
                disponibles, no podrá modificarlo.
              </strong>
            </p>
          </div>
        )}

        <Calendario
          selected={fechaSeleccionada ? new Date(fechaSeleccionada + 'T00:00:00') : undefined}
          onSelect={(d) => {
            if (!d) return;
            // Normaliza la fecha a solo año-mes-día
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            setFechaSeleccionada(`${y}-${m}-${day}`);
          }}
          disabled={(date) => {
            // ✅ Bloquear fechas anteriores a hoy
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            const fechaCheck = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            if (fechaCheck < hoy) return true;

            // Modo reasignar: solo permitir ±1 día de la fecha original
            if (modoReasignar && fechaReasignar) {
              const [yy, mm, dd] = fechaReasignar.split('-').map(Number);
              const base = new Date(yy, (mm || 1) - 1, dd);
              if (isNaN(base.getTime())) return false;
              const inicioBase = new Date(
                base.getFullYear(),
                base.getMonth(),
                base.getDate()
              ).getTime();
              const inicioTry = fechaCheck.getTime();
              const unDiaMs = 24 * 60 * 60 * 1000;
              const diff = Math.abs(inicioTry - inicioBase);
              return diff > unDiaMs;
            }

            return false;
          }}
        />

        {/* Horarios Disponibles */}
        {medicoId && fechaSeleccionada ? (
          <HorariosDisponibles
            horarios={horariosSlots} // 👈 Pasamos el array de objetos {id, hora}
            onSelect={handleSelectHorario}
            loading={loadingTurnos}
            selectedTurnoId={turnoSeleccionado?.id || null} // Pasamos el ID seleccionado para resaltarlo
          />
        ) : (
          <p className="text-center text-sm text-gray-600">
            Selecciona un médico y una fecha para ver los horarios.
          </p>
        )}

        {/* BOTONES PARA REASIGNAR */}
        {modoReasignar && (
          <div className="mt-4 flex flex-row items-center justify-center gap-4">
            {/* Si NO hay turnos disponibles en ±1 día */}
            {turnosData.length === 0 && (
              <p className="text-center font-semibold text-red-600">
                No hay turnos disponibles en ±1 día.
              </p>
            )}

            {/* Botón Reasignar → solo si eligió un horario */}
            {turnoSeleccionado && (
              <button
                onClick={handleReasignarTurno}
                className="rounded-md bg-blue-600 px-4 py-2 text-white"
              >
                Reasignar turno
              </button>
            )}

            {/* Botón Descartar → siempre visible en modo reasignar */}
            <button
              onClick={() => (window.location.href = '/pacientes/misTurnos')}
              className="rounded-md bg-gray-300 px-4 py-2 text-gray-800"
            >
              Descartar
            </button>
          </div>
        )}

        {/* Botón de Confirmación */}
        {!modoReasignar && turnoSeleccionado && (
          <button
            onClick={handleConfirmar}
            disabled={loadingConfirm}
            className={`mx-auto flex items-center justify-center gap-2 rounded-md border px-6 py-2 font-medium transition ${
              loadingConfirm
                ? 'cursor-not-allowed border-gray-300 bg-gray-300 text-gray-700'
                : 'border-blue-600 bg-blue-600 text-white hover:border-blue-700 hover:bg-blue-700'
            }`}
          >
            {loadingConfirm ? 'Reservando...' : `Confirmar Turno`}
          </button>
        )}
      </div>
    </div>
  );
}
