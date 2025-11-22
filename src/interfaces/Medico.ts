import type { Medico } from '../types/Medico';
import type { Paciente } from '../types/Paciente';
import type { ReactNode } from 'react';
export interface MedicoListProps {
  medicos: Medico[];
  onEliminar?: (medico: Medico) => void;
}

export interface FormMedicoProps {
  onRegistrar: (medico: Omit<Medico, 'id'>) => void;
  initialValues?: Omit<Medico, 'id'>;
  titulo?: string;
  botonTexto?: string;
}

export interface PacientCardProps {
  paciente: Paciente;
  onAtender: (id: number) => void;
  onVerHistoria?: (id: number) => void;
}

// Permite controlar la visibilidad de acciones específicas en la tarjeta
export interface PacientCardOptions {
  showAtender?: boolean;
  showSeguimiento?: boolean;
  onRealizarSeguimiento?: (id: number) => void;   // 👈 AGREGAR ESTO
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

export interface AntecedentesGinecologicosProps {
  doble?: boolean; // Si es método ROPA, pedir datos de ambas mujeres
  onDataChange?: (data: {
    datos1: Record<string, string>;
    datos2?: Record<string, string>;
  }) => void;
  value?: { datos1: Record<string, string>; datos2?: Record<string, string> }; // ✅ nuevo campo para persistencia
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

export interface ObjetivoXProps {
  onDataChange: (key: string, data: any) => void;
}

export interface Estudio {
  id: number;
  nombre: string;
}

export interface AntecedentesXProps {
  onSeleccionChange?: (seleccionados: string[]) => void;
  onDataChange?: (data: any) => void;
}

export interface AntecedentesQuirurgicosProps {
  onDataChange?: (data: { descripcion: string }) => void;
  visible?: boolean;
  value?: { descripcion: string }; // ✅ así debe ir
}

export interface AntecedentesFamiliaresProps {
  onDataChange?: (data: string) => void;
  value?: string;
}

export interface AntecedenteClinicosProps {
  titulo?: string;
  onDataChange?: (seleccionados: string[]) => void;
  value?: string[];
}

export interface AntecedentesGenitalesProps {
  onDataChange?: (data: { descripcion: string }) => void;
  visible?: boolean;
  value?: { descripcion: string };
}

export interface EstudioGinecologicoProps {
  onDataChange?: (data: { seleccionados: string[] }) => void;
  value?: { seleccionados: string[] };
  visible?: boolean;
}

export interface EstudiosPrequirurgicosProps {
  value?: { valores: Record<string, boolean> };
  onDataChange?: (data: { valores: Record<string, boolean> }) => void;
  visible?: boolean;
  titulo?: string;
}

export interface EstudioSemenProps {
  onDataChange?: (data: { estudiosSeleccionados: string[] }) => void;
  value?: { estudiosSeleccionados: string[] };
  visible?: boolean;
}

export interface EstudiosHormonalesProps {
  onDataChange?: (data: { seleccionados: string[] }) => void;
  value?: { seleccionados: string[] };
  visible?: boolean;
}

export interface ExamenFisicoProps {
  visible?: boolean;
  value?: string;
  onDataChange?: (data: string) => void;
}
export interface FenotipoDonacionProps2 {
  onDataChange?: (data: {
    ojos: string;
    peloColor: string;
    peloTipo: string;
    altura: string;
    complexion: string;
    etnia: string;
  }) => void;
  value?: {
    ojos: string;
    peloColor: string;
    peloTipo: string;
    altura: string;
    complexion: string;
    etnia: string;
  };
  visible?: boolean;
}
