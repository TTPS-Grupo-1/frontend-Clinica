import type { PacientCardProps, PacientCardOptions } from '../../../interfaces/Medico';

type Props = PacientCardProps & Partial<PacientCardOptions>;

export default function PacientCard({
  paciente,
  onAtender,
  onVerHistoria,
  onRealizarSeguimiento,
  showAtender = true,
  showSeguimiento = false,
}: Props) {
  // 💡 showSeguimiento debe tener un valor por defecto

  // ⚠️ Nota: Asumimos que onVerHistoria también es opcional,
  // aunque no tiene Partial, usaremos ?. por seguridad.

  return (
    <div className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
      {/* Silueta de persona */}
      <div className="mb-4 flex flex-col items-center">
        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-300">
          <svg
            className="h-10 w-10 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Información del paciente */}
        <h3 className="text-center text-lg font-semibold text-gray-900">
          {(paciente.first_name ? paciente.first_name : 'Paciente') +
            (paciente.last_name ? ' ' + paciente.last_name : '')}
        </h3>
      </div>

      {/* Información del turno */}
      {showAtender ? (
        <div className="mb-4 text-center">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Fecha:</span> {paciente.fechaTurno}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Hora:</span> {paciente.horaTurno}
          </p>
        </div>
      ) : null}

      {/* 🚨 Botones de Acción (Resuelto el conflicto y ordenado) */}
      <div className="flex flex-col gap-2">
        {/* 1. Botón ATENDER */}
        {showAtender ? (
          <button
            onClick={() => onAtender?.(paciente.id)}
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
          >
            Atender
          </button>
        ) : null}

        {/* 2. Botón REALIZAR SEGUIMIENTO (Condicional) */}
        {showSeguimiento ? (
          <button
            onClick={() => onRealizarSeguimiento?.(paciente.id)}
            className="w-full rounded-md bg-purple-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-purple-700"
          >
            Realizar Seguimiento
          </button>
        ) : null}

        {/* 3. Botón VER HISTORIA CLÍNICA */}
        {/* 💡 Combinación de las dos versiones del botón de Ver Historia */}
        {onVerHistoria && (
          <button
            onClick={() => onVerHistoria?.(paciente.id)}
            className="w-full rounded-md bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200"
          >
            Ver Historia Clínica
          </button>
        )}
      </div>
    </div>
  );
}
