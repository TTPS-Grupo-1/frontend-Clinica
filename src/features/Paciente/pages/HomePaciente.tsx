import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import DashboardCard from "../../Medico/components/DashboardCard";


import { CalendarDays, ClipboardList, FileText, ClipboardPlus  } from "lucide-react";

export default function HomePaciente() {
  const navegar = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const nombre = user?.first_name || user?.name || user?.email || "Paciente";
  // prefer an explicit paciente id from the auth user; fallback to 1 for dev
  const pacienteId = user?.id ?? 6;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex flex-col items-center p-6 pt-[80px]">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2 text-blue-900">Bienvenido/a, <span className="text-blue-600">{nombre}</span></h1>
        <p className="mb-8 text-gray-600 text-center">Accedé rápidamente a tus funciones principales como paciente.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
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
          />
          <DashboardCard
            title="Mi Historia Clínica"
            description="Consultá tu historia clínica"
            icon={<ClipboardPlus className="w-6 h-6" />}
            onClick={() => navegar(`/pacientes/${pacienteId}/historia`)}
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
    </div>
  );
}