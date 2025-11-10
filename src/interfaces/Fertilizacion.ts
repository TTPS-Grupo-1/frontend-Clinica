import type { Fertilizacion } from "../types/Fertilizacion";
import type { OvocitoModalRow } from "../types/Ovocito";
export interface fertilizacionesProps {
  fertilizaciones: Fertilizacion[];
}
export interface fertilizacionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFertilize: (data: any) => void; // callback cuando se completa la fertilización
  ovocitos: OvocitoModalRow[];
  semenes?: any[]; // placeholder: de dónde vendrán los semenes
  selectedPacienteId: number | null;
  currentUser?: { id: number; nombre: string } | null;
};

export interface FertilizacionHeaderProps {
  pacientes: any[];
  selectedPacienteId: number | null;
  setSelectedPacienteId: (id: number | null) => void;
  onOpenModal: () => void;
}


export interface FertilizacionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPacienteId: number | null;
  selectedPacienteNombre?: string | null;
  // ahora pasamos solo el id del usuario que ejecuta la acción
  currentUserId?: number | null;
}

export interface FertilizacionData {
  paciente_id: number;
  medico_id: number;
  semen_origen: 'PAREJA' | 'DONANTE';
  ovocitos_origen: 'PROPIOS' | 'DONADOS';
  ovocitos_utilizados: number[];
  resultado: 'exitosa' | 'fallida';
  observaciones?: string;
}