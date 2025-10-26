import React from 'react';
import type { FenotipoDonacionProps2 } from '../../../../interfaces/Medico';

const complexiones = ['Delgada', 'Media', 'Robusta'];

const FenotipoDonacion: React.FC<FenotipoDonacionProps2> = ({
  visible = true,
  onDataChange,
  value = {
    ojos: '',
    peloColor: '',
    peloTipo: '',
    altura: '',
    complexion: '',
    etnia: '',
  },
}) => {
  if (!visible) return null;

  // 🧩 Manejo directo del cambio de cualquier campo
  const handleChange = (key: keyof typeof value, newValue: string) => {
    onDataChange?.({ ...value, [key]: newValue });
  };

  // 🧱 Render
  return (
    <div className="max-w-xl mx-auto mt-6 rounded-xl shadow-lg p-8 border border-gray-300 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">
        Fenotipo de la paciente
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1 text-black">Color de ojos:</label>
          <input
            type="text"
            className="w-full border border-gray-400 rounded px-2 py-1 bg-white text-black"
            value={value.ojos}
            onChange={(e) => handleChange('ojos', e.target.value)}
            placeholder="Ej: marrón, verde, azul"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-black">Color de pelo:</label>
          <input
            type="text"
            className="w-full border border-gray-400 rounded px-2 py-1 bg-white text-black"
            value={value.peloColor}
            onChange={(e) => handleChange('peloColor', e.target.value)}
            placeholder="Ej: rubio, castaño, negro"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-black">Tipo de pelo:</label>
          <input
            type="text"
            className="w-full border border-gray-400 rounded px-2 py-1 bg-white text-black"
            value={value.peloTipo}
            onChange={(e) => handleChange('peloTipo', e.target.value)}
            placeholder="Ej: lacio, ondulado, rizado"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-black">Altura (cm):</label>
          <input
            type="number"
            className="w-full border border-gray-400 rounded px-2 py-1 bg-white text-black"
            value={value.altura}
            onChange={(e) => handleChange('altura', e.target.value)}
            placeholder="Ej: 165"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-black">Complexión corporal:</label>
          <select
            className="w-full border border-gray-400 rounded px-2 py-1 bg-white text-black"
            value={value.complexion}
            onChange={(e) => handleChange('complexion', e.target.value)}
          >
            <option value="">Seleccione...</option>
            {complexiones.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1 text-black">Rasgos étnicos generales:</label>
          <input
            type="text"
            className="w-full border border-gray-400 rounded px-2 py-1 bg-white text-black"
            value={value.etnia}
            onChange={(e) => handleChange('etnia', e.target.value)}
            placeholder="Ej: europeo, latino, afrodescendiente, etc."
          />
        </div>
      </div>
    </div>
  );
};

export default FenotipoDonacion;
