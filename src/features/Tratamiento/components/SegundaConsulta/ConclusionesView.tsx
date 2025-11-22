import { CheckCircle, XCircle, AlertTriangle, ClipboardCheck } from 'lucide-react';

interface ConclusionesViewProps {
  conclusiones: any;
  ovocitoViable?: boolean;
  semenViable?: boolean;
}

export default function ConclusionesView({ conclusiones, ovocitoViable, semenViable }: ConclusionesViewProps) {
  const getViabilidadColor = (viable: boolean | undefined) => {
    if (viable === true) return 'text-green-600 bg-green-50';
    if (viable === false) return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getViabilidadIcon = (viable: boolean | undefined) => {
    if (viable === true) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (viable === false) return <XCircle className="h-5 w-5 text-red-600" />;
    return <AlertTriangle className="h-5 w-5 text-gray-600" />;
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-green-100 p-2">
          <ClipboardCheck className="h-5 w-5 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Conclusiones</h2>
      </div>

      <div className="space-y-6">
        {/* Estado de viabilidad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`rounded-lg border p-4 ${getViabilidadColor(ovocitoViable)}`}>
            <div className="mb-2 flex items-center gap-3">
              {getViabilidadIcon(ovocitoViable)}
              <h3 className="font-medium">Viabilidad de Ovocitos</h3>
            </div>
            <div className="text-sm">
              {ovocitoViable === true && (
                <span className="font-medium text-green-700">✓ Ovocitos viables para fertilización</span>
              )}
              {ovocitoViable === false && (
                <span className="font-medium text-red-700">✗ Ovocitos no viables</span>
              )}
              {ovocitoViable === undefined && (
                <span className="font-medium text-gray-700">Pendiente de evaluación</span>
              )}
            </div>
          </div>

          <div className={`rounded-lg border p-4 ${getViabilidadColor(semenViable)}`}>
            <div className="mb-2 flex items-center gap-3">
              {getViabilidadIcon(semenViable)}
              <h3 className="font-medium">Viabilidad de Semen</h3>
            </div>
            <div className="text-sm">
              {semenViable === true && (
                <span className="font-medium text-green-700">✓ Semen viable para fertilización</span>
              )}
              {semenViable === false && (
                <span className="font-medium text-red-700">✗ Semen no viable</span>
              )}
              {semenViable === undefined && (
                <span className="font-medium text-gray-700">Pendiente de evaluación</span>
              )}
            </div>
          </div>
        </div>

        {/* Estado general del tratamiento */}
        <div className="rounded-lg bg-blue-50 p-4">
          <h3 className="mb-3 font-medium text-blue-800">Estado del Tratamiento</h3>
          <div className="space-y-2">
            {ovocitoViable && semenViable ? (
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-4 w-4" />
                <span className="font-medium">Condiciones óptimas para proceder con fertilización</span>
              </div>
            ) : ovocitoViable === false || semenViable === false ? (
              <div className="flex items-center gap-2 text-red-700">
                <XCircle className="h-4 w-4" />
                <span className="font-medium">Se requieren intervenciones adicionales</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-blue-700">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">Evaluación en proceso</span>
              </div>
            )}
          </div>
        </div>

        {/* Conclusiones detalladas */}
        {conclusiones && Object.keys(conclusiones).length > 0 && (
          <div>
            <h3 className="mb-3 font-medium text-gray-700">Observaciones Clínicas</h3>
            <div className="space-y-3">
              {Object.entries(conclusiones).map(([key, value]) => {
                if (key === 'ovocitoViable' || key === 'semenViable') return null;
                
                return (
                  <div key={key} className="rounded-lg bg-gray-50 p-4">
                    <span className="text-sm font-medium text-gray-600 capitalize">
                      {key.replace(/_/g, ' ')}:
                    </span>
                    <div className="mt-1 text-gray-800">
                      {typeof value === 'string' ? value : JSON.stringify(value)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recomendaciones */}
        <div className="rounded-lg bg-yellow-50 p-4">
          <h3 className="mb-3 font-medium text-yellow-800">Próximos Pasos</h3>
          <div className="space-y-2 text-sm text-yellow-700">
            {ovocitoViable && semenViable ? (
              <>
                <p>• Proceder con la punción ovárica cuando sea apropiado</p>
                <p>• Preparar para fertilización in vitro</p>
                <p>• Continuar monitoreo según protocolo establecido</p>
              </>
            ) : ovocitoViable === false ? (
              <>
                <p>• Evaluar opciones de tratamiento adicionales</p>
                <p>• Considerar ajustes en el protocolo de estimulación</p>
                <p>• Programar nueva evaluación</p>
              </>
            ) : semenViable === false ? (
              <>
                <p>• Evaluar opciones con banco de semen</p>
                <p>• Considerar técnicas adicionales de recuperación espermática</p>
                <p>• Programar consulta con andrólogo</p>
              </>
            ) : (
              <>
                <p>• Completar evaluaciones pendientes</p>
                <p>• Continuar monitoreo según protocolo</p>
                <p>• Programar próxima consulta</p>
              </>
            )}
          </div>
        </div>

        {/* Información adicional */}
        {(!conclusiones || Object.keys(conclusiones).length === 0) && 
         ovocitoViable === undefined && 
         semenViable === undefined && (
          <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
            <ClipboardCheck className="mx-auto mb-3 h-12 w-12 text-gray-400" />
            <p className="text-gray-500">Las conclusiones se completarán al finalizar todas las evaluaciones</p>
          </div>
        )}
      </div>
    </div>
  );
}