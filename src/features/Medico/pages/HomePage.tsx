import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";

export default function HomePage() {
  const navigate = useNavigate();

  const handleVerTurnos = () => {
    navigate("/medico/turnos");
    console.log("Navegando a turnos...");
  };

  const handleVerPacientes = () => {
    navigate("/medico/pacientes");
    console.log("Navegando a pacientes...");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Panel de Control Médico
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bienvenido Dr. Gestiona tus pacientes, turnos y procedimientos desde aquí
            </p>
          </div>

          {/* Cards Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Card 1: Turnos del día */}
            <DashboardCard
              title="Turnos del Día"
              description="Consulta y gestiona los turnos programados para hoy. Atiende pacientes y actualiza el estado de las consultas."
              count={8}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-8 0h8m-8 0V7a3 3 0 000 6h8a3 3 0 000-6m-8 6v8a1 1 0 001 1h6a1 1 0 001-1v-8" />
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
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
