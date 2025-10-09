import type { FC } from "react";

interface HorariosDisponiblesProps {
  horarios: string[];
  onSelect: (hora: string) => void;
}

const HorariosDisponibles: FC<HorariosDisponiblesProps> = ({ horarios, onSelect }) => {
  if (horarios.length === 0) {
    return <p className="text-gray-500 mt-3">No hay horarios disponibles para esta fecha.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
      {horarios.map((hora) => (
        <button
          key={hora}
          onClick={() => onSelect(hora)}
          className="border rounded-lg p-2 hover:bg-blue-500 hover:text-white transition"
        >
          {hora}
        </button>
      ))}
    </div>
  );
};

export default HorariosDisponibles;