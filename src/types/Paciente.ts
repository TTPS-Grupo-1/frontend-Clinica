export type Paciente = {
  id: number;
  nombre: string;
  apellido: string;
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
  cobertura: string;
  numeroCobertura: string;
}
