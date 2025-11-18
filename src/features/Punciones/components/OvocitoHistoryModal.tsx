import { useHistorialOvocitoFetch } from "../../../shared/hooks/useHistorialOvocitoFetch";
import { useHistorialEmbrionFetch } from "../../../shared/hooks/useHistorialEmbrionFetch";
import OvocitoStateDiagram from "./OvocitoStateDiagram";
import { useState } from "react";

interface HistoryModalProps {
  entityId: number | null;
  entityIdentificador?: string;
  entityType: "ovocito" | "embrion";
  open: boolean;
  onClose: () => void;
}

export default function HistoryModal({
  entityId,
  entityIdentificador,
  entityType,
  open,
  onClose,
}: HistoryModalProps) {
  const [selectedEstado, setSelectedEstado] = useState<string | null>(null);
  
  const ovocitoData = useHistorialOvocitoFetch(entityType === "ovocito" ? entityId : null);
  const embrionData = useHistorialEmbrionFetch(entityType === "embrion" ? entityId : null);
  
  const { historial, loading, error } = entityType === "ovocito" ? ovocitoData : embrionData;
  const entityName = entityType === "ovocito" ? "Ovocito" : "Embrión";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            Historial de {entityIdentificador || `${entityName} #${entityId}`}
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-200 text-2xl font-bold">
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
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
              No hay historial registrado para este {entityName.toLowerCase()}.
            </p>
          )}

          {!loading && !error && historial.length > 0 && (
            <>
              {/* Diagrama de flujo */}
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Diagrama de Estados
                </h3>
                <OvocitoStateDiagram 
                  historial={diagramData} 
                  onNodeClick={(estado) => setSelectedEstado(estado === selectedEstado ? null : estado)}
                />
                {selectedEstado && (
                  <div className="mt-2 text-sm text-gray-600">
                    Filtrando por estado: <strong>{selectedEstado}</strong>
                    <button
                      onClick={() => setSelectedEstado(null)}
                      className="ml-2 text-cyan-600 hover:text-cyan-700 underline"
                    >
                      Ver todos
                    </button>
                  </div>
                )}
              </div>

              {/* Lista de historial */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Detalle del Historial
                </h3>
                {filteredHistorial.map((registro: any) => (
                  <div
                    key={registro.id}
                    className="border-l-4 border-cyan-500 pl-4 py-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                      <div className="flex flex-wrap gap-2">
                        <span className="font-semibold text-gray-900">
                          {registro.tipo_modificacion || registro.estado}
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
                        {new Date(registro.fecha_modificacion || registro.fecha).toLocaleString()}
                      </span>
                    </div>
                    {(registro.observaciones || registro.nota) && (
                      <p className="text-sm text-gray-600 mt-2">
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
        <div className="bg-gray-50 px-6 py-4 flex justify-end border-t">
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
