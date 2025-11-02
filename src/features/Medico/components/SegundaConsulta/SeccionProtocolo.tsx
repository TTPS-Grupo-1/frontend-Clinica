import { useState, useEffect } from "react";

interface SeccionProtocoloProps {
  onDataChange?: (data: any) => void;
}

function SeccionProtocolo({ onDataChange }: SeccionProtocoloProps) {
  const [protocolo, setProtocolo] = useState({
    droga: "",
    tipo: "",
    dosis: "",
    duracion: 15,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProtocolo((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    onDataChange?.(protocolo);
  }, [protocolo]);

  return (
    <div className="mt-8 p-6 border rounded-lg bg-green-50">
      <h3 className="text-xl font-semibold text-green-700 mb-3">
        Protocolo de estimulación
      </h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Droga</label>
          <input
            name="droga"
            type="text"
            value={protocolo.droga}
            onChange={handleChange}
            placeholder="Nombre de la droga"
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Tipo</label>
          <select
            name="tipo"
            value={protocolo.tipo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-green-400"
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
            type="text"
            value={protocolo.dosis}
            onChange={handleChange}
            placeholder="Ej: 150 UI diarias"
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Duración (días)</label>
          <input
            name="duracion"
            type="number"
            min="1"
            value={protocolo.duracion}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>
    </div>
  );
}

export default SeccionProtocolo;
