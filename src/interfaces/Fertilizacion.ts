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


export interface FertilizacionParams {
  selectedPacienteId: number | null;
  currentUserId: number | null;
  tecnica: 'ICSI' | 'FIV';
  resultado: 'exitosa' | 'fallida';
  observaciones: string;
  semenViable: boolean;
  ovocitoSeleccionado: number | null;
  ovocitoDonadoSeleccionado: any | null;
  bancoSemenSeleccionado: any | null;
  razonBanco: string | null;
  ovocitosFrescos: any[];
  ovocitosCriopreservados: any[];
}

export interface FertilizacionForm {
  ovocito: string;
  semen_info: string;
  fecha_fertilizacion: string;
  tecnico_laboratorio: string;
  tecnica: string;
  resultado: string;
  banco_semen_id: string;
  razon_banco_semen: string;
}
