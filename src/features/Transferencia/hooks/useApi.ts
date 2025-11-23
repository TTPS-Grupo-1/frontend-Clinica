import axios from 'axios';
import { useEffect, useState } from 'react';
import { useEmbryoFetch } from '../../../shared/hooks/useEmbryoFetch';
import type { Transferencia } from '../../../interfaces/Transferencia';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Token ${token}` } : {};
};

export function useApi(pacienteId: number | null = null) {
  const [tratamientos, setTratamientos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Usar el hook existente para embriones
  const {
    embriones,
    loading: embrionesLoading,
    error: embrionesError,
    refetch: refetchEmbriones,
  } = useEmbryoFetch(pacienteId);

  useEffect(() => {
    if (pacienteId) {
      loadTratamientos();
    } else {
      setTratamientos([]);
      setLoading(false);
      setError(null);
    }
  }, [pacienteId]);

  const loadTratamientos = async () => {
    if (!pacienteId) return;
    setLoading(true);
    setError(null);
    try {
      // Usar el endpoint específico que funciona correctamente
      const res = await axios.get(`/api/tratamientos/por-paciente/${pacienteId}/`, {
        headers: getAuthHeaders(),
      });

      // El endpoint devuelve un solo tratamiento, convertirlo a array
      const items = res.data ? [res.data] : [];
      setTratamientos(items);
    } catch (err: any) {
      // Si es 404, significa que no hay tratamiento activo para este paciente
      if (err?.response?.status === 404) {
        setTratamientos([]);
        setError(null); // No es un error, simplemente no hay tratamientos
      } else {
        console.log('Error cargando tratamientos:', err?.response?.data ?? err.message ?? err);
        setError(err?.response?.data?.message || 'Error cargando tratamientos');
        setTratamientos([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const submitTransferencia = async (transferencia: Omit<Transferencia, 'id'>) => {
    const response = await axios.post(
      `/api/transferencia/transferencias/bulk_create/`,
      transferencia,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  };

  const isLoading = loading || embrionesLoading;
  const combinedError = error || embrionesError;

  return {
    tratamientos,
    embriones,
    loading: isLoading,
    error: combinedError,
    submitTransferencia,
    refetch: loadTratamientos,
    refetchEmbriones,
  };
}
