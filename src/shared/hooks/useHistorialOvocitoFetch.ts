import { useEffect, useState } from 'react';
import axios from 'axios';

export function useHistorialOvocitoFetch(ovocitoId: number | null) {
  const [historial, setHistorial] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    if (!ovocitoId) {
      setHistorial([]);
      setError(null);
      return;
    }

    let cancelled = false;

    const getAuthHeaders = () => {
      const token = localStorage.getItem('token');
      return token ? { Authorization: `Token ${token}` } : {};
    };

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`/api/historial_ovocitos/?ovocito=${ovocitoId}`, { headers: getAuthHeaders() });
        if (!cancelled) setHistorial(res.data);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [ovocitoId]);

  return { historial, loading, error };
}
