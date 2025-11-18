import React from "react";

interface ModalAccionProps {
  icon: React.ReactNode;
  titulo: string;
  descripcion: string;
  children?: React.ReactNode;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onVolver?: () => void; // ✅ Nueva prop
  confirmText?: string;
  cancelText?: string;
  disableConfirm?: boolean;
}

export default function ModalAccion({
  icon,
  titulo,
  descripcion,
  children,
  loading,
  onConfirm,
  onCancel,
  onVolver, // ✅ Nueva prop
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  disableConfirm = false,
}: ModalAccionProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="text-6xl mb-4">{icon}</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{titulo}</h2>
        <p className="text-gray-600 mb-4">{descripcion}</p>
      </div>
      {children}
      <div className="flex gap-4 mt-4">
        <button
          onClick={onConfirm}
          disabled={loading || disableConfirm}
          className="flex-1 bg-cyan-600 text-white py-3 px-4 rounded-md hover:bg-cyan-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? "Procesando..." : confirmText}
        </button>
        <button
          onClick={onCancel}
          disabled={loading}
          className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {cancelText}
        </button>
      </div>
      
      {/* ✅ Botón Volver */}
      {onVolver && (
        <button
          onClick={onVolver}
          disabled={loading}
          className="w-full mt-4 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          ← Volver
        </button>
      )}
    </div>
  );
}