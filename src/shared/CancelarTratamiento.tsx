import { useState } from 'react';
import { AlertTriangle, X, XCircle } from 'lucide-react';
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
  const [open, setOpen] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCancelar = async () => {
    if (!motivo.trim()) {
      setError('Debe ingresar un motivo de cancelación.');
      return;
    }

    setCargando(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');

      const resp = await axios.patch(
        `/api/tratamientos/${idTratamiento}/cancelar/`,
        { motivo_cancelacion: motivo },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (resp.status === 200) {
        onCancelado?.();
        setOpen(false);
        navigate('/medico/home');
      }
    } catch (e: any) {
      console.error('❌ Error al cancelar:', e);
      setError(
        e.response?.data?.detail ||
          e.message ||
          'Error desconocido al cancelar el tratamiento.'
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      {/* 🔥 Botón minimalista de X roja */}
      <button
        onClick={() => setOpen(true)}
        className="text-red-600 hover:text-red-800 transition"
        title="Cancelar tratamiento"
      >
        <X className="w-6 h-6" />
      </button>

      {/* 🔥 Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="max-w-md w-full rounded-xl bg-white p-5 shadow-xl">
            <div className="flex justify-between items-center mb-3">
              <h3 className="flex items-center gap-2 text-xl font-semibold text-red-700">
                <XCircle className="h-6 w-6" /> Cancelar tratamiento
              </h3>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="flex items-center gap-2 font-medium text-red-700 mb-3">
              <AlertTriangle className="h-5 w-5" />
              Confirmar cancelación del tratamiento #{idTratamiento}
            </p>
            <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm mb-3">
              ⚠️ <strong>Importante:</strong> Al cancelar este tratamiento, 
              <strong>todos los embriones y ovocitos frescos de la paciente serán descartados permanentemente. </strong>
              Esta acción no se puede deshacer.
            </div>


            <textarea
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Escriba el motivo de la cancelación..."
              className="mt-2 w-full rounded-md border p-2 text-gray-800 focus:ring-2 focus:ring-red-400"
              rows={3}
            />

            {error && (
              <div className="mt-2 text-sm text-red-600">{error}</div>
            )}

            <div className="mt-4 flex gap-3 justify-end">
              <button
                onClick={() => setOpen(false)}
                className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
              >
                Volver
              </button>

              <button
                onClick={handleCancelar}
                disabled={cargando}
                className="rounded bg-red-700 px-4 py-2 text-white hover:bg-red-800 disabled:opacity-50"
              >
                {cargando ? 'Cancelando...' : 'Cancelar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
