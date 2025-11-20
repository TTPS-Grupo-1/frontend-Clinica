interface Fertilizacion {
  id_fertilizacion: number;
  fecha_fertilizacion: string;
  ovocito: any;
  resultado: string;
  tecnica_icsi?: boolean;
  tecnica_fiv?: boolean;
}

interface Props {
  fertilizaciones: Fertilizacion[];
}

export default function FertilizacionesTable({ fertilizaciones }: Props) {
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
          {fertilizaciones.length === 0 ? (
            <tr>
              <td colSpan={5} className="bg-white py-6 text-center text-gray-700">
                No hay fertilizaciones registradas.
              </td>
            </tr>
          ) : (
            fertilizaciones.map((f, i) => (
              <tr
                key={f.id_fertilizacion}
                className="border-b border-gray-300 text-black transition-colors hover:bg-blue-50"
              >
                <td className="px-4 py-2">{f.fecha_fertilizacion}</td>
                <td className="px-4 py-2">
                  {f.ovocito?.identificador
                    ? f.ovocito.identificador
                    : typeof f.ovocito === 'number'
                      ? `ID: ${f.ovocito}`
                      : '-'}
                </td>
                <td className="px-4 py-2">
                  {f.tecnica_icsi ? 'ICSI' : f.tecnica_fiv ? 'FIV' : '-'}
                </td>
                <td className="px-4 py-2">
                  {f.resultado === 'exitosa' ? (
                    <span className="font-semibold text-green-600">Exitosa</span>
                  ) : (
                    <span className="font-semibold text-red-500">No exitosa</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
