export const generateEmbryoId = (pacienteNombre: string) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateStr = `${year}${month}${day}`;
    
    // Extraer 3 letras del apellido y nombre (simulado)
    const apellido = pacienteNombre.split(' ')[0]?.substring(0, 3).toUpperCase() || "APE";
    const nombre = pacienteNombre.split(' ')[1]?.substring(0, 3).toUpperCase() || "NOM";
    
    // Número aleatorio de 7 dígitos
    const randomNum = Math.floor(1000000 + Math.random() * 9000000);
    
    return `EMB_${dateStr}_${apellido}_${nombre}_${randomNum}`;
  };