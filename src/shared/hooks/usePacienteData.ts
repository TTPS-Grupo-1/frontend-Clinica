import axios from 'axios';

export async function fetchPacienteById(pacienteId: number) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`/api/pacientes/${pacienteId}/`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener paciente ${pacienteId}:`, error);
    return null;
  }
}
