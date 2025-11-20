import type { PacienteFormData } from '../types/Paciente';
import type { Paciente } from '../types/Paciente';
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
  es_monitoreo: boolean;
}

export interface TurnoCardProps {
  turno: Turno;
  onCancelar: (id: number) => void;
  onReasignar: (idTurno: number) => void;
}

export interface UsePacientesFetchResult {
  pacientes: Paciente[];
  loading: boolean;
  error: string | null;
  setPacientes: React.Dispatch<React.SetStateAction<Paciente[]>>;
}
