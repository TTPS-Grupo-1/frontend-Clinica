import type { DashboardCardProps } from "../../../interfaces/Medico";


export default function DashboardCard({
  title,
  description,
  icon,
  onClick,
  bgColor = "bg-white",
  iconColor = "text-blue-600",
  count
}: DashboardCardProps) {
  return (
    <div
      className={`${bgColor} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100`}
      onClick={onClick}
    >
      <div className="p-6">
        {/* Ícono y contador */}
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-full bg-gray-50 ${iconColor}`}>
            {icon}
          </div>
          {count !== undefined && (
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-700">{count}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Total</div>
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>

        {/* Indicador de acción */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-blue-600 hover:text-blue-700">
            <span>Ver más</span>
            <svg
              className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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