import { useEffect, useState } from 'react';
import axios from 'axios';
import type { OvocitoModalRow } from '../../types/Ovocito';
import type { UseOvocitosFetchResult } from '../../interfaces/Ovocito';

export function useOvocitosFetch(pacienteId: number | null): UseOvocitosFetchResult {
  const [ovocitos, setOvocitos] = useState<OvocitoModalRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pacienteId) {
      setOvocitos([]);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    axios
      .get(`/api/ovocitos/por-paciente/${pacienteId}/`)
      .then(({ data }) => {
        const ovocitosData = data.ovocitos || data || [];
        const items = Array.isArray(ovocitosData) ? ovocitosData : (ovocitosData.results ?? []);
        setOvocitos(
          items.map((o: any) => ({
            id_ovocito: o.id_ovocito,
            identificador: o.identificador,
            madurez: (o.madurez || '').replace(/_/g, ' '),
            tipo_estado: o.tipo_estado || 'fresco',
          }))
        );
      })
      .catch((err) => {
        setError(err?.response?.data?.detail || err?.message || 'Error al cargar ovocitos');
        setOvocitos([]);
      })
      .finally(() => setLoading(false));
  }, [pacienteId]);

  return { ovocitos, loading, error, setOvocitos };
}
