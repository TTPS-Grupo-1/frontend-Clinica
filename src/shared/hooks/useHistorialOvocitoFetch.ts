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
        const tryPathUrl = `/api/historial_ovocitos/por-ovocito/${ovocitoId}/`;
        // eslint-disable-next-line no-console

        // First try the query-string URL
        let res = undefined;
        try {
          res = await axios.get(tryPathUrl, { headers: getAuthHeaders() });
        } catch (e: any) {
          res = [] as any;
          /*if (status === 404) {
            console.debug('useHistorialOvocitoFetch: falling back to', tryPathUrl);
            res = await axios.get(tryPathUrl, { headers: getAuthHeaders() });
          } else {
            throw e;
          }*/
        }

        const payload = Array.isArray(res.data) ? res.data : (res.data.results ?? res.data);
        if (!cancelled) setHistorial(payload);
      } catch (err) {
        // Mejor detalle del error para debug
        // eslint-disable-next-line no-console
        console.error('useHistorialOvocitoFetch error', err);
        if (!cancelled) {
          const axiosErr = err as any;
          setError({
            message: axiosErr?.message,
            status: axiosErr?.response?.status,
            data: axiosErr?.response?.data,
            url: axiosErr?.request?.responseURL || null,
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [ovocitoId]);

  return { historial, loading, error };
}
