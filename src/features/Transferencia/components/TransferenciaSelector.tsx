import type { Tratamiento } from '../../../interfaces/Transferencia';
import type { Embryo } from '../../../types/Embryo';

interface TransferenciaSelectorProps {
  tratamientos: Tratamiento[];
  embriones: Embryo[];
  selectedTratamiento: number | null;
  selectedEmbriones: number[];
  onTratamientoChange: (tratamientoId: number | null) => void;
  onEmbrionToggle: (embrionId: number) => void;
  isLoading: boolean;
}

export default function TransferenciaSelector({
  tratamientos,
  embriones,
  selectedTratamiento,
  selectedEmbriones,
  onTratamientoChange,
  onEmbrionToggle,
  isLoading
}: TransferenciaSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Selector de Tratamiento */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Tratamiento
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 bg-white disabled:opacity-50"
          value={selectedTratamiento ?? ''}
          onChange={(e) => onTratamientoChange(e.target.value ? Number(e.target.value) : null)}
          disabled={isLoading}
        >
          <option value="">Seleccionar tratamiento...</option>
          {tratamientos.map(t => (
            <option key={t.id} value={t.id}>
              {t.nombre || `Tratamiento #${t.id}`}
            </option>
          ))}
        </select>
      </div>

      {/* Selector de Embriones */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Embriones disponibles
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {embriones.map(e => {
            const embrionId = Number(e.id);
            if (!embrionId) return null;
            
            return (
              <label 
                key={e.id} 
                className={`border rounded-lg p-3 flex items-center justify-between cursor-pointer transition-colors ${
                  selectedEmbriones.includes(embrionId) 
                    ? 'bg-blue-50 border-blue-400' 
                    : 'bg-white border-gray-300 hover:border-gray-400'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div>
                  <div className="font-medium text-gray-800">{e.identificador}</div>
                  <div className="text-xs text-gray-600">
                    Estado: {e.estado || 'N/A'} - Calidad: {e.calidad ?? 'N/A'}
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={selectedEmbriones.includes(embrionId)} 
                  onChange={() => onEmbrionToggle(embrionId)}
                  disabled={isLoading}
                  className="w-4 h-4"
                />
              </label>
            );
          })}
          {embriones.length === 0 && (
            <div className="text-sm text-gray-600 col-span-full text-center py-8 bg-gray-50 rounded-lg">
              No hay embriones disponibles para esta paciente.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}