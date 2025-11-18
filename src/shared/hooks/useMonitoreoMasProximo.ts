import axios from "axios";

export async function obtenerMonitoreoMasProximo(tratamientoId: number): Promise<number | null> {
  try {
    const token = localStorage.getItem("token");
    console.log("Buscando monitoreo más próximo para tratamiento ID:", tratamientoId);
    
    const response = await axios.get(
      `/api/monitoreo/monitoreos/mas-proximo/?tratamiento=${tratamientoId}`,
      {
        headers: {
          Authorization: token ? `Token ${token}` : "",
        },
      }
    );

    if (response.data.success && response.data.data) {
      console.log("✅ Monitoreo encontrado:", response.data.data);
      return response.data.data.id;
    }
    
    return null;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.log("No hay monitoreos pendientes");
      return null;
    }
    console.error("Error al obtener monitoreo:", error);
    return null;
  }
}