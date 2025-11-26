import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { Estudio, EstudioGinecologicoProps } from '../../../../../interfaces/Medico';

const EstudioGinecologico: React.FC<EstudioGinecologicoProps> = ({
  onDataChange,
  visible = true,
  value = { seleccionados: [] },
}) => {
  const [campos, setCampos] = useState<Estudio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'https://srlgceodssgoifgosyoh.supabase.co/functions/v1/estudio_ginecologico';

  // 🔹 Obtener estudios desde Supabase Edge Function (solo una vez)
  useEffect(() => {
    const fetchCampos = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(API_URL, {
          headers: { 'Content-Type': 'application/json' },
        });

        const data = Array.isArray(response.data.data) ? response.data.data : response.data;

        setCampos(data || []);
      } catch (err: any) {
        console.error('Error al obtener estudios ginecológicos:', err);
        setError('No se pudieron cargar los estudios.');
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

  // 🧱 Render
  return (
    <div className="mx-auto mt-6 max-w-xl rounded border-2 border-black bg-white p-6 text-black shadow">
      <h2 className="mb-4 text-center text-2xl font-bold">Realizar Estudios Ginecológicos</h2>

      {loading ? (
        <p className="text-center text-gray-600">Cargando estudios...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : campos.length === 0 ? (
        <p className="text-center text-gray-600">No hay estudios disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {campos.map((c) => (
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
      )}
    </div>
  );
};

export default EstudioGinecologico;
