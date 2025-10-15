import type { Embryo } from "../types/Embryo";
export interface EmbryoListProps {
  embryos: Embryo[];
}

export interface EmbryoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (embryo: Omit<Embryo, "id"> & { id: string }) => void;
  pacienteNombre?: string;
}

export interface UseEmbryoFetchResult {
    embriones: Embryo[];
    loading: boolean;
    error: string | null;
    setEmbriones: React.Dispatch<React.SetStateAction<Embryo[]>>;
}


export interface EmbryoListAdaptedProps extends EmbryoListProps {
  selectedPacienteId: number | null;
}

export interface EmbryoModalAdaptedProps extends EmbryoModalProps {
  pacientes: any[];
  ovocitos: any[];
  selectedPacienteId: number | null;
}
