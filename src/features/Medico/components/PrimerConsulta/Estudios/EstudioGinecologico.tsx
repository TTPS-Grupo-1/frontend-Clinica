import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { Estudio} from '../../../../../interfaces/Medico';
import type { AntecedentesXProps } from '../../../../../interfaces/Medico';

const EstudioGinecologico: React.FC<AntecedentesXProps> = ({
  onSeleccionChange,
  onDataChange
}) => {
  const [campos, setCampos] = useState<Estudio[]>([]);
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'https://srlgceodssgoifgosyoh.supabase.co/functions/v1/estudio_ginecologico';

  // 🔹 Llamada real a la Edge Function con Axios
  useEffect(() => {
    const fetchCampos = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(API_URL, {
          headers: {
            'Content-Type': 'application/json',
            // Si tu función requiere autenticación:
            // 'Authorization': `Bearer ${token}`,
          },
        });

        // 🧩 Si la respuesta de la función tiene formato { data: [...] }
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : response.data;

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

  // ✅ Manejo de selección
  const handleCheckbox = (nombre: string) => {
    setSeleccionados((prev) =>
      prev.includes(nombre)
        ? prev.filter((n) => n !== nombre)
        : [...prev, nombre]
    );
  };

  // ✅ Notificar al padre
  useEffect(() => {
    onSeleccionChange?.(seleccionados);
    onDataChange?.({ seleccionados });
  }, [seleccionados]);

  // 🔹 Render
  return (
    <div className="max-w-xl mx-auto mt-6 rounded shadow p-6 border-2 border-black bg-white text-black">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Realizar Estudios Ginecológicos
      </h2>

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
                checked={seleccionados.includes(c.nombre)}
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
