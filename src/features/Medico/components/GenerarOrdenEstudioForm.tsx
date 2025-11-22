import React, { useState, useEffect } from 'react';
import { useEstudiosFetch } from '../../../shared/hooks/useEstudiosFetch';
import GenerarRecetaConFirma from './GenerarRecetaConFirma';

const ESTUDIOS = [
  {
    nombre: 'Estudio ginecológico',
    url: 'https://srlgceodssgoifgosyoh.supabase.co/functions/v1/estudio_ginecologico',
  },
  {
    nombre: 'Estudio hormonales',
    url: 'https://srlgceodssgoifgosyoh.supabase.co/functions/v1/estudio_hormonales',
  },
  {
    nombre: 'Estudio prequirúrgico',
    url: 'https://srlgceodssgoifgosyoh.supabase.co/functions/v1/get-orden-estudio-prequirurgico',
  },
  {
    nombre: 'Estudio de semen',
    url: 'https://srlgceodssgoifgosyoh.supabase.co/functions/v1/estudio_semen',
  },
];

export default function GenerarOrdenEstudioForm() {
  const [estudio, setEstudio] = useState(ESTUDIOS[0].url);
  const [determinaciones, setDeterminaciones] = useState<string[]>([]);
  const [showReceta, setShowReceta] = useState(false);
  const { estudios: opciones, loading: loadingEstudios, error } = useEstudiosFetch(estudio);
  useEffect(() => {
    setDeterminaciones([]);
  }, [opciones]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReceta(true);
  };

  if (showReceta) {
    return (
      <GenerarRecetaConFirma
        tipo_estudio={ESTUDIOS.find((e) => e.url === estudio)?.nombre || ''}
        determinaciones={determinaciones.map((nombre) => ({ nombre }))}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 max-w-md rounded-xl border border-black bg-white p-6 text-black shadow-lg"
    >
      <h2 className="mb-4 text-center text-2xl font-bold">Generar orden de estudio</h2>
      <div className="mb-4">
        <label className="mb-2 block font-medium">Tipo de estudio:</label>
        <select
          value={estudio}
          onChange={(e) => setEstudio(e.target.value)}
          className="w-full rounded border border-black p-2"
        >
          {ESTUDIOS.map((e) => (
            <option key={e.url} value={e.url}>
              {e.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="mb-2 block font-medium">Determinaciones:</label>
        {loadingEstudios ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 animate-pulse rounded bg-gray-200" />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-600">Error cargando estudios</div>
        ) : (
          <div className="space-y-1">
            {opciones.map((op) => {
              const nombre = typeof op === 'string' ? op : op.nombre;
              const key = typeof op === 'string' ? op : op.id || op.nombre;
              return (
                <label key={String(key)} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={determinaciones.includes(nombre)}
                    onChange={(e) => {
                      if (e.target.checked) setDeterminaciones([...determinaciones, nombre]);
                      else setDeterminaciones(determinaciones.filter((d) => d !== nombre));
                    }}
                  />
                  <span>{nombre}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full rounded bg-black py-2 font-bold text-white hover:bg-gray-800"
      >
        Continuar
      </button>
    </form>
  );
}
