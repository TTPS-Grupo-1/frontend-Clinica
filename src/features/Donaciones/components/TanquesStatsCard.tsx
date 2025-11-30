import type { TanquesStatsCardProps } from '@/interfaces/Donaciones';

function SkeletonStatsCard() {
  return (
    <div className="mb-8 flex animate-pulse flex-col items-center justify-between gap-6 rounded-xl border border-gray-200 bg-gray-100 p-6 shadow md:flex-row">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          <span className="mb-2 h-6 w-24 rounded bg-gray-300" />
          <span className="h-8 w-16 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

export default function TanquesStatsCard({ loading, stats }: TanquesStatsCardProps) {
  if (loading || !stats) return <SkeletonStatsCard />;
  return (
    <section className="mb-8 flex flex-col items-center justify-between gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow md:flex-row">
      <article className="flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-700">Tanques totales</h3>
        <data value={stats.total_tanks} className="text-2xl font-bold text-blue-700">
          {stats.total_tanks}
        </data>
      </article>
      <article className="flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-700">Tanques de esperma</h3>
        <data value={stats.sperm_tanks} className="text-2xl font-bold text-blue-600">
          {stats.sperm_tanks}
        </data>
      </article>
      <article className="flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-700">Tanques de ovocitos</h3>
        <data value={stats.oocyte_tanks} className="text-2xl font-bold text-pink-600">
          {stats.oocyte_tanks}
        </data>
      </article>
      <article className="flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-700">Racks ocupados</h3>
        <data value={stats.occupied_racks} className="text-2xl font-bold text-red-600">
          {stats.occupied_racks}
        </data>
      </article>
      <article className="flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-700">Racks disponibles</h3>
        <data value={stats.available_racks} className="text-2xl font-bold text-green-600">
          {stats.available_racks}
        </data>
      </article>
      <article className="flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-700">Utilización</h3>
        <data value={stats.utilization_percentage} className="text-2xl font-bold text-indigo-600">
          {stats.utilization_percentage}%
        </data>
      </article>
    </section>
  );
}
