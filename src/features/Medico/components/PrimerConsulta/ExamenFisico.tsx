import React from 'react';
import type { ExamenFisicoProps } from '../../../../interfaces/Medico';

const ExamenFisico: React.FC<ExamenFisicoProps> = ({
  onDataChange,
  value = '',
  visible = true,
}) => {
  if (!visible) return null;

  // 🧩 Manejo directo del campo controlado
  const handleChange = (descripcion: string) => {
    onDataChange?.(descripcion);
  };

  // 🧱 Render
  return (
    <div className="mx-auto mt-6 max-w-xl rounded-xl border border-gray-300 bg-white p-8 text-black shadow-lg">
      <h2 className="mb-4 text-center text-2xl font-bold text-black">Examen Físico</h2>

      <label className="mb-2 block font-medium text-black">
        Describa los hallazgos del examen físico:
      </label>

      <textarea
        className="w-full rounded-lg border border-gray-400 bg-white px-3 py-2 text-black transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Ejemplo: abdomen blando, sin masas ni dolor; presión arterial normal..."
        rows={4}
      />
    </div>
  );
};

export default ExamenFisico;
