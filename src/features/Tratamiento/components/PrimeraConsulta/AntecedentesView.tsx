import { FileText, Users, User, Heart, Cigarette } from 'lucide-react';

interface AntecedentesViewProps {
  antecedentes: any;
  objetivo: string;
  antecedentesGinecologicos?: any[];
  antecedentesPersonales?: any[];
}

export default function AntecedentesView({
  antecedentes,
  objetivo,
  antecedentesGinecologicos = [],
  antecedentesPersonales = [],
}: AntecedentesViewProps) {
  // Determinar si es pareja basado en la presencia de datos de la segunda persona
  const isPareja =
    objetivo === 'pareja_heterosexual' ||
    objetivo === 'pareja_femenina_ropa' ||
    antecedentes.clinicos_2 ||
    antecedentes.familiares_2 ||
    antecedentes.quirurgicos_2 ||
    antecedentes.examen_fisico_2;

  // Debug: Log de todos los datos recibidos
  console.log('🔍 AntecedentesView - Datos recibidos:', {
    antecedentes,
    objetivo,
    isPareja,
    antecedentesGinecologicos,
    antecedentesPersonales,
  });

  // Manejar múltiples antecedentes ginecológicos y personales
  const ginecologicos = antecedentesGinecologicos; // Array de antecedentes
  const personales = antecedentesPersonales; // Array de antecedentes

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-purple-100 p-2">
          <FileText className="h-5 w-5 text-purple-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Antecedentes</h2>
      </div>

      <div className="space-y-6">
        {/* Antecedentes Clínicos */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-medium text-gray-700">
            <Heart className="h-4 w-4 text-red-500" />
            Antecedentes Clínicos
          </h3>
          {isPareja ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-pink-50 p-3">
                <h4 className="mb-2 font-medium text-pink-800">Mujer</h4>
                <div className="space-y-1">
                  {antecedentes.clinicos_1 ? (
                    <div className="text-sm text-gray-700">
                      {typeof antecedentes.clinicos_1 === 'object' ? (
                        <div className="space-y-1">
                          {Object.entries(antecedentes.clinicos_1).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="capitalize">{key.replace('_', ' ')}:</span>
                              <span
                                className={`font-medium ${
                                  value === true
                                    ? 'text-red-600'
                                    : value === false
                                      ? 'text-green-600'
                                      : 'text-gray-800'
                                }`}
                              >
                                {value === true ? 'Sí' : value === false ? 'No' : String(value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span>{antecedentes.clinicos_1}</span>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Sin antecedentes registrados</p>
                  )}
                </div>
              </div>
              <div className="rounded-lg bg-blue-50 p-3">
                <h4 className="mb-2 font-medium text-blue-800">Hombre</h4>
                <div className="space-y-1">
                  {antecedentes.clinicos_2 ? (
                    <div className="text-sm text-gray-700">
                      {typeof antecedentes.clinicos_2 === 'object' ? (
                        <div className="space-y-1">
                          {Object.entries(antecedentes.clinicos_2).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="capitalize">{key.replace('_', ' ')}:</span>
                              <span
                                className={`font-medium ${
                                  value === true
                                    ? 'text-red-600'
                                    : value === false
                                      ? 'text-green-600'
                                      : 'text-gray-800'
                                }`}
                              >
                                {value === true ? 'Sí' : value === false ? 'No' : String(value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span>{antecedentes.clinicos_2}</span>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Sin antecedentes registrados</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-gray-50 p-3">
              {antecedentes.clinicos_1 ? (
                <div className="text-sm text-gray-700">
                  {typeof antecedentes.clinicos_1 === 'object' ? (
                    <div className="space-y-1">
                      {Object.entries(antecedentes.clinicos_1).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="capitalize">{key.replace('_', ' ')}:</span>
                          <span
                            className={`font-medium ${
                              value === true
                                ? 'text-red-600'
                                : value === false
                                  ? 'text-green-600'
                                  : 'text-gray-800'
                            }`}
                          >
                            {value === true ? 'Sí' : value === false ? 'No' : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span>{antecedentes.clinicos_1}</span>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Sin antecedentes clínicos registrados</p>
              )}
            </div>
          )}
        </div>

        {/* Antecedentes Familiares */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-medium text-gray-700">
            <Users className="h-4 w-4 text-green-500" />
            Antecedentes Familiares
          </h3>
          {isPareja ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-pink-50 p-3">
                <h4 className="mb-2 font-medium text-pink-800">Mujer</h4>
                <p className="text-sm text-gray-700">
                  {antecedentes.familiares_1 || 'Sin información registrada'}
                </p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3">
                <h4 className="mb-2 font-medium text-blue-800">Hombre</h4>
                <p className="text-sm text-gray-700">
                  {antecedentes.familiares_2 || 'Sin información registrada'}
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-green-50 p-3">
              <p className="text-sm text-gray-700">
                {antecedentes.familiares_1 || 'Sin antecedentes familiares registrados'}
              </p>
            </div>
          )}
        </div>

        {/* Antecedentes Quirúrgicos */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-medium text-gray-700">
            <User className="h-4 w-4 text-orange-500" />
            Antecedentes Quirúrgicos
          </h3>
          {isPareja ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-pink-50 p-3">
                <h4 className="mb-2 font-medium text-pink-800">Mujer</h4>
                <p className="text-sm text-gray-700">
                  {antecedentes.quirurgicos_1 || 'Sin información registrada'}
                </p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3">
                <h4 className="mb-2 font-medium text-blue-800">Hombre</h4>
                <p className="text-sm text-gray-700">
                  {antecedentes.quirurgicos_2 || 'Sin información registrada'}
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-orange-50 p-3">
              <p className="text-sm text-gray-700">
                {antecedentes.quirurgicos_1 || 'Sin antecedentes quirúrgicos registrados'}
              </p>
            </div>
          )}
        </div>

        {/* Antecedentes Genitales */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-medium text-gray-700">
            <Heart className="h-4 w-4 text-pink-500" />
            Antecedentes Genitales
          </h3>
          <div className="rounded-lg bg-pink-50 p-3">
            <p className="text-sm text-gray-700">
              {antecedentes.genitales || 'Sin antecedentes genitales registrados'}
            </p>
          </div>
        </div>

        {/* Examen Físico */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-medium text-gray-700">
            <FileText className="h-4 w-4 text-cyan-500" />
            Examen Físico
          </h3>
          {isPareja ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-pink-50 p-3">
                <h4 className="mb-2 font-medium text-pink-800">Mujer</h4>
                <p className="text-sm text-gray-700">
                  {antecedentes.examen_fisico_1 || 'Sin información registrada'}
                </p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3">
                <h4 className="mb-2 font-medium text-blue-800">Hombre</h4>
                <p className="text-sm text-gray-700">
                  {antecedentes.examen_fisico_2 || 'Sin información registrada'}
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-cyan-50 p-3">
              <p className="text-sm text-gray-700">
                {antecedentes.examen_fisico_1 || 'Sin información de examen físico registrada'}
              </p>
            </div>
          )}
        </div>

        {/* Antecedentes Personales (Hábitos) */}
        {personales.length > 0 && (
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-medium text-gray-700">
              <Cigarette className="h-4 w-4 text-yellow-500" />
              Antecedentes Personales (Hábitos)
            </h3>
            <div className="space-y-4">
              {personales.map((personal: any, index: number) => (
                <div key={index} className="rounded-lg border bg-gray-50 p-4">
                  <h4 className="mb-3 font-medium text-gray-800">Registro {index + 1}</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-yellow-50 p-3">
                      <h5 className="mb-2 font-medium text-yellow-800">Tabaquismo</h5>
                      <p className="text-sm text-gray-700">
                        {personal?.fuma_pack_dias
                          ? `${personal.fuma_pack_dias} pack-días`
                          : 'No fuma'}
                      </p>
                    </div>
                    <div className="rounded-lg bg-amber-50 p-3">
                      <h5 className="mb-2 font-medium text-amber-800">Alcohol</h5>
                      <p className="text-sm text-gray-700">
                        {personal?.consume_alcohol || 'No consume alcohol'}
                      </p>
                    </div>
                    <div className="rounded-lg bg-red-50 p-3">
                      <h5 className="mb-2 font-medium text-red-800">Drogas Recreativas</h5>
                      <p className="text-sm text-gray-700">
                        {personal?.drogas_recreativas || 'No consume drogas recreativas'}
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <h5 className="mb-2 font-medium text-gray-800">Observaciones</h5>
                      <p className="text-sm text-gray-700">
                        {personal?.observaciones_habitos || 'Sin observaciones'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Antecedentes Ginecológicos */}
        {ginecologicos.length > 0 && (
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-medium text-gray-700">
              <Heart className="h-4 w-4 text-pink-500" />
              Antecedentes Ginecológicos
            </h3>
            <div className="space-y-4">
              {ginecologicos.map((gineco: any, index: number) => (
                <div key={index} className="rounded-lg border bg-pink-50 p-4">
                  <h4 className="mb-3 font-medium text-pink-800">Registro {index + 1}</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                    <div>
                      <span className="font-medium text-pink-800">Menarca:</span>
                      <span className="ml-2 text-gray-700">
                        {gineco.menarca ? `${gineco.menarca} años` : 'N/D'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-pink-800">Ciclo:</span>
                      <span className="ml-2 text-gray-700">
                        {gineco.ciclo_menstrual ? `${gineco.ciclo_menstrual} días` : 'N/D'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-pink-800">Regularidad:</span>
                      <span className="ml-2 text-gray-700">{gineco.regularidad || 'N/D'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-pink-800">Duración:</span>
                      <span className="ml-2 text-gray-700">
                        {gineco.duracion_menstrual_dias
                          ? `${gineco.duracion_menstrual_dias} días`
                          : 'N/D'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-pink-800">Sangrado:</span>
                      <span className="ml-2 text-gray-700">
                        {gineco.caracteristicas_sangrado || 'N/D'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-pink-800">Embarazos (G):</span>
                      <span className="ml-2 text-gray-700">
                        {gineco.g !== null ? gineco.g : 'N/D'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-pink-800">Partos (P):</span>
                      <span className="ml-2 text-gray-700">
                        {gineco.p !== null ? gineco.p : 'N/D'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-pink-800">Abortos (AB):</span>
                      <span className="ml-2 text-gray-700">
                        {gineco.ab !== null ? gineco.ab : 'N/D'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!antecedentes.clinicos_1 &&
          !antecedentes.familiares_1 &&
          !antecedentes.quirurgicos_1 &&
          !antecedentes.genitales &&
          !antecedentes.examen_fisico_1 &&
          ginecologicos.length === 0 &&
          personales.length === 0 && (
            <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
              <FileText className="mx-auto mb-3 h-12 w-12 text-gray-400" />
              <p className="text-gray-500">No hay antecedentes registrados para este paciente</p>
            </div>
          )}
      </div>
    </div>
  );
}
