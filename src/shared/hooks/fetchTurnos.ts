import axios from 'axios';
import type { Turno } from '../../types/Turno';

export async function fetchTurnos(id_medico: number | null, headers: Record<string, string> = {}) {
  try {
    const res = await axios.get(`/api/turnos/?id_medico=${id_medico}`, { headers });
    console.log('fetchTurnos response:', res);
    console.log('🔍 Primer turno (si existe):', res.data?.data?.[0]);
    return res.data?.data || [];
  } catch (err: any) {
    throw err?.response?.data?.error || err?.message || 'Error al cargar turnos';
  }
}

export async function fetchTurnoByIdExterno(id_externo: number): Promise<Turno | null> {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`/api/local/turnos/por-id-externo/${id_externo}/`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.error(`No se encontró turno con id_externo ${id_externo}`);
      return null;
    }
    throw error;
  }
}
