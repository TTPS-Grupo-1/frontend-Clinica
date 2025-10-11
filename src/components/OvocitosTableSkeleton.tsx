export default function OvocitosTableSkeleton({ rows = 4 }: { rows?: number }) {
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
        {Array.from({ length: rows }).map((_, idx) => (
          <tr key={idx} className="border-b text-black">
            <td className="px-4 py-2"><div className="h-4 w-56 bg-gray-300 animate-pulse rounded" /></td>
            <td className="px-4 py-2"><div className="h-8 w-36 bg-gray-300 animate-pulse rounded" /></td>
            <td className="px-4 py-2 text-center"><div className="h-5 w-5 bg-gray-300 animate-pulse rounded" /></td>
            <td className="px-4 py-2 text-center"><div className="h-5 w-5 bg-gray-300 animate-pulse rounded" /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
