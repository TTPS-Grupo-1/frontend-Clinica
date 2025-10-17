import { useEffect, useState } from "react";
import axios from "axios";

export function useFertilizacionesFetch(pacienteId: number | null) {
  const [fertilizaciones, setFertilizaciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pacienteId) {
      setFertilizaciones([]);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    axios.get(`/api/fertilizaciones/?paciente=${pacienteId}`)
      .then(({ data }) => {
        const items = Array.isArray(data) ? data : (data.results ?? []);
        setFertilizaciones(items);
      })
      .catch((err) => {
        setError(err?.response?.data?.detail || err?.message || "Error al cargar fertilizaciones");
        setFertilizaciones([]);
      })
      .finally(() => setLoading(false));
  }, [pacienteId]);

  return { fertilizaciones, loading, error, setFertilizaciones };
}
