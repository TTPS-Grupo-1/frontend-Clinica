import type { PacientCardProps } from "../../../interfaces/Medico";
export default function PacientCard({ paciente, onAtender, onVerHistoria }: PacientCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Silueta de persona */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-3">
          <svg
            className="w-10 h-10 text-gray-600"
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
        <h3 className="text-lg font-semibold text-gray-900 text-center">
          {(paciente.first_name ? paciente.first_name : "Paciente") + (paciente.last_name ? " " + paciente.last_name : "")}
        </h3>
      </div>

      {/* Información del turno */}
      <div className="mb-4 text-center">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Fecha:</span> {paciente.fechaTurno}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Hora:</span> {paciente.horaTurno}
        </p>
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => onAtender(paciente.id)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Atender
        </button>
        <button
          onClick={() => onVerHistoria(paciente.id)}
          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors duration-200 font-medium"
        >
          Ver Historia Clínica
        </button>
      </div>
    </div>
  );
}
