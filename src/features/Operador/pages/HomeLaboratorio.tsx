import { useNavigate, Outlet } from "react-router-dom";
import DashboardCard from "../../Medico/components/DashboardCard";
export default function HomePage() {
  const navigate = useNavigate();

  const handleDonaciones = () => {
    navigate("/operador/donaciones");
    console.log("Navegando a formulario de donación de semen...");
  };

  const handlePunciones = () => {
    navigate("/operador/punciones");
    console.log("Navegando a formulario de punciones...");
  };
   const handleFertilize = () => {
    navigate("/operador/fertilizaciones");
    console.log("Navegando a formulario de fertilizaciones...");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#fbeee6] via-white to-[#f7d6e0] relative overflow-x-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 rounded-full opacity-30 blur-2xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-200 rounded-full opacity-30 blur-2xl" />
      </div>
      <div className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <article className="text-center mb-14">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight drop-shadow-lg">
              Panel de Laboratorio
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-2">
              Gestiona y registra donaciones, punciones y fertilizaciones de manera ágil y segura.
            </p>
            <p className="text-base text-gray-500 max-w-xl mx-auto">
              Accede a cada apartado para iniciar el registro y consulta el estado de los procesos en cualquier momento.
            </p>
          </article>

          <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="transition-transform duration-200 hover:-translate-y-1">
              <DashboardCard
                title="Donaciones"
                description="Registra nuevas donaciones, datos del donante, fenotipo, antecedentes y ubicación en el banco."
                count={42}
                icon={
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
                iconColor="text-blue-600"
                onClick={handleDonaciones}
              />
            </div>
            <div className="transition-transform duration-200 hover:-translate-y-1">
              <DashboardCard
                title="Punciones"
                description="Registra punciones, datos de ovocitos, viabilidad, maduración y destino asignado."
                count={28}
                icon={
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                }
                iconColor="text-pink-600"
                onClick={handlePunciones}
              />
            </div>
            <div className="transition-transform duration-200 hover:-translate-y-1">
              <DashboardCard
                title="Fertilizaciones"
                description="Registra fertilizaciones, técnica utilizada, resultados y seguimiento."
                count={15}
                icon={
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                }
                iconColor="text-purple-600"
                onClick={handleFertilize}
              />
            </div>
          </article>

          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">¿Cómo registrar?</h2>
            <p className="text-gray-700 max-w-xl mx-auto mb-2">
              Selecciona el apartado que corresponda y completa el formulario con la información requerida. Revisa los datos antes de enviar.
            </p>
            <p className="text-gray-500 max-w-xl mx-auto">
              Ten a mano la documentación necesaria antes de iniciar el proceso. Podrás actualizar la información desde el panel en cualquier momento.
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