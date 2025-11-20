export interface GenerateUniqueIdOptions {
  prefix: string;
  nombre?: string;
  apellido?: string;
}

export function generateUniqueId({
  prefix,
  nombre = 'NOM',
  apellido = 'APE',
}: GenerateUniqueIdOptions): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;
  const letrasAp = apellido.slice(0, 3).toUpperCase();
  const letrasNom = nombre.slice(0, 3).toUpperCase();
  const randomNum = Math.floor(1000000 + Math.random() * 9000000);
  return `${prefix}_${dateStr}_${letrasAp}_${letrasNom}_${randomNum}`;
}
