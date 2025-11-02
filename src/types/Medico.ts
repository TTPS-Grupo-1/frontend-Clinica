export type Medico = {
  id: number;
  first_name: string;
  last_name: string;
  dni: number;
  email: string;
  telefono: number;
  password?: string;  // Opcional porque no se devuelve en listados
  firma_medico?: string; // URL o base64 de la firma
};


export type MedicoTurno =  {
    id: number;
    first_name: string;
    last_name: string;
}