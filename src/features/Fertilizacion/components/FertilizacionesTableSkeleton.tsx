export default function FertilizacionesTableSkeleton() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full rounded-lg border border-gray-400 bg-white shadow">
        <thead className="bg-blue-100">
          <tr>
            <th className="border-b border-gray-400 px-4 py-2 text-left font-semibold text-gray-900">
              Fecha Fertilización
            </th>
            <th className="border-b border-gray-400 px-4 py-2 text-left font-semibold text-gray-900">
              Ovocito
            </th>
            <th className="border-b border-gray-400 px-4 py-2 text-left font-semibold text-gray-900">
              Técnica
            </th>
            <th className="border-b border-gray-400 px-4 py-2 text-left font-semibold text-gray-900">
              Resultado
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(4)].map((_, i) => (
            <tr key={i} className="border-b border-gray-300">
              {[...Array(4)].map((_, j) => (
                <td key={j} className="px-4 py-2">
                  <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
