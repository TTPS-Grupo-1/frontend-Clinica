import type { TurnoCardProps } from '../../../interfaces/Paciente';
import { CircleX, Stethoscope, Repeat2 } from 'lucide-react';

export default function TurnoCard({ turno, onCancelar, onReasignar }: TurnoCardProps) {
  return (
    <div className="flex min-h-[260px] flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-shadow duration-200 hover:shadow-xl">
      {/* Información del turno */}
      <div className="mb-4 flex flex-col items-center">
        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 shadow">
          <Stethoscope className="h-10 w-10 text-blue-600" />
        </div>

        <h3 className="mb-1 text-center text-lg font-bold text-blue-700">{turno.medico}</h3>

        {turno.especialidad && <p className="text-sm text-blue-500">{turno.especialidad}</p>}
      </div>

      <div className="mb-4 text-center">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Fecha:</span>{' '}
          <span className="font-semibold text-blue-700">{turno.fecha}</span>
        </p>

        <p className="text-sm text-gray-700">
          <span className="font-medium">Hora:</span>{' '}
          <span className="font-semibold text-blue-700">{turno.hora}</span>
        </p>
      </div>

      {/* Botones uno al lado del otro */}
      <div className="mt-auto flex flex-row justify-center gap-3">
        {/* BOTÓN DE REASIGNAR */}
        {turno.es_monitoreo && (
          <button
            onClick={() => onReasignar(turno.id)}
            className="flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2 font-semibold text-white shadow transition-all hover:scale-105 hover:from-blue-600 hover:to-blue-800"
          >
            Reasignar
            <Repeat2 size={16} />
          </button>
        )}

        {/* BOTÓN CANCELAR */}
        <button
          onClick={() => onCancelar(turno.id)}
          className="flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-red-500 to-red-700 px-4 py-2 font-semibold text-white shadow transition-all hover:scale-105 hover:from-red-600 hover:to-red-800"
        >
          Cancelar
          <CircleX size={16} />
        </button>
      </div>
    </div>
  );
}
