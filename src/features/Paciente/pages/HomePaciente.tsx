import { useNavigate } from "react-router-dom";
import DashboardCard from "../../Medico/components/DashboardCard";


import { CalendarDays, ClipboardList, FileText, ClipboardPlus  } from "lucide-react";

export default function HomePaciente() {
  const navegar = useNavigate();
  return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 pt-[80px]">
        <h1 className="text-2xl font-bold mb-6">Bienvenido/a</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
      
          <DashboardCard
            title="Sacar Turno"
            description="Agendá tu próximo turno con un médico"
            icon={<CalendarDays className="w-6 h-6" />}
            onClick={() => navegar("/pacientes/sacarTurno")}
            bgColor="bg-white"
            iconColor="text-blue-500"
          />

          <DashboardCard
            title="Mis Turnos"
            description="Consultá tus próximos turnos"
            icon={<ClipboardList className="w-6 h-6" />}
            onClick={() => navegar("/pacientes/misTurnos")}
            bgColor="bg-white"
            iconColor="text-green-500"
            count={2}
          />

          <DashboardCard
            title="Mi Historia Clínica"
            description="Consultá tu historia clínica"
            icon={<ClipboardPlus className="w-6 h-6" />}
            onClick={() => console.log("Ir a Ver Turnos")}
            bgColor="bg-white"
            iconColor="text-red-500"
          />

          <DashboardCard
            title="Órdenes Médicas"
            description="Descargá tus órdenes médicas"
            icon={<FileText className="w-6 h-6" />}
            onClick={() => navegar("/pacientes/verOrdenesMedicas")}
            bgColor="bg-white"
            iconColor="text-purple-500"
          />
      </div>
    </div>
  );
}