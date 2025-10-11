import React from 'react';

interface AntecedenteItemProps {
  antecedente: string;
  value: string;
  onChange: (value: string) => void;
}

const AntecedenteItem: React.FC<AntecedenteItemProps> = ({ antecedente, value, onChange }) => {
  return (
    <div className="flex items-center gap-4 py-2 border-b border-black text-black">
      <span className="w-1/2 font-medium text-black">{antecedente}</span>
      <input
        className="w-1/2 border border-black rounded px-2 py-1 bg-white text-black"
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Ingrese valor"
      />
    </div>
  );
};

export default AntecedenteItem;
