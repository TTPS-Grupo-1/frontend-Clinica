import { useState } from 'react';
import { AlertTriangle, XCircle } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface CancelarTratamientoProps {
  idTratamiento: number;
  onCancelado?: () => void;
}

export default function CancelarTratamiento({
  idTratamiento,
  onCancelado,
}: CancelarTratamientoProps) {
  const [confirmando, setConfirmando] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState(false);
  const navigate = useNavigate();

  const handleCancelar = async () => {
    if (!motivo.trim()) {
      setError('Debe ingresar un motivo de cancelación.');
      return;
    }

    setCargando(true);
    setError(null);
    setExito(false);

    try {
      const token = localStorage.getItem('token');

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
        navigate('/medico/home');
      }
    } catch (e: any) {
      console.error('❌ Error al cancelar:', e);
      setError(
        e.response?.data?.detail || e.message || 'Error desconocido al cancelar el tratamiento.'
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-md rounded-xl border bg-white p-4 shadow-md">
      <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-red-700">
        <XCircle className="h-6 w-6" /> Cancelar tratamiento
      </h3>

      {!confirmando ? (
        <>
          <p className="mb-4 text-gray-700">
            Esta acción desactivará el tratamiento. ¿Deseas continuar?
          </p>
          <button
            onClick={() => setConfirmando(true)}
            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            Cancelar tratamiento
          </button>
        </>
      ) : (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4">
          <p className="flex items-center gap-2 font-medium text-red-700">
            <AlertTriangle className="h-5 w-5" />
            Confirmar cancelación del tratamiento #{idTratamiento}
          </p>

          <textarea
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Escriba el motivo de la cancelación..."
            className="mt-3 w-full rounded-md border p-2 text-gray-800 focus:ring-2 focus:ring-red-400"
            rows={3}
          />

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleCancelar}
              disabled={cargando}
              className="rounded bg-red-700 px-4 py-2 text-white hover:bg-red-800 disabled:opacity-50"
            >
              {cargando ? 'Cancelando...' : 'Sí, cancelar'}
            </button>
            <button
              onClick={() => setConfirmando(false)}
              className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
            >
              No, volver
            </button>
          </div>
        </div>
      )}

      {error && <div className="mt-3 border-t pt-2 text-sm text-red-600">{error}</div>}

      {exito && (
        <div className="mt-3 border-t pt-2 text-sm text-green-700">
          ✅ Tratamiento cancelado correctamente.
        </div>
      )}
    </div>
  );
}
