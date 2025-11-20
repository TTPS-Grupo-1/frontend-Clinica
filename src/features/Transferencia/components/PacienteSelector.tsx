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
  isLoading,
}: PacienteSelectorProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-800">Paciente</label>
      <select
        className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-800 disabled:opacity-50"
        value={selectedPaciente ?? ''}
        onChange={(e) => onPacienteChange(e.target.value ? Number(e.target.value) : null)}
        disabled={isLoading}
      >
        <option value="">{isLoading ? 'Cargando pacientes...' : 'Seleccionar paciente...'}</option>
        {pacientes.map((p) => (
          <option key={p.id} value={p.id}>
            {p.first_name && p.last_name ? `${p.last_name}, ${p.first_name}` : `Paciente #${p.id}`}
          </option>
        ))}
      </select>
    </div>
  );
}
