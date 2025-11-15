import React from 'react';
import type { AntecedentesGenitalesProps } from '../../../../../interfaces/Medico';

const AntecedentesGenitales: React.FC<AntecedentesGenitalesProps> = ({
  onDataChange,
  visible = true,
  value = { descripcion: '' }, // controlado desde el padre
}) => {
  if (!visible) return null;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onDataChange?.({ descripcion: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 rounded-xl shadow-lg p-8 border border-gray-300 bg-white text-black flex flex-col justify-between min-h-[400px]">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Antecedentes Genitales
      </h2>

      <label className="block mb-2 font-medium text-black">
        Describa los antecedentes genitales relevantes:
      </label>
      <textarea
        value={value.descripcion}
        onChange={handleChange}
        placeholder="Ejemplo: Varicocele tratado, infección previa, malformación congénita..."
        className="w-full h-32 border border-black rounded p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
};

export default AntecedentesGenitales;
