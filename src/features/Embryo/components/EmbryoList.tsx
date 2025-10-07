import type { EmbryoListProps } from "../../../interfaces/Embryo";

export default function EmbryoList({ embryos }: EmbryoListProps) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Listado de Embriones</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black rounded shadow">
          <thead>
            <tr className="bg-black-100">
              <th className="px-3 py-2 text-left">Identificador</th>
              <th className="px-3 py-2 text-left">Calidad</th>
              <th className="px-3 py-2 text-left">POT</th>
              <th className="px-3 py-2 text-left">Estado</th>
              <th className="px-3 py-2 text-left">Causa de descarte</th>
              <th className="px-3 py-2 text-left">Ovocito</th>
              <th className="px-3 py-2 text-left">Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {embryos.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-gray-500 text-center py-4">No hay embriones registrados para el paciente seleccionado.</td>
              </tr>
            ) : (
              embryos.map((embryo) => (
                <tr key={embryo.id} className="border-b last:border-b-0">
                  <td className="px-3 py-2">{embryo.id}</td>
                  <td className="px-3 py-2">{embryo.calidad}</td>
                  <td className="px-3 py-2">{embryo.pot}</td>
                  <td className="px-3 py-2">{embryo.estado}</td>
                  <td className="px-3 py-2">{embryo.causaDescarte}</td>
                  <td className="px-3 py-2">{embryo.ovocito}</td>
                  <td className="px-3 py-2">{embryo.observaciones}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}