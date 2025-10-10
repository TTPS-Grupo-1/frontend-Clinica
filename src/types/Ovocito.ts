export type EstadoOvocito = "muy inmaduro" | "maduro" | "inmaduro";

export type Ovocito = {
  identificador_ovocito: string;
  estado: EstadoOvocito;
  criopreservar: boolean;
  descartado: boolean;
}