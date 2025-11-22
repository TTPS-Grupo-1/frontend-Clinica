export interface Tratamiento {
  id: number;
  nombre?: string;
  descripcion?: string;
  fecha_inicio?: string;
  medico: number;
  paciente: number;
}

export interface Transferencia {
  id?: number;
  tratamiento: number;
  embriones: number[];
  test_positivo: boolean;
  observaciones?: string;
}

// Reutilizamos el tipo Embryo existente
export type { Embryo as Embrion } from '../types/Embryo';
