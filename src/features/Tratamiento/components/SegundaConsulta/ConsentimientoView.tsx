import { FileCheck, Download, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { formatDate } from '@/shared/utils/dateUtils';

interface ConsentimientoViewProps {
  consentimiento?: string | null;
  fecha?: string;
}

export default function ConsentimientoView({ consentimiento, fecha }: ConsentimientoViewProps) {
  const handleDownload = () => {
    if (consentimiento) {
      // Crear enlace de descarga
      const link = document.createElement('a');
      link.href = consentimiento;
      link.download = `consentimiento_${fecha ? new Date(fecha).toISOString().split('T')[0] : 'documento'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-orange-100 p-2">
          <FileCheck className="h-5 w-5 text-orange-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Consentimiento Informado</h2>
      </div>

      {!consentimiento ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
          <FileCheck className="mx-auto mb-3 h-12 w-12 text-gray-400" />
          <p className="text-gray-500">No hay consentimiento informado adjunto</p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <XCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-600">Documento no subido</span>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Estado del documento */}
          <div className="rounded-lg bg-green-50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-800">Documento Adjuntado</h3>
                  <p className="text-sm text-green-600">
                    El consentimiento informado ha sido subido correctamente
                  </p>
                </div>
              </div>
              {fecha && (
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <Calendar className="h-4 w-4" />
                  {formatDate(fecha)}
                </div>
              )}
            </div>
          </div>

          {/* Información del documento */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-100 p-2">
                  <FileCheck className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Consentimiento Informado.pdf</h4>
                  <p className="text-sm text-gray-600">Documento legal firmado</p>
                </div>
              </div>
              
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                Descargar
              </button>
            </div>
          </div>

          {/* Información legal */}
          <div className="rounded-lg bg-blue-50 p-4">
            <h3 className="mb-2 font-medium text-blue-800">Información Legal</h3>
            <div className="space-y-2 text-sm text-blue-700">
              <p>
                • Este documento contiene la autorización expresa del/los paciente(s) para el tratamiento de reproducción asistida.
              </p>
              <p>
                • Se han explicado todos los procedimientos, riesgos y alternativas al paciente.
              </p>
              <p>
                • El documento ha sido firmado de manera voluntaria y con pleno conocimiento.
              </p>
            </div>
          </div>

          {/* Vista previa o enlace */}
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="mb-3 font-medium text-gray-800">Vista del Documento</h3>
            <div className="flex items-center justify-center rounded-lg bg-gray-100 p-8">
              <div className="text-center">
                <FileCheck className="mx-auto mb-2 h-12 w-12 text-gray-500" />
                <p className="text-gray-600">Documento PDF</p>
                <button
                  onClick={() => window.open(consentimiento, '_blank')}
                  className="mt-2 text-blue-600 hover:text-blue-800 underline"
                >
                  Ver documento completo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}