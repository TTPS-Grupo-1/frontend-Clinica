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
          {fertilizaciones.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-700 bg-white">No hay fertilizaciones registradas.</td>
            </tr>
          ) : (
            fertilizaciones.map((f, i) => (
              <tr key={f.id_fertilizacion} className="hover:bg-blue-50 transition-colors text-black border-b border-gray-300">
                <td className="px-4 py-2">{f.fecha_fertilizacion}</td>
                <td className="px-4 py-2">{
                  f.ovocito?.identificador
                    ? f.ovocito.identificador
                    : (typeof f.ovocito === "number" ? `ID: ${f.ovocito}` : "-")
                }</td>
                <td className="px-4 py-2">{f.tecnica_icsi ? "ICSI" : f.tecnica_fiv ? "FIV" : "-"}</td>
                <td className="px-4 py-2">{f.resultado === "exitosa" ? <span className="text-green-600 font-semibold">Exitosa</span> : <span className="text-red-500 font-semibold">No exitosa</span>}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
