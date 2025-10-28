import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function MonitoreosPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // 🔴 HARDCODEADO: IDs de prueba
  const pacienteId = searchParams.get("pacienteId") || "1"; // 👈 Hardcodeado como 1
  const pacienteNombre = searchParams.get("pacienteNombre") || "Paciente de Prueba";
  const numeroMonitoreo = searchParams.get("numeroMonitoreo") || "1";
  
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!descripcion.trim()) {
      toast.error("La descripción es requerida");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        descripcion: descripcion.trim(),
        paciente: parseInt(pacienteId), // ID del paciente (hardcodeado)
        medico: 2, // 👈 ID del médico (hardcodeado)
        numero_monitoreos: parseInt(numeroMonitoreo)
      };

      console.log("📤 Enviando datos:", payload);

      const response = await axios.post(
        "http://localhost:8000/api/monitoreo/monitoreos/",
        payload
      );

      console.log("✅ Respuesta:", response.data);
      toast.success("Monitoreo guardado exitosamente");
      
      setTimeout(() => {
        navigate(-1); // Volver a la página anterior
      }, 2000);

    } catch (error: any) {
      console.error("❌ Error completo:", error);
      console.error("❌ Error response:", error.response?.data);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.errors ||
                          "Error al guardar el monitoreo";
      
      toast.error(typeof errorMessage === 'string' 
        ? errorMessage 
        : JSON.stringify(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <main className="pt-28 flex flex-col items-center min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      
      <div className="w-full max-w-2xl px-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Monitoreo de {pacienteNombre}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Información del monitoreo */}
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-sm text-gray-600">
                <strong>Número de monitoreo:</strong> {numeroMonitoreo}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Paciente ID:</strong> {pacienteId} 🔴 (Hardcodeado)
              </p>
              <p className="text-sm text-gray-600">
                <strong>Médico ID:</strong> 2 🔴 (Hardcodeado)
              </p>
            </div>

            {/* Descripción */}
            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={6}
                maxLength={500}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="Ingrese los detalles del monitoreo..."
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {descripcion.length}/500 caracteres
              </p>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                {loading ? "Guardando..." : "Guardar Monitoreo"}
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
