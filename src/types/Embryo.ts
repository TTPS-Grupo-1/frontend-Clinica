export type Embryo = {
  id?: string | number;
  calidad: string;
  pgt?: string; // opcional
  estado: 'descartado' | 'transferido' | 'criopreservado' | 'fresco';
  fecha_baja?: string; // opcional
  causa_descarte?: string; // opcional
  observaciones?: string;
};
