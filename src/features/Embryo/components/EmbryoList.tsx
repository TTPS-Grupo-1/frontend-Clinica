import { useState, useEffect } from "react"; // ✅ Agregar useEffect
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

  // ✅ AGREGAR: Resetear paginación cuando cambian los embriones o el paciente
  useEffect(() => {
    setCurrentPage(1);
  }, [embryos, selectedPacienteId]);

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
              <th className="px-6 py-4 text-left text-gray-700 font-semibold text-lg">Identificador</th>
              <th className="px-6 py-4 text-center text-gray-700 font-semibold text-lg">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentEmbryos.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-gray-500 text-center py-8 text-lg">No hay embriones registrados.</td>
              </tr>
            ) : (
              currentEmbryos.map((embryo) => (
                <tr key={embryo.id} className="border-b border-gray-200 hover:bg-gray-100 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-900 font-semibold text-lg">
                    {embryo.identificador || embryo.id}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleVerEmbrion(embryo.id!)}
                      className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
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