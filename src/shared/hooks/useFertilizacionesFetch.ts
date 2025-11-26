import { useEffect, useState } from 'react';
import axios from 'axios';

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
    Promise.all([
      axios.get(`/api/fertilizacion/?paciente=${pacienteId}`),
      axios.get(`/api/ovocitos/?paciente=${pacienteId}`),
    ])
      .then(([fertRes, ovoRes]) => {
        const fertItems = Array.isArray(fertRes.data) ? fertRes.data : (fertRes.data.results ?? []);
        const ovoItems = Array.isArray(ovoRes.data) ? ovoRes.data : (ovoRes.data.results ?? []);
        // Mapear fertilizaciones para incluir el identificador del ovocito
        const fertilizacionesConOvocito = fertItems.map((f: any) => {
          const ovocito = ovoItems.find((o: any) => o.id_ovocito === f.ovocito);
          return {
            ...f,
            ovocito: ovocito
              ? { identificador: ovocito.identificador, id_ovocito: ovocito.id_ovocito }
              : f.ovocito,
          };
        });
        setFertilizaciones(fertilizacionesConOvocito);
      })
      .catch((err) => {
        setError(err?.response?.data?.detail || err?.message || 'Error al cargar fertilizaciones');
        setFertilizaciones([]);
      })
      .finally(() => setLoading(false));
  }, [pacienteId]);

  return { fertilizaciones, loading, error, setFertilizaciones };
}
