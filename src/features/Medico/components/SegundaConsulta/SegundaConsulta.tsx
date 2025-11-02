import { useEffect, useState } from "react";
import axios from "axios";
import { FlaskConical, Syringe, Paperclip, Calendar, ArrowLeft } from "lucide-react";
import SeccionEstudios from "./SeccionEstudios";
import SeccionProtocolo from "./SeccionProtocolo";
import SeccionConsentimiento from "./SeccionConsentimiento";
import SeccionMonitoreo from "./SeccionMonitoreo";
import { getTratamientoByPaciente, getPrimeraConsultaById, getEstudiosAgrupadosPorConsulta } from "./consultasService";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SECCIONES = [
  { key: "estudios", label: "Cargar estudios", icon: FlaskConical },
  { key: "protocolo", label: "Registrar protocolo", icon: Syringe },
  { key: "consentimiento", label: "Subir consentimiento", icon: Paperclip },
  { key: "monitoreo", label: "Monitoreo estimulación", icon: Calendar },
];

export default function SegundaConsulta() {
  const { pacienteId } = useParams();
  const pacienteIdNum = Number(pacienteId);
  const [step, setStep] = useState(0);
  const [tratamiento, setTratamiento] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [primeraConsulta, setPrimeraConsulta] = useState<any>(null);
  const [estudiosAgrupados, setEstudiosAgrupados] = useState<any[]>([]);

  // Fetch tratamiento y primera consulta
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tratamientoData = await getTratamientoByPaciente(pacienteIdNum);
        setTratamiento(tratamientoData);
        localStorage.setItem("tratamiento_id", tratamientoData.id);
        if (tratamientoData.primera_consulta) {
          const consultaData = await getPrimeraConsultaById(tratamientoData.primera_consulta);
          setPrimeraConsulta(consultaData);
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
  }, [pacienteIdNum]);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, SECCIONES.length - 1));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  const SeccionActual = () => {
    switch (SECCIONES[step].key) {
      case "estudios":
        return <SeccionEstudios estudiosAgrupados={estudiosAgrupados} />;
      case "protocolo":
        return <SeccionProtocolo />;
      case "consentimiento":
        return <SeccionConsentimiento />;
      case "monitoreo":
        return <SeccionMonitoreo />;
      default:
        return null;
    }
  };

  if (loading)
    return (
      <div className="text-center text-gray-500 mt-10">
        <div className="animate-pulse">Cargando información del tratamiento...</div>
        <button
          onClick={() => window.location.href = '/medico/home'}
          className="flex items-center gap-2 px-4 py-2 mt-4 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al home
        </button>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center mt-10 p-4 border border-red-300 bg-red-50 text-red-700 rounded-lg max-w-md mx-auto">
        <p className="font-semibold text-center">{error}</p>
        <button
          onClick={() => window.location.href = '/medico/home'}
          className="flex items-center gap-2 px-4 py-2 mt-4 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al home
        </button>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-6 border border-gray-200">
      <button
        onClick={() => window.location.href = '/medico/home'}
        className="flex items-center gap-2 px-4 py-2 mb-4 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver al home
      </button>

      <div className="flex items-center justify-center gap-4 mb-6">
        {SECCIONES.map((sec, idx) => {
          const Icon = sec.icon;
          const isActive = step === idx;
          return (
            <div
              key={sec.key}
              className={`flex flex-col items-center transition-all duration-300 ${
                isActive ? "scale-110 text-blue-600" : "text-gray-400"
              }`}
            >
              <Icon className={`w-7 h-7 mb-1 ${isActive ? "" : "opacity-60"}`} />
              <span className={`text-xs font-medium ${isActive ? "text-blue-600" : "text-gray-400"}`}>{sec.label}</span>
              <div className={`w-2 h-2 rounded-full mt-1 ${isActive ? "bg-blue-600" : "bg-gray-300"}`}></div>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
        >
          <SeccionActual />
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrev}
          disabled={step === 0}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            step === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          disabled={step === SECCIONES.length - 1}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            step === SECCIONES.length - 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

