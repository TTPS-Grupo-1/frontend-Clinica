import { useEffect, useState } from "react";
import axios from "axios";
import { FlaskConical, Syringe, Paperclip, Calendar, ArrowLeft, CheckCircle } from "lucide-react";
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
  const [estudiosAgrupados, setEstudiosAgrupados] = useState<any[]>([]);
  const [dataConsulta, setDataConsulta] = useState({
    estudios: [],
    protocolo: {},
    consentimientoPDF: null,
    monitoreo: [],
  });

  const pacienteId = 1; // 🔹 temporal, luego vendrá desde el turno

  // Manejar cambio desde subcomponentes
  const handleDataChange = (section: string, data: any) => {
    setDataConsulta((prev) => ({ ...prev, [section]: data }));
  };

  const handleAbrir = (seccion: string) => {
    setSeccionActiva((prev) => (prev === seccion ? null : seccion));
  };

  // 📡 Obtener tratamiento y datos asociados
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tratamientoData = await getTratamientoByPaciente(pacienteId);
        setTratamiento(tratamientoData);
        localStorage.setItem("tratamiento_id", tratamientoData.id);

        if (tratamientoData.primera_consulta) {
          const consultaData = await getPrimeraConsultaById(tratamientoData.primera_consulta);
          const estudiosData = await getEstudiosAgrupadosPorConsulta(tratamientoData.primera_consulta);
          setEstudiosAgrupados(estudiosData.estudios);
        }
      } catch (err: any) {
        setError(err.response?.data?.detail || "No se pudo cargar la información del tratamiento");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🔹 Confirmar toda la segunda consulta
  const handleConfirmar = async () => {
    try {
      const tratamientoId = localStorage.getItem("tratamiento_id");
      const formData = new FormData();

      formData.append("tratamiento_id", tratamientoId || "");
      formData.append("protocolo", JSON.stringify(dataConsulta.protocolo));
      formData.append("monitoreo", JSON.stringify(dataConsulta.monitoreo));
      formData.append("estudios", JSON.stringify(dataConsulta.estudios));

      if (dataConsulta.consentimientoPDF) {
        formData.append("consentimiento", dataConsulta.consentimientoPDF);
      }
      console.log("🧾 Datos que se enviarán al backend:");
      for (const [key, value] of formData.entries()) {
        console.log(`📦 ${key}:`, value);
      }

      await axios.post("/api/segunda_consulta/confirmar/", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Segunda consulta registrada correctamente.");
    } catch (err: any) {
      console.error("❌ Error al confirmar:", err);
      alert("Error al guardar la segunda consulta.");
    }
  };

  if (loading)
    return <div className="text-center text-gray-500 mt-10">Cargando información...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-6 border border-gray-200">
      <button
        onClick={() => (window.location.href = "/medico/home")}
        className="flex items-center gap-2 px-4 py-2 mb-4 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver al home
      </button>

      <h2 className="text-2xl font-bold text-blue-700 text-center mb-2">
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
      {seccionActiva === "estudios" && (
        <SeccionEstudios
          estudiosAgrupados={estudiosAgrupados}
          onDataChange={(data: any) => handleDataChange("estudios", data)}
        />
      )}
      {seccionActiva === "protocolo" && (
        <SeccionProtocolo onDataChange={(data: any) => handleDataChange("protocolo", data)} />
      )}
      {seccionActiva === "consentimiento" && (
        <SeccionConsentimiento
          onDataChange={(file) => handleDataChange("consentimientoPDF", file)}
      />
      )}
      {seccionActiva === "monitoreo" && (
        <SeccionMonitoreo onDataChange={(data: any) => handleDataChange("monitoreo", data)} />
      )}

      {/* Botón Confirmar final */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleConfirmar}
          disabled={!dataConsulta.consentimientoPDF}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-md ${
            dataConsulta.consentimientoPDF
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <CheckCircle className="w-5 h-5" />
          Confirmar Segunda Consulta
        </button>
      </div>
    </div>
  );
}

export default SegundaConsulta;
