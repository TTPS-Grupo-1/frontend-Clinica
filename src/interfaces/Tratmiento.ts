import type { Paciente } from '../types/Paciente';
import type { OvocitoModalRow } from '../types/Ovocito';
import type { Fertilizacion } from '../types/Fertilizacion';


export interface TreatmentTratamiento {
  id: number;
  paciente: number;
  medico: number;
  medico_nombre?: string;
  activo: boolean;
  fecha_inicio: string;
  fecha_creacion: string;
  objetivo?: string;
}

// Tipo compatible con EmbrionesTable
export interface TreatmentEmbrion {
  id?: number;
  identificador: string;
  estado: string;
  calidad?: number;
  fecha_modificacion?: string;
}

// Tipo compatible con MonitoreoTable
export interface TreatmentMonitoreo {
  id: number;
  fecha_realizado: string;
  descripcion: string;
}

export interface TreatmentAntecedentesGinecologicos {
  id: number;
  menarquia_edad?: number;
  ciclo_menstrual_duracion?: number;
  fecha_ultima_menstruacion?: string;
  paridad?: number;
  abortos_espontaneos?: number;
  abortos_inducidos?: number;
  embarazos_ectopicos?: number;
  cirugias_previas?: string;
  enfermedades_ginecologicas?: string;
  uso_anticonceptivos?: boolean;
  observaciones?: string;
  created_at: string;
  updated_at: string;
}

export interface TreatmentAntecedentesPersonales {
  id: number;
  fuma_pack_dias?: number;
  consume_alcohol?: boolean;
  drogas_recreativas?: string;
  observaciones_habitos?: string;
  created_at: string;
  updated_at: string;
}

export interface TreatmentResultadoEstudio {
  id: number;
  consulta: number;
  nombre_estudio: string;
  tipo_estudio: string;
  valor: string;
  persona?: string;
}

export interface TreatmentOrden {
  id: number;
  consulta: number;
  tipo_orden: string;
  descripcion: string;
  fecha_creacion: string;
  observaciones?: string;
}

export interface TreatmentPrimeraConsulta {
  id: number;
  fecha: string;
  motivo_consulta?: string;
  antecedentes_familiares?: Record<string, boolean>;
  patologias_previas?: Record<string, boolean>;
  medicacion_actual?: string;
  alergias?: Record<string, boolean>;
  habitos?: Record<string, boolean | string>;
  examen_fisico?: Record<string, string | number>;
  estudios_complementarios?: Record<string, string>;
  diagnostico?: string;
  plan_tratamiento?: string;
  observaciones?: string;
  created_at: string;
  updated_at: string;
}

export interface TreatmentSegundaConsulta {
  id: number;
  ovocito_viable: boolean;
  semen_viable: boolean;
  consentimiento_informado: boolean;
  tipo_medicacion?: string;
  dosis_medicacion?: string;
  duracion_medicacion?: string;
  fecha: string;
  droga?: string;
}




export interface TreatmentData {
  tratamiento: TreatmentTratamiento | null;
  ovocitos: OvocitoModalRow[];
  embriones: TreatmentEmbrion[];
  fertilizaciones: Fertilizacion[];
  monitoreos: TreatmentMonitoreo[];
  antecedentesGinecologicos: TreatmentAntecedentesGinecologicos[];
  antecedentesPersonales: TreatmentAntecedentesPersonales[];
  resultadosEstudios: TreatmentResultadoEstudio[];
  ordenes: TreatmentOrden[];
  primeraConsulta: TreatmentPrimeraConsulta | null;
  segundaConsulta: TreatmentSegundaConsulta | null;
  pacienteLocal: Paciente | null;
  loading: boolean;
}
