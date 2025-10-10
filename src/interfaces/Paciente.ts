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