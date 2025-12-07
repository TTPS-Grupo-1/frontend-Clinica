// Helper function to map frontend sexo values to Django choices
export const mapSexoToDjango = (sexo: string): string => {
  const sexoMap: { [key: string]: string } = {
    Masculino: 'M',
    Femenino: 'F',
    Otro: 'O',
  };
  return sexoMap[sexo] || '';
};
