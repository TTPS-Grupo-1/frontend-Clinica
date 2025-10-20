import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { EmbryoListAdaptedProps } from "../../../interfaces/Embryo";
import Pagination from "../../../components/Pagination";


export default function EmbryoList({ embryos, selectedPacienteId }: EmbryoListAdaptedProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(embryos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmbryos = embryos.slice(startIndex, startIndex + itemsPerPage);

  const handleVerEmbrion = (embrionId: string | number) => {
    navigate(`/embriones/${embrionId}`);
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center tracking-tight">Listado de Embriones</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-xl border border-gray-300 bg-gray-50">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="px-4 py-3 text-left text-gray-700 font-semibold">Identificador</th>
              <th className="px-4 py-3 text-left text-gray-700 font-semibold">Calidad</th>
              <th className="px-4 py-3 text-left text-gray-700 font-semibold">POT</th>
              <th className="px-4 py-3 text-left text-gray-700 font-semibold">Estado</th>
              <th className="px-4 py-3 text-left text-gray-700 font-semibold">Causa de descarte</th>
              <th className="px-4 py-3 text-left text-gray-700 font-semibold">Ovocito</th>
              <th className="px-4 py-3 text-left text-gray-700 font-semibold">Observaciones</th>
              <th className="px-4 py-3 text-center text-gray-700 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentEmbryos.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-gray-500 text-center py-6 text-lg">No hay embriones registrados para el paciente seleccionado.</td>
              </tr>
            ) : (
              currentEmbryos.map((embryo) => (
                <tr key={embryo.id} className="border-b border-gray-200 hover:bg-gray-100 transition-colors">
                  <td className="px-4 py-3 font-mono text-blue-900 font-semibold">{embryo.id}</td>
                  <td className="px-4 py-3 text-gray-800">{embryo.calidad}</td>
                  <td className="px-4 py-3 text-gray-800">{embryo.pgt || '-'}</td>
                  <td className="px-4 py-3 text-gray-800">{embryo.estado}</td>
                  <td className="px-4 py-3 text-gray-800">{embryo.causa_descarte || '-'}</td>
                  <td className="px-4 py-3 text-gray-800">-</td>
                  <td className="px-4 py-3 text-gray-800">{embryo.observaciones || '-'}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleVerEmbrion(embryo.id!)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
                    >
                      Ver Embrión
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={embryos.length}
        />
      </div>
    </div>
  );
}