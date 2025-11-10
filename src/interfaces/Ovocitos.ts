import type { MadurezOvocito, TipoEstadoOvocito, OvocitoModalRow } from "../types/Ovocito";

export interface OvocitosTableProps {
  ovocitos: OvocitoModalRow[];
  onMadurezChange?: (id: string, madurez: MadurezOvocito) => void;
  onTipoEstadoChange?: (id: string, tipo_estado: TipoEstadoOvocito) => void;
}

export interface OvocitoModalFormProps {
  open: boolean;
  onClose: () => void;
  onAdd: (ovocito: {
    identificador: string;
    madurez: MadurezOvocito;
    tipo_estado: TipoEstadoOvocito;
  }) => void;
  nombreDonante: string;
  apellidoDonante: string;
}