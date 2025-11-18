import axios from 'axios';
import { fetchTurnos } from '../../../shared/hooks/fetchTurnos';

export type PacienteMinimal = {
  id: number;
  first_name?: string;
  last_name?: string;
  dni?: string | number;
  fechaTurno?: string | null;
  horaTurno?: string | null;
};

export function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Token ${token}` } : {};
}

/**
 * Obtener pacientes que fueron atendidos por el médico (según turnos y tratamientos).
 * Compila ids desde turnos y tratamientos, consulta /api/pacientes/{id}/ y adjunta fecha/hora de turno cuando exista.
 */
export async function fetchPacientesForMedico(medicoId: number, headers: Record<string, string> = {}): Promise<PacienteMinimal[]> {
  const turnos = await fetchTurnos(medicoId, headers).catch(() => []);

  let tratamientos: any[] = [];
  try {
    // Usar el nuevo endpoint específico para tratamientos por médico
    const tRes = await axios.get(`/api/tratamientos/por-medico/${medicoId}/`, { headers });
    tratamientos = Array.isArray(tRes.data) ? tRes.data : [];
  } catch (err) {
    tratamientos = [];
  }

  const tratamientosConMedico = tratamientos.filter((tr: any) => {
    // intentar extraer un id de médico del objeto
    const m = tr?.medico ?? tr?.medico_id ?? tr?.medico_tratante ?? tr?.medico_tratante_id ?? tr?.medicoId;
    if (!m && typeof tr === 'object') {
      return false;
    }
    const mid = typeof m === 'object' ? (m?.id ?? null) : (m ?? null);
    return mid !== null && Number(mid) === Number(medicoId);
  });

  // Si encontramos tratamientos con campo medico, usaremos sólo esos. Si no, asumimos que el endpoint
  // ya devolvió tratamientos filtrados (por ejemplo cuando el token pertenece al médico) y usaremos todos.
  const tratamientosFiltrados = tratamientosConMedico.length > 0 ? tratamientosConMedico : tratamientos;

  const idsSet = new Set<number>();
  const normalizeList = (x: any) => Array.isArray(x) ? x : (x?.results ?? x?.data ?? []);
  const normTurnos = normalizeList(turnos);
  const normTratamientos = normalizeList(tratamientosFiltrados);

  const addFrom = (items: any[]) => {
    for (const it of items) {
      // it puede ser un id number, un objeto con campo paciente/paciente_id o un objeto paciente embebido
      if (typeof it === 'number') {
        idsSet.add(Number(it));
        continue;
      }
      const pid = it?.paciente ?? it?.paciente_id ?? it?.pacienteId ?? (it?.paciente?.id ?? null);
      if (pid) idsSet.add(Number(pid));
    }
  };
  addFrom(normTurnos);
  addFrom(normTratamientos);

  const ids = Array.from(idsSet);
  const pacientesData: PacienteMinimal[] = [];
  await Promise.all(ids.map(async (idp) => {
    try {
      const r = await axios.get(`/api/pacientes/${idp}/`, { headers });
      pacientesData.push({ id: idp, first_name: r.data.first_name, last_name: r.data.last_name, dni: r.data.dni });
    } catch (err) {
      pacientesData.push({ id: idp });
    }
  }));

  // Adjuntar info de turno
  const turnoByPaciente = new Map<number, any>();
  for (const t of turnos) {
    const pid = typeof t.paciente === 'object' ? (t.paciente.id ?? t.paciente_id) : (t.paciente ?? t.paciente_id);
    if (!pid) continue;
    const fechaHora = t.fecha_hora || t.fecha || t.fechaHora || t.fecha_turno;
    if (!turnoByPaciente.has(Number(pid))) {
      turnoByPaciente.set(Number(pid), { fechaHora });
    }
  }

  for (const p of pacientesData) {
    const info = turnoByPaciente.get(p.id);
    if (info && info.fechaHora) {
      try {
        const d = new Date(info.fechaHora);
        p.fechaTurno = d.toLocaleDateString();
        p.horaTurno = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } catch (e) {
        p.fechaTurno = String(info.fechaHora);
        p.horaTurno = '';
      }
    }
  }

  // Si no hubo pacientes desde la compilación, intentar extraer objetos embebidos en turnos
  if (pacientesData.length === 0 && normTurnos.length > 0) {
    for (const t of normTurnos) {
      const p = t.paciente || t.paciente_obj || t.paciente_data || (t?.paciente ?? null);
      if (p && p.id) pacientesData.push({ id: p.id, first_name: p.first_name, last_name: p.last_name, dni: p.dni });
    }
  }

  return pacientesData;
}

/**
 * Si el paciente existe y tiene un tratamiento asociado, devuelve su información minimal.
 */
export async function fetchPacienteIfHasTratamiento(pacienteId: number, headers: Record<string, string> = {}): Promise<PacienteMinimal | null> {
  try {
    const pacienteRes = await axios.get(`/api/pacientes/${pacienteId}/`, { headers });
    let tratamientoExistente = null;
    try {
      const tRes = await axios.get(`/api/tratamientos/por-paciente/${pacienteId}/`, { headers });
      tratamientoExistente = tRes.data || null;
    } catch (tErr) {
      tratamientoExistente = null;
    }
    if (tratamientoExistente) {
      return { id: pacienteId, first_name: pacienteRes.data.first_name, last_name: pacienteRes.data.last_name, dni: pacienteRes.data.dni };
    }
    return null;
  } catch (err) {
    return null;
  }
}

/**
 * Buscar pacientes por nombre (query). Devuelve solo aquellos que tienen un tratamiento
 * asociado, para mantener el comportamiento previo (mostrar pacientes con tratamiento activo).
 */
export async function fetchPacientesByName(query: string, headers: Record<string, string> = {}): Promise<PacienteMinimal[]> {
  if (!query || query.trim().length === 0) return [];
  try {
    // Intentar con parámetro `search` (DRF SearchFilter) y caer en fallback si es necesario
    const q = encodeURIComponent(query.trim());
    const res = await axios.get(`/api/pacientes/?search=${q}`, { headers });
    const list = Array.isArray(res.data) ? res.data : (res.data?.results ?? res.data?.data ?? []);

    const out: PacienteMinimal[] = [];
    await Promise.all(list.map(async (p: any) => {
      const id = p?.id ?? p?.pk ?? null;
      if (!id) return;
      // Validar que tenga tratamiento
      try {
        const tRes = await axios.get(`/api/tratamientos/por-paciente/${id}/`, { headers });
        const tiene = Boolean(tRes.data && (Array.isArray(tRes.data) ? tRes.data.length > 0 : Object.keys(tRes.data).length > 0));
        if (tiene) {
          out.push({ id, first_name: p.first_name, last_name: p.last_name, dni: p.dni });
        }
      } catch (e) {
        // si falla la consulta de tratamientos, omitimos ese paciente
      }
    }));
    return out;
  } catch (err) {
    return [];
  }
}
export async function marcarTurnoAtendido(id: number): Promise<boolean> {
  try {
    const headers = getAuthHeaders();
    // El viewset define la acción con methods=['patch'], por eso usamos PATCH aquí.
    const res = await axios.patch(`/api/local/turnos/${id}/marcar-atendido/`, {}, { headers });
    console.debug(`Turno ${id} marcado como atendido`, res?.data);
    return true;
  } catch (err: any) {
    console.error('Error marcando turno como atendido:', err?.response?.data ?? err?.message ?? err);
    // Devolvemos false para que el llamador decida cómo proceder (toast, retry, permitir navegación, etc.)
    return false;
  }
}
