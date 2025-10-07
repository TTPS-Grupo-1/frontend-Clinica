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
