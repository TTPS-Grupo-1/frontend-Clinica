import { useHistorialEmbrionFetch } from "../../../../shared/hooks/useHistorialEmbrionFetch";

interface EmbrionHistoryModalProps {
  embrionId: number | null;
  embrionIdentificador?: string;
  open: boolean;
  onClose: () => void;
}

export default function EmbrionHistoryModal({
  embrionId,
  embrionIdentificador,
  open,
  onClose,
}: EmbrionHistoryModalProps) {
  const { historial, loading, error } = useHistorialEmbrionFetch(embrionId);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            Historial de {embrionIdentificador || `Embrión #${embrionId}`}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
            </div>
          )}

          {error && (
            <div className="text-red-500 bg-red-50 p-4 rounded-lg">
              Error al cargar historial: {String(error)}
            </div>
          )}

          {!loading && !error && historial.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              No hay historial registrado para este embrión.
            </p>
          )}

          {!loading && !error && historial.length > 0 && (
            <div className="space-y-4">
              {historial.map((registro) => (
                <div
                  key={registro.id}
                  className="border-l-4 border-cyan-500 pl-4 py-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-wrap gap-2">
                      <span className="font-semibold text-gray-900">
                        {registro.tipo_modificacion}
                      </span>
                      <span className="px-2 py-1 bg-cyan-100 text-cyan-800 text-xs rounded-full">
                        {registro.estado}
                      </span>
                      {registro.calidad && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Calidad: {registro.calidad}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(registro.fecha_modificacion).toLocaleString()}
                    </span>
                  </div>
                  {registro.observaciones && (
                    <p className="text-sm text-gray-600 mt-2">
                      {registro.observaciones}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}