import React from 'react';

interface PaginadorProps {
  paginaActual: number;
  totalPaginas: number;
  onPageChange: (nuevaPagina: number) => void;
}

const Paginador: React.FC<PaginadorProps> = ({ paginaActual, totalPaginas, onPageChange }) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        className="px-3 py-1 rounded bg-white border border-black text-black disabled:opacity-50"
        onClick={() => onPageChange(paginaActual - 1)}
        disabled={paginaActual === 1}
      >
        Anterior
      </button>
      <span className="text-black">Página {paginaActual} de {totalPaginas}</span>
      <button
        className="px-3 py-1 rounded bg-white border border-black text-black disabled:opacity-50"
        onClick={() => onPageChange(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Paginador;
