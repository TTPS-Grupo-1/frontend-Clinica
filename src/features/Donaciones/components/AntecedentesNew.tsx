import type { AntecedentesFormProps } from "../../../interfaces/DonacionesForms";

export default function AntecedentesForm({ datosMedicos, onChange }: AntecedentesFormProps) {
  
  const handleInputChange = (field: string, value: string | boolean) => {
    onChange({
      ...datosMedicos,
      [field]: value
    });
  };

  return (
    <section className="bg-gray-50 p-6 rounded-xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Antecedentes Médicos</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Antecedentes Familiares
          </label>
          <textarea
            name="antecedentes_familiares"
            rows={3}
            value={datosMedicos.antecedentes_familiares || ''}
            onChange={(e) => handleInputChange('antecedentes_familiares', e.target.value)}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe enfermedades hereditarias, condiciones genéticas..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Antecedentes Personales
          </label>
          <textarea
            name="antecedentes_personales"
            rows={3}
            value={datosMedicos.antecedentes_personales || ''}
            onChange={(e) => handleInputChange('antecedentes_personales', e.target.value)}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Cirugías, enfermedades previas, medicamentos..."
          />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consumo de Tabaco
            </label>
            <select
              name="consumo_tabaco"
              value={datosMedicos.consumo_tabaco ? 'true' : 'false'}
              onChange={(e) => handleInputChange('consumo_tabaco', e.target.value === 'true')}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="false">No</option>
              <option value="true">Sí</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consumo de Alcohol
            </label>
            <select
              name="alcohol"
              value={datosMedicos.alcohol ? 'true' : 'false'}
              onChange={(e) => handleInputChange('alcohol', e.target.value === 'true')}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="false">No</option>
              <option value="true">Sí</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consumo de Drogas
            </label>
            <select
              name="drogas"
              value={datosMedicos.drogas ? 'true' : 'false'}
              onChange={(e) => handleInputChange('drogas', e.target.value === 'true')}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="false">No</option>
              <option value="true">Sí</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}