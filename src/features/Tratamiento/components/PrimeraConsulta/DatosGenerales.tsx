import { User, Calendar, Target } from 'lucide-react';
import { formatDate } from '@/shared/utils/dateUtils';

interface DatosGeneralesProps {
  objetivo: string;
  fecha: string;
  medico:
    | {
        nombre: string;
        apellido: string;
        matricula: string;
      }
    | string;
  consultaId?: number;
}

const mapObjetivo = (objetivo: string) => {
  const objetivos: { [key: string]: string } = {
    mujer_sola_donacion: 'Mujer sola con donación',
    pareja_heterosexual: 'Pareja heterosexual',
    pareja_femenina_donacion: 'Pareja femenina (donación)',
    pareja_femenina_ropa: 'Pareja femenina (ROPA)',
    'Evaluación inicial para tratamiento de fertilidad':
      'Evaluación inicial para tratamiento de fertilidad',
  };
  return objetivos[objetivo] || objetivo;
};

export default function DatosGenerales({
  objetivo,
  fecha,
  medico,
  consultaId,
}: DatosGeneralesProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-blue-100 p-2">
          <User className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Información General</h2>
        {consultaId && (
          <span className="ml-auto rounded bg-blue-100 px-3 py-1 text-sm text-blue-700">
            Consulta #{consultaId}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Objetivo */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <Target className="h-4 w-4" />
            <span className="text-sm font-medium">Objetivo del Tratamiento</span>
          </div>
          <div className="rounded-lg bg-blue-50 p-3">
            <p className="font-medium text-blue-800">{mapObjetivo(objetivo)}</p>
          </div>
        </div>

        {/* Fecha */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">Fecha de Consulta</span>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="font-medium text-gray-800">{formatDate(fecha)}</p>
          </div>
        </div>

        {/* Médico */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <User className="h-4 w-4" />
            <span className="text-sm font-medium">Médico Tratante</span>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="font-medium text-gray-800">
              {typeof medico === 'string'
                ? medico
                : `Dr. ${medico?.nombre || ''} ${medico?.apellido || ''}`}
            </p>
            {typeof medico === 'object' && medico?.matricula && (
              <p className="text-sm text-gray-600">Mat. {medico.matricula}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
