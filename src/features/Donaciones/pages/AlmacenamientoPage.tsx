import { useEffect, useState } from 'react';
import TanquesStatsCard from '../components/TanquesStatsCard';

export default function AlmacenamientoPage() {
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchStorage() {
      setLoading(true);
      const res = await fetch('/api/almacenamiento?group_number=1&type=esperma');
      const api = await res.json();
      console.log('Datos de tanques recibidos:', api);
      // Si la API es la de gametos, ajusta el parsing aquí
      if (api.success && api.data) {
        setStats(api.data.summary?.storage_capacity || null);
      } else {
        setStats(null);
      }
      setLoading(false);
    }
    fetchStorage();
  }, [page]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 px-4 pt-20 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
          Almacenamiento de Tanques
        </h1>
        <TanquesStatsCard loading={loading} stats={stats} />
      </div>
    </section>
  );
}
