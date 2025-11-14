import { useState } from "react";
import HistoryModal from "../../Punciones/components/OvocitoHistoryModal";

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
        <table className="min-w-full border rounded-lg overflow-hidden bg-gray-100 text-xs sm:text-sm">
          <thead className="bg-blue-300">
            <tr>
              <th className="px-2 sm:px-4 py-2 text-left">Identificador</th>
              <th className="px-2 sm:px-4 py-2 text-left">Calidad</th>
              <th className="px-2 sm:px-4 py-2 text-left">Estado</th>
              <th className="px-2 sm:px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {embriones.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No hay embriones agregados.
                </td>
              </tr>
            ) : (
              embriones.map((e) => (
                <tr 
                  key={e.id} 
                  className="border-b text-black hover:bg-blue-50 transition-all duration-100"
                >
                  <td className="px-2 sm:px-4 py-2 font-mono break-all max-w-[120px] sm:max-w-[200px]">
                    {e.identificador}
                  </td>
                  <td className="px-2 sm:px-4 py-2">{e.calidad || 'N/A'}</td>
                  <td className="px-2 sm:px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      e.estado === 'transferido' ? 'bg-green-100 text-green-800' :
                      e.estado === 'criopreservado' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {e.estado}
                    </span>
                  </td>
                  <td className="px-2 sm:px-4 py-2">
                    <button
                      onClick={() => setOpenId(e.id ?? null)}
                      className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
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
        entityIdentificador={openId ? embriones.find(x => x.id === openId)?.identificador : undefined}
        entityType="embrion"
        open={openId !== null}
        onClose={() => setOpenId(null)}
      />
    </>
  );
}