import { useEffect, useState } from 'react';
import axios from 'axios';

type Treatment = any;

export default function TreatmentsList({ pacienteId, onSelect }: { pacienteId: number | null; onSelect: (id: number) => void }) {
  const [tratamientos, setTratamientos] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTratamientos() {
      if (!pacienteId) return setTratamientos([]);
      setLoading(true);
      try {
        // Intentar endpoint específico por paciente (con token si existe)
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const headers = token ? { Authorization: `Token ${token}` } : {};
        const res = await axios.get(`/api/tratamientos/por-paciente/${pacienteId}/`, { headers });
        
        let data: any[] = [];
        if (Array.isArray(res.data)) data = res.data;
        else if (res.data && (res.data.id || res.data.pk)) data = [res.data];
        else if (res.data?.results) data = res.data.results;
        else data = [];
        console.log('Fetched tratamientos for paciente:', data);
        setTratamientos(data);
      } catch (err) {
        try {
          const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
          const headers = token ? { Authorization: `Token ${token}` } : {};
          const r2 = await axios.get(`/api/tratamientos/?paciente=${pacienteId}`, { headers });
          const data2 = Array.isArray(r2.data) ? r2.data : (r2.data.results ?? []);
          setTratamientos(data2);
        } catch (e) {
          setTratamientos([]);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchTratamientos();
  }, [pacienteId]);

  if (!pacienteId) return <div className="text-gray-500">Seleccione un paciente para ver sus tratamientos.</div>;
  if (loading) return <div className="text-gray-500">Cargando tratamientos...</div>;
  if (tratamientos.length === 0) return <div className="text-gray-500">No se encontraron tratamientos para este paciente.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {tratamientos.map((t: any) => (
        <button
          key={t.id ?? t.pk}
          onClick={() => onSelect(Number(t.id ?? t.pk))}
          className="text-left border rounded-lg p-4 bg-white hover:shadow cursor-pointer"
        >
          <div className="font-semibold text-gray-800">{t.nombre || t.tipo || `Tratamiento #${t.id ?? t.pk}`}</div>
          <div className="text-sm text-gray-600">Estado: {t.estado || t.tipo_estado || '-'}</div>
          <div className="text-sm text-gray-600">Inicio: {t.fecha_inicio || t.created_at || '-'}</div>
        </button>
      ))}
    </div>
  );
}
