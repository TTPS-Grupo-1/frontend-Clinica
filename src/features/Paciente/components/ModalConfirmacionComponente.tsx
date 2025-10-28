import React, { type FC } from 'react';
import { CircleAlert, X } from 'lucide-react'; 

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void; // Función que ejecuta la cancelación (handleCancelarTurno)
    title: string;
    message: string;
}

const ConfirmModal: FC<ModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
}) => {
    if (!isOpen) return null;

    // Handler para prevenir que el clic dentro del modal se propague y lo cierre
    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        // 1. Contenedor principal: Fijo, centrado, y con alto z-index
        // ⚠️ El fondo es completamente transparente. Los clics cierran el modal.
        <div 
            className="fixed inset-0 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
            onClick={onClose} // Cierra si se hace clic fuera del contenido del modal
        >
            
            {/* 2. Capa invisible para atrapar clics (simula el overlay transparente) */}
            <div className="fixed inset-0" aria-hidden="true" />
            
            {/* 3. Contenido del Modal (La tarjeta que aparece en el centro) */}
            <div 
                className="bg-white rounded-xl shadow-2xl w-full max-w-sm transform transition-all duration-300 scale-100 relative z-10"
                onClick={handleModalClick} // Previene el cierre accidental
            >
                {/* Header */}
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center">
                        <CircleAlert className="w-6 h-6 text-red-500 mr-2" />
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
            <div className="p-5 border-t border-gray-100 flex justify-end gap-3">
    
                {/* 🎯 CORRECCIÓN: Usar w-full y espacio entre elementos (justify-between) */}
                <div className="flex w-full justify-between gap-3"> 
                
                    {/* Botón Izquierdo (Secundario/Cancelar) */}
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-semibold rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-100 transition w-full flex-1"
                    >
                       Cancelar
                    </button>
                    
                    {/* Botón Derecho (Primario/Confirmar) */}
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-semibold rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-100 transition w-full flex-1"
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