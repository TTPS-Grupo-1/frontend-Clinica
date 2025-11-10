export type Embryo = {
  id?: string | number;
  identificador?: string;
  fertilizacion?: number;
  tecnico_laboratorio?: string;
  calidad: string;
  pgt?: string; // opcional
  estado: 'descartado' | 'transferido' | 'criopreservado' | 'fresco' | 'no_transferido';
  fecha_baja?: string; // opcional
  causa_descarte?: string; // opcional
  observaciones?: string;
};
