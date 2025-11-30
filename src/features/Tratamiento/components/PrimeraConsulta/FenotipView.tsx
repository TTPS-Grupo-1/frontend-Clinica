import { Eye, Palette, Ruler, Users } from 'lucide-react';

interface FenotipViewProps {
  fenotipo: {
    ojos?: string;
    peloColor?: string;
    peloTipo?: string;
    altura?: string;
    complexion?: string;
    etnia?: string;
  };
}

export default function FenotipView({ fenotipo }: FenotipViewProps) {
  const caracteristicas = [
    { key: 'ojos', label: 'Ojos', icon: Eye, color: 'text-blue-600' },
    { key: 'peloColor', label: 'Color de Cabello', icon: Palette, color: 'text-amber-600' },
    { key: 'peloTipo', label: 'Tipo de Cabello', icon: Palette, color: 'text-amber-600' },
    { key: 'altura', label: 'Altura', icon: Ruler, color: 'text-green-600' },
    { key: 'complexion', label: 'Complexión', icon: Users, color: 'text-purple-600' },
    { key: 'etnia', label: 'Etnia', icon: Users, color: 'text-orange-600' },
  ];

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-orange-100 p-2">
          <Users className="h-5 w-5 text-orange-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Fenotipo para Donación</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {caracteristicas.map(({ key, label, icon: Icon, color }) => (
          <div key={key} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Icon className={`h-4 w-4 ${color}`} />
              <span className="text-sm font-medium text-gray-700">{label}</span>
            </div>
            <div className="rounded-lg bg-white p-3">
              <span className="font-medium text-gray-800">
                {fenotipo[key as keyof typeof fenotipo] || 'No especificado'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Información adicional */}
      <div className="mt-6 rounded-lg bg-orange-50 p-4">
        <h3 className="mb-2 font-medium text-orange-800">Información para Donación</h3>
        <p className="text-sm text-orange-700">
          Este fenotipo se utilizará para buscar donantes compatibles con las características
          físicas deseadas. La clínica se encargará de encontrar el donante más adecuado según estos
          criterios.
        </p>
      </div>
    </div>
  );
}
