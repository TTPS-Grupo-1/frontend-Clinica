import React from 'react';
import type { AntecedentesQuirurgicosProps } from '../../../../../interfaces/Medico';

const AntecedentesQuirurgicos: React.FC<AntecedentesQuirurgicosProps> = ({
  onDataChange,
  visible = true,
  value = { descripcion: '' },
}) => {
  if (!visible) return null;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onDataChange?.({ descripcion: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto rounded-xl shadow-lg p-8 border border-gray-300 bg-white text-black flex flex-col justify-between min-h-[400px] mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">
        Antecedentes Quirúrgicos
      </h2>

      <label className="block mb-2 font-medium text-black">
        Describa intervenciones quirúrgicas previas:
      </label>
      <textarea
        value={value.descripcion}
        onChange={handleChange}
        placeholder="Ejemplo: Cesárea en 2018, apendicectomía en 2015..."
        className="w-full h-32 border border-black rounded p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
};

export default AntecedentesQuirurgicos;
