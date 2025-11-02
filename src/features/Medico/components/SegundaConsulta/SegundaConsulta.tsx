import { useEffect, useState } from "react";
import axios from "axios";
import { FlaskConical, Syringe, Paperclip, Calendar } from "lucide-react";
import SeccionEstudios from "./SeccionEstudios";
import SeccionProtocolo from "./SeccionProtocolo";
import SeccionConsentimiento from "./SeccionConsentimiento";
import SeccionMonitoreo from "./SeccionMonitoreo";
import { getTratamientoByPaciente, getPrimeraConsultaById, getEstudiosAgrupadosPorConsulta } from "./consultasService";

function SegundaConsulta() {
  const [seccionActiva, setSeccionActiva] = useState<string | null>(null);
  const [tratamiento, setTratamiento] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [primeraConsulta, setPrimeraConsulta] = useState<any>(null);

  // 🔹 Por ahora paciente hardcodeado, después lo vas a recibir del turno
  const pacienteId = 1;

  const handleAbrir = (seccion: string) => {
    setSeccionActiva((prev) => (prev === seccion ? null : seccion));
  };

  // 📡 Obtener tratamiento y primera consulta
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Obtener tratamiento
        const tratamientoData = await getTratamientoByPaciente(pacienteId);
        console.log("🧬 Tratamiento obtenido:", tratamientoData);
        setTratamiento(tratamientoData);
        localStorage.setItem("tratamiento_id", tratamientoData.id);

        // 2️⃣ Si hay una primera consulta asociada, obtenerla
        if (tratamientoData.primera_consulta) {
          const consultaData = await getPrimeraConsultaById(tratamientoData.primera_consulta);
          console.log("🧾 Primera consulta:", consultaData);
          setPrimeraConsulta(consultaData);
          // 🔹 Nuevo: obtener estudios asociados
          const estudiosData = await getEstudiosAgrupadosPorConsulta(tratamientoData.primera_consulta);
          console.log("🧪 Estudios agrupados:", estudiosData);
        }
      } catch (err: any) {
        console.error("❌ Error obteniendo tratamiento o consulta:", err);
        setError(err.response?.data?.detail || "No se pudo cargar la información del tratamiento");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-center text-gray-500 mt-10">
        Cargando información del tratamiento...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        {error}
      </div>
    );

 

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">
        Segunda Consulta
      </h2>

      <p className="text-gray-600 text-center mb-6">
        Aquí podés cargar estudios, registrar el protocolo de estimulación, subir el consentimiento informado y definir el monitoreo.
      </p>

     
      {/* Botones principales */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
        <button
          onClick={() => handleAbrir("estudios")}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-sm border ${
            seccionActiva === "estudios"
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          <FlaskConical className="w-5 h-5" />
          Cargar estudios
        </button>

        <button
          onClick={() => handleAbrir("protocolo")}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-sm border ${
            seccionActiva === "protocolo"
              ? "bg-green-600 text-white"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          <Syringe className="w-5 h-5" />
          Registrar protocolo
        </button>

        <button
          onClick={() => handleAbrir("consentimiento")}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-sm border ${
            seccionActiva === "consentimiento"
              ? "bg-purple-600 text-white"
              : "bg-purple-100 text-purple-700 hover:bg-purple-200"
          }`}
        >
          <Paperclip className="w-5 h-5" />
          Subir consentimiento
        </button>

        <button
          onClick={() => handleAbrir("monitoreo")}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-sm border ${
            seccionActiva === "monitoreo"
              ? "bg-orange-600 text-white"
              : "bg-orange-100 text-orange-700 hover:bg-orange-200"
          }`}
        >
          <Calendar className="w-5 h-5" />
          Monitoreo estimulación
        </button>
      </div>

      {/* Secciones dinámicas */}
      {seccionActiva === "estudios" && <SeccionEstudios />}
      {seccionActiva === "protocolo" && <SeccionProtocolo />}
      {seccionActiva === "consentimiento" && <SeccionConsentimiento />}
      {seccionActiva === "monitoreo" && <SeccionMonitoreo />}
    </div>
  );
}

export default SegundaConsulta;
