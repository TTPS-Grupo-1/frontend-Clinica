import type { PaginationProps } from "../interfaces/Pagination";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}: PaginationProps) {
  const startIndex = (currentPage - 1) * itemsPerPage;

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
      <div className="text-sm text-gray-700">
        Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, totalItems)} de {totalItems} elementos
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm border rounded disabled:opacity-50 bg-blue-500 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        
        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-1 text-sm border rounded ${
                currentPage === pageNum
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm border rounded  disabled:opacity-50 bg-blue-500 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}