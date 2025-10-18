import React, { useState } from "react";
import axios from "axios";

const GenerarRecetaConFirma: React.FC = () => {
  const [firma, setFirma] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerar = async () => {
    try {
      setLoading(true);

      // 🩺 Datos simulados
      const payload = {
        tipo_estudio: "Ecografía transvaginal",
        clinica_nombre: "Clínica Médica Integral",
        medico: {
          nombre: "Dra. Carla Méndez",
          matricula: "MP 8821",
        },
        paciente: {
          nombre: "Laura Fernández",
          dni: "40111222"
        },
        determinaciones: [
          { nombre: "Evaluación folicular" },
          { nombre: "Espesor endometrial" },
          { nombre: "Presencia de líquido libre" }
        ]

      };

      // 🔧 Armar form-data con JSON + archivo de firma
      const formData = new FormData();
      const url = "https://srlgceodssgoifgosyoh.supabase.co/functions/v1/generar_orden_medica";
      formData.append("payload", JSON.stringify(payload));
      console.log("📦 Payload enviado:", JSON.stringify(payload));
      if (firma) formData.append("firma_medico", firma);

      // 🌐 Llamada al endpoint de Supabase
      const response = await fetch(url, {
          method: "POST",
          body: formData
      });
      const blob = await response.blob();
      const urlBlob = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = urlBlob;
      a.download = "orden_medica.pdf";
      a.click();

     
    
      // Abrir en nueva pestaña
     

    } catch (err: any) {
      console.error("❌ Error generando PDF:", err);
      alert(`Error generando PDF: ${err.response?.status || "desconocido"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white text-black border border-black rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        🧾 Probar generación de receta (smart-task)
      </h2>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Subir firma del médico (.png):</label>
        <input
          type="file"
          accept="image/png"
          onChange={(e) => setFirma(e.target.files?.[0] ?? null)}
          className="w-full border border-black rounded p-2"
        />
      </div>

      <button
        onClick={handleGenerar}
        disabled={loading}
        className={`w-full py-2 font-bold rounded ${
          loading ? "bg-gray-400" : "bg-black hover:bg-gray-800 text-white"
        }`}
      >
        {loading ? "Generando PDF..." : "Generar PDF"}
      </button>
    </div>
  );
};

export default GenerarRecetaConFirma;
