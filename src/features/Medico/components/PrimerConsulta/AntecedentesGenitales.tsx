import React from 'react';
import type { AntecedentesGenitalesProps } from '../../../../interfaces/Medico';

const AntecedentesGenitales: React.FC<AntecedentesGenitalesProps> = ({ visible, onDataChange }) => {
  const [tieneAntecedentes, setTieneAntecedentes] = React.useState(false);
  React.useEffect(() => { onDataChange?.({ tieneAntecedentes }); }, [tieneAntecedentes, onDataChange]);
  if (!visible) return null;

  return (
    <div className="max-w-xl mx-auto rounded shadow p-6 border-2 border-black bg-white text-black mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">Antecedentes Genitales</h2>
      <div className="mb-4">
        <label className="flex items-center gap-2 font-medium mb-1 text-black">
          <input
            type="checkbox"
            checked={tieneAntecedentes}
            onChange={e => setTieneAntecedentes(e.target.checked)}
            className="h-4 w-4 border-black accent-black"
          />
          <span>Presenta antecedentes genitales</span>
        </label>
      </div>
    </div>
  );
};

export default AntecedentesGenitales;
