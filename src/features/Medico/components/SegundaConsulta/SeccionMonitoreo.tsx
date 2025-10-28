import { useState } from "react";
import { CalendarDays, CheckCircle } from "lucide-react";

function SeccionMonitoreo() {
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [diasSeleccionados, setDiasSeleccionados] = useState<number[]>([]);
  const [fechasCalculadas, setFechasCalculadas] = useState<string[]>([]);

  // Calcular las fechas de monitoreo dentro de los 20 días
  const calcularFechas = () => {
    if (!fechaInicio || diasSeleccionados.length === 0) return;

    const base = new Date(fechaInicio);
    const fechas: string[] = [];

    diasSeleccionados.forEach((d) => {
      const nueva = new Date(base);
      nueva.setDate(base.getDate() + d);
      fechas.push(nueva.toISOString().split("T")[0]);
    });

    setFechasCalculadas(fechas);
  };

  const toggleDia = (dia: number) => {
    setDiasSeleccionados((prev) =>
      prev.includes(dia) ? prev.filter((x) => x !== dia) : [...prev, dia]
    );
  };

  return (
    <div className="mt-8 p-6 border rounded-lg bg-orange-50">
      <h3 className="text-xl font-semibold text-orange-700 mb-3">
        Monitoreo de la estimulación
      </h3>
      <p className="text-gray-600 mb-4">
        Seleccioná la fecha de inicio del tratamiento y los días dentro de los próximos 20 días en los que el paciente deberá asistir a control.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Fecha de inicio</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-2">
          Días seleccionados (desde inicio)
        </label>
        <div className="flex flex-wrap gap-2">
          {[...Array(20).keys()].map((i) => (
            <button
              key={i + 1}
              onClick={() => toggleDia(i + 1)}
              className={`px-3 py-1 rounded border text-sm ${
                diasSeleccionados.includes(i + 1)
                  ? "bg-orange-600 text-white"
                  : "bg-white text-orange-700 border-orange-400 hover:bg-orange-100"
              }`}
            >
              +{i + 1}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={calcularFechas}
        className="mt-4 bg-orange-600 text-white px-5 py-2 rounded hover:bg-orange-700"
      >
        Calcular fechas de monitoreo
      </button>

      {fechasCalculadas.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-inner">
          <h4 className="font-semibold text-orange-700 mb-2 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Fechas recomendadas de control:
          </h4>
          <ul className="list-disc list-inside text-gray-700">
            {fechasCalculadas.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SeccionMonitoreo;
