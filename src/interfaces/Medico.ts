import type { Medico } from "../types/Medico";
import type { Paciente } from "../types/Paciente";
import type { ReactNode } from "react";
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

export interface DashboardCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
  bgColor?: string;
  iconColor?: string;
  count?: number;
}
