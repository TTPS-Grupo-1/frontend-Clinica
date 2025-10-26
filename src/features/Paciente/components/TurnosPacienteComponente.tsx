import type { TurnoCardProps } from "../../../interfaces/Paciente";
import { CircleX, Stethoscope } from "lucide-react";
export default function TurnoCard({ turno, onCancelar }: TurnoCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 border border-gray-100 flex flex-col justify-between min-h-[260px]">
      {/* Información del turno */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 shadow">
          <Stethoscope className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-lg font-bold text-blue-700 text-center mb-1">
          {turno.medico}
        </h3>
        {turno.especialidad && (
          <p className="text-sm text-blue-500">{turno.especialidad}</p>
        )}
      </div>
      <div className="mb-4 text-center">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Fecha:</span> <span className="text-blue-700 font-semibold">{turno.fecha}</span>
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Hora:</span> <span className="text-blue-700 font-semibold">{turno.hora}</span>
        </p>
      </div>
      {/* Botón cancelar */}
      <div className="flex flex-col gap-2 mt-auto">
        <button
          onClick={() => onCancelar(turno.id)}
          className="mx-auto flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-700 text-white border-none py-2 px-6 rounded-md font-semibold hover:scale-105 hover:from-red-600 hover:to-red-800 transition-all shadow"
        >
          Cancelar Turno
          <CircleX size={18} />
        </button>
      </div>
    </div>
  );
}