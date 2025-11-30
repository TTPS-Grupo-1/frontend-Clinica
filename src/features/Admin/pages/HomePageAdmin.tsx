import { useNavigate } from 'react-router-dom';
import DashboardCard from '../../Medico/components/DashboardCard';

export default function HomePage() {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Médicos',
      description: 'Ver listado de médicos',
      path: '/medicos/listado',
      bgColor: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
    },
    {
      title: 'Cargar Médico',
      description: 'Dar de alta un nuevo médico',
      path: '/medicos/alta',
      bgColor: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
    },
    {
      title: 'Asignar Turnos a Médico',
      description: 'Asignar turnos a los diferentes médicos',
      path: '/medicos/asignar_turnos',
      bgColor: 'bg-yellow-500',
      hoverColor: 'hover:bg-yellow-600',
    },
    {
      title: 'Consultar deudas y cobros de pacientes',
      description: 'Ver y gestionar las deudas y pagos de los pacientes',
      path: '/pacientes/deudaPacientes',
      bgColor: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
    },
    {
      title: 'Consultar deudas y cobros de obras sociales',
      description: 'Ver y gestionar las deudas y pagos de las obras sociales',
      path: '/obras-sociales/deuda',
      bgColor: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="px-4 pt-20 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">Panel de Administración</h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Selecciona una opción para gestionar la clínica
            </p>
          </div>

          <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item, index) => (
              <DashboardCard
                key={index}
                title={item.title}
                description={item.description}
                icon={
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-8 0h8m-8 0V7a3 3 0 000 6h8a3 3 0 000-6m-8 6v8a1 1 0 001 1h6a1 1 0 001-1v-8"
                    />
                  </svg>
                }
                onClick={() => navigate(item.path)}
                iconColor={
                  item.bgColor === 'bg-green-500'
                    ? 'text-green-500'
                    : item.bgColor === 'bg-yellow-500'
                      ? 'text-yellow-500'
                      : 'text-blue-600'
                }
              />
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
