import React from 'react';

interface Monitoreo {
  id: number;
  fecha_realizado: string;
  descripcion: string;
}

interface MonitoreoTableProps {
  monitoreos: Monitoreo[];
}

export default function MonitoreoTable({ monitoreos }: MonitoreoTableProps) {
  return (
    <div className="mt-2 overflow-x-auto">
      <table className="min-w-full overflow-hidden rounded-lg border bg-gray-100 text-xs sm:text-sm">
        <thead className="bg-blue-300">
          <tr>
            <th className="px-2 py-2 text-left sm:px-4">Fecha</th>
            <th className="px-2 py-2 text-left sm:px-4">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {monitoreos.length === 0 ? (
            <tr>
              <td colSpan={2} className="py-4 text-center text-gray-500">
                No hay monitoreos registrados.
              </td>
            </tr>
          ) : (
            monitoreos.map((m) => (
              <tr
                key={m.id}
                className="border-b text-black transition-all duration-100 hover:bg-blue-50"
              >
                <td className="px-2 py-2 sm:px-4">
                  {m.fecha_realizado ? new Date(m.fecha_realizado).toLocaleDateString() : '-'}
                </td>
                <td className="px-2 py-2 sm:px-4">{m.descripcion || '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}