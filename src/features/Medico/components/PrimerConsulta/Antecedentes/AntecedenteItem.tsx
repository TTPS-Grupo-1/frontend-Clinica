import React from 'react';
import type { AntecedenteItemProps } from '../../../../../interfaces/Medico';

const AntecedenteItem: React.FC<AntecedenteItemProps> = ({ antecedente, value, onChange }) => {
  return (
    <div className="mx-auto flex min-h-[80px] w-full max-w-2xl items-center gap-4 rounded-xl border border-b border-black border-gray-300 bg-white p-8 py-2 text-black shadow-lg">
      <span className="w-1/2 font-medium text-black">{antecedente}</span>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 border-black accent-black"
        />
      </label>
    </div>
  );
};

export default AntecedenteItem;
