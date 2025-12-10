import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import type { Ovocito } from '@/types/Ovocito';

export function useOvocitosNoUsados(pacienteId: number | null) {
  const [ovocitos, setOvocitos] = useState<Ovocito[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOvocitos = useCallback(async () => {
    if (!pacienteId) {
      setOvocitos([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Token ${token}` } : {};

      const response = await axios.get(
        `/api/ovocitos/no-usados/${pacienteId}/`,
        { headers }
      );

      if (response.data.success) {
        setOvocitos(response.data.ovocitos || []);
      } else {
        setError(response.data.message || 'Error al cargar ovocitos');
        setOvocitos([]);
      }
    } catch (err) {
      console.error('Error fetching ovocitos no usados:', err);
      setError('Error al cargar los ovocitos no usados');
      setOvocitos([]);
    } finally {
      setLoading(false);
    }
  }, [pacienteId]);

  useEffect(() => {
    fetchOvocitos();
  }, [fetchOvocitos]);

  return { ovocitos, loading, error, refetch: fetchOvocitos };
}
