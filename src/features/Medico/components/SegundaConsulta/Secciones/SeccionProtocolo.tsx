import { useState } from 'react';

interface SeccionProtocoloProps {
  initialData?: any;
  onDataChange?: (data: any) => void;
}

export default function SeccionProtocolo({
  initialData = {},
  onDataChange,
}: SeccionProtocoloProps) {
  const [protocolo, setProtocolo] = useState({
    droga: initialData?.droga || '',
    tipo: initialData?.tipo || '',
    dosis: initialData?.dosis || '',
    duracion: initialData?.duracion || 15,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newData = { ...protocolo, [name]: value };
    setProtocolo(newData);
    onDataChange?.(newData);
  };

  return (
    <div className="rounded-lg border bg-green-50 p-6">
      <h3 className="mb-3 text-xl font-semibold text-green-700">Protocolo de estimulación</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-gray-700">Droga</label>
          <input
            name="droga"
            value={protocolo.droga}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900"
            placeholder="Ej: Gonal-F"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-700">Tipo</label>
          <select
            name="tipo"
            value={protocolo.tipo}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900"
          >
            <option value="">Seleccione...</option>
            <option value="Oral">Oral</option>
            <option value="Inyectable">Inyectable</option>
            <option value="Mixta">Mixta</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-700">Dosis</label>
          <input
            name="dosis"
            value={protocolo.dosis}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900"
            placeholder="Ej: 150 UI diarias"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-700">Duración (días)</label>
          <input
            name="duracion"
            type="number"
            value={protocolo.duracion}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900"
          />
        </div>
      </div>
    </div>
  );
}
