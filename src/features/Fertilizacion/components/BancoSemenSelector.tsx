import React from 'react';

interface BancoSemenSelectorProps {
  semenSeleccionado: any;
  loading: boolean;
  razon: string;
  tratamientoInfo: any;
}

export const BancoSemenSelector: React.FC<BancoSemenSelectorProps> = ({
  semenSeleccionado,
  loading,
  razon,
  tratamientoInfo,
}) => {
  const getRazonTexto = (razon: string) => {
    switch (razon) {
      case 'semen_no_ok':
        return 'Semen de pareja no viable - banco selecciona el más compatible fenotípicamente con la pareja';
      case 'pareja_femenina':
        return 'Pareja del mismo sexo/ROPA - banco selecciona el más compatible fenotípicamente con la pareja';
      case 'sin_pareja':
        return 'Mujer sin pareja - banco selecciona el más compatible fenotípicamente con la receptora';
      default:
        return '';
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-900">
        Banco de Semen{' '}
        {loading && <span className="text-blue-500">(Buscando muestra compatible...)</span>}
      </label>

      {loading ? (
        <div className="flex w-full items-center rounded border border-gray-300 bg-gray-100 px-3 py-2 text-gray-500">
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></span>
          Buscando muestra más compatible...
        </div>
      ) : semenSeleccionado ? (
        <div className="w-full rounded border border-green-300 bg-green-50 px-3 py-2 text-gray-900">
          <div className="flex items-center justify-between">
            <span className="font-medium">{semenSeleccionado.identificador}</span>
            <span className="text-sm font-semibold text-green-700">
              {semenSeleccionado.compatibilidad}% compatible
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-600">
            ✓ Muestra seleccionada automáticamente por el banco
          </p>
        </div>
      ) : (
        <div className="w-full rounded border border-red-300 bg-red-50 px-3 py-2 text-red-700">
          ⚠️ No se encontraron muestras compatibles en el banco
        </div>
      )}

      <p className="mt-1 text-xs text-gray-600">Razón: {getRazonTexto(razon)}</p>

      {tratamientoInfo && (
        <p className="mt-1 text-xs text-blue-600">
          Paciente: {tratamientoInfo.paciente.nombre} {tratamientoInfo.paciente.apellido} - Tipo:{' '}
          {tratamientoInfo.tipo_pareja}
        </p>
      )}
    </div>
  );
};
