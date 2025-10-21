export default function FertilizacionesTableSkeleton() {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border border-gray-400 rounded-lg shadow">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-2 text-left text-gray-900 font-semibold border-b border-gray-400">Fecha Fertilización</th>
            <th className="px-4 py-2 text-left text-gray-900 font-semibold border-b border-gray-400">Ovocito</th>
            <th className="px-4 py-2 text-left text-gray-900 font-semibold border-b border-gray-400">Técnica</th>
            <th className="px-4 py-2 text-left text-gray-900 font-semibold border-b border-gray-400">Resultado</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(4)].map((_, i) => (
            <tr key={i} className="border-b border-gray-300">
              {[...Array(4)].map((_, j) => (
                <td key={j} className="px-4 py-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
