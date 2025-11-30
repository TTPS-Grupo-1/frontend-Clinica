import axios from 'axios';

export async function obtenerDeudaPaciente(id_paciente: number, numero_grupo: number) {
  const ENDPOINT = 'http://localhost:8000/api/pacientes/deuda/';
  try {
    const response = await axios.post(ENDPOINT, {
      id_paciente,
      numero_grupo,
    });

    console.log('Respuesta desde Django:', response.data);

    return response.data;
  } catch (error: any) {
    console.error('Error obteniendo deuda del paciente:', error);
    throw new Error(error.response?.data?.error || 'Error consultando deuda del paciente');
  }
}

export async function registrarPagoSupabase(
  id_grupo: number,
  obra_social_pagada: boolean,
  paciente_pagado: boolean,
  id_paciente: number
) {
  const ENDPOINT = 'http://localhost:8000/api/pacientes/registrar-pago/';
  try {
    const resp = await axios.post(ENDPOINT, {
      id_grupo,
      obra_social_pagada,
      paciente_pagado,
      id_paciente,
    });

    return resp.data;
  } catch (error: any) {
    console.error('Error registrando pago:', error);
    throw new Error(error.response?.data?.message || 'Error al registrar pago');
  }
}
