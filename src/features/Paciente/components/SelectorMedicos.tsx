import type { FC } from "react";

interface Medico {
  id: number;
  nombre: string;
}

interface MedicoSelectProps {
  medicos: Medico[];
  selected: string;
  onChange: (value: string) => void;
}

const SelectMedico: FC<MedicoSelectProps> = ({ medicos, selected, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-700">Médico</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
