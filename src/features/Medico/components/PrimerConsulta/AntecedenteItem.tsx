import React from 'react';
import type { AntecedenteItemProps } from '../../../../interfaces/Medico';

const AntecedenteItem: React.FC<AntecedenteItemProps> = ({ antecedente, value, onChange }) => {
  return (
    <div className="flex items-center gap-4 py-2 border-b border-black text-black">
      <span className="w-1/2 font-medium text-black">{antecedente}</span>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={!!value}
          onChange={e => onChange(e.target.checked)}
          className="h-4 w-4 border-black accent-black"
        />
      </label>
    </div>
  );
};

export default AntecedenteItem;
