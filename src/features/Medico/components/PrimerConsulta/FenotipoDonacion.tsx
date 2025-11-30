import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { FenotipoDonacionProps2 } from '../../../../interfaces/Medico';

const FENOTIPOS_URL = '/api/primeras-consultas/fenotipos/';

const FenotipoDonacion: React.FC<FenotipoDonacionProps2> = ({
  visible = true,
  onDataChange,
  value = {
    ojos: '',
    peloColor: '',
    peloTipo: '',
    altura: '',
    complexion: '',
    etnia: '',
  },
}) => {
  const [opciones, setOpciones] = useState({
    ojos: [] as string[],
    peloColor: [] as string[],
    peloTipo: [] as string[],
    complexion: [] as string[],
    etnia: [] as string[],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarEnums() {
      try {
        const resp = await axios.get(FENOTIPOS_URL);

        const data = resp.data;

        if (!data?.enums) {
          console.error('Formato inesperado:', data);
          return;
        }

        setOpciones({
          ojos: data.enums.eye_color.values || [],
          peloColor: data.enums.hair_color.values || [],
          peloTipo: data.enums.hair_type.values || [],
          complexion: data.enums.complexion.values || [],
          etnia: data.enums.ethnicity.values || [],
        });
      } catch (err) {
        console.error('Error cargando fenotipos:', err);
      } finally {
        setLoading(false);
      }
    }

    cargarEnums();
  }, []);

  const handleChange = (key: keyof typeof value, newValue: string) => {
    onDataChange?.({ ...value, [key]: newValue });
  };

  if (!visible) return null;

  return (
    <div className="mx-auto mt-6 max-w-xl rounded-xl border border-gray-300 bg-white p-8 text-black shadow-lg">
      {loading ? (
        <p className="text-center text-gray-600">Cargando opciones...</p>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="mb-1 block font-medium">Color de ojos:</label>
            <select
              className="w-full rounded border border-gray-400 bg-white px-2 py-1"
              value={value.ojos}
              onChange={(e) => handleChange('ojos', e.target.value)}
            >
              <option value="">Seleccione...</option>
              {opciones.ojos.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium">Color de pelo:</label>
            <select
              className="w-full rounded border border-gray-400 bg-white px-2 py-1"
              value={value.peloColor}
              onChange={(e) => handleChange('peloColor', e.target.value)}
            >
              <option value="">Seleccione...</option>
              {opciones.peloColor.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium">Tipo de pelo:</label>
            <select
              className="w-full rounded border border-gray-400 bg-white px-2 py-1"
              value={value.peloTipo}
              onChange={(e) => handleChange('peloTipo', e.target.value)}
            >
              <option value="">Seleccione...</option>
              {opciones.peloTipo.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium text-black">Altura (cm):</label>
            <input
              type="number"
              className="w-full rounded border border-gray-400 bg-white px-2 py-1 text-black"
              value={value.altura}
              onChange={(e) => handleChange('altura', e.target.value)}
              placeholder="Ej: 165"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Complexión corporal:</label>
            <select
              className="w-full rounded border border-gray-400 bg-white px-2 py-1"
              value={value.complexion}
              onChange={(e) => handleChange('complexion', e.target.value)}
            >
              <option value="">Seleccione...</option>
              {opciones.complexion.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium">Rasgos étnicos:</label>
            <select
              className="w-full rounded border border-gray-400 bg-white px-2 py-1"
              value={value.etnia}
              onChange={(e) => handleChange('etnia', e.target.value)}
            >
              <option value="">Seleccione...</option>
              {opciones.etnia.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FenotipoDonacion;
