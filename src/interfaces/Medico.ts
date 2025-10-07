import type { Medico } from "../types/Medico";

export interface MedicoListProps {
  medicos: Medico[];
}

export interface AltaMedicoProps {
  onRegistrar: (medico: Omit<Medico, "id">) => void;
}
