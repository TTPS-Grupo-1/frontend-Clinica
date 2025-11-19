export type Turno = {
  id: number;
  id_grupo: number;
  id_medico: number;
  id_paciente: number | null;
  fecha_hora: string;
  es_monitoreo: boolean;
  id_externo: number;
  paciente_data?: {
    first_name: string;
    last_name: string;
    edad: number;
    dni?: string;  
  };
};

export type TurnoAPI = {
    id: number;
    id_medico: number;
    id_paciente: number | null; // null si está libre
    fecha_hora: string; // Formato ISO 8601
};