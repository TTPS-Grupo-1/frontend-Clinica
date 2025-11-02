import { useState } from "react";
import { CheckCircle } from "lucide-react";

interface SeccionMonitoreoProps {
  initialData?: string[];
  onDataChange?: (data: string[]) => void;
}

export default function SeccionMonitoreo({
  initialData = [],
  onDataChange,
}: SeccionMonitoreoProps) {
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [diasSeleccionados, setDiasSeleccionados] = useState<number[]>([]);
  const [fechas, setFechas] = useState<string[]>(initialData);

  const calcularFechas = () => {
    if (!fechaInicio || diasSeleccionados.length === 0) return;
    const base = new Date(fechaInicio);
    const nuevas = diasSeleccionados.map((d) => {
      const f = new Date(base);
      f.setDate(f.getDate() + d);
      return f.toISOString().split("T")[0];
    });
    setFechas(nuevas);
    onDataChange?.(nuevas);
  };

  const toggleDia = (d: number) =>
    setDiasSeleccionados((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );

  return (
    <div className="p-6 border rounded-lg bg-orange-50">
      <h3 className="text-xl font-semibold text-orange-700 mb-3">
        Monitoreo de la estimulación
      </h3>

      <input
        type="date"
        value={fechaInicio}
        onChange={(e) => setFechaInicio(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-4"
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
        className="bg-orange-600 text-white px-5 py-2 rounded hover:bg-orange-700"
      >
        Calcular fechas
      </button>

      {fechas.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded shadow-inner">
          <h4 className="font-semibold text-orange-700 mb-2 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" /> Fechas calculadas:
          </h4>
          <ul className="list-disc ml-6 text-gray-700">
            {fechas.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
