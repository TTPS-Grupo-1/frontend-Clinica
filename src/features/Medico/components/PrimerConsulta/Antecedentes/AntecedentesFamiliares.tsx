import React from 'react';
import type { AntecedentesFamiliaresProps } from '../../../../../interfaces/Medico';

const AntecedentesFamiliares: React.FC<AntecedentesFamiliaresProps> = ({ onDataChange }) => {
  const [valor, setValor] = React.useState('');

  React.useEffect(() => {
    if (onDataChange) onDataChange(valor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valor]);

  return (
  <div className="max-w-2xl mx-auto rounded-xl shadow-lg p-8 border border-gray-300 bg-white text-black flex flex-col justify-between min-h-[400px] mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">Antecedentes Familiares</h2>
      <div className="mb-4">
        <label className="block font-medium mb-1 text-black">Describa los antecedentes familiares relevantes:</label>
        <textarea
          className="w-full border border-black rounded px-2 py-1 bg-white text-black"
          value={valor}
          onChange={e => setValor(e.target.value)}
          placeholder="Campo libre"
          rows={4}
        />
      </div>
    </div>
  );
};

export default AntecedentesFamiliares;
