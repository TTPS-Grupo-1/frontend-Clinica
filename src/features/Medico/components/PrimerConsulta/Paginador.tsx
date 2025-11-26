import React from 'react';
import type { PaginadorProps } from '../../../../interfaces/Medico';

const Paginador: React.FC<PaginadorProps> = ({ paginaActual, totalPaginas, onPageChange }) => {
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <button
        className="rounded border border-black bg-white px-3 py-1 text-black disabled:opacity-50"
        onClick={() => onPageChange(paginaActual - 1)}
        disabled={paginaActual === 1}
      >
        Anterior
      </button>
      <span className="text-black">
        Página {paginaActual} de {totalPaginas}
      </span>
      <button
        className="rounded border border-black bg-white px-3 py-1 text-black disabled:opacity-50"
        onClick={() => onPageChange(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Paginador;
