import type { TransferenciaFormData } from '@/types/Transferencia';
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

export interface TransferenciaFormProps {
  formData: TransferenciaFormData;
  onFormChange: <K extends keyof TransferenciaFormData>(
    field: K,
    value: TransferenciaFormData[K]
  ) => void;
  onSubmit: () => void;
  onReset: () => void;
  isLoading: boolean;
  message: string | null;
  messageType: 'info' | 'success' | 'error' | 'warning';
}
