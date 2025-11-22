import React from 'react';

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
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  disableConfirm = false,
}: ModalAccionProps) {
  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-lg">
      <div className="mb-6 text-center">
        <div className="mb-4 text-6xl">{icon}</div>
        <h2 className="mb-2 text-2xl font-bold text-gray-800">{titulo}</h2>
        <p className="mb-4 text-gray-600">{descripcion}</p>
      </div>
      {children}
      <div className="mt-4 flex gap-4">
        <button
          onClick={onConfirm}
          disabled={loading || disableConfirm}
          className="flex-1 rounded-md bg-cyan-600 px-4 py-3 font-medium text-white transition-colors hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? 'Procesando...' : confirmText}
        </button>
        <button
          onClick={onCancel}
          disabled={loading}
          className="flex-1 rounded-md bg-gray-300 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-400 disabled:cursor-not-allowed"
        >
          {cancelText}
        </button>
      </div>

      {/* ✅ Botón Volver */}
      {onVolver && (
        <button
          onClick={onVolver}
          disabled={loading}
          className="mt-4 w-full rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed"
        >
          ← Volver
        </button>
      )}
    </div>
  );
}
