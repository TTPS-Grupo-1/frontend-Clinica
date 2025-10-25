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
      <label className="block text-sm font-medium mb-2">Médico</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg p-2"
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
