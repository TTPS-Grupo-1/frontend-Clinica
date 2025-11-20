import type { OvocitoModalRow } from '../types/Ovocito';
export default function OvocitosTable({ ovocitos }: { ovocitos: OvocitoModalRow[] }) {
  return (
    <table className="min-w-full overflow-hidden rounded-lg border bg-gray-100">
      <thead className="bg-blue-300">
        <tr>
          <th className="px-4 py-1 text-left">Identificador</th>
          <th className="px-4 py-1 text-left">Madurez</th>
          <th className="px-4 py-1 text-left">Estado</th>
        </tr>
      </thead>
      <tbody>
        {ovocitos.length === 0 ? (
          <tr>
            <td colSpan={3} className="py-4 text-center text-gray-500">
              No hay ovocitos registrados.
            </td>
          </tr>
        ) : (
          ovocitos
            .filter((o) => o && o.identificador)
            .map((o) => (
              <tr key={o.identificador} className="border-b text-black">
                <td className="px-4 py-1">{o.identificador}</td>
                <td className="px-4 py-1">{o.madurez}</td>
                <td className="px-4 py-1">{o.tipo_estado}</td>
              </tr>
            ))
        )}
      </tbody>
    </table>
  );
}
