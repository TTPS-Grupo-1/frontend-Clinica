import React, { useState, useEffect } from 'react';
import axios from 'axios';
import type { AntecedentesGenitalesProps } from '../../../../../interfaces/Medico';
import Paginador from '../Paginador';

interface Estudio {
  id: number;
  nombre: string;
}

const ESTUDIOS_POR_PAGINA = 5;

const EstudioSemen: React.FC<AntecedentesGenitalesProps> = ({ visible, onDataChange }) => {
  const [pagina, setPagina] = useState(1);
  const [estudios, setEstudios] = useState<Estudio[]>([]);
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'https://srlgceodssgoifgosyoh.supabase.co/functions/v1/estudio_semen';

  // 🔹 Llamada real a la API usando Axios
  useEffect(() => {
    const fetchEstudios = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(API_URL, {
          headers: {
            'Content-Type': 'application/json',
            // Si tu función necesita token JWT:
            // 'Authorization': `Bearer ${token}`,
          },
        });

        // 🧩 Si la función devuelve { data: [...] }
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : response.data;

        setEstudios(data);
      } catch (err: any) {
        console.error('Error al obtener estudios de semen:', err);
        setError('No se pudieron cargar los estudios.');
      } finally {
        setLoading(false);
      }
    };

    fetchEstudios();
  }, []);

  // 🔄 Notificar al padre cada vez que cambia la selección
  useEffect(() => {
    onDataChange?.({ estudiosSeleccionados: seleccionados });
  }, [seleccionados]);

  if (!visible) return null;

  // 📦 Paginación
  const totalPaginas = Math.ceil(estudios.length / ESTUDIOS_POR_PAGINA);
  const inicio = (pagina - 1) * ESTUDIOS_POR_PAGINA;
  const estudiosPagina = estudios.slice(inicio, inicio + ESTUDIOS_POR_PAGINA);

  const toggleSeleccion = (nombre: string) => {
    setSeleccionados((prev) =>
      prev.includes(nombre)
        ? prev.filter((e) => e !== nombre)
        : [...prev, nombre]
    );
  };

  return (
    <div className="max-w-xl mx-auto rounded shadow p-6 border-2 border-black bg-white text-black mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">
        Estudios de semen
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Cargando estudios...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : estudios.length === 0 ? (
        <p className="text-center text-gray-600">No hay estudios disponibles.</p>
      ) : (
        <>
          <div className="space-y-2">
            {estudiosPagina.map((est) => (
              <label key={est.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={seleccionados.includes(est.nombre)}
                  onChange={() => toggleSeleccion(est.nombre)}
                  className="h-4 w-4 accent-black"
                />
                <span>{est.nombre}</span>
              </label>
            ))}
          </div>

          <div className="mt-4">
            <Paginador
              paginaActual={pagina}
              totalPaginas={totalPaginas}
              onPageChange={setPagina}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default EstudioSemen;
