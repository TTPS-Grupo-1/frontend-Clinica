import axios from "axios";


export async function fetchTurnos(id_medico: number | null, headers: Record<string, string> = {}) {
  try {
    const res = await axios.get(`/api/turnos/?id_medico=${id_medico}`, { headers });
    return res.data?.data || [];
  } catch (err: any) {
    throw err?.response?.data?.error || err?.message || "Error al cargar turnos";
  }
}
