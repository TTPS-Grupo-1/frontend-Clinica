import React from "react";
import type { OvocitoModalRow } from "../../../types/Ovocito";

export default function OvocitosTable({ ovocitos }: { ovocitos: OvocitoModalRow[] }) {
  return (
    <div className="mt-2 overflow-x-auto">
      <table className="min-w-full border rounded-lg overflow-hidden bg-gray-100 text-xs sm:text-sm">
        <thead className="bg-blue-300">
          <tr>
            <th className="px-2 sm:px-4 py-2 text-left">Identificador</th>
            <th className="px-2 sm:px-4 py-2 text-left">Madurez</th>
            <th className="px-2 sm:px-4 py-2 text-left">Estado</th>
          </tr>
        </thead>
        <tbody>
          {ovocitos.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-500">No hay ovocitos agregados.</td>
            </tr>
          ) : (
            ovocitos.map((o) => (
              <tr key={o.identificador} className="border-b text-black hover:bg-blue-50 transition-all duration-100">
                <td className="px-2 sm:px-4 py-2 font-mono break-all max-w-[120px] sm:max-w-[200px]">{o.identificador}</td>
                <td className="px-2 sm:px-4 py-2">{o.madurez}</td>
                <td className="px-2 sm:px-4 py-2">{o.tipo_estado}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
