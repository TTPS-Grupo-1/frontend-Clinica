import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Paciente } from '@/types/Paciente';

type UsePacientesPorEstadoResult = {
  pacientes: Paciente[];
  loading: boolean;
  error: string | null;
};

/**
 * Hook que obtiene directamente los pacientes que tienen tratamientos activos
 * con los estados especificados. NO requiere fetch previo de todos los pacientes.
 *
 * @param estados - Array de estados a buscar (ej: ['Fertilización', 'Punción'])
 * @returns Pacientes que cumplen con alguno de los estados
 */
export function usePacientesPorEstado(estados: string[]): UsePacientesPorEstadoResult {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Crear una clave estable para evitar re-ejecuciones
  const estadosKey = estados.sort().join('|');

  useEffect(() => {
    if (!estadosKey) {
      setPacientes([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchPacientes = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Token ${token}` } : {};

        // Primero obtener todos los pacientes para tener sus IDs
        const resPacientes = await axios.get('/api/pacientes/', { headers });
        const todosPacientes = Array.isArray(resPacientes.data)
          ? resPacientes.data
          : (resPacientes.data.results ?? []);

        if (cancelled) return;

        const pacientesIds = todosPacientes.map((p: unknown) => (p as { id: number }).id);

        // Filtrar por estados - el backend devuelve los pacientes completos
        const resFilter = await axios.post(
          '/api/tratamientos/filtrar_estados/',
          { estados, pacientes_ids: pacientesIds },
          { headers }
        );

        if (cancelled) return;

        const pacientesFiltrados = resFilter.data?.pacientes_que_cumplen || [];
        setPacientes(pacientesFiltrados);
      } catch (err: any) {
        console.error('Error obteniendo pacientes por estado:', err);
        if (!cancelled) {
          setError(err?.response?.data?.detail || err?.message || 'Error al cargar pacientes');
          setPacientes([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchPacientes();

    return () => {
      cancelled = true;
    };
  }, [estadosKey]); // Usar la clave estable como dependencia

  return { pacientes, loading, error };
}
