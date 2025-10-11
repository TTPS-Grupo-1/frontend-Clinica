import type { OvocitoModalRow } from "../types/Ovocito";
export default function OvocitosTable({ ovocitos }: { ovocitos: OvocitoModalRow[] }) {
  return (
    <table className="min-w-full border rounded-lg overflow-hidden bg-gray-100">
      <thead className="bg-blue-300">
        <tr>
          <th className="px-4 py-2 text-left">Identificador</th>
          <th className="px-4 py-2 text-left">Estado</th>
          <th className="px-4 py-2 text-left">Cripreservado</th>
          <th className="px-4 py-2 text-left">Descartado</th>
        </tr>
      </thead>
      <tbody>
        {ovocitos.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center py-4 text-gray-500">No hay ovocitos registrados.</td>
          </tr>
        ) : (
          ovocitos.map((o) => (
            <tr key={o.identificador} className="border-b text-black">
              <td className="px-4 py-2">{o.identificador}</td>
              <td className="px-4 py-2">{o.estado}</td>
              <td className="px-4 py-2 text-center">{o.cripreservar ? "Sí" : "No"}</td>
              <td className="px-4 py-2 text-center">{o.descartado ? "Sí" : "No"}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
