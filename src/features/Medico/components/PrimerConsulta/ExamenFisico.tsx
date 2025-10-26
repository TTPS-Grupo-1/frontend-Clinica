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
    <div className="max-w-xl mx-auto mt-6 rounded-xl shadow-lg p-8 border border-gray-300 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">
        Examen Físico
      </h2>

      <label className="block mb-2 font-medium text-black">
        Describa los hallazgos del examen físico:
      </label>

      <textarea
        className="w-full border border-gray-400 rounded-lg px-3 py-2 bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Ejemplo: abdomen blando, sin masas ni dolor; presión arterial normal..."
        rows={4}
      />
    </div>
  );
};

export default ExamenFisico;
