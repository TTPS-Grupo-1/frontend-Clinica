import type { FC } from 'react';

interface Medico {
  id: number;
  nombre: string;
}

interface MedicoSelectProps {
  medicos: Medico[];
  selected: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const SelectMedico: FC<MedicoSelectProps> = ({ medicos, selected, onChange, disabled }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">Médico</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccionar...</option>
        {medicos.map((m) => (
          <option key={m.id} value={m.id}>
            {m.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectMedico;
