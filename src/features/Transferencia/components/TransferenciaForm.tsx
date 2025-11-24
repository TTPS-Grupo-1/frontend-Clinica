import type { TransferenciaFormData } from '../../../types/Transferencia';

interface TransferenciaFormProps {
  formData: TransferenciaFormData;
  onFormChange: (field: keyof TransferenciaFormData, value: any) => void;
  onSubmit: () => void;
  onReset: () => void;
  isLoading: boolean;
  message: string | null;
  messageType: 'info' | 'success' | 'error' | 'warning';
}

export default function TransferenciaForm({
  formData,
  onFormChange,
  onSubmit,
  onReset,
  isLoading,
  message,
  messageType,
}: TransferenciaFormProps) {
  const getMessageStyles = () => {
    switch (messageType) {
      case 'success':
        return 'bg-green-50 border-green-300 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-300 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-300 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-300 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Detalles de la Transferencia */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="testPositivo"
            checked={formData.testPositivo}
            onChange={(e) => onFormChange('testPositivo', e.target.checked)}
            disabled={isLoading}
            className="h-4 w-4"
          />
          <label htmlFor="testPositivo" className="text-sm font-medium text-gray-800">
            Test positivo
          </label>
        </div>
      </div>

      {/* Quirofano */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-800">Quirófano / Sala</label>
        <input
          type="text"
          value={formData.quirofano || ''}
          onChange={(e) => onFormChange('quirofano', e.target.value)}
          disabled={isLoading}
          placeholder="Ej: Quirófano 3"
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-800"
        />
      </div>

      {/* Mensaje */}
      {message && <div className={`rounded-lg border p-3 ${getMessageStyles()}`}>{message}</div>}

      {/* Botones de acción */}
      <div className="flex justify-end space-x-3">
        <button
          onClick={onReset}
          disabled={isLoading}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Limpiar
        </button>
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'Guardando...' : 'Guardar Transferencia'}
        </button>
      </div>
    </div>
  );
}
