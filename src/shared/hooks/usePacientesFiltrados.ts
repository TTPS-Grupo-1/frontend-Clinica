import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Paciente } from '@/types/Paciente';

type UsePacientesFiltradosResult = {
  filteredPacientes: Paciente[] | null;
  loading: boolean;
  error: string | null;
};

/**
 * Filtra una lista de pacientes consultando el endpoint
 * POST /api/tratamientos/filtrar_estado/ con { estado, pacientes_ids }
 * Devuelve `null` mientras no se ejecutó el filtrado, [] si se ejecutó y no hay coincidencias
 */
export function usePacientesFiltrados(pacientes: Paciente[] | null, estado = 'Monitoreos finalizados'): UsePacientesFiltradosResult {
  const [filteredPacientes, setFilteredPacientes] = useState<Paciente[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pacientes || pacientes.length === 0) {
      // No hay pacientes: establecer lista vacía y no llamar al endpoint
      setFilteredPacientes([]);
      return;
    }

    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const ids = pacientes.map((p) => p.id);
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Token ${token}` } : {};

        const res = await axios.post('/api/tratamientos/filtrar_estado/', { estado, pacientes_ids: ids }, { headers });
        if (cancelled) return;

        const raw = res.data?.pacientes_que_cumplen || [];
        let encontrados: number[] = [];

        if (Array.isArray(raw)) {
          if (raw.length > 0 && typeof raw[0] === 'number') {
            encontrados = raw.map((n: unknown) => Number(n));
          } else {
            encontrados = raw
              .map((it: any) => Number(it?.paciente_id ?? it?.pacienteId ?? it?.id ?? it))
              .filter((v: number) => !Number.isNaN(v));
          }
        }

        setFilteredPacientes(pacientes.filter((p) => encontrados.includes(Number(p.id))));
      } catch (err) {
        console.error('usePacientesFiltrados error', err);
        if (!cancelled) {
          setFilteredPacientes([]);
          setError('Error al filtrar pacientes');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [pacientes, estado]);

  return { filteredPacientes, loading, error };
}
