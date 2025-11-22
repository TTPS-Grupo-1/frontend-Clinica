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
    <div className="mx-auto mt-6 flex min-h-[400px] max-w-2xl flex-col justify-between rounded-xl border border-gray-300 bg-white p-8 text-black shadow-lg">
      <h2 className="mb-4 text-center text-2xl font-bold">Antecedentes Genitales</h2>

      <label className="mb-2 block font-medium text-black">
        Describa los antecedentes genitales relevantes:
      </label>
      <textarea
        value={value.descripcion}
        onChange={handleChange}
        placeholder="Ejemplo: Varicocele tratado, infección previa, malformación congénita..."
        className="h-32 w-full rounded border border-black p-2 text-black focus:ring-2 focus:ring-black focus:outline-none"
      />
    </div>
  );
};

export default AntecedentesGenitales;
