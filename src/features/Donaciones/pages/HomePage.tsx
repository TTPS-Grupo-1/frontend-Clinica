import { useNavigate } from "react-router-dom";
import DashboardCard from "../../Medico/components/DashboardCard";

export default function HomePage() {
  const navigate = useNavigate();

  const handleDonarSemen = () => {
    navigate("/operador/donaciones/nueva/semen");
    console.log("Navegando a formulario de donación de semen...");
  };

  const handleDonarOvocitos = () => {
    navigate("/operador/donaciones/nueva/ovocitos");
    console.log("Navegando a formulario de donación de ovocitos...");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Header */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <article className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Centro de Donaciones
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Registra y gestiona las donaciones de gametos. Completa los formularios con toda la información requerida para el proceso de fertilización asistida.
            </p>
          </article>

          {/* Cards Grid */}
          <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Card 1: Donación de Semen */}
            <DashboardCard
              title="Donación de Semen"
              description="Registra una nueva donación de semen incluyendo datos del donante, fenotipo, antecedentes médicos, resultados genéticos y ubicación en el banco de semen."
              count={42}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              iconColor="text-blue-600"
              onClick={handleDonarSemen}
            />

            {/* Card 2: Donación de Ovocitos */}
            <DashboardCard
              title="Donación de Ovocitos"
              description="Registra una nueva donación de ovocitos con datos de punción, viabilidad, estado de maduración, resultados genéticos y destino asignado."
              count={28}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              }
              iconColor="text-pink-600"
              onClick={handleDonarOvocitos}
            />

          </article>

          {/* Información de proceso */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-pink-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Información del Proceso de Donación
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <h4 className="font-medium text-blue-700 mb-2">📋 Donación de Semen</h4>
                <ul className="space-y-1 pl-4">
                  <li>• Datos completos del donante</li>
                  <li>• Análisis fenotípico detallado</li>
                  <li>• Estudios genéticos obligatorios</li>
                  <li>• Ubicación en banco de semen</li>
                  <li>• Control de calidad espermática</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-pink-700 mb-2">🥚 Donación de Ovocitos</h4>
                <ul className="space-y-1 pl-4">
                  <li>• Registro de fecha de punción</li>
                  <li>• Conteo de ovocitos viables</li>
                  <li>• Estado de maduración individual</li>
                  <li>• Análisis genético completo</li>
                  <li>• Asignación y criopreservación</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}