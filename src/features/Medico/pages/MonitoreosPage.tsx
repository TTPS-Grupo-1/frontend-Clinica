import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

interface Monitoreo {
  id: number;
  descripcion: string;
  tratamiento: number;
  atendido: boolean;
  fecha_creacion: string;
  fecha_atencion: string;
  fecha_realizado: string | null;
  paciente_nombre: string;
  paciente_dni: number;
  medico_nombre: string;
  medico_dni: number;
}

export default function MonitoreosPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const monitoreoId = searchParams.get("monitoreoId");
  
  const [monitoreo, setMonitoreo] = useState<Monitoreo | null>(null);
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMonitoreo, setLoadingMonitoreo] = useState(true);

  // Cargar datos del monitoreo
  useEffect(() => {
    if (!monitoreoId) {
      toast.error("No se proporcionó un ID de monitoreo");
      navigate(-1);
      return;
    }

    const fetchMonitoreo = async () => {
      try {
        setLoadingMonitoreo(true);
        const response = await axios.get(
          `http://localhost:8000/api/monitoreo/monitoreos/${monitoreoId}/`
        );
        setMonitoreo(response.data);
        // Si ya tiene descripción, cargarla
        if (response.data.descripcion) {
          setDescripcion(response.data.descripcion);
        }
      } catch (error: any) {
        console.error("❌ Error al cargar monitoreo:", error);
        toast.error("No se pudo cargar la información del monitoreo");
        setTimeout(() => navigate(-1), 2000);
      } finally {
        setLoadingMonitoreo(false);
      }
    };

    fetchMonitoreo();
  }, [monitoreoId, navigate]);

  // 🧪 TESTING: Si no hay monitoreoId, usar uno hardcodeado
  useEffect(() => {
    if (!monitoreoId) {
      const testMonitoreoId = '1'; // 👈 Cambia este ID según tengas en BD
      navigate(`/monitoreos?monitoreoId=${testMonitoreoId}`, { replace: true });
      return;
    }
  }, [monitoreoId, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!descripcion.trim()) {
      toast.error("La descripción es requerida");
      return;
    }

    if (!monitoreoId) {
      toast.error("ID de monitoreo no válido");
      return;
    }

    if (monitoreo?.atendido) {
      toast.error("Este monitoreo ya fue atendido");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        descripcion: descripcion.trim(),
      };

      console.log("📤 Atendiendo monitoreo:", payload);

      const response = await axios.patch(
        `http://localhost:8000/api/monitoreo/monitoreos/${monitoreoId}/guardar_atencion/`,
        payload
      );

      console.log("✅ Respuesta:", response.data);
      toast.success("Monitoreo atendido exitosamente");
      
      setTimeout(() => {
        navigate(-1);
      }, 2000);

    } catch (error: any) {
      console.error("❌ Error completo:", error);
      console.error("❌ Error response:", error.response?.data);
      
      if (error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(([campo, errores]: [string, any]) => {
          const mensaje = Array.isArray(errores) ? errores.join(', ') : errores;
          toast.error(`${campo}: ${mensaje}`);
        });
      } else {
        const errorMessage = error.response?.data?.message || "Error al atender el monitoreo";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  // Formatear fecha para mostrar
  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loadingMonitoreo) {
    return (
      <main className="pt-28 flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando información del monitoreo...</p>
        </div>
      </main>
    );
  }

  if (!monitoreo) {
    return (
      <main className="pt-28 flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 text-lg">No se encontró el monitoreo</p>
        </div>
      </main>
    );
  }

  if (monitoreo.atendido) {
    return (
      <main className="pt-28 flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            ✅ Monitoreo Ya Atendido
          </h2>
          <div className="space-y-3 text-gray-600">
            <p><strong>Paciente:</strong> {monitoreo.paciente_nombre}</p>
            <p><strong>Médico:</strong> {monitoreo.medico_nombre}</p>
            <p><strong>Fecha de atención:</strong> {formatFecha(monitoreo.fecha_atencion)}</p>
            {monitoreo.fecha_realizado && (
              <p><strong>Atendido el:</strong> {formatFecha(monitoreo.fecha_realizado)}</p>
            )}
            <div className="bg-gray-50 p-4 rounded-md mt-4">
              <strong className="block mb-2">Descripción:</strong>
              <p className="text-gray-700">{monitoreo.descripcion}</p>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 w-full px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Volver
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 flex flex-col items-center min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      
      <div className="w-full max-w-2xl px-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Atender Monitoreo #{monitoreo.id}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Información del monitoreo */}
            <div className="bg-blue-50 p-4 rounded-md space-y-2">
              <h2 className="font-semibold text-gray-800 mb-2">Información del Paciente</h2>
              <p className="text-sm text-gray-600">
                <strong>Paciente:</strong> {monitoreo.paciente_nombre}
                <span className="ml-2 text-gray-500">(DNI: {monitoreo.paciente_dni})</span>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Médico tratante:</strong> {monitoreo.medico_nombre}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Tratamiento ID:</strong> {monitoreo.tratamiento}
              </p>
            </div>

            {/* Fecha del turno */}
            <div className="bg-green-50 border border-green-200 p-4 rounded-md">
              <h3 className="font-semibold text-gray-800 mb-2">📅 Fecha del Turno</h3>
              <p className="text-lg text-gray-800">
                {formatFecha(monitoreo.fecha_atencion)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Programado el: {formatFecha(monitoreo.fecha_creacion)}
              </p>
            </div>

            {/* Descripción del monitoreo */}
            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción del monitoreo realizado *
              </label>
              <textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={8}
                maxLength={2000}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="Ingrese los detalles del monitoreo realizado: síntomas observados, evolución del paciente, indicaciones dadas, etc."
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {descripcion.length}/2000 caracteres
              </p>
            </div>

            {/* Nota informativa */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Importante:</strong> Al guardar, el monitoreo se marcará como atendido y no podrá ser modificado posteriormente.
              </p>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-semibold"
              >
                {loading ? "Guardando..." : "✓ Marcar como Atendido"}
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
