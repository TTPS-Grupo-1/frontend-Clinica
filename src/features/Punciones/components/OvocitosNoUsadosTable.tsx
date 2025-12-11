import { useState } from 'react';
import type { Ovocito } from '@/types/Ovocito';
import EditOvocitoModal from './EditOvocitoModal';
import HistoryModal from './OvocitoHistoryModal';

interface OvocitosNoUsadosTableProps {
  ovocitos: Ovocito[];
  onUpdate?: () => void;
}

export default function OvocitosNoUsadosTable({ ovocitos, onUpdate }: OvocitosNoUsadosTableProps) {
  const [editingOvocito, setEditingOvocito] = useState<Ovocito | null>(null);
  const [historyOvocitoId, setHistoryOvocitoId] = useState<number | null>(null);

  const handleEdit = (ovocito: Ovocito) => {
    setEditingOvocito(ovocito);
  };

  const handleCloseEdit = () => {
    setEditingOvocito(null);
  };

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate();
    }
    setEditingOvocito(null);
  };

  return (
    <>
      <div className="mt-2 overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-lg border bg-gray-100 text-xs sm:text-sm">
          <thead className="bg-cyan-300">
            <tr>
              <th className="px-2 py-2 text-left sm:px-4">ID</th>
              <th className="px-2 py-2 text-left sm:px-4">Identificador</th>
              <th className="px-2 py-2 text-left sm:px-4">Madurez</th>
              <th className="px-2 py-2 text-left sm:px-4">Estado</th>
              <th className="px-2 py-2 text-left sm:px-4">Fecha Extracción</th>
              <th className="px-2 py-2 text-left sm:px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ovocitos.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-500">
                  No hay ovocitos no usados.
                </td>
              </tr>
            ) : (
              ovocitos.map((o) => {
                // Editable si es fresco o criopreservado, pero NO si está descartado
                const isEditable = o.tipo_estado === 'fresco' || o.tipo_estado === 'criopreservado';
                
                return (
                  <tr
                    key={o.id_ovocito}
                    className={`border-b text-black transition-all duration-100 hover:bg-cyan-50 ${
                      !isEditable ? 'opacity-60' : ''
                    }`}
                  >
                    <td className="px-2 py-2 sm:px-4">{o.id_ovocito}</td>
                    <td className="max-w-[120px] px-2 py-2 font-mono break-all sm:max-w-[200px] sm:px-4">
                      {o.identificador}
                    </td>
                    <td className="px-2 py-2 sm:px-4">{o.madurez || '-'}</td>
                    <td className="px-2 py-2 sm:px-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          o.tipo_estado === 'fresco'
                            ? 'bg-green-100 text-green-800'
                            : o.tipo_estado === 'criopreservado'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {o.tipo_estado || '-'}
                      </span>
                    </td>
                    <td className="px-2 py-2 sm:px-4">
                      {o.fecha_extraccion
                        ? new Date(o.fecha_extraccion).toLocaleDateString('es-AR')
                        : '-'}
                    </td>
                    <td className="px-2 py-2 sm:px-4">
                      <div className="flex gap-2">
                        {isEditable ? (
                          <button
                            onClick={() => handleEdit(o)}
                            className="rounded bg-rose-500 px-2 py-1 text-sm text-white hover:bg-rose-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                          >
                            Editar
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400">No editable</span>
                        )}
                        <button
                          onClick={() => setHistoryOvocitoId(o.id_ovocito)}
                          className="rounded bg-blue-500 px-2 py-1 text-sm text-white hover:bg-blue-600"
                        >
                          Ver historial
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <EditOvocitoModal
        open={editingOvocito !== null}
        onClose={handleCloseEdit}
        ovocito={editingOvocito}
        onUpdate={handleUpdate}
      />

      <HistoryModal
        entityId={historyOvocitoId}
        entityIdentificador={
          historyOvocitoId ? ovocitos.find((x) => x.id_ovocito === historyOvocitoId)?.identificador : undefined
        }
        entityType="ovocito"
        open={historyOvocitoId !== null}
        onClose={() => setHistoryOvocitoId(null)}
      />
    </>
  );
}
