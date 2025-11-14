import React, { useState } from "react";
import type { OvocitoModalRow } from "../../../types/Ovocito";
import HistoryModal from "./OvocitoHistoryModal";

export default function OvocitosTable({ ovocitos }: { ovocitos: OvocitoModalRow[] }) {
  const [openId, setOpenId] = useState<number | null>(null);
  return (
    <div className="mt-2 overflow-x-auto">
      <table className="min-w-full border rounded-lg overflow-hidden bg-gray-100 text-xs sm:text-sm">
        <thead className="bg-blue-300">
          <tr>
            <th className="px-2 sm:px-4 py-2 text-left">Identificador</th>
            <th className="px-2 sm:px-4 py-2 text-left">Madurez</th>
            <th className="px-2 sm:px-4 py-2 text-left">Estado</th>
            <th className="px-2 sm:px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ovocitos.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">No hay ovocitos agregados.</td>
            </tr>
          ) : (
            ovocitos.map((o) => (
              <tr key={o.identificador} className="border-b text-black hover:bg-blue-50 transition-all duration-100">
                <td className="px-2 sm:px-4 py-2 font-mono break-all max-w-[120px] sm:max-w-[200px]">{o.identificador}</td>
                <td className="px-2 sm:px-4 py-2">{o.madurez}</td>
                <td className="px-2 sm:px-4 py-2">{o.tipo_estado}</td>
                <td className="px-2 sm:px-4 py-2">
                  <button
                    onClick={() => setOpenId(o.id_ovocito ?? null)}
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

      <HistoryModal
        entityId={openId}
        entityIdentificador={openId ? ovocitos.find(x => x.id_ovocito === openId)?.identificador : undefined}
        entityType="ovocito" // ✅ Especificar que es ovocito
        open={openId !== null}
        onClose={() => setOpenId(null)}
      />
    </div>
  );
}
