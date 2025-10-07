import type { Medico } from "../types/Medico";

export interface MedicoListProps {
  medicos: Medico[];
}

export interface FormMedicoProps {
  onRegistrar: (medico: Omit<Medico, "id">) => void;
  initialValues?: Omit<Medico, "id">;
  titulo?: string;
  botonTexto?: string;
}

