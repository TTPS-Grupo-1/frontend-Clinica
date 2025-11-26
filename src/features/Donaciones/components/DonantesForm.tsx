import type { DonantesFormProps } from '../../../interfaces/DonacionesForms';

export default function DonantesForm({ datos, onChange }: DonantesFormProps) {
  const handleInputChange = (field: string, value: string) => {
    onChange({
      ...datos,
      [field]: value,
    });
  };

  return (
    <section className="rounded-xl bg-gray-50 p-6">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Datos del Donante</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Nombre *</label>
          <input
            type="text"
            name="nombre"
            required
            value={datos.nombre || ''}
            onChange={(e) => handleInputChange('nombre', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Apellido *</label>
          <input
            type="text"
            name="apellido"
            required
            value={datos.apellido || ''}
            onChange={(e) => handleInputChange('apellido', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">DNI *</label>
          <input
            type="text"
            name="dni"
            required
            value={datos.dni || ''}
            onChange={(e) => handleInputChange('dni', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Fecha de Nacimiento *
          </label>
          <input
            type="date"
            name="fecha_nacimiento"
            required
            value={datos.fecha_nacimiento || ''}
            onChange={(e) => handleInputChange('fecha_nacimiento', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Ocupación</label>
          <input
            type="text"
            name="ocupacion"
            value={datos.ocupacion || ''}
            onChange={(e) => handleInputChange('ocupacion', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Nacionalidad</label>
          <input
            type="text"
            name="nacionalidad"
            value={datos.nacionalidad || ''}
            onChange={(e) => handleInputChange('nacionalidad', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </section>
  );
}
