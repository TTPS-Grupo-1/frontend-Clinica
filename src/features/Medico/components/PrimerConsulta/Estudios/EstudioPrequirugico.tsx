import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AntecedenteItem from '../Antecedentes/AntecedenteItem';
import Paginador from '../Paginador';
import type { Estudio } from '../../../../../interfaces/Medico';

const ESTUDIOS_POR_PAGINA = 7;

const EstudiosPrequirurgicos: React.FC<{ titulo?: string; onDataChange?: (data: any) => void }> = ({
  titulo,
  onDataChange,
}) => {
  const [pagina, setPagina] = useState(1);
  const [estudios, setEstudios] = useState<Estudio[]>([]);
  const [valores, setValores] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'https://srlgceodssgoifgosyoh.supabase.co/functions/v1/get-orden-estudio-prequirurgico';

  // 🔹 Llamada real a la Edge Function usando Axios
  useEffect(() => {
    const fetchEstudios = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(API_URL, {
          headers: {
            'Content-Type': 'application/json',
            // Si la función requiere autenticación:
            // 'Authorization': `Bearer ${token}`,
          },
        });

        // 🧩 Si la respuesta tiene estructura { data: [...] }
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : response.data;

        setEstudios(data);
      } catch (err: any) {
        console.error('Error al obtener estudios prequirúrgicos:', err);
        setError('No se pudieron cargar los estudios.');
      } finally {
        setLoading(false);
      }
    };

    fetchEstudios();
  }, []);

  // 📦 Paginación
  const totalPaginas = Math.ceil(estudios.length / ESTUDIOS_POR_PAGINA);
  const inicio = (pagina - 1) * ESTUDIOS_POR_PAGINA;
  const estudiosPagina = estudios.slice(inicio, inicio + ESTUDIOS_POR_PAGINA);

  const handleChange = (estudio: string, value: boolean) => {
    setValores((prev) => ({ ...prev, [estudio]: value }));
  };

  // 🔄 Notificar al padre cada vez que cambian los valores
  useEffect(() => {
    onDataChange?.(valores);
  }, [valores]);

  return (
    <div className="max-w-xl mx-auto rounded shadow p-6 border-2 border-black bg-white text-black">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">
        {titulo || 'Estudios Prequirúrgicos'}
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Cargando estudios...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <>
          <div>
            {estudiosPagina.map((est) => (
              <AntecedenteItem
                key={est.id}
                antecedente={est.nombre}
                value={!!valores[est.nombre]}
                onChange={(v) => handleChange(est.nombre, v)}
              />
            ))}
          </div>

          <Paginador
            paginaActual={pagina}
            totalPaginas={totalPaginas}
            onPageChange={setPagina}
          />
        </>
      )}
    </div>
  );
};

export default EstudiosPrequirurgicos;
