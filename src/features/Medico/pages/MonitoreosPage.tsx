import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

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

  const monitoreoId = searchParams.get('monitoreoId');

  const [monitoreo, setMonitoreo] = useState<Monitoreo | null>(null);
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMonitoreo, setLoadingMonitoreo] = useState(true);

  // Cargar datos del monitoreo
  useEffect(() => {
    if (!monitoreoId) {
      toast.error('No se proporcionó un ID de monitoreo');
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
        console.error('❌ Error al cargar monitoreo:', error);
        toast.error('No se pudo cargar la información del monitoreo');
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
      toast.error('La descripción es requerida');
      return;
    }

    if (!monitoreoId) {
      toast.error('ID de monitoreo no válido');
      return;
    }

    if (monitoreo?.atendido) {
      toast.error('Este monitoreo ya fue atendido');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        descripcion: descripcion.trim(),
      };

      console.log('📤 Atendiendo monitoreo:', payload);

      const response = await axios.patch(
        `http://localhost:8000/api/monitoreo/monitoreos/${monitoreoId}/guardar_atencion/`,
        payload
      );

      console.log('✅ Respuesta:', response.data);
      toast.success('Monitoreo atendido exitosamente');

      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error: any) {
      console.error('❌ Error completo:', error);
      console.error('❌ Error response:', error.response?.data);

      if (error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(([campo, errores]: [string, any]) => {
          const mensaje = Array.isArray(errores) ? errores.join(', ') : errores;
          toast.error(`${campo}: ${mensaje}`);
        });
      } else {
        const errorMessage = error.response?.data?.message || 'Error al atender el monitoreo';
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
      minute: '2-digit',
    });
  };

  if (loadingMonitoreo) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 pt-28">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Cargando información del monitoreo...</p>
        </div>
      </main>
    );
  }

  if (!monitoreo) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 pt-28">
        <div className="text-center">
          <p className="text-lg text-red-600">No se encontró el monitoreo</p>
        </div>
      </main>
    );
  }

  if (monitoreo.atendido) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 pt-28">
        <div className="max-w-2xl rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold text-gray-800">✅ Monitoreo Ya Atendido</h2>
          <div className="space-y-3 text-gray-600">
            <p>
              <strong>Paciente:</strong> {monitoreo.paciente_nombre}
            </p>
            <p>
              <strong>Médico:</strong> {monitoreo.medico_nombre}
            </p>
            <p>
              <strong>Fecha de atención:</strong> {formatFecha(monitoreo.fecha_atencion)}
            </p>
            {monitoreo.fecha_realizado && (
              <p>
                <strong>Atendido el:</strong> {formatFecha(monitoreo.fecha_realizado)}
              </p>
            )}
            <div className="mt-4 rounded-md bg-gray-50 p-4">
              <strong className="mb-2 block">Descripción:</strong>
              <p className="text-gray-700">{monitoreo.descripcion}</p>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 w-full rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Volver
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 pt-28">
      <Toaster position="top-center" />

      <div className="w-full max-w-2xl px-6">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-gray-800">Atender Monitoreo</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Información del monitoreo */}
            <div className="space-y-2 rounded-md bg-blue-50 p-4">
              <h2 className="mb-2 font-semibold text-gray-800">Información del Paciente</h2>
              <p className="text-sm text-gray-600">
                <strong>Paciente:</strong> {monitoreo.paciente_nombre}
                <span className="ml-2 text-gray-500">(DNI: {monitoreo.paciente_dni})</span>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Médico tratante:</strong> {monitoreo.medico_nombre}
              </p>
            </div>

            {/* Fecha del turno */}
            <div className="rounded-md border border-green-200 bg-green-50 p-4">
              <h3 className="mb-2 font-semibold text-gray-800">📅 Fecha del Turno</h3>
              <p className="text-lg text-gray-800">{formatFecha(monitoreo.fecha_atencion)}</p>
              <p className="mt-1 text-xs text-gray-500">
                Programado el: {formatFecha(monitoreo.fecha_creacion)}
              </p>
            </div>

            {/* Descripción del monitoreo */}
            <div>
              <label htmlFor="descripcion" className="mb-2 block text-sm font-medium text-gray-700">
                Descripción del monitoreo realizado *
              </label>
              <textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={8}
                maxLength={2000}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Ingrese los detalles del monitoreo realizado: síntomas observados, evolución del paciente, indicaciones dadas, etc."
                required
              />
              <p className="mt-1 text-xs text-gray-500">{descripcion.length}/2000 caracteres</p>
            </div>

            {/* Nota informativa */}
            <div className="rounded-md border border-yellow-200 bg-yellow-50 p-3">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Importante:</strong> Al guardar, el monitoreo se marcará como atendido y
                no podrá ser modificado posteriormente.
              </p>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {loading ? 'Guardando...' : '✓ Marcar como Atendido'}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="flex-1 rounded-md bg-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-400 disabled:cursor-not-allowed"
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
