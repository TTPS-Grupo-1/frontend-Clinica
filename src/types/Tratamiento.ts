import type { Paciente } from './Paciente';
export type Props = {
  tratamientoId: number;
  pacienteId: number | null;
  paciente?: Paciente | null;
};
