import { useNavigate, Outlet } from 'react-router-dom';
import DashboardCard from '../../Medico/components/DashboardCard';

export default function HomePage() {
  const navigate = useNavigate();

  const handleDonaciones = () => {
    navigate('/operador/donaciones');
    console.log('Navegando a formulario de donación de semen...');
  };

  const handlePunciones = () => {
    navigate('/operador/punciones');
    console.log('Navegando a formulario de punciones...');
  };

  const handleFertilize = () => {
    navigate('/operador/fertilizaciones');
    console.log('Navegando a formulario de fertilizaciones...');
  };

  const handleCriopreservacion = () => {
    navigate('/operador/criopreservacion');
    console.log('Navegando a criopreservación de semen...');
  };

  return (
    <section className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#fbeee6] via-white to-[#f7d6e0]">
      {/* Fondo decorativo */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-pink-200 opacity-30 blur-2xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-rose-200 opacity-30 blur-2xl" />
      </div>

      <div className="relative z-10 px-4 pt-24 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <article className="mb-14 text-center">
            <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-gray-900 drop-shadow-lg">
              Panel de Laboratorio
            </h1>
            <p className="mx-auto mb-2 max-w-2xl text-lg text-gray-700">
              Gestiona y registra donaciones, punciones, fertilizaciones y criopreservación de
              manera ágil y segura.
            </p>
            <p className="mx-auto max-w-xl text-base text-gray-500">
              Accede a cada apartado para iniciar el registro y consulta el estado de los procesos
              en cualquier momento.
            </p>
          </article>

          <article className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Donaciones */}
            <div className="transition-transform duration-200 hover:-translate-y-1">
              <DashboardCard
                title="Donaciones"
                description="Registra nuevas donaciones, datos del donante, fenotipo, antecedentes y ubicación en el banco."
                count={42}
                icon={
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                }
                iconColor="text-blue-600"
                onClick={handleDonaciones}
              />
            </div>

            {/* Card 2: Punciones */}
            <div className="transition-transform duration-200 hover:-translate-y-1">
              <DashboardCard
                title="Punciones"
                description="Registra punciones, datos de ovocitos, viabilidad, maduración y destino asignado."
                count={28}
                icon={
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                    />
                  </svg>
                }
                iconColor="text-pink-600"
                onClick={handlePunciones}
              />
            </div>

            {/* Card 3: Fertilizaciones */}
            <div className="transition-transform duration-200 hover:-translate-y-1">
              <DashboardCard
                title="Fertilizaciones"
                description="Registra fertilizaciones, técnica utilizada, resultados y seguimiento."
                count={15}
                icon={
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                    />
                  </svg>
                }
                iconColor="text-purple-600"
                onClick={handleFertilize}
              />
            </div>

            {/* Card 4: Criopreservación Semen */}
            <div className="transition-transform duration-200 hover:-translate-y-1">
              <DashboardCard
                title="Criopreservación Semen"
                description="Gestiona tanques, congelar/descongelar muestras y consultar por DNI."
                count={32}
                icon={
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                }
                iconColor="text-cyan-600"
                onClick={handleCriopreservacion}
              />
            </div>
          </article>

          <div className="mt-20 text-center">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">¿Cómo registrar?</h2>
            <p className="mx-auto mb-2 max-w-xl text-gray-700">
              Selecciona el apartado que corresponda y completa el formulario con la información
              requerida. Revisa los datos antes de enviar.
            </p>
            <p className="mx-auto max-w-xl text-gray-500">
              Ten a mano la documentación necesaria antes de iniciar el proceso. Podrás actualizar
              la información desde el panel en cualquier momento.
            </p>
          </div>

          {/* Renderiza subrutas aquí */}
          <div className="mt-12">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}
