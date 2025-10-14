export type Medico = {
  id: number;
  nombre: string;
  apellido: string;
  dni: number;
  email: string;
  telefono: number;
  password?: string;  // Opcional porque no se devuelve en listados
};