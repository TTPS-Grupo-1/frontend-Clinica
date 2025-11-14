import { useState } from "react";
import EmbrionHistoryModal from "./History/EmbrionHistoryModal";

// ✅ Definir la interfaz aquí mismo
interface Embryo {
  id?: number;
  identificador: string;
  estado: string;
  calidad?: string;
  fecha_creacion?: string;
}

interface EmbrionesTableProps {
  embriones: Embryo[];
  onVerEmbrion?: (embrionId: number) => void;
}

export default function EmbrionesTable({ embriones, onVerEmbrion }: EmbrionesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [openHistorialId, setOpenHistorialId] = useState<number | null>(null);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(embriones.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmbriones = embriones.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Embriones Registrados</h3>
        
        {embriones.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No hay embriones registrados para este paciente.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Identificador
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Calidad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha Creación
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentEmbriones.map((embrion) => (
                    <tr key={embrion.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {embrion.identificador}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          embrion.estado === 'transferido' ? 'bg-green-100 text-green-800' :
                          embrion.estado === 'criopreservado' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {embrion.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {embrion.calidad || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {embrion.fecha_creacion ? new Date(embrion.fecha_creacion).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex justify-center gap-2">
                          {onVerEmbrion && (
                            <button
                              onClick={() => onVerEmbrion(embrion.id!)}
                              className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors text-xs"
                            >
                              Ver Embrión
                            </button>
                          )}
                          <button
                            onClick={() => setOpenHistorialId(embrion.id!)}
                            className="bg-cyan-600 text-white px-3 py-1.5 rounded-md hover:bg-cyan-700 transition-colors text-xs"
                          >
                            Ver Historial
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="mt-4 flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300"
                >
                  Anterior
                </button>
                <span className="px-4 py-2 text-gray-700">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <EmbrionHistoryModal
        embrionId={openHistorialId}
        embrionIdentificador={
          openHistorialId
            ? embriones.find((e) => e.id === openHistorialId)?.identificador
            : undefined
        }
        open={openHistorialId !== null}
        onClose={() => setOpenHistorialId(null)}
      />
    </>
  );
}