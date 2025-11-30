import { useHistorialOvocitoFetch } from '../../../shared/hooks/useHistorialOvocitoFetch';
import { useHistorialEmbrionFetch } from '../../../shared/hooks/useHistorialEmbrionFetch';
import OvocitoStateDiagram from './OvocitoStateDiagram';
import { useState } from 'react';
import type { HistoryModalProps } from '@/interfaces/Ovocito';

export default function HistoryModal({
  entityId,
  entityIdentificador,
  entityType,
  open,
  onClose,
}: HistoryModalProps) {
  const [selectedEstado, setSelectedEstado] = useState<string | null>(null);

  const ovocitoData = useHistorialOvocitoFetch(entityType === 'ovocito' ? entityId : null);
  const embrionData = useHistorialEmbrionFetch(entityType === 'embrion' ? entityId : null);

  const { historial, loading, error } = entityType === 'ovocito' ? ovocitoData : embrionData;
  const entityName = entityType === 'ovocito' ? 'Ovocito' : 'Embrión';

  if (!open) return null;

  // Transformar datos para el diagrama
  const diagramData = historial.map((h: any) => ({
    id: h.id,
    estado: h.estado,
    fecha: h.fecha_modificacion || h.fecha,
    nota: h.observaciones || h.nota,
    usuario_rep: h.usuario_nombre || h.usuario_rep,
  }));

  // Filtrar por estado seleccionado
  const filteredHistorial = selectedEstado
    ? historial.filter((h: any) => h.estado === selectedEstado)
    : historial;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 p-4 pt-20 backdrop-blur-sm">
      <div className="max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-cyan-600 to-cyan-700 px-6 py-4">
          <h2 className="text-xl font-bold text-white">
            Historial de {entityIdentificador || `${entityName} #${entityId}`}
          </h2>
          <button onClick={onClose} className="text-2xl font-bold text-white hover:text-gray-200">
            ×
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-140px)] overflow-y-auto p-6">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-cyan-600"></div>
            </div>
          )}

          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-red-500">
              Error al cargar historial: {String(error)}
            </div>
          )}

          {!loading && !error && historial.length === 0 && (
            <p className="py-8 text-center text-gray-500">
              No hay historial registrado para este {entityName.toLowerCase()}.
            </p>
          )}

          {!loading && !error && historial.length > 0 && (
            <>
              {/* Diagrama de flujo */}
              <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <h3 className="mb-3 text-lg font-semibold text-gray-800">Diagrama de Estados</h3>
                <OvocitoStateDiagram
                  historial={diagramData}
                  onNodeClick={(estado) =>
                    setSelectedEstado(estado === selectedEstado ? null : estado)
                  }
                />
                {selectedEstado && (
                  <div className="mt-2 text-sm text-gray-600">
                    Filtrando por estado: <strong>{selectedEstado}</strong>
                    <button
                      onClick={() => setSelectedEstado(null)}
                      className="ml-2 text-cyan-600 underline hover:text-cyan-700"
                    >
                      Ver todos
                    </button>
                  </div>
                )}
              </div>

              {/* Lista de historial */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Detalle del Historial</h3>
                {filteredHistorial.map((registro: any) => (
                  <div
                    key={registro.id}
                    className="rounded border-l-4 border-cyan-500 bg-gray-50 py-3 pl-4 transition-colors hover:bg-gray-100"
                  >
                    <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                      <div className="flex flex-wrap gap-2">
                        <span className="font-semibold text-gray-900">
                          {registro.tipo_modificacion || registro.estado}
                        </span>
                        <span className="rounded-full bg-cyan-100 px-2 py-1 text-xs text-cyan-800">
                          {registro.estado}
                        </span>
                        {registro.calidad && (
                          <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                            Calidad: {registro.calidad}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(registro.fecha_modificacion || registro.fecha).toLocaleString()}
                      </span>
                    </div>
                    {(registro.observaciones || registro.nota) && (
                      <p className="mt-2 text-sm text-gray-600">
                        {registro.observaciones || registro.nota}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t bg-gray-50 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-md bg-gray-600 px-6 py-2 text-white transition-colors hover:bg-gray-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
