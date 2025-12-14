import React, { useState, useEffect, type FC } from 'react';

// 💡 Interfaz extendida con los nuevos campos de Django
export interface SeguimientoData {
    resultado_beta: boolean | null; 
    hay_saco_gestacional: boolean;
    embarazo_clinico: boolean;
    nacido_vivo: boolean | null; 
    causa: string;
    cantidad_nacimientos: number | null;
    fecha_nacimiento: string; // YYYY-MM-DD
    id_transferencia: number | null; // Se asume que lo agregaste a la interfaz
}

interface SeguimientoFormProps {
    onSave: (data: SeguimientoData) => void;
    loading: boolean;
    // ✅ Propiedad para precargar datos (viene del GET)
    initialData: Partial<SeguimientoData> | null; 
}

// 🎯 FUNCIÓN AUXILIAR: Mapea los datos cargados sobre los defaults
const buildInitialState = (data: Partial<SeguimientoData> | null): SeguimientoData => ({
    // Usamos el operador de coalescencia nula (??) para usar la data cargada si existe, 
    // sino, usamos el valor por defecto correcto (false, null, o '')

    resultado_beta: data?.resultado_beta ?? null,
    hay_saco_gestacional: data?.hay_saco_gestacional ?? false,
    embarazo_clinico: data?.embarazo_clinico ?? false,
    nacido_vivo: data?.nacido_vivo ?? null,
    
    causa: data?.causa ?? '',
    cantidad_nacimientos: data?.cantidad_nacimientos ?? null,
    fecha_nacimiento: data?.fecha_nacimiento ?? '',
    // Asume que la interfaz de la prop tiene id_transferencia:
    id_transferencia: (data as any)?.id_transferencia ?? null, 
});


