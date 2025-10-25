import React, { useState } from 'react';

const AntecedentesPersonales: React.FC<{ titulo?: string; onDataChange?: (data: any) => void }> = ({ titulo, onDataChange }) => {
  const [fuma, setFuma] = useState('');
  const [alcohol, setAlcohol] = useState('');
  const [drogas, setDrogas] = useState('');
  const [observaciones, setObservaciones] = useState('');

  React.useEffect(() => {
    onDataChange?.({ fuma, alcohol, drogas, observaciones });
  }, [fuma, alcohol, drogas, observaciones]);


  return (
  <div className="max-w-2xl mx-auto rounded-xl shadow-lg p-8 border border-gray-300 bg-white text-black flex flex-col justify-between min-h-[400px]">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">{titulo || 'Antecedentes Personales'}</h2>
      <div className="mb-4">
        <label className="block font-medium mb-1 text-black">Fuma (pack-días):</label>
        <input
          type="text"
          className="w-full border border-black rounded px-2 py-1 bg-white text-black"
          placeholder="Ej: 10 cigarrillos/día * 5 años / 20 = 2.5"
          value={fuma}
          onChange={e => setFuma(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1 text-black">Consume alcohol (frecuencia y tipo):</label>
        <input
          type="text"
          className="w-full border border-black rounded px-2 py-1 bg-white text-black"
          placeholder="Ej: 2 veces por semana, cerveza"
          value={alcohol}
          onChange={e => setAlcohol(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1 text-black">Drogas recreativas:</label>
        <input
          type="text"
          className="w-full border border-black rounded px-2 py-1 bg-white text-black"
          placeholder="Ej: marihuana ocasional"
          value={drogas}
          onChange={e => setDrogas(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1 text-black">Observaciones sobre hábitos:</label>
        <textarea
          className="w-full border border-black rounded px-2 py-1 bg-white text-black"
          placeholder="Observaciones libres sobre hábitos"
          value={observaciones}
          onChange={e => setObservaciones(e.target.value)}
          rows={3}
        />
      </div>
    </div>
  );
};

export default AntecedentesPersonales;
