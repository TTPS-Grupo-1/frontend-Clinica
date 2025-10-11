import React from 'react';
import type { ObjetivoModalProps } from '../../../../interfaces/Medico';

const opciones = [
  {
    label: 'Pareja hombre y mujer → Embarazo con gametos propios (ovocito de la mujer, espermatozoide del hombre)',
    value: 'pareja_heterosexual',
  },
  {
    label: 'Pareja de dos femeninas (ovocitos de la mujer, espermatozoide donado)',
    value: 'pareja_femenina_donacion',
  },
  {
    label: 'Pareja de dos femeninas → método ROPA (una aporta ovocito y la otra el útero, el embrión se implanta en el útero de la 2da)',
    value: 'pareja_femenina_ropa',
  },
  {
    label: 'Mujer sin pareja (espermatozoide donado)',
    value: 'mujer_sola_donacion',
  },
];

const ObjetivoModal: React.FC<ObjetivoModalProps> = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.15)' }}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg border-2 border-black" style={{ boxShadow: '0 0 0 4px black' }}>
        <h2 className="text-xl font-bold mb-4 text-center text-black">Selecciona el objetivo</h2>
        <ul className="space-y-4">
          {opciones.map((opcion) => (
            <li key={opcion.value}>
              <button
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-200 border border-black text-black bg-white transition-colors"
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
          className="mt-6 w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded border border-black transition-colors"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ObjetivoModal;
