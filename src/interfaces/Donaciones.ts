// Tipos base compartidos entre donaciones
export interface DonanteDatos {
  nombre: string;
  apellido: string;
  dni: string;
  id_donante?: string;
  fecha_nacimiento: string;
  ocupacion?: string;
  nacionalidad?: string;
}

export interface FenotipoDonante {
  color_ojos: string;
  color_pelo: string;
  tipo_pelo: string;
  altura: number;
  complexion: string;
  rasgos_etnicos: string;
}

export interface DatosMedicos {
  antecedentes_familiares: string;
  antecedentes_personales: string;
  consumo_tabaco: boolean;
  alcohol: boolean;
  drogas: boolean;
}

export interface ResultadosGeneticos {
  mutaciones_detectadas: boolean;
  descripcion_mutaciones?: string;
  resultado_genetica: string;
}

export interface UbicacionBanco {
  tanque: string;
  rack: string;
  tubo: string;
}

// Donación de Semen
export interface DonacionSemen {
  id_donacion: string; // ej: don_s_20251007_1234567
  datos_donante: DonanteDatos;
  fenotipo: FenotipoDonante;
  datos_medicos: DatosMedicos;
  resultados_geneticos: ResultadosGeneticos;
  apto_para_uso: boolean;
  ubicacion_banco: UbicacionBanco;
  estado: 'Disponible' | 'En uso' | 'Descartado' | 'Donado';
  fecha_registro: string;
}

// Donación de Ovocitos
export interface DatosObtencion {
  fecha_puncion: string;
  numero_ovocitos_extraidos: number;
  numero_viables: number;
}

export interface EstadoOvocito {
  id_ovocito: string;
  estado: 'maduro' | 'inmaduro' | 'criopreservado' | 'descartado';
  fecha_estado: string;
}

export interface HistorialAccion {
  fecha: string;
  accion: 'criopreservacion' | 'fertilizacion' | 'descarte' | 'asignacion';
  descripcion: string;
  responsable: string;
}

export interface DonacionOvocitos {
  id_ovodonacion: string; // ej: don_o_20251007_1234567
  datos_donante: DonanteDatos;
  fenotipo: FenotipoDonante;
  datos_obtencion: DatosObtencion;
  datos_geneticos: ResultadosGeneticos;
  estado_ovocitos: EstadoOvocito[];
  ubicacion: UbicacionBanco;
  destino: 'Asignado a paciente' | 'Donado' | 'Descartado';
  historial_acciones: HistorialAccion[];
  fecha_registro: string;
}

// Props para formularios
export interface DonacionSemenFormProps {
  onSubmit: (data: DonacionSemen) => void;
  initialData?: Partial<DonacionSemen>;
  isEditing?: boolean;
}

export interface DonacionOvocitosFormProps {
  onSubmit: (data: DonacionOvocitos) => void;
  initialData?: Partial<DonacionOvocitos>;
  isEditing?: boolean;
}
export interface StorageStats {
  total_tanks: number;
  sperm_tanks: number;
  oocyte_tanks: number;
  total_racks: number;
  occupied_racks: number;
  available_racks: number;
  utilization_percentage: number;
}

export interface TanquesStatsCardProps {
  loading: boolean;
  stats?: StorageStats;
}
