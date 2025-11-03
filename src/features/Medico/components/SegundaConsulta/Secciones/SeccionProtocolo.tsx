import { useState } from "react";

interface SeccionProtocoloProps {
  initialData?: any;
  onDataChange?: (data: any) => void;
}

export default function SeccionProtocolo({
  initialData = {},
  onDataChange,
}: SeccionProtocoloProps) {
  const [protocolo, setProtocolo] = useState({
    droga: initialData?.droga || "",
    tipo: initialData?.tipo || "",
    dosis: initialData?.dosis || "",
    duracion: initialData?.duracion || 15,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newData = { ...protocolo, [name]: value };
    setProtocolo(newData);
    onDataChange?.(newData);
  };

  return (
    <div className="p-6 border rounded-lg bg-green-50">
      <h3 className="text-xl font-semibold text-green-700 mb-3">
        Protocolo de estimulación
      </h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Droga</label>
          <input
            name="droga"
            value={protocolo.droga}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900"
            placeholder="Ej: Gonal-F"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Tipo</label>
          <select
            name="tipo"
            value={protocolo.tipo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900"
          >
            <option value="">Seleccione...</option>
            <option value="Oral">Oral</option>
            <option value="Inyectable">Inyectable</option>
            <option value="Mixta">Mixta</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Dosis</label>
          <input
            name="dosis"
            value={protocolo.dosis}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900"
            placeholder="Ej: 150 UI diarias"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Duración (días)</label>
          <input
            name="duracion"
            type="number"
            value={protocolo.duracion}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900"
          />
        </div>
      </div>
    </div>
  );
}
