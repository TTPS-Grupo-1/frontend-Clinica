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

export interface TurnoAPI {
  id: number;
  id_medico: number;
  id_paciente: number;
  fecha_hora: string; // "YYYY-MM-DDTHH:MM:SS+00:00"
  es_monitoreo: boolean;
}

export interface Turnos {
  id: number;
  fecha: string;
  hora: string;
  medico: string;
  es_monitoreo: boolean;
}

export interface UserState {
  auth: {
    user: {
      id: number;
      rol: string;
    } | null;
  };
}

export interface Medico {
  id: number;
  first_name: string;
  last_name: string;
}
