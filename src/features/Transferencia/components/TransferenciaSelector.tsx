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
  readOnlyTratamiento?: boolean;
}

export default function TransferenciaSelector({
  tratamientos,
  embriones,
  selectedTratamiento,
  selectedEmbriones,
  onTratamientoChange,
  onEmbrionToggle,
  isLoading,
  readOnlyTratamiento = false,
}: TransferenciaSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Selector de Tratamiento */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-800">Tratamiento</label>
        {readOnlyTratamiento ? (
          <div className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-gray-800">
            {(() => {
              const sel = tratamientos.find((t) => t.id === selectedTratamiento);
              return sel ? sel.nombre || `Tratamiento #${sel.id}` : 'Sin tratamiento seleccionado';
            })()}
          </div>
        ) : (
          <select
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-800 disabled:opacity-50"
            value={selectedTratamiento ?? ''}
            onChange={(e) => onTratamientoChange(e.target.value ? Number(e.target.value) : null)}
            disabled={isLoading}
          >
            <option value="">Seleccionar tratamiento...</option>
            {tratamientos.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nombre || `Tratamiento #${t.id}`}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Selector de Embriones */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-800">
          Embriones disponibles
        </label>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {embriones.map((e) => {
            const embrionId = Number(e.id);
            if (!embrionId) return null;

            return (
              <label
                key={e.id}
                className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                  selectedEmbriones.includes(embrionId)
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
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
                  className="h-4 w-4"
                />
              </label>
            );
          })}
          {embriones.length === 0 && (
            <div className="col-span-full rounded-lg bg-gray-50 py-8 text-center text-sm text-gray-600">
              No hay embriones disponibles para esta paciente.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
