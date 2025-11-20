import React from 'react';
import type { AntecedentesFamiliaresProps } from '../../../../../interfaces/Medico';

const AntecedentesFamiliares: React.FC<AntecedentesFamiliaresProps> = ({
  onDataChange,
  value = '', // valor controlado desde el padre
}) => {
  // 🧩 Manejamos directamente el valor controlado
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onDataChange?.(e.target.value);
  };

  return (
    <div className="mx-auto mt-6 flex min-h-[400px] max-w-2xl flex-col justify-between rounded-xl border border-gray-300 bg-white p-8 text-black shadow-lg">
      <h2 className="mb-4 text-center text-2xl font-bold text-black">Antecedentes Familiares</h2>

      <div className="mb-4">
        <label className="mb-1 block font-medium text-black">
          Describa los antecedentes familiares relevantes:
        </label>
        <textarea
          className="w-full rounded border border-black bg-white px-2 py-1 text-black focus:border-blue-600 focus:outline-none"
          value={value}
          onChange={handleChange}
          placeholder="Campo libre"
          rows={4}
        />
      </div>
    </div>
  );
};

export default AntecedentesFamiliares;
