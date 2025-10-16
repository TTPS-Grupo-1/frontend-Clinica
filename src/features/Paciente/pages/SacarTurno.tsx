import { useState } from "react";
import SelectMedico from "../components/SelectorMedicos";
import Calendario from "../components/Calendario";
import HorariosDisponibles from "../components/Horarios";

const SacarTurno = () => {
  const [medico, setMedico] = useState("");
  const [fecha, setFecha] = useState<Date | undefined>();
  const [horarioSeleccionado, setHorarioSeleccionado] = useState<string | null>(null);

  const horariosMock = ["09:00", "09:30", "10:00", "10:30", "11:00"];

  const handleConfirmar = () => {
    if (!medico || !fecha || !horarioSeleccionado) {
      alert("Debe seleccionar médico, fecha y horario.");
      return;
    }
    alert(`Turno confirmado con ${medico} el ${fecha.toLocaleDateString()} a las ${horarioSeleccionado}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center pt-[80px]">
      <h1 className="text-2xl font-bold mb-6">Sacar Turno</h1>

      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg space-y-6">
        <SelectMedico selected={medico} onChange={setMedico} />
        <Calendario selected={fecha} onSelect={setFecha} />

        {fecha && (
          <HorariosDisponibles horarios={horariosMock} onSelect={setHorarioSeleccionado} />
        )}

        {horarioSeleccionado && (
          <button
            onClick={handleConfirmar}
            className="mx-auto flex items-center justify-center gap-2 bg-white text-black border border-gray-400 py-2 px-6 rounded-md font-medium hover:bg-gray-100 transition"
          >
            Confirmar Turno
          </button>
        )}
      </div>
    </div>
  );
};

export default SacarTurno;