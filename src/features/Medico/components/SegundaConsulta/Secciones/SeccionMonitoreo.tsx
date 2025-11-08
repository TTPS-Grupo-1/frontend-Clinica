import { useState } from "react";
import { CheckCircle, AlertTriangle, Clock } from "lucide-react";

interface SeccionMonitoreoProps {
  idMedico: number;
  initialData?: string[];
  onDataChange?: (data: { id_turno: number | null; fecha_hora: string }[]) => void;
}

type TurnoAPI = {
  id: number;
  id_medico: number;
  id_paciente: number | null;
  fecha_hora: string;
};

export default function SeccionMonitoreo({
  idMedico,
  initialData = [],
  onDataChange,
}: SeccionMonitoreoProps) {
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [diasSeleccionados, setDiasSeleccionados] = useState<number[]>([]);
  const [fechas, setFechas] = useState<string[]>(initialData);
  const [ocupadas, setOcupadas] = useState<string[]>([]);
  const [seleccionHorarios, setSeleccionHorarios] = useState<Record<string, string>>({});
  const [turnosMedico, setTurnosMedico] = useState<TurnoAPI[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Alternar días (+1, +2, +3, etc.)
  const toggleDia = (d: number) =>
    setDiasSeleccionados((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );

  // Calcular fechas y traer turnos del médico
  const calcularFechas = async () => {
    if (!fechaInicio || diasSeleccionados.length === 0) return;

    const [year, month, day] = fechaInicio.split("-").map(Number);

    const nuevas = diasSeleccionados.map((d) => {
      const fecha = new Date(year, month - 1, day + d); // sumar días directamente
      const y = fecha.getFullYear();
      const m = String(fecha.getMonth() + 1).padStart(2, "0");
      const dd = String(fecha.getDate()).padStart(2, "0");
      return `${y}-${m}-${dd}`; // formato YYYY-MM-DD sin pasar por UTC
    });
    setCargando(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:8000/api/turnos/medico/${idMedico}/`);
      if (!res.ok) throw new Error("Error al obtener turnos del médico");
      const json = (await res.json()) as { data: TurnoAPI[] };

      const todos = json.data;
      setTurnosMedico(todos);

      const ocupadas = todos
        .filter((t) => t.id_paciente !== null)
        .map((t) => t.fecha_hora.split("T")[0]);

      const disponibles = nuevas.filter((f) => !ocupadas.includes(f));

      setFechas(disponibles);
      setOcupadas(nuevas.filter((f) => ocupadas.includes(f)));
      setSeleccionHorarios({});
      onDataChange?.([]);
    } catch (e: any) {
      console.error("❌ Error al obtener turnos:", e);
      if (e.message.includes("Failed to fetch")) {
        setError("No se pudo conectar con el servidor (CORS o red).");
      } else {
        setError(e.message || "Error desconocido al obtener turnos.");
      }
    } finally {
      setCargando(false);
    }
  };

  // Generar horarios cada 20 minutos (solo visual)
  const generarHorarios = () => {
    const horarios: string[] = [];
    const inicio = 8 * 60; // 8:00
    const fin = 20 * 60; // 20:00
    for (let m = inicio; m < fin; m += 20) {
      const h = Math.floor(m / 60)
        .toString()
        .padStart(2, "0");
      const min = (m % 60).toString().padStart(2, "0");
      horarios.push(`${h}:${min}`);
    }
    return horarios;
  };

  const horarios = generarHorarios();

  /** Manejar selección de horario **/
  const seleccionarHorario = (fecha: string, hora: string) => {
    // Buscar el turno real correspondiente
    const turnoReal = turnosMedico.find((t) => {
      const [turnoFecha, turnoHoraCompleta] = t.fecha_hora.split("T");
      const turnoHora = turnoHoraCompleta.slice(0, 5); // HH:MM
      return t.id_paciente === null && turnoFecha === fecha && turnoHora === hora;
    });

    setSeleccionHorarios((prev) => {
      const nuevo = { ...prev, [fecha]: hora };

      // Armar array con id_turno y fecha_hora
      const seleccionFinal = Object.entries(nuevo).map(([f, h]) => {
        const t = turnosMedico.find((tu) => {
          const [fechaTu, horaTu] = tu.fecha_hora.split("T");
          return fechaTu === f && horaTu.slice(0, 5) === h;
        });
        return {
          id_turno: t?.id || null,
          fecha_hora: `${f} ${h}:00`,
        };
      });

      console.log("🎯 Monitoreo a enviar:", seleccionFinal);
      onDataChange?.(seleccionFinal as any);
      return nuevo;
    });
  };

  return (
    <div className="p-6 border rounded-lg bg-orange-50">
      <h3 className="text-xl font-semibold text-orange-700 mb-3">
        Monitoreo de la estimulación
      </h3>

      <input
        type="date"
        value={fechaInicio}
        onChange={(e) => setFechaInicio(e.target.value)}
        className="border border-black rounded px-3 py-2 mb-4 text-black bg-white placeholder-gray-500"
      />

      <div className="flex flex-wrap gap-2 mb-4">
        {[...Array(20).keys()].map((i) => (
          <button
            key={i + 1}
            onClick={() => toggleDia(i + 1)}
            className={`px-3 py-1 rounded border text-sm ${
              diasSeleccionados.includes(i + 1)
                ? "bg-orange-600 text-white"
                : "bg-white text-orange-700 border-orange-400"
            }`}
          >
            +{i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={calcularFechas}
        disabled={cargando}
        className="bg-orange-600 text-white px-5 py-2 rounded hover:bg-orange-700 disabled:opacity-50"
      >
        {cargando ? "Verificando..." : "Calcular fechas"}
      </button>

      {error && (
        <div className="mt-4 p-3 border border-red-400 bg-red-50 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {fechas.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded shadow-inner">
          <h4 className="font-semibold text-orange-700 mb-2 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" /> Fechas disponibles:
          </h4>
          <div className="space-y-4">
            {fechas.map((fecha) => (
              <div key={fecha} className="border-b pb-2">
                <div className="font-bold text-lg text-orange-700 mb-2">
                  📅{" "}
                  {new Date(`${fecha}T12:00:00`).toLocaleDateString("es-AR", {
                    weekday: "long",
                    day: "2-digit",
                    month: "long",
                  })}
                </div>
                <div className="flex flex-wrap gap-2">
                  {horarios.map((h) => {
                    const activo = seleccionHorarios[fecha] === h;
                    return (
                      <button
                        key={h}
                        onClick={() => seleccionarHorario(fecha, h)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded border text-sm ${
                          activo
                            ? "bg-orange-700 text-white border-orange-700"
                            : "bg-white text-orange-700 border-orange-400 hover:bg-orange-50"
                        }`}
                      >
                        <Clock className="w-4 h-4" />
                        {h}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {ocupadas.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded shadow-inner">
          <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" /> Fechas ocupadas:
          </h4>
          <ul className="list-disc ml-6 text-gray-700">
            {ocupadas.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
