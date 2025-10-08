import type { DonantesFormProps } from "../../../interfaces/DonacionesForms";

export default function DonantesForm({ datos, onChange }: DonantesFormProps) {
  
  const handleInputChange = (field: string, value: string) => {
    onChange({
      ...datos,
      [field]: value
    });
  };

  return (
    <section className="bg-gray-50 p-6 rounded-xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Datos del Donante</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre *
          </label>
          <input
            type="text"
            name="nombre"
            required
            value={datos.nombre || ''}
            onChange={(e) => handleInputChange('nombre', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Apellido *
          </label>
          <input
            type="text"
            name="apellido"
            required
            value={datos.apellido || ''}
            onChange={(e) => handleInputChange('apellido', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            DNI *
          </label>
          <input
            type="text"
            name="dni"
            required
            value={datos.dni || ''}
            onChange={(e) => handleInputChange('dni', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha de Nacimiento *
          </label>
          <input
            type="date"
            name="fecha_nacimiento"
            required
            value={datos.fecha_nacimiento || ''}
            onChange={(e) => handleInputChange('fecha_nacimiento', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ocupación
          </label>
          <input
            type="text"
            name="ocupacion"
            value={datos.ocupacion || ''}
            onChange={(e) => handleInputChange('ocupacion', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nacionalidad
          </label>
          <input
            type="text"
            name="nacionalidad"
            value={datos.nacionalidad || ''}
            onChange={(e) => handleInputChange('nacionalidad', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
              </div>
            </section>
  )
}