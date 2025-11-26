import React from 'react';
import type { AntecedenteItemClinicoProps } from '../../../../../interfaces/Medico';

const AntecedenteItemClinico: React.FC<AntecedenteItemClinicoProps> = ({
  antecedente,
  value,
  onChange,
}) => {
  return (
    <div className="mx-auto flex min-h-[80px] w-full max-w-2xl items-center gap-4 rounded-xl border border-b border-black border-gray-300 bg-white p-8 py-2 text-black shadow-lg">
      <span className="w-1/2 font-medium text-black">{antecedente}</span>
      <input
        className="w-1/2 rounded border border-black bg-white px-2 py-1 text-black"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ingrese valor"
      />
    </div>
  );
};

export default AntecedenteItemClinico;
