import { useState, useEffect } from 'react'; // ✅ Agregar useEffect
import { useNavigate } from 'react-router-dom';
import type { EmbryoListAdaptedProps } from '../../../interfaces/Embryo';
import Pagination from '../../../components/Pagination';

export default function EmbryoList({ embryos, selectedPacienteId }: EmbryoListAdaptedProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(embryos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmbryos = embryos.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [embryos, selectedPacienteId]);

  const handleVerEmbrion = (embrionId: string | number) => {
    navigate(`/embriones/${embrionId}`);
  };

  return (
    <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold tracking-tight text-gray-900">
        Listado de Embriones
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-xl border border-gray-300 bg-gray-50">
          <thead>
            <tr className="border-b border-gray-300 bg-gray-100">
              <th className="px-6 py-4 text-left text-lg font-semibold text-gray-700">
                Identificador
              </th>
              <th className="px-6 py-4 text-center text-lg font-semibold text-gray-700">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {currentEmbryos.length === 0 ? (
              <tr>
                <td colSpan={2} className="py-8 text-center text-lg text-gray-500">
                  No hay embriones registrados.
                </td>
              </tr>
            ) : (
              currentEmbryos.map((embryo) => (
                <tr
                  key={embryo.id}
                  className="border-b border-gray-200 transition-colors hover:bg-gray-100"
                >
                  <td className="px-6 py-4 font-mono text-lg font-semibold text-blue-900">
                    {embryo.identificador || embryo.id}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleVerEmbrion(embryo.id!)}
                      className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white shadow-sm transition-colors duration-200 hover:bg-blue-700"
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
