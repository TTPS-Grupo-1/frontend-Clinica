import React from "react";

export default function AgregarOvocitoButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-2 transition-all duration-150"
    >
      Agregar ovocito
    </button>
  );
}
