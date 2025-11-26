import { useState } from 'react';
import HistoryModal from '../../Punciones/components/OvocitoHistoryModal';

interface Embryo {
  id?: number;
  identificador: string;
  estado: string;
  calidad?: number;
  fecha_modificacion?: string;
}

interface EmbrionesTableProps {
  embriones: Embryo[];
}

export default function EmbrionesTable({ embriones }: EmbrionesTableProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <>
      <div className="mt-2 overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-lg border bg-gray-100 text-xs sm:text-sm">
          <thead className="bg-blue-300">
            <tr>
              <th className="px-2 py-2 text-left sm:px-4">Identificador</th>
              <th className="px-2 py-2 text-left sm:px-4">Calidad</th>
              <th className="px-2 py-2 text-left sm:px-4">Estado</th>
              <th className="px-2 py-2 text-left sm:px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {embriones.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  No hay embriones agregados.
                </td>
              </tr>
            ) : (
              embriones.map((e) => (
                <tr
                  key={e.id}
                  className="border-b text-black transition-all duration-100 hover:bg-blue-50"
                >
                  <td className="max-w-[120px] px-2 py-2 font-mono break-all sm:max-w-[200px] sm:px-4">
                    {e.identificador}
                  </td>
                  <td className="px-2 py-2 sm:px-4">{e.calidad || 'N/A'}</td>
                  <td className="px-2 py-2 sm:px-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        e.estado === 'transferido'
                          ? 'bg-green-100 text-green-800'
                          : e.estado === 'criopreservado'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {e.estado}
                    </span>
                  </td>
                  <td className="px-2 py-2 sm:px-4">
                    <button
                      onClick={() => setOpenId(e.id ?? null)}
                      className="rounded bg-blue-500 px-2 py-1 text-sm text-white hover:bg-blue-600"
                    >
                      Ver historial
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <HistoryModal
        entityId={openId}
        entityIdentificador={
          openId ? embriones.find((x) => x.id === openId)?.identificador : undefined
        }
        entityType="embrion"
        open={openId !== null}
        onClose={() => setOpenId(null)}
      />
    </>
  );
}
