import { useEffect, useState } from 'react';

export interface Estudio {
  id: string | number;
  nombre: string;
}

export function useEstudiosFetch(url: string) {
  const [estudios, setEstudios] = useState<Estudio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    setEstudios([]);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener estudios');
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          // Si la API devuelve un array directo
          if (Array.isArray(data)) setEstudios(data);
          // Si la API devuelve un objeto con array
          else if (Array.isArray(data.estudios)) setEstudios(data.estudios);
          else setEstudios([]);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [url]);

  return { estudios, loading, error };
}
