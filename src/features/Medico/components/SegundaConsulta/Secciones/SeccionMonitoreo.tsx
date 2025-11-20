import { useState } from 'react';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface SeccionMonitoreoProps {
  idMedico: number;
  initialData?: string[];
  onDataChange?: (data: { id_turno: number | null; fecha_hora: string }[]) => void;
}

type TurnoAPI = {
  id: number;
  id_medico: number;
  id_paciente: number | null;
  fecha_hora: string; // ISO del backend (sin tz)
};

export default function SeccionMonitoreo({
  idMedico,
  initialData = [],
  onDataChange,
}: SeccionMonitoreoProps) {
  const [fechaInicio, setFechaInicio] = useState<string>('');
  const [diasSeleccionados, setDiasSeleccionados] = useState<number[]>([]);
  const [fechas, setFechas] = useState<string[]>(initialData);
  const [seleccionHorarios, setSeleccionHorarios] = useState<Record<string, string>>({});
  const [turnosMedico, setTurnosMedico] = useState<TurnoAPI[]>([]);
  const [turnosPorFecha, setTurnosPorFecha] = useState<
    Record<string, { hora: string; id: number; ocupado: boolean }[]>
  >({});
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Horarios base cada 20'
  const horariosBase = (() => {
    const hs: string[] = [];
    const inicio = 8 * 60,
      fin = 20 * 60;
    for (let m = inicio; m < fin; m += 20) {
      const h = String(Math.floor(m / 60)).padStart(2, '0');
      const min = String(m % 60).padStart(2, '0');
      hs.push(`${h}:${min}`);
    }
    return hs;
  })();

  const toggleDia = (d: number) =>
    setDiasSeleccionados((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));

  const calcularFechas = async () => {
    if (!fechaInicio || diasSeleccionados.length === 0) return;

    // Construcción robusta de fechas YYYY-MM-DD (sin UTC)
    const [y, m, d0] = fechaInicio.split('-').map(Number);
    const nuevas = diasSeleccionados.map((d) => {
      const f = new Date(y, m - 1, d0 + d);
      const yyyy = f.getFullYear();
      const mm = String(f.getMonth() + 1).padStart(2, '0');
      const dd = String(f.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    });

    setCargando(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:8000/api/turnos/medico/${idMedico}/`);
      if (!res.ok) throw new Error('Error al obtener turnos del médico');
      const json = (await res.json()) as { data: TurnoAPI[] };
      const todos = json.data || [];
      setTurnosMedico(todos);

      // 👉 FIX DE ZONA HORARIA:
      // Si el backend manda "YYYY-MM-DDTHH:mm:ss" SIN zona, muchos navegadores lo interpretan como UTC.
      // Sumamos +3h para mostrarlo en ART (UTC-3).
      const mapa: Record<string, { hora: string; id: number; ocupado: boolean }[]> = {};
      for (const t of todos) {
        const dt = new Date(t.fecha_hora);
        dt.setHours(dt.getHours() + 3); // ⏰ corregimos a ART

        const fechaLocal = dt.toLocaleDateString('en-CA'); // YYYY-MM-DD
        const horaLocal = dt.toLocaleTimeString('es-AR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });

        if (!mapa[fechaLocal]) mapa[fechaLocal] = [];
        mapa[fechaLocal].push({ hora: horaLocal, id: t.id, ocupado: t.id_paciente !== null });
      }
      for (const f of Object.keys(mapa)) {
        mapa[f].sort((a, b) => a.hora.localeCompare(b.hora));
      }

      setTurnosPorFecha(mapa);
      setFechas(nuevas);
      setSeleccionHorarios({});
      onDataChange?.([]);
    } catch (e: any) {
      console.error('❌ Error al obtener turnos:', e);
      setError(e.message || 'Error desconocido al obtener turnos.');
    } finally {
      setCargando(false);
    }
  };

  // Al seleccionar horario: si hay turno real ese día/hora, mandamos su id; si el día no tiene turnos en backend, id_turno = null
  const seleccionarHorario = (fecha: string, hora: string) => {
    const listaDia = turnosPorFecha[fecha]; // puede ser undefined (día sin agenda)
    const turnoReal = listaDia?.find((t) => t.hora === hora && !t.ocupado) || null;

    setSeleccionHorarios((prev) => {
      const next = { ...prev, [fecha]: hora };
      const seleccionFinal = Object.entries(next).map(([f, h]) => {
        const t = turnosPorFecha[f]?.find((x) => x.hora === h && !x.ocupado) || null;
        return {
          id_turno: t?.id ?? null,
          fecha_hora: `${f} ${h}:00`,
        };
      });
      onDataChange?.(seleccionFinal);
      return next;
    });
  };

  return (
    <div className="rounded-lg border bg-orange-50 p-6">
      <h3 className="mb-3 text-xl font-semibold text-orange-700">Monitoreo de la estimulación</h3>

      <input
        type="date"
        value={fechaInicio}
        onChange={(e) => setFechaInicio(e.target.value)}
        className="mb-4 rounded border border-black bg-white px-3 py-2 text-black placeholder-gray-500"
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {[...Array(20).keys()].map((i) => (
          <button
            key={i + 1}
            onClick={() => toggleDia(i + 1)}
            className={`rounded border px-3 py-1 text-sm ${
              diasSeleccionados.includes(i + 1)
                ? 'bg-orange-600 text-white'
                : 'border-orange-400 bg-white text-orange-700'
            }`}
          >
            +{i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={calcularFechas}
        disabled={cargando}
        className="rounded bg-orange-600 px-5 py-2 text-white hover:bg-orange-700 disabled:opacity-50"
      >
        {cargando ? 'Verificando...' : 'Calcular fechas'}
      </button>

      {error && (
        <div className="mt-4 rounded border border-red-400 bg-red-50 p-3 text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}

      {fechas.length > 0 && (
        <div className="mt-6 rounded bg-white p-4 shadow-inner">
          <h4 className="mb-2 flex items-center gap-2 font-semibold text-orange-700">
            <CheckCircle className="h-5 w-5 text-green-600" /> Fechas disponibles:
          </h4>

          <div className="space-y-4">
            {fechas.map((fecha) => {
              // Si hay agenda en backend para ese día → usamos SOLO esos horarios; si no hay → usamos grilla completa
              const agendaDia = turnosPorFecha[fecha];
              const items = agendaDia
                ? agendaDia.map(({ hora, id, ocupado }) => ({ hora, id, ocupado }))
                : horariosBase.map((hora) => ({ hora, id: null as number | null, ocupado: false }));

              return (
                <div key={fecha} className="border-b pb-2">
                  <div className="mb-2 text-lg font-bold text-orange-700">
                    📅{' '}
                    {new Date(`${fecha}T12:00:00`).toLocaleDateString('es-AR', {
                      weekday: 'long',
                      day: '2-digit',
                      month: 'long',
                    })}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {items.map(({ hora, id, ocupado }) => {
                      const activo = seleccionHorarios[fecha] === hora;

                      if (agendaDia && ocupado) {
                        return (
                          <button
                            key={`${fecha}-${hora}`}
                            disabled
                            className="inline-flex cursor-not-allowed items-center gap-1 rounded border bg-gray-200 px-3 py-1 text-sm text-gray-500"
                            title="Turno ocupado"
                          >
                            <Clock className="h-4 w-4" />
                            {hora}
                          </button>
                        );
                      }

                      return (
                        <button
                          key={`${fecha}-${hora}`}
                          onClick={() => seleccionarHorario(fecha, hora)}
                          className={`inline-flex items-center gap-1 rounded border px-3 py-1 text-sm ${
                            activo
                              ? 'border-orange-700 bg-orange-700 text-white'
                              : 'border-orange-400 bg-white text-orange-700 hover:bg-orange-50'
                          }`}
                          title={
                            agendaDia
                              ? id
                                ? 'Turno libre'
                                : 'Horario libre sin turno creado'
                              : 'Horario libre'
                          }
                        >
                          <Clock className="h-4 w-4" />
                          {hora}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
