import type { TurnoCardProps } from "../../../interfaces/Paciente";
import { CircleX } from "lucide-react";

export default function TurnoCard({ turno, onCancelar }: TurnoCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Información del turno */}
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

        <h3 className="text-lg font-semibold text-gray-900 text-center">
          {turno.medico}
        </h3>
        {turno.especialidad && (
          <p className="text-sm text-gray-600">{turno.especialidad}</p>
        )}
      </div>

      <div className="mb-4 text-center">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Fecha:</span> {turno.fecha}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Hora:</span> {turno.hora}
        </p>
      </div>

      {/* Botón cancelar */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => onCancelar(turno.id)} className="mx-auto flex items-center justify-center gap-2 bg-white text-black border border-gray-400 py-2 px-6 rounded-md font-medium hover:bg-gray-100 transition">
          Cancelar Turno
          <CircleX size={18} />
        </button>
      </div>
    </div>
  );
}