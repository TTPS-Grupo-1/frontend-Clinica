interface Embrion {
  identificador: string;
  calidad?: number;
  estado?: string;
  fecha_fertilizacion?: string;
}
interface Fertilizacion {
  id_fertilizacion: number;
  fecha_fertilizacion: string;
  ovocito: any;
  resultado: string;
  tecnica_icsi?: boolean;
  tecnica_fiv?: boolean;
}

interface Props {
  embriones: Embrion[];
  fertilizaciones: Fertilizacion[];
}

export default function FertilizacionesTable({ embriones, fertilizaciones }: Props) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border rounded-lg shadow">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Fecha Fertilización</th>
            <th className="px-4 py-2 text-left">Ovocito</th>
            <th className="px-4 py-2 text-left">Técnica</th>
            <th className="px-4 py-2 text-left">Resultado</th>
            <th className="px-4 py-2 text-left">Embrión</th>
            <th className="px-4 py-2 text-left">Calidad</th>
            <th className="px-4 py-2 text-left">Estado</th>
          </tr>
        </thead>
        <tbody>
          {fertilizaciones.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-6 text-gray-500">No hay fertilizaciones registradas.</td>
            </tr>
          ) : (
            fertilizaciones.map((f, i) => {
              // Buscar embrión relacionado por ovocito y fecha
              const emb = embriones.find(e => e.fecha_fertilizacion === f.fecha_fertilizacion && e.identificador.includes(f.ovocito?.identificador ?? ""));
              return (
                <tr key={f.id_fertilizacion} className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{f.fecha_fertilizacion}</td>
                  <td className="px-4 py-2">{f.ovocito?.identificador ?? "-"}</td>
                  <td className="px-4 py-2">{f.tecnica_icsi ? "ICSI" : f.tecnica_fiv ? "FIV" : "-"}</td>
                  <td className="px-4 py-2">{f.resultado === "exitosa" ? <span className="text-green-600 font-semibold">Exitosa</span> : <span className="text-red-500 font-semibold">No exitosa</span>}</td>
                  <td className="px-4 py-2">{emb ? emb.identificador : <span className="text-gray-400">-</span>}</td>
                  <td className="px-4 py-2">{emb?.calidad ?? "-"}</td>
                  <td className="px-4 py-2">{emb?.estado ?? "-"}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
