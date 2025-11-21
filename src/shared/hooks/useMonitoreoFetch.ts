import { useEffect, useState } from 'react';
import axios from 'axios';

export function useMonitoreosAtendidosPorPaciente(pacienteId: number | null) {
  const [monitoreos, setMonitoreos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pacienteId) return;
    setLoading(true);
    setError(null);

    axios
      .get(`/api/monitoreo/monitoreos/atendidos-por-paciente/${pacienteId}/`)
      .then((res) => {
        setMonitoreos(res.data.data || []);
        console.log('Monitoreos obtenidos:', res.data.data);
      })
      .catch((err) => {
        setError(err?.response?.data?.message || 'Error al obtener monitoreos');
      })
      .finally(() => setLoading(false));
  }, [pacienteId]);

  return { monitoreos, loading, error };
}