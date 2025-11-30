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
  // If still loading, show disabled select with loading text
  if (isLoading) {
    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-800">Paciente</label>
        <select
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-800 disabled:opacity-50"
          value={selectedPaciente ?? ''}
          disabled
        >
          <option value="">Cargando pacientes...</option>
        </select>
      </div>
    );
  }

  // If not loading and no pacientes available, show friendly message
  if (!pacientes || pacientes.length === 0) {
    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-800">Paciente</label>
        <div className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-700">
          No hay pacientes disponibles.
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-800">Paciente</label>
      <select
        className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-800 disabled:opacity-50"
        value={selectedPaciente ?? ''}
        onChange={(e) => onPacienteChange(e.target.value ? Number(e.target.value) : null)}
      >
        <option value="">Seleccionar paciente...</option>
        {pacientes.map((p) => (
          <option key={p.id} value={p.id}>
            {p.first_name && p.last_name ? `${p.last_name}, ${p.first_name}` : `Paciente #${p.id}`}
          </option>
        ))}
      </select>
    </div>
  );
}
