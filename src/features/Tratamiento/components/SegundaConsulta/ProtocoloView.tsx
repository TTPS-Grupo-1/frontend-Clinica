import { Syringe, Calendar, Pill, Target } from 'lucide-react';
import { formatDate } from '@/shared/utils/dateUtils';

interface ProtocoloViewProps {
  protocolo: {
    tipo?: string;
    medicamentos?: any[];
    dosis?: string;
    duracion?: string;
    fecha_inicio?: string;
    observaciones?: string;
    [key: string]: any;
  };
}

export default function ProtocoloView({ protocolo }: ProtocoloViewProps) {
  if (!protocolo || Object.keys(protocolo).length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-purple-100 p-2">
            <Syringe className="h-5 w-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Protocolo de Estimulación</h2>
        </div>

        <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
          <Syringe className="mx-auto mb-3 h-12 w-12 text-gray-400" />
          <p className="text-gray-500">No hay protocolo registrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-purple-100 p-2">
          <Syringe className="h-5 w-5 text-purple-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Protocolo de Estimulación</h2>
      </div>

      <div className="space-y-6">
        {/* Información general del protocolo */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {protocolo.tipo && (
            <div className="rounded-lg bg-purple-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Target className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Tipo de Protocolo</span>
              </div>
              <div className="font-semibold text-purple-900">{protocolo.tipo}</div>
            </div>
          )}

          {protocolo.fecha_inicio && (
            <div className="rounded-lg bg-blue-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Fecha de Inicio</span>
              </div>
              <div className="font-semibold text-blue-900">
                {formatDate(protocolo.fecha_inicio)}
              </div>
            </div>
          )}

          {protocolo.duracion && (
            <div className="rounded-lg bg-green-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Duración</span>
              </div>
              <div className="font-semibold text-green-900">{protocolo.duracion}</div>
            </div>
          )}

          {protocolo.dosis && (
            <div className="rounded-lg bg-orange-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Pill className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">Dosis</span>
              </div>
              <div className="font-semibold text-orange-900">{protocolo.dosis}</div>
            </div>
          )}
        </div>

        {/* Medicamentos */}
        {protocolo.medicamentos && protocolo.medicamentos.length > 0 && (
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-medium text-gray-700">
              <Pill className="h-4 w-4 text-green-500" />
              Medicamentos
            </h3>
            <div className="space-y-3">
              {protocolo.medicamentos.map((medicamento: any, index: number) => (
                <div key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Medicamento</span>
                      <div className="font-semibold text-gray-800">
                        {medicamento.nombre || medicamento.medicamento}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Dosis</span>
                      <div className="font-semibold text-gray-800">
                        {medicamento.dosis || 'No especificada'}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Frecuencia</span>
                      <div className="font-semibold text-gray-800">
                        {medicamento.frecuencia || 'No especificada'}
                      </div>
                    </div>
                  </div>
                  {medicamento.indicaciones && (
                    <div className="mt-3 rounded bg-blue-50 p-3">
                      <span className="text-sm font-medium text-blue-800">Indicaciones:</span>
                      <p className="text-sm text-blue-700">{medicamento.indicaciones}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Observaciones */}
        {protocolo.observaciones && (
          <div>
            <h3 className="mb-3 font-medium text-gray-700">Observaciones</h3>
            <div className="rounded-lg bg-yellow-50 p-4">
              <p className="text-sm text-yellow-800">{protocolo.observaciones}</p>
            </div>
          </div>
        )}

        {/* Otros campos dinámicos del protocolo */}
        {Object.entries(protocolo)
          .filter(
            ([key]) =>
              ![
                'tipo',
                'medicamentos',
                'dosis',
                'duracion',
                'fecha_inicio',
                'observaciones',
              ].includes(key)
          )
          .map(([key, value]) => {
            if (value && typeof value === 'string') {
              return (
                <div key={key} className="rounded-lg bg-gray-50 p-4">
                  <span className="text-sm font-medium text-gray-600 capitalize">
                    {key.replace(/_/g, ' ')}:
                  </span>
                  <div className="font-semibold text-gray-800">{value}</div>
                </div>
              );
            }
            return null;
          })
          .filter(Boolean)}
      </div>
    </div>
  );
}
