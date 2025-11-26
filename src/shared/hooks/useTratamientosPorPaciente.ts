import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

type Treatment = any;

export default function useTratamientosPorPaciente(pacienteId: number | null) {
  const [tratamientos, setTratamientos] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTratamientos = useCallback(async () => {
    if (!pacienteId) {
      setTratamientos([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = token ? { Authorization: `Token ${token}` } : {};

    console.log('useTratamientosPorPaciente - Token:', token ? 'Token exists' : 'No token');
    console.log('useTratamientosPorPaciente - Headers:', headers);
    console.log(
      'useTratamientosPorPaciente - URL:',
      `/api/tratamientos/todos-por-paciente/${pacienteId}/`
    );

    try {
      // Usar el nuevo endpoint que devuelve TODOS los tratamientos del paciente
      const res = await axios.get(`/api/tratamientos/todos-por-paciente/${pacienteId}/`, {
        headers,
        withCredentials: true,
      });

      // Este endpoint devuelve un array de tratamientos
      const data = Array.isArray(res.data) ? res.data : [];

      setTratamientos(data);
    } catch (err: any) {
      // Si es un 404 o error, significa que no hay tratamientos para este paciente
      if (err?.response?.status === 404) {
        setTratamientos([]);
        setError(null); // No es un error, simplemente no hay tratamientos
      } else {
        setTratamientos([]);
        setError(err?.response?.data?.detail ?? err?.message ?? 'Error al cargar tratamientos');
      }
    } finally {
      setLoading(false);
    }
  }, [pacienteId]);

  useEffect(() => {
    fetchTratamientos();
  }, [fetchTratamientos]);

  return { tratamientos, loading, error, refresh: fetchTratamientos };
}
