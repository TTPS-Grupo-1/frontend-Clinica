import type { MedicoListProps } from "../../../interfaces/Medico";
import { useState } from "react";
import type { Medico } from "../../../types/Medico";
import toast from "react-hot-toast";
import Pagination from "../../../components/Pagination";
import { useNavigate } from "react-router-dom";

export default function MedicoList({ medicos, onEliminar }: MedicoListProps & { onEliminar?: (medico: Medico) => void }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
    
  const totalPages = Math.ceil(medicos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMedicos = medicos.slice(startIndex, startIndex + itemsPerPage);
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
            {currentMedicos.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-gray-400 text-center py-4 bg-gray-900">No hay médicos registrados.</td>
              </tr>
            ) : (
              currentMedicos.map((medico) => (
                <tr key={medico.dni} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-800">
                  <td className="px-3 py-2 text-gray-100">{medico.first_name}</td>
                  <td className="px-3 py-2 text-gray-100">{medico.last_name}</td>
                  <td className="px-3 py-2 text-gray-100">{medico.dni}</td>
                  <td className="px-3 py-2 text-gray-100">{medico.email}</td>
                  <td className="px-3 py-2 text-gray-100">{medico.telefono}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded font-semibold shadow-lg hover:bg-blue-700 focus:bg-blue-700 focus:outline-none"
                        onClick={() => navigate(`/medicos/editar/${medico.dni}`)}
                      >
                        Editar
                      </button>
                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded font-semibold shadow-lg hover:bg-red-700 focus:bg-red-700 focus:outline-none"
                        onClick={() => handleEliminar(medico)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={medicos.length}
        />
      </div>
    </div>
  );
}
