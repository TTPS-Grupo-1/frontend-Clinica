import type { OvocitosTableProps } from "../../../interfaces/Ovocitos";

export default function OvocitosTable({
  ovocitos,
  onEstadoChange,
  onCriopreservarChange,
  onDescartadoChange,
}: OvocitosTableProps) {
  return (
    <table className="min-w-full border rounded-lg overflow-hidden bg-gray-100">
      <thead className="bg-blue-300">
        <tr>
          <th className="px-4 py-2 text-left">Identificador</th>
          <th className="px-4 py-2 text-left">Estado</th>
          <th className="px-4 py-2 text-left">Criopreservar</th>
          <th className="px-4 py-2 text-left">Descartado</th>
        </tr>
      </thead>
      <tbody>
        {ovocitos.map((ovocito) => (
          <tr key={ovocito.identificador_ovocito} className="border-b text-black">
            <td className="px-4 py-2">{ovocito.identificador_ovocito}</td>
            <td className="px-4 py-2">
              <select
                value={ovocito.estado}
                onChange={e =>
                  onEstadoChange?.(ovocito.identificador_ovocito, e.target.value as EstadoOvocito)
                }
                className="border text-black rounded px-2 py-1"
              >
                <option value="muy inmaduro">Muy inmaduro</option>
                <option value="maduro">Maduro</option>
                <option value="inmaduro">Inmaduro</option>
              </select>
            </td>
            <td className="px-4 py-2  text-center">
              <input
                type="checkbox"
                checked={ovocito.criopreservar}
                onChange={e =>
                  onCriopreservarChange?.(ovocito.identificador_ovocito, e.target.checked)
                }
              />
            </td>
            <td className="px-4 py-2 text-center">
              <input
                type="checkbox"
                checked={ovocito.descartado}
                onChange={e =>
                  onDescartadoChange?.(ovocito.identificador_ovocito, e.target.checked)
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
