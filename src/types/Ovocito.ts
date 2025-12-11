export type MadurezOvocito = 'muy inmaduro' | 'maduro' | 'inmaduro';
export type TipoEstadoOvocito = 'fresco' | 'criopreservado' | 'descartado';

export type OvocitoModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (nuevo: {
    identificador: string;
    madurez: MadurezOvocito;
    tipo_estado: TipoEstadoOvocito;
  }) => void;
  nombreDonante: string;
  apellidoDonante: string;
};

export type OvocitoModalRow = {
  id_ovocito: number;
  identificador: string;
  madurez: MadurezOvocito;
  tipo_estado: TipoEstadoOvocito;
};

export interface Ovocito {
  id_ovocito: number;
  identificador: string;
  calidad?: string;
  estado?: string;
  madurez?: MadurezOvocito;
  tipo_estado?: TipoEstadoOvocito;
  fecha_extraccion?: string;
  usado: boolean;
  paciente?: number;
  fue_criopreservado?: boolean; // Indica si alguna vez estuvo criopreservado
}
