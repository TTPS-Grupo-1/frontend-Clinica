import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Paciente } from '../../types/Paciente';
import type { UsePacientesFetchResult } from '../../interfaces/Paciente';

export function usePacientesFetch(): UsePacientesFetchResult {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/pacientes/')
      .then(({ data }) => {
        console.log('Datos de pacientes recibidos:', data);
        setPacientes(Array.isArray(data) ? data : (data.results ?? []));
      })
      .catch((err) => {
        setError(err?.response?.data?.detail || err?.message || 'Error al cargar pacientes');
        setPacientes([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { pacientes, loading, error, setPacientes };
}
