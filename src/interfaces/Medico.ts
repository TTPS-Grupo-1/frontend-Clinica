import type { Medico } from "../types/Medico";
import type { Paciente } from "../types/Paciente";
export interface MedicoListProps {
  medicos: Medico[];
}

export interface AltaMedicoProps {
  onRegistrar: (medico: Omit<Medico, "id">) => void;
}

export interface PacientCardProps {
  paciente: Paciente;
  onAtender: (id: number) => void;
  onVerHistoria: (id: number) => void;
}