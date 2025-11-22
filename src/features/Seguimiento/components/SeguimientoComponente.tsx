import React, { useState,useEffect, type FC } from 'react';

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


const SeguimientoForm: FC<SeguimientoFormProps> = ({  onSave, loading }) => {
    
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
            newValue = value === 'true' ? true : (value === 'false' ? false : null);
        } else {
            // Si no es un checkbox ni el select de beta, ignoramos la entrada.
            return; 
        }

        // 4. Actualización del estado
        setFormData(prev => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("DATA A ENVIAR:", formData);
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-semibold border-b pb-2">Resultados de Seguimiento</h3>

            {/* Resultado Beta (Usamos Select para manejar los 3 estados: Positiva/Negativa/Pendiente) */}
            <div>
                <label className="block font-medium text-gray-700 mb-1">Resultado Beta HCG</label>
                <select
                    name="resultado_beta"
                    value={formData.resultado_beta === true ? 'true' : (formData.resultado_beta === false ? 'false' : '')}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                    <option value="">-- Seleccionar --</option>
                    <option value="true">Positiva</option>
                    <option value="false">Negativa</option>
                </select>
            </div>

            {/* Hay Saco Gestacional (Checkbox/Boolean) */}
            <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md">
                <input
                    id="hay_saco_gestacional"
                    name="hay_saco_gestacional"
                    type="checkbox"
                    checked={formData.hay_saco_gestacional}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="hay_saco_gestacional" className="font-medium text-gray-700">
                    Confirmación de Saco Gestacional
                </label>
            </div>
            
            {/* Embarazo Clínico (Checkbox/Boolean) */}
            <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md">
                <input
                    id="embarazo_clinico"
                    name="embarazo_clinico"
                    type="checkbox"
                    checked={formData.embarazo_clinico}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="embarazo_clinico" className="font-medium text-gray-700">
                    Embarazo Clínico (Latido Fetal)
                </label>
            </div>
            
            {/* Nacido Vivo (Checkbox/Boolean) */}
            <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md">
                <input
                    id="nacido_vivo"
                    name="nacido_vivo"
                    type="checkbox"
                    checked={formData.nacido_vivo}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="nacido_vivo" className="font-medium text-gray-700">
                    Nacido Vivo
                </label>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
                {loading ? 'Guardando...' : 'Guardar Seguimiento'}
            </button>
        </form>
    );
};

export default SeguimientoForm;