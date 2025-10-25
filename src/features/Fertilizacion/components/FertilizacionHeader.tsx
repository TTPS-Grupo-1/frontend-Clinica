import type { FertilizacionHeaderProps as Props} from "../../../interfaces/Fertilizacion";



export default function FertilizacionHeader({ pacientes, selectedPacienteId, setSelectedPacienteId, onOpenModal }: Props) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-2 items-center justify-center">
      <label className="block text-sm font-medium text-gray-700">Seleccionar paciente</label>
      <select
        value={selectedPacienteId ?? ""}
        onChange={e => setSelectedPacienteId(Number(e.target.value))}
        className="border border-gray-300 rounded px-3 py-2 w-full sm:w-80 bg-white focus:ring-2 text-black focus:ring-blue-300 shadow-sm"
      >
        <option value="">-- Selecciona un paciente --</option>
        {pacientes.map(p => (
          <option key={p.id} value={p.id}>{p.last_name}, {p.first_name}</option>
        ))}
      </select>
      {selectedPacienteId && (
        <button
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl shadow-lg hover:scale-105 hover:from-blue-600 hover:to-blue-800 transition-all font-semibold"
          onClick={onOpenModal}
        >
          Registrar nueva fertilización
        </button>
      )}
    </div>
  );
}
