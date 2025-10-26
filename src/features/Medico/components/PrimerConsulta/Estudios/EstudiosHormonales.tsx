import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paginador from '../Paginador';
import type { Estudio, EstudiosHormonalesProps } from '../../../../../interfaces/Medico';

const ANTECEDENTES_POR_PAGINA = 4;

const EstudiosHormonales: React.FC<EstudiosHormonalesProps> = ({
  onDataChange,
  visible = true,
  value = { seleccionados: [] },
}) => {
  const [campos, setCampos] = useState<Estudio[]>([]);
  const [pagina, setPagina] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL =
    'https://srlgceodssgoifgosyoh.supabase.co/functions/v1/estudio_hormonales';

  // 🔹 Llamada real a la API de Supabase con Axios
  useEffect(() => {
    const fetchCampos = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(API_URL, {
          headers: { 'Content-Type': 'application/json' },
        });

        const data = Array.isArray(response.data.data)
          ? response.data.data
          : response.data;

        setCampos(data || []);
      } catch (err: any) {
        console.error('Error al obtener estudios hormonales:', err);
        setError('No se pudieron cargar los estudios hormonales.');
      } finally {
        setLoading(false);
      }
    };

    fetchCampos();
  }, []);

  // ✅ Manejo de selección controlada
  const handleCheckbox = (nombre: string) => {
    const nuevos = value.seleccionados.includes(nombre)
      ? value.seleccionados.filter((n) => n !== nombre)
      : [...value.seleccionados, nombre];
    onDataChange?.({ seleccionados: nuevos });
  };

  if (!visible) return null;

  // 📦 Paginación
  const totalPaginas = Math.ceil(campos.length / ANTECEDENTES_POR_PAGINA);
  const inicio = (pagina - 1) * ANTECEDENTES_POR_PAGINA;
  const camposPagina = campos.slice(inicio, inicio + ANTECEDENTES_POR_PAGINA);

  // 🧱 Render
  return (
    <div className="max-w-2xl mx-auto mt-6 rounded-xl shadow-lg p-8 border border-gray-300 bg-white text-black flex flex-col justify-between min-h-[400px]">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">
        Estudios Hormonales
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Cargando estudios...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : campos.length === 0 ? (
        <p className="text-center text-gray-600">No hay estudios disponibles.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3">
            {camposPagina.map((c) => (
              <label key={c.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={value.seleccionados.includes(c.nombre)}
                  onChange={() => handleCheckbox(c.nombre)}
                  className="h-4 w-4 border-black accent-black"
                />
                <span className="text-black">{c.nombre}</span>
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

export default EstudiosHormonales;
