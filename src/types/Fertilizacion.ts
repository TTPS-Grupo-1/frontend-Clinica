export type Fertilizacion  = {
  id_fertilizacion: number;
  fecha_fertilizacion: string;
  ovocito: any;
  resultado: string;
  tecnica_icsi?: boolean;
  tecnica_fiv?: boolean;
}

export type FenotipoData = {
  color_ojos: string;
  color_pelo: string;
  tipo_pelo: string;
  altura_cm: number;
  complexion_corporal: string;
  rasgos_etnicos: string;
}

export type SemenData =  {
  id: number;
  viable: boolean;
  origen: 'PAREJA' | 'DONANTE';
  paciente_id?: number;
  donante_id?: number;
}

export type OvocitoData = {
  id: number;
  viable: boolean;
  estado: 'fresco' | 'criopreservado';
  paciente_id: number;
  puncion_id: number;
}

export type GametoDonado = {
  id: number;
  tipo: 'semen' | 'ovocito';
  fenotipo: FenotipoData;
  viable: boolean;
}

export type FertilizacionData = {
  paciente_id: number;
  medico_id: number;
  semen_origen: 'PAREJA' | 'DONANTE';
  ovocitos_origen: 'PROPIOS' | 'DONADOS';
  ovocitos_utilizados: number[];
  resultado: 'exitosa' | 'fallida';
  observaciones?: string;
}