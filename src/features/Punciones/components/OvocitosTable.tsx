import React, { useState } from 'react';
import type { OvocitoModalRow } from '../../../types/Ovocito';
import HistoryModal from './OvocitoHistoryModal';

export default function OvocitosTable({ ovocitos }: { ovocitos: OvocitoModalRow[] }) {
  const [openId, setOpenId] = useState<number | null>(null);
  return (
    <div className="mt-2 overflow-x-auto">
      <table className="min-w-full overflow-hidden rounded-lg border bg-gray-100 text-xs sm:text-sm">
        <thead className="bg-blue-300">
          <tr>
            <th className="px-2 py-2 text-left sm:px-4">Identificador</th>
            <th className="px-2 py-2 text-left sm:px-4">Madurez</th>
            <th className="px-2 py-2 text-left sm:px-4">Estado</th>
            <th className="px-2 py-2 text-left sm:px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ovocitos.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-4 text-center text-gray-500">
                No hay ovocitos agregados.
              </td>
            </tr>
          ) : (
            ovocitos.map((o) => (
              <tr
                key={o.identificador}
                className="border-b text-black transition-all duration-100 hover:bg-blue-50"
              >
                <td className="max-w-[120px] px-2 py-2 font-mono break-all sm:max-w-[200px] sm:px-4">
                  {o.identificador}
                </td>
                <td className="px-2 py-2 sm:px-4">{o.madurez}</td>
                <td className="px-2 py-2 sm:px-4">{o.tipo_estado}</td>
                <td className="px-2 py-2 sm:px-4">
                  <button
                    onClick={() => setOpenId(o.id_ovocito ?? null)}
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

      <HistoryModal
        entityId={openId}
        entityIdentificador={
          openId ? ovocitos.find((x) => x.id_ovocito === openId)?.identificador : undefined
        }
        entityType="ovocito" // ✅ Especificar que es ovocito
        open={openId !== null}
        onClose={() => setOpenId(null)}
      />
    </div>
  );
}
