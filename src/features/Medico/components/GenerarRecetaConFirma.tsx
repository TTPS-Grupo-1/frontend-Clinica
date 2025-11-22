import { useState } from 'react';
import { useGenerarOrden } from '../../../shared/hooks/useGenerarOrden';

interface GenerarRecetaConFirmaProps {
  tipo_estudio: string;
  determinaciones: { nombre: string }[];
}

export default function GenerarRecetaConFirma({
  tipo_estudio,
  determinaciones,
}: GenerarRecetaConFirmaProps) {
  const [firma, setFirma] = useState<File | null>(null);
  const { generar, loading } = useGenerarOrden();

  const handleGenerar = async () => {
    const payload = {
      tipo_estudio: 'Prequirúrgico',
      medico: {
        nombre: 'Dra. Carla Méndez',
      },
      paciente: {
        nombre: 'Laura Fernández',
        dni: '40111222',
      },
      determinaciones: [{ nombre: 'Hemograma' }, { nombre: 'Glucemia' }],
    };
    await generar({
      url: 'https://srlgceodssgoifgosyoh.supabase.co/functions/v1/generar_orden_medica',
      payload,
      firma,
      nombreArchivo: 'orden_medica.pdf',
    });
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-xl border border-black bg-white p-6 text-black shadow-lg">
      <h2 className="mb-4 text-center text-2xl font-bold">
        🧾 Probar generación de receta (smart-task)
      </h2>

      <div className="mb-4">
        <label className="mb-2 block font-medium">Subir firma del médico (.png):</label>
        <input
          type="file"
          accept="image/png"
          onChange={(e) => setFirma(e.target.files?.[0] ?? null)}
          className="w-full rounded border border-black p-2"
        />
      </div>

      <button
        onClick={handleGenerar}
        disabled={loading}
        className={`w-full rounded py-2 font-bold ${
          loading ? 'bg-gray-400' : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        {loading ? 'Generando PDF...' : 'Generar PDF'}
      </button>
    </div>
  );
}
