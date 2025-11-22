import type { OvocitoModalRow } from '../types/Ovocito';

export interface UseOvocitosFetchResult {
  ovocitos: OvocitoModalRow[];
  loading: boolean;
  error: string | null;
  setOvocitos: React.Dispatch<React.SetStateAction<OvocitoModalRow[]>>;
}
