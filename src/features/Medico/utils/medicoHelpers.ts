import axios from 'axios';

/**
 * Verifica si un médico tiene turnos pendientes
 */
export async function tieneTurnosPendientes(medicoId: number, headers: any): Promise<boolean> {
  try {
    const res = await axios.get(
      `/api/tiene-turnos-pendientes/${medicoId}`,
      { headers }
    );
    return res.data.tiene_turnos_pendientes === true;
  } catch {
    return false;
  }
}

/**
 * Verifica si un médico tiene tratamientos activos
 */
export async function tieneTratamientosActivos(medicoId: number, headers: any): Promise<boolean> {
  try {
    const res = await axios.get(
      `/api/tratamientos/tiene-tratamientos-activos/${medicoId}/`,
      { headers }
    );
    return res.data.tiene_tratamientos_activos === true;
  } catch {
    return false;
  }
}