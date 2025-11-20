import { useEffect, useState } from 'react';
import axios from 'axios';

interface Embryo {
  id?: number;
  identificador: string;
  estado: string;
  calidad?: number; // ✅ Cambiar a number
  fecha_modificacion?: string; // ✅ Cambiar de fecha_creacion a fecha_modificacion
  pgt?: string;
  observaciones?: string;
  fertilizacion?: number;
}

interface UseEmbryoFetchResult {
  embriones: Embryo[];
  loading: boolean;
  error: string | null;
}

export function useEmbryoFetch(pacienteId: number | null): UseEmbryoFetchResult {
  const [embriones, setEmbriones] = useState<Embryo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pacienteId) {
      setEmbriones([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:8000/api/embriones/?paciente=${pacienteId}`)
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : response.data.results || [];
        console.log('✅ Embriones obtenidos:', data);
        setEmbriones(data);
      })
      .catch((err) => {
        console.error('❌ Error fetching embriones:', err);
        setError(err?.response?.data?.detail || err?.message || 'Error al cargar embriones');
        setEmbriones([]);
      })
      .finally(() => setLoading(false));
  }, [pacienteId]);

  return { embriones, loading, error };
}
