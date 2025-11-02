import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FlaskConical,
  Syringe,
  Paperclip,
  Calendar,
  ClipboardCheck,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import SeccionEstudios from "./SeccionEstudios";
import SeccionProtocolo from "./SeccionProtocolo";
import SeccionConsentimiento from "./SeccionConsentimiento";
import SeccionMonitoreo from "./SeccionMonitoreo";
import SeccionConclusion from "./SeccionConclusion";
import {
  getTratamientoByPaciente,
  getEstudiosAgrupadosPorConsulta,
} from "./consultasService";

const SECCIONES = [
  { key: "estudios", label: "Cargar estudios", icon: FlaskConical },
  { key: "protocolo", label: "Registrar protocolo", icon: Syringe },
  { key: "consentimiento", label: "Subir consentimiento", icon: Paperclip },
  { key: "monitoreo", label: "Monitoreo estimulación", icon: Calendar },
  { key: "conclusion", label: "Conclusión", icon: ClipboardCheck },
];

const SegundaConsulta: React.FC = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [estudiosAgrupados, setEstudiosAgrupados] = useState<any[]>([]);

  // 🧩 Estado general, igual que en ObjetivoParejaFemeninaRopa
  const [formData, setFormData] = useState({
    estudios: {},
    protocolo: {},
    consentimientoPDF: null as File | null,
    monitoreo: [],
    conclusion: { ovocitoViable: false, semenViable: false },
  });

  // 🔁 Actualizar secciones
  const handleSectionChange = (key: string, data: any) => {
    setFormData((prev) => ({ ...prev, [key]: data }));
  };

  // 📡 Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pacienteId = 1;
        const tratamiento = await getTratamientoByPaciente(pacienteId);
        localStorage.setItem("tratamiento_id", tratamiento.id);

        if (tratamiento.primera_consulta) {
          const estudiosData = await getEstudiosAgrupadosPorConsulta(
            tratamiento.primera_consulta
          );
          setEstudiosAgrupados(estudiosData.estudios);
        }
      } catch (err: any) {
        setError(
          err.response?.data?.detail || "Error cargando información del tratamiento"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🧾 Confirmar consulta
  const handleConfirmar = async () => {
    try {
      const form = new FormData();
      const tratamientoId = localStorage.getItem("tratamiento_id");
      form.append("tratamiento_id", tratamientoId || "");
      form.append("protocolo", JSON.stringify(formData.protocolo));
      form.append("monitoreo", JSON.stringify(formData.monitoreo));
      form.append("estudios", JSON.stringify(formData.estudios));
      form.append("conclusion", JSON.stringify(formData.conclusion));
      if (formData.consentimientoPDF)
        form.append("consentimiento", formData.consentimientoPDF);

      console.log("📤 Enviando:", Object.fromEntries(form));
      await axios.post("/api/segunda_consulta/confirmar/", form, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Segunda consulta registrada correctamente.");
    } catch (err) {
      console.error(err);
      alert("❌ Error al guardar la segunda consulta.");
    }
  };

  // 🧱 Determina qué sección renderizar
  const renderSeccion = () => {
    switch (SECCIONES[step].key) {
      case "estudios":
        return (
          <SeccionEstudios
            estudiosAgrupados={estudiosAgrupados}
            onDataChange={(data) => handleSectionChange("estudios", data)}
          />
        );
      case "protocolo":
        return (
          <SeccionProtocolo
            initialData={formData.protocolo}
            onDataChange={(data) => handleSectionChange("protocolo", data)}
          />
        );
      case "consentimiento":
        return (
          <SeccionConsentimiento
            onDataChange={(file) => handleSectionChange("consentimientoPDF", file)}
          />
        );
      case "monitoreo":
        return (
          <SeccionMonitoreo
            initialData={formData.monitoreo}
            onDataChange={(data) => handleSectionChange("monitoreo", data)}
          />
        );
      case "conclusion":
        return (
          <SeccionConclusion
            initialData={formData.conclusion}
            onDataChange={(data) => handleSectionChange("conclusion", data)}
          />
        );
      default:
        return null;
    }
  };

  if (loading)
    return (
      <div className="text-center text-gray-500 mt-10">
        Cargando información...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        {error}
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
      <button
        onClick={() => (window.location.href = "/medico/home")}
        className="flex items-center gap-2 px-4 py-2 mb-4 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver al home
      </button>

      {/* Pasos */}
      <div className="flex justify-center gap-4 mb-6">
        {SECCIONES.map((sec, idx) => {
          const Icon = sec.icon;
          const active = step === idx;
          return (
            <div
              key={sec.key}
              className={`flex flex-col items-center ${
                active ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{sec.label}</span>
              <div
                className={`w-2 h-2 rounded-full mt-1 ${
                  active ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Sección actual */}
      <div className="min-h-[300px]">{renderSeccion()}</div>

      {/* Navegación */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep((p) => Math.max(p - 1, 0))}
          disabled={step === 0}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            step === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          Anterior
        </button>

        {step < SECCIONES.length - 1 ? (
          <button
            onClick={() => setStep((p) => Math.min(p + 1, SECCIONES.length - 1))}
            className="px-4 py-2 rounded-lg font-semibold bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all"
          >
            Siguiente
          </button>
        ) : (
          <button
            onClick={handleConfirmar}
            disabled={!formData.consentimientoPDF}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-md ${
              formData.consentimientoPDF
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            Confirmar Segunda Consulta
          </button>
        )}
      </div>
    </div>
  );
};

export default SegundaConsulta;
