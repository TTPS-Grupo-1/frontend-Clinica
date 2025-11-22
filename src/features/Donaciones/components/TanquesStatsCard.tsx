interface StorageStats {
  total_tanks: number;
  sperm_tanks: number;
  oocyte_tanks: number;
  total_racks: number;
  occupied_racks: number;
  available_racks: number;
  utilization_percentage: number;
}

interface TanquesStatsCardProps {
  loading: boolean;
  stats?: StorageStats;
}

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
    <div className="mb-8 flex flex-col items-center justify-between gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow md:flex-row">
      <div className="flex flex-col items-center">
        <span className="text-lg font-semibold text-gray-700">Tanques totales</span>
        <span className="text-2xl font-bold text-blue-700">{stats.total_tanks}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-lg font-semibold text-gray-700">Tanques de esperma</span>
        <span className="text-2xl font-bold text-blue-600">{stats.sperm_tanks}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-lg font-semibold text-gray-700">Tanques de ovocitos</span>
        <span className="text-2xl font-bold text-pink-600">{stats.oocyte_tanks}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-lg font-semibold text-gray-700">Racks ocupados</span>
        <span className="text-2xl font-bold text-red-600">{stats.occupied_racks}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-lg font-semibold text-gray-700">Racks disponibles</span>
        <span className="text-2xl font-bold text-green-600">{stats.available_racks}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-lg font-semibold text-gray-700">Utilización</span>
        <span className="text-2xl font-bold text-indigo-600">{stats.utilization_percentage}%</span>
      </div>
    </div>
  );
}
