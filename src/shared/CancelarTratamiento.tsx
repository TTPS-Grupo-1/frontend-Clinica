import { useState } from "react";
import { AlertTriangle, XCircle } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface CancelarTratamientoProps {
  idTratamiento: number;
  onCancelado?: () => void;
}

export default function CancelarTratamiento({
  idTratamiento,
  onCancelado,
}: CancelarTratamientoProps) {
  const [confirmando, setConfirmando] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState(false);
  const navigate = useNavigate();

  const handleCancelar = async () => {
    if (!motivo.trim()) {
      setError("Debe ingresar un motivo de cancelación.");
      return;
    }

    setCargando(true);
    setError(null);
    setExito(false);

    try {
      const token = localStorage.getItem("token");

      const resp = await axios.patch(
        `/api/tratamientos/${idTratamiento}/cancelar/`,
        { motivo_cancelacion: motivo },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
          withCredentials: true,
        }
      );

      if (resp.status === 200) {
        setExito(true);
        setConfirmando(false);
        onCancelado?.();
        navigate("/medico/home");
      }
    } catch (e: any) {
      console.error("❌ Error al cancelar:", e);
      setError(
        e.response?.data?.detail ||
          e.message ||
          "Error desconocido al cancelar el tratamiento."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="p-4 bg-white border rounded-xl shadow-md max-w-md">
      <h3 className="text-xl font-semibold text-red-700 flex items-center gap-2 mb-3">
        <XCircle className="w-6 h-6" /> Cancelar tratamiento
      </h3>

      {!confirmando ? (
        <>
          <p className="text-gray-700 mb-4">
            Esta acción desactivará el tratamiento. ¿Deseas continuar?
          </p>
          <button
            onClick={() => setConfirmando(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            Cancelar tratamiento
          </button>
        </>
      ) : (
        <div className="bg-red-50 border border-red-300 p-4 rounded-lg">
          <p className="text-red-700 font-medium flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Confirmar cancelación del tratamiento #{idTratamiento}
          </p>

          <textarea
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Escriba el motivo de la cancelación..."
            className="w-full mt-3 border rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-red-400"
            rows={3}
          />

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleCancelar}
              disabled={cargando}
              className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {cargando ? "Cancelando..." : "Sí, cancelar"}
            </button>
            <button
              onClick={() => setConfirmando(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              No, volver
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-3 text-red-600 text-sm border-t pt-2">{error}</div>
      )}

      {exito && (
        <div className="mt-3 text-green-700 text-sm border-t pt-2">
          ✅ Tratamiento cancelado correctamente.
        </div>
      )}
    </div>
  );
}
