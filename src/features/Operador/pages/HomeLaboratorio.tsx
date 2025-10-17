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

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <article className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Bienvenido al Panel de Control del Laboratorio  
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Registra y gestiona las donaciones de gametos. Completa los formularios con toda la información requerida para el proceso de fertilización asistida.
              Registra y gestione las punciones ováricas. Complete los formularios con toda la información requerida para el proceso de fertilización asistida.
            </p>
          </article>

          <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <DashboardCard
              title="Apartado de Donaciones"
              description="Registra una nueva donación incluyendo datos del donante, fenotipo, antecedentes médicos, resultados genéticos y ubicación en el banco de semen."
              count={42}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              iconColor="text-blue-600"
              onClick={handleDonaciones}
            />
            <DashboardCard
              title="Apartado de Punciones"
              description="Registra una nueva punción con datos de ovocitos, viabilidad, estado de maduración, resultados genéticos y destino asignado."
              count={28}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              }
              iconColor="text-pink-600"
              onClick={handlePunciones}
            />
          </article>
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Proceso de Registro</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Selecciona la sección correspondiente para registrar donaciones de semen o punciones ováricas. Completa los formularios con la información requerida y asegúrate de revisar todos los datos antes de enviar.  
              Una vez registrado, podrás gestionar y actualizar la información en cualquier momento desde el panel de control.
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Asegúrate de contar con toda la documentación necesaria antes de iniciar el proceso de registro.
            </p>
          </div>
          {/* Renderiza subrutas aquí */}
          <div className="mt-10">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}