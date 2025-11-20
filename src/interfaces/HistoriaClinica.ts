export interface Props {
  selectedPacienteId: number | null;
  paciente: any | null;
  loadingPaciente: boolean;
  ovocitos: any[];
  loadingOvocitos: boolean;
  embriones: any[];
  loadingEmbriones: boolean;
  fertilizaciones: any[];
  loadingFert: boolean;
  historial?: any[]; // historial de ovocitos (opcional)
  loadingHistorial?: boolean;
}
