/**
 * Utility function to safely format dates
 * Handles null, undefined, and invalid date strings
 */
export const formatDate = (fecha: string | null | undefined, options?: Intl.DateTimeFormatOptions): string => {
  if (!fecha) return 'Fecha no disponible';
  
  try {
    const date = new Date(fecha);
    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }
    
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    return date.toLocaleDateString('es-AR', options || defaultOptions);
  } catch (error) {
    return 'Fecha inválida';
  }
};

/**
 * Short date format helper
 */
export const formatDateShort = (fecha: string | null | undefined): string => {
  return formatDate(fecha, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Date and time format helper
 */
export const formatDateTime = (fecha: string | null | undefined): string => {
  return formatDate(fecha, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};