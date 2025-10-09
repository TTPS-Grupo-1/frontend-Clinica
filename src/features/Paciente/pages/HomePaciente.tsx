import { useNavigate } from "react-router-dom";
import OpcionCard from "../components/OpcionesPaciente";


const HomePaciente = () => {

  const navegar = useNavigate();
  const opciones = [
    {
      title: "Sacar Turno",
      description: "Elegí especialidad, médico y fecha.",
      //icon: <CalendarDays />,
      route: "/pacientes/SacarTurno",
    },
    {
      title: "Ver Turnos",
      description: "Consultá tus turnos programados.",
      //icon: <ClipboardList />,
      route: "/pacientes/verTurnos",
    },
    {
      title: "Órdenes Médicas",
      description: "Descargá las órdenes enviadas por tus médicos.",
      //icon: <FileText />,
      route: "/pacientes/ordenesMedicas",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 pt-[80px]">
      <h1 className="text-2xl font-bold mb-6">Bienvenido/a</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {opciones.map((op, idx) => (
          <OpcionCard
            key={idx}
            title={op.title}
            description={op.description}
            //icon={op.icon}
            onClick={() => navegar(op.route)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePaciente;