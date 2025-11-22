import { Calendar, Activity, TrendingUp, AlertCircle } from 'lucide-react';
import { formatDate } from '@/shared/utils/dateUtils';

interface MonitoreoViewProps {
  monitoreo: any[];
}

export default function MonitoreoView({ monitoreo }: MonitoreoViewProps) {
  if (!monitoreo || monitoreo.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-cyan-100 p-2">
            <Calendar className="h-5 w-5 text-cyan-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Monitoreo de Estimulación</h2>
        </div>
        
        <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
          <Calendar className="mx-auto mb-3 h-12 w-12 text-gray-400" />
          <p className="text-gray-500">No hay registros de monitoreo</p>
        </div>
      </div>
    );
  }

  // Ordenar monitoreo por fecha
  const monitoreoOrdenado = [...monitoreo].sort((a, b) => {
    const fechaA = new Date(a.fecha || a.fecha_monitoreo);
    const fechaB = new Date(b.fecha || b.fecha_monitoreo);
    return fechaA.getTime() - fechaB.getTime();
  });

  const getEstadoColor = (estado: string) => {
    if (!estado) return 'text-gray-600';
    
    const estadoLower = estado.toLowerCase();
    if (estadoLower.includes('normal') || estadoLower.includes('óptimo') || estadoLower.includes('bien')) {
      return 'text-green-600 bg-green-50';
    }
    if (estadoLower.includes('alto') || estadoLower.includes('elevado')) {
      return 'text-orange-600 bg-orange-50';
    }
    if (estadoLower.includes('bajo') || estadoLower.includes('preocupante')) {
      return 'text-red-600 bg-red-50';
    }
    return 'text-blue-600 bg-blue-50';
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-cyan-100 p-2">
          <Calendar className="h-5 w-5 text-cyan-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Monitoreo de Estimulación</h2>
      </div>

      {/* Timeline de monitoreo */}
      <div className="space-y-4">
        {monitoreoOrdenado.map((registro, index) => (
          <div key={index} className="relative">
            {/* Línea de tiempo */}
            {index < monitoreoOrdenado.length - 1 && (
              <div className="absolute left-6 top-12 h-full w-0.5 bg-gray-200"></div>
            )}
            
            <div className="flex gap-4">
              {/* Marcador de tiempo */}
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-cyan-100">
                <Activity className="h-5 w-5 text-cyan-600" />
              </div>
              
              {/* Contenido del registro */}
              <div className="flex-1 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">
                      Día {index + 1} del tratamiento
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {formatDate(registro.fecha || registro.fecha_monitoreo, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  
                  {registro.dia_estimulacion && (
                    <span className="rounded bg-cyan-100 px-2 py-1 text-xs font-medium text-cyan-700">
                      Día {registro.dia_estimulacion}
                    </span>
                  )}
                </div>

                {/* Datos del monitoreo */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {registro.foliculos && (
                    <div className="rounded-lg bg-white p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-600">Folículos</span>
                      </div>
                      <div className="font-semibold text-gray-800">{registro.foliculos}</div>
                    </div>
                  )}

                  {registro.estradiol && (
                    <div className="rounded-lg bg-white p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Activity className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium text-gray-600">Estradiol</span>
                      </div>
                      <div className="font-semibold text-gray-800">{registro.estradiol} pg/ml</div>
                    </div>
                  )}

                  {registro.lh && (
                    <div className="rounded-lg bg-white p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Activity className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-gray-600">LH</span>
                      </div>
                      <div className="font-semibold text-gray-800">{registro.lh} mUI/ml</div>
                    </div>
                  )}

                  {registro.endometrio && (
                    <div className="rounded-lg bg-white p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-pink-500" />
                        <span className="text-sm font-medium text-gray-600">Endometrio</span>
                      </div>
                      <div className="font-semibold text-gray-800">{registro.endometrio} mm</div>
                    </div>
                  )}
                </div>

                {/* Estado y observaciones */}
                <div className="mt-4 space-y-2">
                  {registro.estado && (
                    <div className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium ${getEstadoColor(registro.estado)}`}>
                      <AlertCircle className="h-3 w-3" />
                      {registro.estado}
                    </div>
                  )}
                  
                  {registro.observaciones && (
                    <div className="rounded-lg bg-yellow-50 p-3">
                      <span className="text-sm font-medium text-yellow-800">Observaciones:</span>
                      <p className="text-sm text-yellow-700">{registro.observaciones}</p>
                    </div>
                  )}

                  {registro.ajuste_medicacion && (
                    <div className="rounded-lg bg-blue-50 p-3">
                      <span className="text-sm font-medium text-blue-800">Ajuste de medicación:</span>
                      <p className="text-sm text-blue-700">{registro.ajuste_medicacion}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen del monitoreo */}
      <div className="mt-6 rounded-lg bg-cyan-50 p-4">
        <h3 className="mb-2 font-medium text-cyan-800">Resumen del Monitoreo</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="font-bold text-cyan-700">{monitoreo.length}</div>
            <div className="text-cyan-600">Controles realizados</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-cyan-700">
              {monitoreo[monitoreo.length - 1]?.dia_estimulacion || '—'}
            </div>
            <div className="text-cyan-600">Días de estimulación</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-cyan-700">
              {formatDate(monitoreo[monitoreo.length - 1]?.fecha || monitoreo[monitoreo.length - 1]?.fecha_monitoreo)}
            </div>
            <div className="text-cyan-600">Último control</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-cyan-700">
              {monitoreo[monitoreo.length - 1]?.estado || '—'}
            </div>
            <div className="text-cyan-600">Estado actual</div>
          </div>
        </div>
      </div>
    </div>
  );
}