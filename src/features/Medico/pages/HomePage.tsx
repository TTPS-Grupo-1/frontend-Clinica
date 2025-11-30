import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import DashboardCard from '../components/DashboardCard';

export default function HomePage() {
  const navigate = useNavigate();

  const currentUser = useSelector((state: RootState) => (state.auth as any)?.user);
  const es_director = currentUser?.is_director;
  const handleVerTurnos = () => {
    navigate('/medico/turnos');
    console.log('Navegando a turnos...');
  };

  const handleVerPacientes = () => {
    const medicoId = currentUser?.id;
    if (medicoId) {
      navigate(`/medico/${medicoId}/pacientes`);
      console.log(`Navegando a pacientes del médico ${medicoId}...`);
    } else {
      // Fallback: si no hay user (rare caso), usar 0 para que la página de destino lo maneje
      navigate(`/medico/0/pacientes`);
      console.log('Navegando a pacientes (medico 0) por falta de user en store...');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="px-4 pt-20 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">Panel de Control Médico</h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Bienvenido {es_director ? 'Director Médico' : 'Doctor'}. Gestiona tus pacientes,
              turnos y procedimientos desde aquí.
            </p>
          </div>

          {/* Cards Grid */}
          <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: Turnos del día */}
            <DashboardCard
              title="Turnos del Día"
              description="Consulta y gestiona los turnos programados para hoy. Atiende pacientes y actualiza el estado de las consultas."
              count={8}
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
              iconColor="text-green-600"
              onClick={handleVerTurnos}
            />

            {/* Card 3: Base de Pacientes */}
            <DashboardCard
              title="Base de Pacientes"
              description="Accede al historial clínico completo de tus pacientes, tratamientos previos y evolución del caso."
              count={156}
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              }
              iconColor="text-blue-600"
              onClick={handleVerPacientes}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
