import type { MedicoListProps } from "../../../interfaces/Medico";
import type { Medico } from "../../../types/Medico";
import toast from "react-hot-toast";

export default function MedicoList({ medicos, onEliminar }: MedicoListProps & { onEliminar?: (medico: Medico) => void }) {
  const handleEliminar = (medico: Medico) => {
    toast((t) => (
      <span className="text-black">
        ¿Seguro que quieres eliminar a <b>{medico.nombre} {medico.apellido}</b>?
        <div className="mt-2 flex gap-2">
          <button
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => {
              toast.dismiss(t.id);
              if (onEliminar) onEliminar(medico);
            }}
          >Sí, eliminar</button>
          <button
            className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
            onClick={() => toast.dismiss(t.id)}
          >Cancelar</button>
        </div>
      </span>
    ), { duration: 6000 });
  };
  return (
    <div className="mb-12 w-full max-w-5xl">
      <h2 className="text-lg font-semibold mb-4 text-white">Listado de Médicos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 rounded shadow">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-3 py-2 text-left text-gray-200">Nombre</th>
              <th className="px-3 py-2 text-left text-gray-200">Apellido</th>
              <th className="px-3 py-2 text-left text-gray-200">DNI</th>
              <th className="px-3 py-2 text-left text-gray-200">Email</th>
              <th className="px-3 py-2 text-left text-gray-200">Teléfono</th>
              <th className="px-3 py-2 text-left text-gray-200">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medicos.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-gray-400 text-center py-4 bg-gray-900">No hay médicos registrados.</td>
              </tr>
            ) : (
              medicos.map((medico) => (
                <tr key={medico.dni} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-800">
                  <td className="px-3 py-2 text-gray-100">{medico.nombre}</td>
                  <td className="px-3 py-2 text-gray-100">{medico.apellido}</td>
                  <td className="px-3 py-2 text-gray-100">{medico.dni}</td>
                  <td className="px-3 py-2 text-gray-100">{medico.email}</td>
                  <td className="px-3 py-2 text-gray-100">{medico.telefono}</td>
                  <td className="px-3 py-2">
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      onClick={() => handleEliminar(medico)}
                    >Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
