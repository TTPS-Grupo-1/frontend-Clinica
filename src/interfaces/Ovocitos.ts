import type { EstadoOvocito } from "../types/Ovocito";
import type { Ovocito } from "../types/Ovocito";

export interface OvocitosTableProps {
  ovocitos: Ovocito[];
  onEstadoChange?: (id: string, estado: EstadoOvocito) => void;
  onCriopreservarChange?: (id: string, value: boolean) => void;
  onDescartadoChange?: (id: string, value: boolean) => void;
}

export interface OvocitoModalFormProps {
  open: boolean;
  onClose: () => void;
  onAdd: (ovocito: {
    identificador_ovocito: string;
    estado: EstadoOvocito;
    criopreservar: boolean;
    descartado: boolean;
  }) => void;
  nombreDonante: string;
  apellidoDonante: string;
}