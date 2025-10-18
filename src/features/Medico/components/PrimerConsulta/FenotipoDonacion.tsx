import React from 'react';
import type { FenotipoDonacionProps } from '../../../../interfaces/Medico';

const complexiones = ['Delgada', 'Media', 'Robusta'];

const FenotipoDonacion: React.FC<FenotipoDonacionProps> = ({ visible, onDataChange }) => {
  const [fenotipo, setFenotipo] = React.useState({
    ojos: '',
    peloColor: '',
    peloTipo: '',
    altura: '',
    complexion: '',
    etnia: '',
  });

  React.useEffect(() => {
    onDataChange?.(fenotipo);
  }, [fenotipo]);

  if (!visible) return null;

  return (
    <div className="max-w-xl mx-auto rounded shadow p-6 border-2 border-black bg-white text-black mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">Fenotipo de la paciente</h2>
      <div className="mb-4">
        <label className="block font-medium mb-1 text-black">Color de ojos:</label>
        <input
          type="text"
          className="w-full border border-black rounded px-2 py-1 bg-white text-black"
          value={fenotipo.ojos}
          onChange={e => setFenotipo(f => ({ ...f, ojos: e.target.value }))}
          placeholder="Ej: marrón, verde, azul"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1 text-black">Color de pelo:</label>
        <input
          type="text"
          className="w-full border border-black rounded px-2 py-1 bg-white text-black"
          value={fenotipo.peloColor}
          onChange={e => setFenotipo(f => ({ ...f, peloColor: e.target.value }))}
          placeholder="Ej: rubio, castaño, negro"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1 text-black">Tipo de pelo:</label>
        <input
          type="text"
          className="w-full border border-black rounded px-2 py-1 bg-white text-black"
          value={fenotipo.peloTipo}
          onChange={e => setFenotipo(f => ({ ...f, peloTipo: e.target.value }))}
          placeholder="Ej: lacio, ondulado, rizado"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1 text-black">Altura (cm):</label>
        <input
          type="number"
          className="w-full border border-black rounded px-2 py-1 bg-white text-black"
          value={fenotipo.altura}
          onChange={e => setFenotipo(f => ({ ...f, altura: e.target.value }))}
          placeholder="Ej: 165"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1 text-black">Complexión corporal:</label>
        <select
          className="w-full border border-black rounded px-2 py-1 bg-white text-black"
          value={fenotipo.complexion}
          onChange={e => setFenotipo(f => ({ ...f, complexion: e.target.value }))}
        >
          <option value="">Seleccione...</option>
          {complexiones.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1 text-black">Rasgos étnicos generales:</label>
        <input
          type="text"
          className="w-full border border-black rounded px-2 py-1 bg-white text-black"
          value={fenotipo.etnia}
          onChange={e => setFenotipo(f => ({ ...f, etnia: e.target.value }))}
          placeholder="Ej: europeo, latino, afrodescendiente, etc."
        />
      </div>
    </div>
  );
};

export default FenotipoDonacion;
