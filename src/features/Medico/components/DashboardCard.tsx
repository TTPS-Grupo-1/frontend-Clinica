import type { DashboardCardProps } from '../../../interfaces/Medico';

export default function DashboardCard({
  title,
  description,
  icon,
  onClick,
  bgColor = 'bg-white',
  iconColor = 'text-blue-600',
  count,
}: DashboardCardProps) {
  return (
    <div
      className={`${bgColor} transform cursor-pointer rounded-xl border border-gray-100 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
      onClick={onClick}
    >
      <div className="p-6">
        {/* Ícono y contador */}
        <div className="mb-4 flex items-center justify-between">
          <div className={`rounded-full bg-gray-50 p-3 ${iconColor}`}>{icon}</div>
          {count !== undefined && (
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-700">{count}</div>
              <div className="text-xs tracking-wide text-gray-500 uppercase">Total</div>
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm leading-relaxed text-gray-600">{description}</p>
        </div>

        {/* Indicador de acción */}
        <div className="mt-4 border-t border-gray-100 pt-4">
          <div className="flex items-center text-sm text-blue-600 hover:text-blue-700">
            <span>Ver más</span>
            <svg
              className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
