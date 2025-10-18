import { useState } from "react";
import { useGenerarOrden } from "../../../shared/hooks/useGenerarOrden";

interface GenerarRecetaConFirmaProps {
  tipo_estudio: string;
  determinaciones: { nombre: string }[];
}

export default function GenerarRecetaConFirma({ tipo_estudio, determinaciones }: GenerarRecetaConFirmaProps) {
  const [firma, setFirma] = useState<File | null>(null);
  const { generar, loading } = useGenerarOrden();

  const handleGenerar = async () => {
    const payload = {
      tipo_estudio,
      clinica_nombre: "Clínica Médica Integral",
      medico: {
        nombre: "Dra. Carla Méndez",
        matricula: "MP 8821",
      },
      paciente: {
        nombre: "Laura Fernández",
        dni: "40111222"
      },
      determinaciones
    };
    await generar({
      url: "https://srlgceodssgoifgosyoh.supabase.co/functions/v1/generar_orden_medica",
      payload,
      firma,
      nombreArchivo: "orden_medica.pdf"
    });
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
}
