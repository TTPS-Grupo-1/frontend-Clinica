import type { FenotipoFormProps } from "../../../interfaces/DonacionesForms";

export default function FenotipoForm({ fenotipo, onChange }: FenotipoFormProps) {
  
  const handleInputChange = (field: string, value: string | number) => {
    onChange({
      ...fenotipo,
      [field]: value
    });
  };

  return (   
    <section className="bg-gray-50 p-6 rounded-xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Datos Fenotípicos</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color de Ojos *
          </label>
          <select
            name="color_ojos"
            required
            value={fenotipo.color_ojos || ''}
            onChange={(e) => handleInputChange('color_ojos', e.target.value)}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seleccionar...</option>
            <option value="marron">Marrón</option>
            <option value="azul">Azul</option>
            <option value="verde">Verde</option>
            <option value="gris">Gris</option>
            <option value="avellana">Avellana</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color de Pelo *
          </label>
          <select
            name="color_pelo"
            required
            value={fenotipo.color_pelo || ''}
            onChange={(e) => handleInputChange('color_pelo', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seleccionar...</option>
            <option value="negro">Negro</option>
            <option value="castano">Castaño</option>
            <option value="rubio">Rubio</option>
            <option value="pelirrojo">Pelirrojo</option>
            <option value="canoso">Canoso</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Pelo *
          </label>
          <select
            name="tipo_pelo"
            required
            value={fenotipo.tipo_pelo || ''}
            onChange={(e) => handleInputChange('tipo_pelo', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seleccionar...</option>
            <option value="liso">Liso</option>
            <option value="ondulado">Ondulado</option>
            <option value="rizado">Rizado</option>
            <option value="muy_rizado">Muy Rizado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Altura (cm) *
          </label>
          <input
            type="number"
            name="altura"
            required
            min="150"
            max="220"
            value={fenotipo.altura || ''}
            onChange={(e) => handleInputChange('altura', parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Complexión *
          </label>
          <select
            name="complexion"
            required
            value={fenotipo.complexion || ''}
            onChange={(e) => handleInputChange('complexion', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seleccionar...</option>
            <option value="delgada">Delgada</option>
            <option value="media">Media</option>
            <option value="robusta">Robusta</option>
            <option value="atletica">Atlética</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rasgos Étnicos
          </label>
          <input
            type="text"
            name="rasgos_etnicos"
            value={fenotipo.rasgos_etnicos || ''}
            onChange={(e) => handleInputChange('rasgos_etnicos', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </section>
  );
}