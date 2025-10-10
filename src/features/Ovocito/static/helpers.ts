export function generarIdentificador(nombre: string, apellido: string): string {
  const fecha = new Date();
  const year = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  const letrasAp = apellido.slice(0, 3).toUpperCase();
  const letrasNom = nombre.slice(0, 3).toUpperCase();
  const random = Math.floor(Math.random() * 10000000);
  return `OVO_${year}${mes}${dia}_${letrasAp}_${letrasNom}_${random}`;
}