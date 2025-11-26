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
