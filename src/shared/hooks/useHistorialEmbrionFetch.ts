import { useEffect, useState } from "react";
import axios from "axios";

interface HistorialEmbrion {
  id: number;
  embrion: number;
  estado: string;
  calidad?: string;
  fecha_modificacion: string;
  observaciones?: string;
  tipo_modificacion: string;
}

interface UseHistorialEmbrionFetchResult {
  historial: HistorialEmbrion[];
  loading: boolean;
  error: string | null;
}

export function useHistorialEmbrionFetch(embrionId: number | null): UseHistorialEmbrionFetchResult {
  const [historial, setHistorial] = useState<HistorialEmbrion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!embrionId) {
      setHistorial([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:8000/api/historial-embriones/?embrion=${embrionId}`)
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : response.data.results || [];
        setHistorial(data);
      })
      .catch((err) => {
        console.error("Error fetching historial embrion:", err);
        setError(err?.response?.data?.detail || err?.message || "Error al cargar historial");
        setHistorial([]);
      })
      .finally(() => setLoading(false));
  }, [embrionId]);

  return { historial, loading, error };
}