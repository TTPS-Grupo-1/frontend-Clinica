import type { PacienteFormData } from '../types/Paciente';

export interface CoberturaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (cobertura: string) => void;
}


export interface PropsPaciente {
  onSubmit: (data: PacienteFormData) => void;
  initialData?: PacienteFormData;
}

export interface Turno {
  id: number;
  fecha: string;
  hora: string;
  medico: string;
  especialidad?: string;
}

export interface TurnoCardProps {
  turno: Turno;
  onCancelar: (id: number) => void;
}