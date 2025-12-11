import type { OvocitoModalRow } from '../../../types/Ovocito';

export default function OvocitosTableSimple({ ovocitos }: { ovocitos: OvocitoModalRow[] }) {
  return (
    <div className="mt-2 overflow-x-auto">
      <table className="min-w-full overflow-hidden rounded-lg border bg-gray-100 text-xs sm:text-sm">
        <thead className="bg-pink-300">
          <tr>
            <th className="px-2 py-2 text-left sm:px-4">Identificador</th>
            <th className="px-2 py-2 text-left sm:px-4">Madurez</th>
            <th className="px-2 py-2 text-left sm:px-4">Estado</th>
          </tr>
        </thead>
        <tbody>
          {ovocitos.length === 0 ? (
            <tr>
              <td colSpan={3} className="py-4 text-center text-gray-500">
                No hay ovocitos agregados.
              </td>
            </tr>
          ) : (
            ovocitos.map((o) => (
              <tr
                key={o.identificador}
                className="border-b text-black transition-all duration-100 hover:bg-pink-50"
              >
                <td className="max-w-[120px] px-2 py-2 font-mono break-all sm:max-w-[200px] sm:px-4">
                  {o.identificador}
                </td>
                <td className="px-2 py-2 sm:px-4">{o.madurez}</td>
                <td className="px-2 py-2 sm:px-4">{o.tipo_estado}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
