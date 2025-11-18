export type MessageType = 'info' | 'success' | 'error' | 'warning';

export type TransferenciaFormData = {
  tratamiento: number | null;
  embriones: number[];
  testPositivo: boolean;
};