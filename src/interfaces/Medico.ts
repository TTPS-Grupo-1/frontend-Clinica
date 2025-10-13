import type { Medico } from "../types/Medico";
import type { Paciente } from "../types/Paciente";
import type { ReactNode } from "react";
export interface MedicoListProps {
  medicos: Medico[];
  onEliminar?: (medico: Medico) => void;
}

export interface FormMedicoProps {
  onRegistrar: (medico: Omit<Medico, "id">) => void;
  initialValues?: Omit<Medico, "id">;
  titulo?: string;
  botonTexto?: string;
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

export interface ObjetivoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (opcion: string) => void;
}

export interface AntecedentesGinecologicosProps {
  doble?: boolean; // Si es método ROPA, pedir datos de ambas mujeres
}

export interface AntecedenteItemProps {
  antecedente: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export interface AntecedenteItemClinicoProps {
  antecedente: string;
  value: string;
  onChange: (value: string) => void;
}

export interface AntecedentesGenitalesProps {
  visible: boolean;
  onDataChange?: (data: any) => void;
}


export interface AntecedentesGinecologicosProps {
  doble?: boolean; // Si es método ROPA, pedir datos de ambas mujeres
  onDataChange?: (data: any) => void;
  titulo1?: string;
  titulo2?: string;
}

export interface FenotipoDonacionProps {
  visible: boolean;
  onDataChange?: (data: any) => void;
}

export interface PaginadorProps {
  paginaActual: number;
  totalPaginas: number;
  onPageChange: (nuevaPagina: number) => void;
}