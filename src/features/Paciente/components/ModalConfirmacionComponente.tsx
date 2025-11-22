import React, { type FC } from 'react';
import { CircleAlert, X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; // Función que ejecuta la cancelación (handleCancelarTurno)
  title: string;
  message: string;
}

const ConfirmModal: FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  // Handler para prevenir que el clic dentro del modal se propague y lo cierre
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    // 1. Contenedor principal: Fijo, centrado, y con alto z-index
    // ⚠️ El fondo es completamente transparente. Los clics cierran el modal.
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose} // Cierra si se hace clic fuera del contenido del modal
    >
      {/* 2. Capa invisible para atrapar clics (simula el overlay transparente) */}
      <div className="fixed inset-0" aria-hidden="true" />

      {/* 3. Contenido del Modal (La tarjeta que aparece en el centro) */}
      <div
        className="relative z-10 w-full max-w-sm scale-100 transform rounded-xl bg-white shadow-2xl transition-all duration-300"
        onClick={handleModalClick} // Previene el cierre accidental
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <h3 className="flex items-center text-xl font-bold text-gray-800">
            <CircleAlert className="mr-2 h-6 w-6 text-red-500" />
            {title}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Body / Mensaje */}
        <div className="p-5 text-gray-700">
          <p>{message}</p>
        </div>

        {/* Footer / Acciones - Contenedor */}
        <div className="flex justify-end gap-3 border-t border-gray-100 p-5">
          {/* 🎯 CORRECCIÓN: Usar w-full y espacio entre elementos (justify-between) */}
          <div className="flex w-full justify-between gap-3">
            {/* Botón Izquierdo (Secundario/Cancelar) */}
            <button
              onClick={onClose}
              className="w-full flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
            >
              Cancelar
            </button>

            {/* Botón Derecho (Primario/Confirmar) */}
            <button
              onClick={onConfirm}
              className="w-full flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
