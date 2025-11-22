import React from 'react';
import type { ObjetivoModalProps } from '../../../../interfaces/Medico';

const opciones = [
  {
    label: 'Pareja hombre y mujer',
    value: 'pareja_heterosexual',
  },
  {
    label: 'Pareja de dos femeninas',
    value: 'pareja_femenina_donacion',
  },
  {
    label: 'Pareja de dos femeninas (Metodo ROPA)',
    value: 'pareja_femenina_ropa',
  },
  {
    label: 'Mujer sin pareja',
    value: 'mujer_sola_donacion',
  },
];

const ObjetivoModal: React.FC<ObjetivoModalProps> = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.15)' }}
    >
      <div
        className="w-full max-w-lg rounded-lg border-2 border-black bg-white p-6 shadow-lg"
        style={{ boxShadow: '0 0 0 4px black' }}
      >
        <h2 className="mb-4 text-center text-xl font-bold text-black">Selecciona el objetivo</h2>
        <ul className="space-y-4">
          {opciones.map((opcion) => (
            <li key={opcion.value}>
              <button
                className="w-full rounded border border-black bg-white px-4 py-2 text-left text-black transition-colors hover:bg-gray-200"
                onClick={() => {
                  onSelect(opcion.value);
                  onClose();
                }}
              >
                {opcion.label}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="mt-6 w-full rounded border border-black bg-black px-4 py-2 font-semibold text-white transition-colors hover:bg-gray-800"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ObjetivoModal;