const SeguimientoForm: FC<SeguimientoFormProps> = ({ onSave, loading, initialData }) => { // ✅ Recibir initialData como prop
    
    // 💡 Estado inicial: Usamos la función buildInitialState, inicialmente con null
    const [formData, setFormData] = useState<SeguimientoData>(buildInitialState(null));

    // ✅ EFECTO CLAVE: Actualizar formData cuando initialData cambie (es decir, cuando el fetch termine)
    useEffect(() => {
        if (initialData) {
            setFormData(buildInitialState(initialData));
        }
    }, [initialData]);

    // 💡 Manejar cambios en input, select, number y textarea (se mantiene igual)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, type, value } = e.target; 

        // 1. Manejo de Checkboxes (booleanos puros: true/false)
        if (type === 'checkbox') {
            const newValue = (e.target as HTMLInputElement).checked; 
            setFormData(prev => ({ ...prev, [name]: newValue }));
            return;
        }
        
        // 2. Manejo de Números (id_transferencia y cantidad_nacimientos)
        if (name === 'cantidad_nacimientos' || name === 'id_transferencia') {
            const numValue = value ? parseInt(value) : null;
            setFormData(prev => ({ ...prev, [name]: numValue }));
            return;
        }

        // 3. Manejo de Texto y Fechas (string)
        if (name === 'causa' || name === 'fecha_nacimiento') {
            setFormData(prev => ({ ...prev, [name]: value }));
            return;
        }

        // 4. Manejo de Selects con NULL (resultado_beta, nacido_vivo)
        if (name === 'resultado_beta' || name === 'nacido_vivo') {
            const booleanValue = value === 'true' ? true : (value === 'false' ? false : null);
            setFormData(prev => ({ ...prev, [name]: booleanValue }));
            return;
        } 
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validar que al menos un campo esté completado
        const hasData = 
            formData.resultado_beta !== null ||
            formData.hay_saco_gestacional === true ||
            formData.embarazo_clinico === true ||
            formData.nacido_vivo !== null ||
            formData.causa.trim() !== '' ||
            formData.cantidad_nacimientos !== null ||
            formData.fecha_nacimiento !== '';
        
        if (!hasData) {
            alert('Debe completar al menos un campo del seguimiento antes de guardar.');
            return;
        }
        
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* ... Título ... */}
            <h3 className="mb-4 border-b-2 border-blue-600 pb-3 text-2xl font-bold text-gray-800">
                Registrar Seguimiento
            </h3>

            {/* ------------------------------------------- */}
            {/* 1. SEGUIMIENTO INICIAL */}
            {/* ------------------------------------------- */}
            
            {/* Resultado Beta HCG (Select con Null) */}
            <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Resultado Beta HCG
                </label>
                <select
                    name="resultado_beta"
                    // 💡 Usar formData para el valor
                    value={
                        formData.resultado_beta === true
                            ? 'true'
                            : formData.resultado_beta === false
                                ? 'false'
                                : ''
                    }
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-gray-700 shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                    <option value="" className="text-gray-400">
                        -- Seleccionar resultado --
                    </option>
                    <option value="true">Positiva</option>
                    <option value="false">Negativa</option>
                </select>
            </div>

            {/* Hay Saco Gestacional (Checkbox) */}
            <div className="flex items-center space-x-3 rounded-lg border-2 border-gray-200 bg-gradient-to-r from-blue-50 to-white p-4 shadow-sm transition-all hover:border-blue-300">
                <input
                    id="hay_saco_gestacional"
                    name="hay_saco_gestacional"
                    type="checkbox"
                    // 💡 Usar formData para checked
                    checked={formData.hay_saco_gestacional} 
                    onChange={handleChange}
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 transition-all focus:ring-2 focus:ring-blue-200"
                />
                <label htmlFor="hay_saco_gestacional" className="cursor-pointer font-medium text-gray-700">
                    Confirmación de Saco Gestacional
                </label>
            </div>

            {/* Embarazo Clínico (Checkbox) */}
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
            
            {/* ------------------------------------------- */}
            {/* 2. DESENLACE FINAL */}
            {/* ------------------------------------------- */}
            
            {/* <h4 className="mt-6 mb-3 border-b pb-1 text-lg font-semibold text-gray-700">Desenlace Final</h4> */}
            
            {/* Nacido Vivo (Select con Null) */}
            <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Resultado Nacido Vivo
                </label>
                <select
                    name="nacido_vivo"
                    value={
                        formData.nacido_vivo === true
                            ? 'true'
                            : formData.nacido_vivo === false
                                ? 'false'
                                : ''
                    }
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none"
                >
                    <option value="">-- Pendiente --</option>
                    <option value="true">Nacido Vivo</option>
                    <option value="false">No</option>
                </select>
            </div>
            
            {/* Solo mostrar si nacido_vivo === true */}
            {formData.nacido_vivo === true && (
                <div className="grid grid-cols-2 gap-4">
                    {/* Cantidad de Nacimientos */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Cantidad de Nacimientos
                        </label>
                        <input
                            type="number"
                            name="cantidad_nacimientos"
                            value={formData.cantidad_nacimientos || ''}
                            onChange={handleChange}
                            min="0"
                            className="mt-1 block w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Fecha de Nacimiento */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Fecha de Nacimiento
                        </label>
                        <input
                            type="date"
                            name="fecha_nacimiento"
                            value={formData.fecha_nacimiento}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                </div>
            )}

            {/* Solo mostrar si nacido_vivo === false */}
            {formData.nacido_vivo === false && (
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Causa / Comentarios
                    </label>
                    <textarea
                        name="causa"
                        value={formData.causa}
                        onChange={handleChange as any}
                        rows={3}
                        className="mt-1 block w-full resize-none rounded-lg border-2 border-gray-300 bg-white p-3 text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none"
                    />
                </div>
            )}

            {/* Botón Submit */}
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
                    'Guardar Seguimiento'
                )}
            </button>
        </form>
    );
};

export default SeguimientoForm;