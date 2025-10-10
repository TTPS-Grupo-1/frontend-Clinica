import type { ResultadosGeneticosFormProps } from "../../../interfaces/DonacionesForms";

export default function ResultadosGeneticosForm({ resultados, onChange, aptoParaUso, onAptoChange }: ResultadosGeneticosFormProps) {
  
  const handleInputChange = (field: string, value: string | boolean) => {
    onChange({
      ...resultados,
      [field]: value
    });
  };

  return (
    <section className="bg-gray-50 p-6 rounded-xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Resultados Genéticos</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ¿Mutaciones Detectadas? *
          </label>
          <select
            name="mutaciones_detectadas"
            required
            value={resultados.mutaciones_detectadas ? 'true' : 'false'}
            onChange={(e) => handleInputChange('mutaciones_detectadas', e.target.value === 'true')}
            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción de Mutaciones (si aplica)
          </label>
          <textarea
            name="descripcion_mutaciones"
            rows={3}
            value={resultados.descripcion_mutaciones || ''}
            onChange={(e) => handleInputChange('descripcion_mutaciones', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Detalle las mutaciones encontradas..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resultado de Genética *
          </label>
          <select
            name="resultado_genetica"
            required
            value={resultados.resultado_genetica || ''}
            onChange={(e) => handleInputChange('resultado_genetica', e.target.value)}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seleccionar...</option>
            <option value="apto">Apto</option>
            <option value="no_apto">No Apto</option>
            <option value="pendiente">Pendiente de Revisión</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ¿Apto para Uso? *
          </label>
          <select
            name="apto_para_uso"
            required
            value={aptoParaUso ? 'true' : 'false'}
            onChange={(e) => onAptoChange && onAptoChange(e.target.value === 'true')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
    </section>
  );
}