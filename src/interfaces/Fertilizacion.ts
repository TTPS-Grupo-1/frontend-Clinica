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