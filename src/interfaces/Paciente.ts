import type { PacienteFormData } from '../types/Paciente';
import type { Paciente } from "../types/Paciente";
export interface CoberturaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (cobertura: { id: number; nombre: string; sigla: string }) => void;
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

export interface UsePacientesFetchResult {
    pacientes: Paciente[];
    loading: boolean;
    error: string | null;
    setPacientes: React.Dispatch<React.SetStateAction<Paciente[]>>;
}