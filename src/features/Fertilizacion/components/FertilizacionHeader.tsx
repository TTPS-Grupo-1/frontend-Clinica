import type { FertilizacionHeaderProps as Props } from '../../../interfaces/Fertilizacion';

export default function FertilizacionHeader({
  pacientes,
  selectedPacienteId,
  setSelectedPacienteId,
  onOpenModal,
}: Props) {
  return (
    <div className="mb-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
      <label className="block text-sm font-medium text-gray-700">Seleccionar paciente</label>
      <select
        value={selectedPacienteId ?? ''}
        onChange={(e) => setSelectedPacienteId(Number(e.target.value))}
        className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-black shadow-sm focus:ring-2 focus:ring-blue-300 sm:w-80"
      >
        <option value="">-- Selecciona un paciente --</option>
        {pacientes.map((p) => (
          <option key={p.id} value={p.id}>
            {p.last_name}, {p.first_name}
          </option>
        ))}
      </select>
      {selectedPacienteId && (
        <button
          className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:from-blue-600 hover:to-blue-800"
          onClick={onOpenModal}
        >
          Registrar nueva fertilización
        </button>
      )}
    </div>
  );
}
