import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AntecedenteItem from '../Antecedentes/AntecedenteItem';
import Paginador from '../Paginador';
import type { Estudio, EstudiosPrequirurgicosProps } from '../../../../../interfaces/Medico';

const ESTUDIOS_POR_PAGINA = 7;

const EstudiosPrequirurgicos: React.FC<EstudiosPrequirurgicosProps> = ({
  titulo,
  onDataChange,
  value = { valores: {} },
  visible = true,
}) => {
  const [pagina, setPagina] = useState(1);
  const [estudios, setEstudios] = useState<Estudio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL =
    'https://srlgceodssgoifgosyoh.supabase.co/functions/v1/get-orden-estudio-prequirurgico';

  // 🔹 Obtener estudios desde la API
  useEffect(() => {
    const fetchEstudios = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(API_URL, {
          headers: { 'Content-Type': 'application/json' },
        });

        const data = Array.isArray(response.data.data)
          ? response.data.data
          : response.data;

        setEstudios(data || []);
      } catch (err: unknown) {
        console.error('Error al obtener estudios prequirúrgicos:', err);
        setError('No se pudieron cargar los estudios.');
      } finally {
        setLoading(false);
      }
    };

    fetchEstudios();
  }, []);

  if (!visible) return null;

  // 📦 Paginación
  const totalPaginas = Math.ceil(estudios.length / ESTUDIOS_POR_PAGINA);
  const inicio = (pagina - 1) * ESTUDIOS_POR_PAGINA;
  const estudiosPagina = estudios.slice(inicio, inicio + ESTUDIOS_POR_PAGINA);

  // ✅ Manejo de checkboxes controlados
  const handleChange = (nombre: string, checked: boolean) => {
    const nuevosValores = { ...value.valores, [nombre]: checked };
    onDataChange?.({ valores: nuevosValores });
  };

  // 🧱 Render
  return (
    <div className="max-w-2xl mx-auto rounded-xl shadow-lg p-8 border border-gray-300 bg-white text-black flex flex-col justify-between min-h-[400px]">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">
        {titulo || 'Estudios Prequirúrgicos'}
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
              <AntecedenteItem
                key={est.id}
                antecedente={est.nombre}
                value={!!value.valores[est.nombre]}
                onChange={(v) => handleChange(est.nombre, v)}
              />
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

export default EstudiosPrequirurgicos;
