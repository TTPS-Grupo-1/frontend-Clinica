import React, { useState, useEffect } from 'react';
import type { AntecedentesQuirurgicosProps} from '../../../../../interfaces/Medico';

const AntecedentesQuirurgicos: React.FC<AntecedentesQuirurgicosProps> = ({
  onDataChange,
  visible = true,
}) => {
  const [descripcion, setDescripcion] = useState('');

  // 🔄 Notificar al padre cuando cambia el texto
  useEffect(() => {
    onDataChange?.({ descripcion });
  }, [descripcion]);

  if (!visible) return null;

  return (
    <div className="max-w-xl mx-auto mt-6 rounded shadow p-6 border-2 border-black bg-white text-black">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Antecedentes Quirúrgicos
      </h2>

      <label className="block mb-2 font-medium text-black">
        Describa intervenciones quirúrgicas previas:
      </label>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Ejemplo: Cesárea en 2018, apendicectomía en 2015..."
        className="w-full h-32 border border-black rounded p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
};

export default AntecedentesQuirurgicos;
