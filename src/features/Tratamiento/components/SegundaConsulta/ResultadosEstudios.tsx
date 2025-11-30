import { FlaskConical, CheckCircle, XCircle, Calendar } from 'lucide-react';
import { formatDate } from '@/shared/utils/dateUtils';

interface ResultadosEstudiosProps {
  estudios: any[];
  fecha: string;
}

export default function ResultadosEstudios({ estudios, fecha }: ResultadosEstudiosProps) {
  const groupEstudiosByPersona = (estudios: any[]) => {
    const grouped: { [key: string]: any[] } = {};

    estudios.forEach((estudio) => {
      const persona = estudio.persona || 'Paciente';
      if (!grouped[persona]) {
        grouped[persona] = [];
      }
      grouped[persona].push(estudio);
    });

    return grouped;
  };

  const groupedEstudios = groupEstudiosByPersona(estudios);

  const getPersonaColor = (persona: string) => {
    const colors: { [key: string]: string } = {
      PACIENTE: 'bg-pink-50 border-pink-200',
      PAREJA: 'bg-blue-50 border-blue-200',
      Paciente: 'bg-pink-50 border-pink-200',
      Pareja: 'bg-blue-50 border-blue-200',
    };
    return colors[persona] || 'bg-gray-50 border-gray-200';
  };

  const getEstadoColor = (valor: string) => {
    if (!valor) return 'text-gray-500';

    const valorLower = valor.toLowerCase();
    if (
      valorLower.includes('normal') ||
      valorLower.includes('negativo') ||
      valorLower.includes('ok')
    ) {
      return 'text-green-600';
    }
    if (
      valorLower.includes('positivo') ||
      valorLower.includes('alterado') ||
      valorLower.includes('anormal')
    ) {
      return 'text-red-600';
    }
    return 'text-blue-600';
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-100 p-2">
            <FlaskConical className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Resultados de Estudios</h2>
        </div>
        {fecha && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            {formatDate(fecha)}
          </div>
        )}
      </div>

      {Object.keys(groupedEstudios).length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
          <FlaskConical className="mx-auto mb-3 h-12 w-12 text-gray-400" />
          <p className="text-gray-500">No hay resultados de estudios registrados</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedEstudios).map(([persona, estudiosPersona]) => (
            <div key={persona}>
              <h3
                className={`mb-4 inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-medium ${getPersonaColor(persona)}`}
              >
                {persona === 'PACIENTE' || persona === 'Paciente' ? '👩 Paciente' : '👨 Pareja'}
                <span className="bg-opacity-70 ml-1 rounded bg-white px-2 py-0.5 text-xs">
                  {estudiosPersona.length} estudios
                </span>
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {estudiosPersona.map((estudio, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">
                          {estudio.nombre || estudio.nombre_estudio}
                        </h4>
                        {estudio.tipo && (
                          <span className="mt-1 inline-block rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                            {estudio.tipo}
                          </span>
                        )}
                      </div>

                      {estudio.completado !== undefined && (
                        <div className="ml-2">
                          {estudio.completado ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>

                    {estudio.valor && (
                      <div className="rounded-lg bg-white p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-600">Resultado:</span>
                          <span className={`font-medium ${getEstadoColor(estudio.valor)}`}>
                            {estudio.valor}
                          </span>
                        </div>
                      </div>
                    )}

                    {estudio.fecha_resultado && (
                      <div className="mt-2 text-xs text-gray-500">
                        Fecha: {formatDate(estudio.fecha_resultado)}
                      </div>
                    )}

                    {estudio.observaciones && (
                      <div className="mt-2 rounded bg-yellow-50 p-2">
                        <p className="text-xs text-yellow-800">{estudio.observaciones}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Resumen */}
      {Object.keys(groupedEstudios).length > 0 && (
        <div className="mt-6 rounded-lg bg-blue-50 p-4">
          <h3 className="mb-2 font-medium text-blue-800">Resumen de Resultados</h3>
          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div className="text-center">
              <div className="font-bold text-blue-700">{estudios.length}</div>
              <div className="text-blue-600">Total estudios</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-green-700">
                {estudios.filter((e) => e.completado || e.valor).length}
              </div>
              <div className="text-green-600">Completados</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-red-700">
                {estudios.filter((e) => e.completado === false || !e.valor).length}
              </div>
              <div className="text-red-600">Pendientes</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-purple-700">{Object.keys(groupedEstudios).length}</div>
              <div className="text-purple-600">Personas</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
