import { useEffect, useState } from "react";
import SelectMedico from "../components/SelectorMedicos";
import Calendario from "../components/Calendario";
import HorariosDisponibles from "../components/Horarios";
import { toast, Toaster } from "react-hot-toast";

interface Medico {
  id: number;
  nombre: string;
  apellido: string;
  dni: number;
}

const SacarTurno = () => {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [medico, setMedico] = useState("");
  const [fecha, setFecha] = useState<Date | undefined>();
  const [horarioSeleccionado, setHorarioSeleccionado] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const horariosMock = ["09:00", "09:30", "10:00", "10:30", "11:00"]; // Por ahora hardcodeados

  // Se cargan los médicos en el selector
  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/medicos/");
        if (!res.ok) throw new Error("Error al obtener médicos");
        const data = await res.json();
        setMedicos(data);
      } catch (err) {
        console.error("Error al cargar médicos:", err);
        alert("No se pudieron cargar los médicos");
      }
    };

    fetchMedicos();
  }, []);

  // Handle para confirmar el turno
  const handleConfirmar = async () => {
    console.log("Valor del estado 'medico' al confirmar:", medico);
    if (!medico || !fecha || !horarioSeleccionado) {
      alert("Debe seleccionar médico, fecha y horario.");
      return;
    }

    setLoading(true);

    try {
      const body = {
        medico: parseInt(medico), // Id del médico
        paciente: 1,             // Hardcodeado a 1
        fecha: fecha.toISOString().split("T")[0], // YYYY-MM-DD
        hora: horarioSeleccionado,                // HH:MM
      };

      const res = await fetch("http://127.0.0.1:8000/api/turnos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const contentType = res.headers.get("content-type");
        let errorMessage = `Error ${res.status}: ${res.statusText}.`;

        if (contentType && contentType.includes("application/json")) {
          const errData = await res.json();
          console.error("Detalles del error (JSON del Backend):", errData);
          
          if (errData.message) {
            errorMessage = errData.message;
          } 
          else if (errData.errors) {
            const fieldErrors = Object.keys(errData.errors)
              .map(field => 
                `${field}: ${errData.errors[field].join(' ')}`
              ).join(' | ');
            
            errorMessage = `Error de validación: ${fieldErrors}`;
          } 
          // 3. Mostrar el JSON si no se puede formatear
          else {
            errorMessage = JSON.stringify(errData);
          }
        } else {
          // Respuesta no-JSON (HTML/Texto)
          console.error("El servidor devolvió respuesta no-JSON (HTML/Texto)");
          errorMessage = `Error ${res.status}. Posible problema de servidor (revisar logs de Django).`;
        }

        // Lanzar un error con el mensaje detallado capturado
        throw new Error(errorMessage);
      }

      // Código de éxito
      const successData = await res.json();
      toast.success(successData.message || "Turno registrado exitosamente");
      setMedico("");
      setFecha(undefined);
      setHorarioSeleccionado(null);

    } catch (err) {
      console.error("Error al confirmar:", err);
      // Mostrar el mensaje de error capturado en el catch
      toast.error((err as Error).message || "Ocurrió un error al registrar el turno");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center pt-[80px]">
      <h1 className="text-2xl font-bold mb-6">Sacar Turno</h1>
      <Toaster position="top-center" />
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg space-y-6">
        <SelectMedico
          medicos={medicos.map((m) => ({
            id: m.dni,
            nombre: `${m.nombre} ${m.apellido}`,
          }))}
          selected={medico}
          onChange={setMedico}
        />

        <Calendario selected={fecha} onSelect={setFecha} />

        {fecha && (
          <HorariosDisponibles horarios={horariosMock} onSelect={setHorarioSeleccionado} />
        )}

        {horarioSeleccionado && (
          <button
            onClick={handleConfirmar}
            disabled={loading}
            className={`mx-auto flex items-center justify-center gap-2 border py-2 px-6 rounded-md font-medium transition ${
              loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-black border-gray-400 hover:bg-gray-100"
            }`}
          >
            {loading ? "Guardando..." : "Confirmar Turno"}
          </button>
        )}
      </div>
    </div>
  );
};

export default SacarTurno;