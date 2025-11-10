export type Paciente = {
  id: number;
  first_name: string;
  last_name: string;
  edad: number;
  fechaTurno: string;
  horaTurno: string;
}


export type PacienteFormData = {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  sexo: string;
  fechaNacimiento: string;
  telefono: string;
  password: string;
  cobertura: number;
  coberturaNombre: string;
  numeroCobertura: string;
}
