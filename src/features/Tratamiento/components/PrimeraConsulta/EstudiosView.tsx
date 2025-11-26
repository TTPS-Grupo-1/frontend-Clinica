import { FlaskConical, CheckCircle, XCircle, Download, FileText } from 'lucide-react';
import { formatDateShort } from '@/shared/utils/dateUtils';

interface EstudiosViewProps {
  estudios: any[];
  objetivo: string;
  resultadosEstudios?: any[];
  ordenes?: any[];
}

export default function EstudiosView({ estudios, objetivo, resultadosEstudios = [], ordenes = [] }: EstudiosViewProps) {
  const groupEstudiosByType = (estudios: any[]) => {
    const grouped: { [key: string]: any[] } = {};
    
    estudios.forEach(estudio => {
      const tipo = estudio.tipo || 'Otros';
      if (!grouped[tipo]) {
        grouped[tipo] = [];
      }
      grouped[tipo].push(estudio);
    });
    
    return grouped;
  };

  const groupResultadosByPersona = (resultados: any[]) => {
    const grouped: { [key: string]: any[] } = {};
    
    resultados.forEach(resultado => {
      const persona = resultado.persona || 'PACIENTE';
      if (!grouped[persona]) {
        grouped[persona] = [];
      }
      grouped[persona].push(resultado);
    });
    
    return grouped;
  };

  const groupedEstudios = groupEstudiosByType(estudios);
  const groupedResultados = groupResultadosByPersona(resultadosEstudios);

  const getTypeIcon = (tipo: string) => {
    const icons: { [key: string]: string } = {
      'Hormonales': '🧪',
      'Prequirúrgicos': '🩺', 
      'Ginecológicos': '👩‍⚕️',
      'Semen': '🔬',
      'Otros': '📋'
    };
    return icons[tipo] || '📋';
  };

  const getTypeColor = (tipo: string) => {
    const colors: { [key: string]: string } = {
      'Hormonales': 'bg-blue-50 border-blue-200 text-blue-800',
      'Prequirúrgicos': 'bg-green-50 border-green-200 text-green-800',
      'Ginecológicos': 'bg-pink-50 border-pink-200 text-pink-800',
      'Semen': 'bg-purple-50 border-purple-200 text-purple-800',
      'Otros': 'bg-gray-50 border-gray-200 text-gray-800'
    };
    return colors[tipo] || 'bg-gray-50 border-gray-200 text-gray-800';
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-green-100 p-2">
          <FlaskConical className="h-5 w-5 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Estudios</h2>
      </div>

      <div className="space-y-6">
        {/* Órdenes Médicas */}
        {ordenes.length > 0 && (
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-medium text-gray-700">
              <FileText className="h-4 w-4 text-blue-500" />
              Órdenes Médicas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {ordenes.map((orden: any, index: number) => (
                <div key={index} className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-800 capitalize">
                      {orden.tipo_estudio}
                    </span>
                    {orden.pdf_url && (
                      <button
                        onClick={() => window.open(orden.pdf_url, '_blank')}
                        className="flex items-center gap-1 rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700"
                      >
                        <Download className="h-3 w-3" />
                        PDF
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-blue-600">
                    {formatDateShort(orden.fecha_creacion)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resultados de Estudios */}
        {resultadosEstudios.length > 0 && (
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-medium text-gray-700">
              <FlaskConical className="h-4 w-4 text-green-500" />
              Resultados de Estudios
            </h3>
            <div className="space-y-4">
              {Object.entries(groupedResultados).map(([persona, resultados]) => (
                <div key={persona} className="rounded-lg border border-gray-200 p-4">
                  <h4 className="mb-3 font-medium text-gray-800 capitalize">
                    {persona === 'PACIENTE' ? 'Paciente Principal' : 'Pareja/Acompañante'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {resultados.map((resultado: any, index: number) => (
                      <div key={index} className="rounded-lg bg-gray-50 p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">
                            {resultado.nombre_estudio}
                          </span>
                          {resultado.valor && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {resultado.valor || 'Pendiente'}
                        </p>
                        {resultado.tipo_estudio && (
                          <span className="inline-block mt-1 rounded bg-gray-200 px-2 py-1 text-xs text-gray-600">
                            {resultado.tipo_estudio}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Estudios programados legacy */}
      {Object.keys(groupedEstudios).length === 0 && resultadosEstudios.length === 0 && ordenes.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
          <FlaskConical className="mx-auto mb-3 h-12 w-12 text-gray-400" />
          <p className="text-gray-500">No hay estudios registrados</p>
        </div>
      ) : Object.keys(groupedEstudios).length > 0 && (
        <div className="space-y-6 mt-6">
          <h3 className="font-medium text-gray-700">Estudios Programados</h3>
          {Object.entries(groupedEstudios).map(([tipo, estudiosTipo]) => (
            <div key={tipo}>
              <div className={`mb-3 inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-sm font-medium ${getTypeColor(tipo)}`}>
                <span>{getTypeIcon(tipo)}</span>
                {tipo}
                <span className="ml-1 rounded bg-white bg-opacity-70 px-2 py-0.5 text-xs">
                  {estudiosTipo.length}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {estudiosTipo.map((estudio, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{estudio.nombre}</h4>
                        {estudio.descripcion && (
                          <p className="mt-1 text-xs text-gray-600">{estudio.descripcion}</p>
                        )}
                        {estudio.persona && (
                          <span className="mt-1 inline-block rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                            {estudio.persona}
                          </span>
                        )}
                      </div>
                      
                      {estudio.seleccionado !== undefined && (
                        <div className="ml-2">
                          {estudio.seleccionado ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    
                    {estudio.notas && (
                      <div className="mt-2 rounded bg-yellow-50 p-2">
                        <p className="text-xs text-yellow-800">{estudio.notas}</p>
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
          <h3 className="mb-2 font-medium text-blue-800">Resumen</h3>
          <div className="flex flex-wrap gap-4 text-sm text-blue-700">
            <span>Total de estudios: {estudios.length}</span>
            <span>Tipos: {Object.keys(groupedEstudios).length}</span>
            {estudios.some(e => e.seleccionado !== undefined) && (
              <>
                <span>Seleccionados: {estudios.filter(e => e.seleccionado).length}</span>
                <span>Pendientes: {estudios.filter(e => !e.seleccionado).length}</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}