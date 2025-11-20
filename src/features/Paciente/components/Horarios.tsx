import { type FC } from 'react';

// 💡 Interfaz para el slot de horario
interface HorarioSlot {
  id: number;
  hora: string; // HH:MM
}

interface HorariosProps {
  horarios: HorarioSlot[]; // 👈 Array de objetos {id, hora}
  onSelect: (turnoId: number | null) => void; // 👈 Devuelve el ID del turno
  loading: boolean;
  selectedTurnoId: number | null; // ID del turno actualmente seleccionado
}

const HorariosDisponibles: FC<HorariosProps> = ({
  horarios,
  onSelect,
  loading,
  selectedTurnoId,
}) => {
  const handleSelect = (slot: HorarioSlot) => {
    // Alternar la selección: si el turno clicado ya estaba seleccionado, lo deselecciona (null)
    const nuevoSeleccionadoId = slot.id === selectedTurnoId ? null : slot.id;
    onSelect(nuevoSeleccionadoId); // Notifica al componente padre
  };

  if (loading) {
    return <div className="py-4 text-center text-gray-500">Cargando horarios disponibles...</div>;
  }

  if (horarios.length === 0) {
    return (
      <div className="py-4 text-center text-gray-500">
        No hay turnos disponibles para esta fecha.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="border-b pb-2 text-lg font-semibold">Seleccione un Horario:</h3>

      {/* GRILLA: Muestra los horarios en múltiples columnas */}
      <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5">
        {horarios.map((slot) => (
          <button
            key={slot.id}
            onClick={() => handleSelect(slot)}
            disabled={loading}
            className={`rounded-lg border-2 p-2 text-sm font-medium transition ${
              // Resaltar si el ID del turno coincide con el seleccionado
              slot.id === selectedTurnoId
                ? 'scale-105 transform border-blue-600 bg-blue-600 text-white shadow-md'
                : // Estilo base
                  'border-gray-300 bg-white text-gray-800 hover:bg-gray-100'
            } ${loading ? 'cursor-not-allowed opacity-50' : ''} `}
          >
            {slot.hora}
          </button>
        ))}
      </div>

      {/* Indicador del horario seleccionado */}
      {selectedTurnoId && (
        <p className="pt-2 text-center text-sm font-medium text-blue-600">
          Turno seleccionado: {horarios.find((h) => h.id === selectedTurnoId)?.hora}
        </p>
      )}
    </div>
  );
};

export default HorariosDisponibles;
