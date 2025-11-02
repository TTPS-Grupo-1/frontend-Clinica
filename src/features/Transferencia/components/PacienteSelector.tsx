import type { Paciente } from '../../../types/Paciente';

interface PacienteSelectorProps {
  pacientes: Paciente[];
  selectedPaciente: number | null;
  onPacienteChange: (pacienteId: number | null) => void;
  isLoading: boolean;
}

export default function PacienteSelector({
  pacientes,
  selectedPaciente,
  onPacienteChange,
  isLoading
}: PacienteSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-800 mb-2">
        Paciente
      </label>
      <select
        className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 bg-white disabled:opacity-50"
        value={selectedPaciente ?? ''}
        onChange={(e) => onPacienteChange(e.target.value ? Number(e.target.value) : null)}
        disabled={isLoading}
      >
        <option value="">
          {isLoading ? 'Cargando pacientes...' : 'Seleccionar paciente...'}
        </option>
        {pacientes.map(p => (
          <option key={p.id} value={p.id}>
            {p.first_name && p.last_name 
              ? `${p.last_name}, ${p.first_name}` 
              : `Paciente #${p.id}`
            }
          </option>
        ))}
      </select>
    </div>
  );
}