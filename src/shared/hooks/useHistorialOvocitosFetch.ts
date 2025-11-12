import { useEffect, useState } from 'react';
import axios from 'axios';

export function useHistorialOvocitosFetch(pacienteId: number | null) {
  const [historial, setHistorial] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    if (!pacienteId) {
      setHistorial([]);
      setError(null);
      return;
    }

    let cancelled = false;
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = token ? { Authorization: `Token ${token}` } : {};
  const res = await axios.get(`/api/historial_ovocitos/?paciente=${pacienteId}`, { headers });
        if (!cancelled) setHistorial(res.data);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [pacienteId]);

  return { historial, loading, error };
}
