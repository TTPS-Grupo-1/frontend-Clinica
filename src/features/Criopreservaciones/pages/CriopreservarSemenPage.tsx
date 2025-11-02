import DashboardCard from "../../Medico/components/DashboardCard";

export default function CriopreservarSemenPage() {
  return (
    <main className="pt-28 flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Gestión de Criopreservación de Semen
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Crear Tanque */}
          <DashboardCard
            title="Crear Tanque"
            description="Registrar un nuevo tanque de criopreservación"
            icon="🏭"
            linkTo="/criopreservacion/semen/crear-tanque"
          />

          {/* Card 2: Congelar Semen */}
          <DashboardCard
            title="Congelar Semen"
            description="Registrar una nueva muestra de semen congelada"
            icon="❄️"
            linkTo="/criopreservacion/semen/congelar"
          />

          {/* Card 3: Descongelar Semen */}
          <DashboardCard
            title="Descongelar Semen"
            description="Descongelar una muestra para su uso"
            icon="🔥"
            linkTo="/criopreservacion/semen/descongelar"
          />

          {/* Card 4: Obtener Muestra por DNI */}
          <DashboardCard
            title="Buscar Muestra"
            description="Consultar muestras por DNI del paciente"
            icon="🔍"
            linkTo="/criopreservacion/semen/buscar"
          />
        </div>
      </div>
    </main>
  );
}


