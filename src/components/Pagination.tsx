import type { PaginationProps } from '../interfaces/Pagination';

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
    <div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div className="text-sm text-gray-700">
        Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, totalItems)} de{' '}
        {totalItems} elementos
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded border bg-blue-500 px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          Anterior
        </button>

        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`rounded border px-3 py-1 text-sm transition-colors duration-150 ${
                currentPage === pageNum
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-300 bg-white text-blue-700 hover:bg-blue-50'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded border bg-blue-500 px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
