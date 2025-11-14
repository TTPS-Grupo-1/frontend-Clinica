// src/services/consultasService.ts
import axios from "axios";

const API_BASE = "/api"; // base común
const token = localStorage.getItem("token");
// 🔹 Obtener el tratamiento activo por paciente
export const getTratamientoByPaciente = async (pacienteId: number) => {
  const res = await axios.get(`${API_BASE}/tratamientos/por-paciente/${pacienteId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
    withCredentials: true,
  });
  return res.data;
};

// 🔹 Obtener la primera consulta por ID
export const getPrimeraConsultaById = async (consultaId: number) => {
  const res = await axios.get(`${API_BASE}/primeras-consultas/${consultaId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
    withCredentials: true,
  });
  return res.data;
};

// 🔹 Obtener estudios agrupados por ID de consulta
export const getEstudiosAgrupadosPorConsulta = async (consultaId: number) => {
  
  const res = await axios.get(`${API_BASE}/resultado_estudio/agrupados-por-consulta/${consultaId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
    withCredentials: true,
  });
  return res.data;
};

