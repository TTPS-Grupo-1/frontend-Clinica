export type Turno = {
  id: number;
  id_grupo: number;
  id_medico: number;
  id_paciente: number | null;
  fecha_hora: string;
}