import React from 'react';

export default function AgregarOvocitoButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-2 rounded bg-blue-600 px-4 py-2 text-white transition-all duration-150 hover:bg-blue-700"
    >
      Agregar ovocito
    </button>
  );
}
