import React, { useState, useEffect, type FC } from 'react';

interface SeguimientoFormProps {
  onSave: (data: SeguimientoData) => void;
  loading: boolean;
}

export interface SeguimientoData {
  resultado_beta: boolean | null; // True: Positiva, False: Negativa, Null: Pendiente
  hay_saco_gestacional: boolean;
  embarazo_clinico: boolean;
  nacido_vivo: boolean;
}

const SeguimientoForm: FC<SeguimientoFormProps> = ({ onSave, loading }) => {
  // Usamos el ID del tratamiento como parte del estado inicial
  const [formData, setFormData] = useState<SeguimientoData>({
    resultado_beta: false, // Inicialmente null para "Pendiente"
    hay_saco_gestacional: false,
    embarazo_clinico: false,
    nacido_vivo: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // 1. Desestructurar solo las propiedades que existen en AMBOS (name, type, value)
    const { name, type, value } = e.target;

    let newValue: boolean | null | string = value; // Usamos 'any' o 'string' inicial

    // 2. Manejar Checkboxes (Forzar el tipo para acceder a 'checked')
    if (type === 'checkbox') {
      // 🎯 SOLUCIÓN: Acceder a 'checked' SOLO después de un Type Assertion
      newValue = (e.target as HTMLInputElement).checked;
    }
    // 3. Manejar Resultado Beta (SELECT)
    else if (name === 'resultado_beta') {
      // Convertir string "true" o "false" a booleano, o null si se selecciona "-"
      newValue = value === 'true' ? true : value === 'false' ? false : null;
    } else {
      // Si no es un checkbox ni el select de beta, ignoramos la entrada.
      return;
    }

    // 4. Actualización del estado
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('DATA A ENVIAR:', formData);
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="mb-4 border-b-2 border-blue-600 pb-3 text-2xl font-bold text-gray-800">
        Resultados de Seguimiento
      </h3>

      {/* Resultado Beta (Usamos Select para manejar los 3 estados: Positiva/Negativa/Pendiente) */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Resultado Beta HCG
        </label>
        <select
          name="resultado_beta"
          value={
            formData.resultado_beta === true
              ? 'true'
              : formData.resultado_beta === false
                ? 'false'
                : ''
          }
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-gray-700 shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="" className="text-gray-400">
            -- Seleccionar resultado --
          </option>
          <option value="true">✓ Positiva</option>
          <option value="false">✗ Negativa</option>
        </select>
      </div>

      {/* Hay Saco Gestacional (Checkbox/Boolean) */}
      <div className="flex items-center space-x-3 rounded-lg border-2 border-gray-200 bg-gradient-to-r from-blue-50 to-white p-4 shadow-sm transition-all hover:border-blue-300">
        <input
          id="hay_saco_gestacional"
          name="hay_saco_gestacional"
          type="checkbox"
          checked={formData.hay_saco_gestacional}
          onChange={handleChange}
          className="h-5 w-5 rounded border-gray-300 text-blue-600 transition-all focus:ring-2 focus:ring-blue-200"
        />
        <label htmlFor="hay_saco_gestacional" className="cursor-pointer font-medium text-gray-700">
          Confirmación de Saco Gestacional
        </label>
      </div>

      {/* Embarazo Clínico (Checkbox/Boolean) */}
      <div className="flex items-center space-x-3 rounded-lg border-2 border-gray-200 bg-gradient-to-r from-green-50 to-white p-4 shadow-sm transition-all hover:border-green-300">
        <input
          id="embarazo_clinico"
          name="embarazo_clinico"
          type="checkbox"
          checked={formData.embarazo_clinico}
          onChange={handleChange}
          className="h-5 w-5 rounded border-gray-300 text-green-600 transition-all focus:ring-2 focus:ring-green-200"
        />
        <label htmlFor="embarazo_clinico" className="cursor-pointer font-medium text-gray-700">
          Embarazo Clínico (Latido Fetal)
        </label>
      </div>

      {/* Nacido Vivo (Checkbox/Boolean) */}
      <div className="flex items-center space-x-3 rounded-lg border-2 border-gray-200 bg-gradient-to-r from-purple-50 to-white p-4 shadow-sm transition-all hover:border-purple-300">
        <input
          id="nacido_vivo"
          name="nacido_vivo"
          type="checkbox"
          checked={formData.nacido_vivo}
          onChange={handleChange}
          className="h-5 w-5 rounded border-gray-300 text-purple-600 transition-all focus:ring-2 focus:ring-purple-200"
        />
        <label htmlFor="nacido_vivo" className="cursor-pointer font-medium text-gray-700">
          Nacido Vivo
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:from-green-600 hover:to-green-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:from-green-500 disabled:hover:to-green-600"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg
              className="mr-2 h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Guardando...
          </span>
        ) : (
          '✓ Guardar Seguimiento'
        )}
      </button>
    </form>
  );
};

export default SeguimientoForm;
