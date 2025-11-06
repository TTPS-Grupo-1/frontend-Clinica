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
  tratamientoInfo
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
      <label className="block text-sm text-gray-900 font-medium">
        Banco de Semen {loading && <span className="text-blue-500">(Buscando muestra compatible...)</span>}
      </label>
      
      {loading ? (
        <div className="w-full border border-gray-300 bg-gray-100 text-gray-500 px-3 py-2 rounded flex items-center">
          <span className="animate-spin h-4 w-4 border-t-2 border-b-2 border-blue-500 rounded-full mr-2"></span>
          Buscando muestra más compatible...
        </div>
      ) : semenSeleccionado ? (
        <div className="w-full border border-green-300 bg-green-50 text-gray-900 px-3 py-2 rounded">
          <div className="flex justify-between items-center">
            <span className="font-medium">{semenSeleccionado.identificador}</span>
            <span className="text-green-700 text-sm font-semibold">
              {semenSeleccionado.compatibilidad}% compatible
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1">✓ Muestra seleccionada automáticamente por el banco</p>
        </div>
      ) : (
        <div className="w-full border border-red-300 bg-red-50 text-red-700 px-3 py-2 rounded">
          ⚠️ No se encontraron muestras compatibles en el banco
        </div>
      )}
      
      <p className="text-xs text-gray-600 mt-1">
        Razón: {getRazonTexto(razon)}
      </p>
      
      {tratamientoInfo && (
        <p className="text-xs text-blue-600 mt-1">
          Paciente: {tratamientoInfo.paciente.nombre} {tratamientoInfo.paciente.apellido} - Tipo: {tratamientoInfo.tipo_pareja}
        </p>
      )}
    </div>
  );
};