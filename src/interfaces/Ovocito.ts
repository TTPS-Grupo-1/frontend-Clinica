import type { OvocitoModalRow } from '../types/Ovocito';

export interface UseOvocitosFetchResult {
  ovocitos: OvocitoModalRow[];
  loading: boolean;
  error: string | null;
  setOvocitos: React.Dispatch<React.SetStateAction<OvocitoModalRow[]>>;
}

export interface HistorialItem {
  id: number;
  estado: string;
  fecha: string;
  nota?: string;
  usuario_rep?: string;
}

export interface Props {
  historial: HistorialItem[];
  onNodeClick?: (estado: string) => void;
}

export interface HistoryModalProps {
  entityId: number | null;
  entityIdentificador?: string;
  entityType: 'ovocito' | 'embrion';
  open: boolean;
  onClose: () => void;
}
