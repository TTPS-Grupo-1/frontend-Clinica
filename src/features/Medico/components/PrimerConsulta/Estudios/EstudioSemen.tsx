import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paginador from '../Paginador';
import type { Estudio, EstudioSemenProps } from '../../../../../interfaces/Medico';

const ESTUDIOS_POR_PAGINA = 5;

const EstudioSemen: React.FC<EstudioSemenProps> = ({
  visible = true,
  onDataChange,
  value = { estudiosSeleccionados: [] },
}) => {
  const [pagina, setPagina] = useState(1);
  const [estudios, setEstudios] = useState<Estudio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'https://srlgceodssgoifgosyoh.supabase.co/functions/v1/estudio_semen';

  // 🔹 Obtener estudios desde Supabase Edge Function
  useEffect(() => {
    const fetchEstudios = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(API_URL, {
          headers: { 'Content-Type': 'application/json' },
        });

        const data = Array.isArray(response.data.data) ? response.data.data : response.data;

        setEstudios(data || []);
      } catch (err: any) {
        console.error('Error al obtener estudios de semen:', err);
        setError('No se pudieron cargar los estudios.');
      } finally {
        setLoading(false);
      }
    };

    fetchEstudios();
  }, []);

  // ✅ Manejo de selección controlada
  const toggleSeleccion = (nombre: string) => {
    const nuevos = value.estudiosSeleccionados.includes(nombre)
      ? value.estudiosSeleccionados.filter((e) => e !== nombre)
      : [...value.estudiosSeleccionados, nombre];
    onDataChange?.({ estudiosSeleccionados: nuevos });
  };

  if (!visible) return null;

  // 📦 Paginación
  const totalPaginas = Math.ceil(estudios.length / ESTUDIOS_POR_PAGINA);
  const inicio = (pagina - 1) * ESTUDIOS_POR_PAGINA;
  const estudiosPagina = estudios.slice(inicio, inicio + ESTUDIOS_POR_PAGINA);

  // 🧱 Render
  return (
    <div className="mx-auto mt-6 max-w-xl rounded border-2 border-black bg-white p-6 text-black shadow">
      <h2 className="mb-4 text-center text-2xl font-bold text-black">Estudios de semen</h2>

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
                  checked={value.estudiosSeleccionados.includes(est.nombre)}
                  onChange={() => toggleSeleccion(est.nombre)}
                  className="h-4 w-4 accent-black"
                />
                <span>{est.nombre}</span>
              </label>
            ))}
          </div>

          {totalPaginas > 1 && (
            <div className="mt-4">
              <Paginador
                paginaActual={pagina}
                totalPaginas={totalPaginas}
                onPageChange={setPagina}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EstudioSemen;
