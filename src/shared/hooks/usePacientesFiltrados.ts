import { useEffect, useState, useRef } from 'react';
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
export function usePacientesFiltrados(
  pacientes: Paciente[] | null,
  estado: string | string[] = 'Monitoreos finalizados'
): UsePacientesFiltradosResult {
  const [filteredPacientes, setFilteredPacientes] = useState<Paciente[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastIdsRef = useRef<string>('');

  // Crear una clave estable para el estado (evita re-ejecuciones por identidad de array)
  const estadoHash = Array.isArray(estado) ? estado.join('|') : estado;

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

        const isArray = Array.isArray(estado);
        const payload = isArray ? { estados: estado, pacientes_ids: ids } : { estado, pacientes_ids: ids };
        const endpoint = isArray ? '/api/tratamientos/filtrar_estados/' : '/api/tratamientos/filtrar_estado/';
        const res = await axios.post(endpoint, payload, { headers });
        if (cancelled) return;

        const raw = res.data?.pacientes_que_cumplen || [];
        let encontrados: number[] = [];

        if (Array.isArray(raw)) {
          if (raw.length > 0 && typeof raw[0] === 'number') {
            encontrados = raw.map((n: unknown) => Number(n));
          } else {
            encontrados = raw
              .map((it: unknown) => {
                if (typeof it === 'number') return it;
                if (typeof it === 'string') return Number(it);
                if (typeof it === 'object' && it !== null) {
                  const o = it as { paciente_id?: unknown; pacienteId?: unknown; id?: unknown };
                  const candidate = (o.paciente_id ?? o.pacienteId ?? o.id) as unknown;
                  return typeof candidate === 'number'
                    ? candidate
                    : typeof candidate === 'string'
                      ? Number(candidate)
                      : NaN;
                }
                return NaN;
              })
              .filter((v: number) => !Number.isNaN(v));
          }
        }

        const nuevaLista = pacientes.filter((p) => encontrados.includes(Number(p.id)));
        // Evitar actualizar estado si las IDs no cambiaron para cortar bucles
        const idsKey = nuevaLista.map((p) => p.id).sort((a, b) => Number(a) - Number(b)).join(',');
        if (idsKey !== lastIdsRef.current) {
          lastIdsRef.current = idsKey;
          setFilteredPacientes(nuevaLista);
        }
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
  }, [pacientes, estadoHash]);

  return { filteredPacientes, loading, error };
}
