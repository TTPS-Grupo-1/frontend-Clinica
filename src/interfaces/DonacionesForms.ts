// Interfaces para los props de los formularios de donaciones
import type { DonanteDatos, FenotipoDonante, DatosMedicos, ResultadosGeneticos } from "./Donaciones";

export interface DonantesFormProps {
  datos: Partial<DonanteDatos>;
  onChange: (datos: Partial<DonanteDatos>) => void;
}

export interface FenotipoFormProps {
  fenotipo: Partial<FenotipoDonante>;
  onChange: (fenotipo: Partial<FenotipoDonante>) => void;
}

export interface AntecedentesFormProps {
  datosMedicos: Partial<DatosMedicos>;
  onChange: (datosMedicos: Partial<DatosMedicos>) => void;
}

export interface ResultadosGeneticosFormProps {
  resultados: Partial<ResultadosGeneticos>;
  onChange: (resultados: Partial<ResultadosGeneticos>) => void;
  aptoParaUso?: boolean;
  onAptoChange?: (apto: boolean) => void;
}