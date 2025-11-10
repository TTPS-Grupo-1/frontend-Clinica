import { useState, useEffect } from 'react';
import axios from 'axios';
import { useEmbryoFetch } from '../../../shared/hooks/useEmbryoFetch';
import type { Tratamiento, Transferencia } from '../../../interfaces/Transferencia';

const API_BASE_URL = 'http://localhost:8000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Token ${token}` } : {};
};

export function useApi(pacienteId: number | null = null) {
  const [tratamientos, setTratamientos] = useState<Tratamiento[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Usar el hook existente para embriones
  const { embriones, loading: embrionesLoading, error: embrionesError } = useEmbryoFetch(pacienteId);

  useEffect(() => {
    if (pacienteId) {
      loadTratamientos();
    } else {
      // Limpiar tratamientos si no hay paciente seleccionado
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
      const response = await axios.get(`${API_BASE_URL}/tratamiento/tratamientos/?paciente=${pacienteId}`, { 
        headers: getAuthHeaders() 
      });
      setTratamientos(response.data.results || response.data);
    } catch (err: any) {
        console.log(err)
      setError(err.response?.data?.message || 'Error cargando tratamientos');
    } finally {
      setLoading(false);
    }
  };

  const submitTransferencia = async (transferencia: Omit<Transferencia, 'id'>) => {
    const response = await axios.post(`${API_BASE_URL}/transferencia/transferencias/`, transferencia, {
      headers: getAuthHeaders()
    });
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
    refetch: loadTratamientos
  };
}