import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function MonitoreosPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Obtener parámetros de la URL
  const pacienteNombre = searchParams.get("pacienteNombre") || "Paciente";
  const pacienteId = searchParams.get("pacienteId");
  const numeroMonitoreo = searchParams.get("numeroMonitoreo") || "1";
  
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fecha actual formateada
  const fechaActual = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!descripcion.trim()) {
      newErrors.descripcion = "La descripción del monitoreo es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGuardar = async () => {
    if (!validateForm()) {
      toast.error("Por favor complete todos los campos requeridos");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        paciente_id: pacienteId,
        numero_monitoreo: numeroMonitoreo,
        fecha: new Date().toISOString().split("T")[0],
        descripcion: descripcion.trim(),
      };

      console.log("Guardando monitoreo:", payload);

      // Aquí va tu endpoint real
      const response = await axios.post(
        "http://localhost:8000/api/monitoreos/",
        payload
      );

      console.log("Monitoreo guardado:", response.data);
      toast.success("Monitoreo guardado exitosamente");

      // Esperar un momento para que el usuario vea el mensaje
      setTimeout(() => {
        navigate("/medico/home"); // O la ruta que corresponda
      }, 1500);
    } catch (error: any) {
      console.error("Error al guardar monitoreo:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        "Error al guardar el monitoreo";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    if (descripcion.trim()) {
      const confirmar = window.confirm(
        "¿Está seguro que desea cancelar? Se perderán los datos ingresados."
      );
      if (!confirmar) return;
    }
    navigate("/medico/home"); // O la ruta que corresponda
  };

  return (
    <main className="pt-28 flex flex-col items-center min-h-screen bg-gray-50">
      <Toaster position="top-center" />

      <div className="w-full max-w-4xl px-6 py-8">
        {/* Encabezado */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Monitoreo #{numeroMonitoreo}
            </h1>
            <p className="text-xl text-gray-700 mb-1">
              Paciente: <span className="font-semibold text-blue-600">{pacienteNombre}</span>
            </p>
            <p className="text-gray-600">
              Fecha: <span className="font-medium">{fechaActual}</span>
            </p>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="mb-6">
            <label
              htmlFor="descripcion"
              className="block text-sm font-semibold text-gray-700 mb-3"
            >
              Descripción del Monitoreo <span className="text-red-500">*</span>
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={(e) => {
                setDescripcion(e.target.value);
                if (errors.descripcion) {
                  setErrors((prev) => ({ ...prev, descripcion: "" }));
                }
              }}
              placeholder="Ingrese la descripción detallada del monitoreo..."
              rows={10}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 bg-white resize-none ${
                errors.descripcion ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.descripcion && (
              <p className="text-red-500 text-sm mt-2">{errors.descripcion}</p>
            )}
            <p className="text-gray-500 text-sm mt-2">
              Caracteres: {descripcion.length}
            </p>
          </div>

          {/* Botones */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleGuardar}
              disabled={loading}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-colors duration-200 shadow-md ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Guardando...
                </span>
              ) : (
                "Guardar Monitoreo"
              )}
            </button>
            <button
              type="button"
              onClick={handleCancelar}
              disabled={loading}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 shadow-md ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-500 text-white hover:bg-gray-600"
              }`}
            >
              Cancelar
            </button>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
          <div className="flex items-start">
            <svg
              className="w-6 h-6 text-blue-500 mr-3 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="text-sm font-semibold text-blue-800 mb-1">
                Información importante
              </h3>
              <p className="text-sm text-blue-700">
                Asegúrese de registrar todos los detalles relevantes del monitoreo.
                Los datos guardados no podrán ser editados posteriormente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
