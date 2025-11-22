import { useNavigate } from 'react-router-dom';
import DashboardCard from '../../Medico/components/DashboardCard';
import RoleHomeButton from '../../../shared/components/RoleHomeButton';

export default function HomePage() {
  const navigate = useNavigate();

  const handleDonarSemen = () => {
    navigate('/operador/donaciones/nueva/esperma');
    console.log('Navegando a formulario de donación de semen...');
  };

  const handleDonarOvocitos = () => {
    navigate('/operador/donaciones/nueva/ovocito');
    console.log('Navegando a formulario de donación de ovocitos...');
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Header */}
      <div className="px-4 pt-20 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <article className="mb-12 text-center">
            <div className="mx-auto flex max-w-3xl items-center justify-between">
              <div>
                <h1 className="mb-4 text-4xl font-bold text-gray-900">Centro de Donaciones</h1>
                <p className="text-xl text-gray-600">
                  Registra y gestiona las donaciones de gametos. Completa los formularios con toda
                  la información requerida para el proceso de fertilización asistida.
                </p>
              </div>
              <RoleHomeButton className="!static ml-6" />
            </div>
          </article>

          {/* Cards Grid */}
          <article className="mx-auto grid max-w-4xl grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Card 1: Donación de Semen */}
            <DashboardCard
              title="Donación de Semen"
              description="Registra una nueva donación de semen incluyendo datos del donante, fenotipo, antecedentes médicos, resultados genéticos y ubicación en el banco de semen."
              count={42}
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
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
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                  />
                </svg>
              }
              iconColor="text-pink-600"
              onClick={handleDonarOvocitos}
            />

            {/* Card 3: Ver tanques */}
            <DashboardCard
              title="Ver tanques"
              description="Visualiza todos los tanques disponibles, su tipo y el espacio restante."
              count={0}
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} />
                  <rect x="8" y="8" width="8" height="8" rx="2" fill="currentColor" opacity="0.2" />
                </svg>
              }
              iconColor="text-green-600"
              onClick={() => navigate('/operador/tanques')}
            />
          </article>

          {/* Información de proceso */}
          <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-50 to-pink-50 p-6">
            <h3 className="mb-4 text-center text-lg font-semibold text-gray-900">
              Información del Proceso de Donación
            </h3>
            <div className="grid gap-6 text-sm text-gray-700 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-medium text-blue-700">📋 Donación de Semen</h4>
                <ul className="space-y-1 pl-4">
                  <li>• Datos completos del donante</li>
                  <li>• Análisis fenotípico detallado</li>
                  <li>• Estudios genéticos obligatorios</li>
                  <li>• Ubicación en banco de semen</li>
                  <li>• Control de calidad espermática</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-medium text-pink-700">🥚 Donación de Ovocitos</h4>
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
