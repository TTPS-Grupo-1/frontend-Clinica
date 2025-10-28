import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    const menuItems = [
        {
            title: "Médicos",
            description: "Ver listado de médicos",
            icon: "👨‍⚕️👨‍⚕️",
            path: "/medicos/listado",
            bgColor: "bg-blue-500",
            hoverColor: "hover:bg-blue-600"
        },
        {
            title: "Cargar Médico",
            description: "Dar de alta un nuevo médico",
            icon: "👨‍⚕️",
            path: "/medicos/alta",
            bgColor: "bg-green-500",
            hoverColor: "hover:bg-green-600"
        },
                {
            title: "Asignar Turnos a Médico",
            description: "Asignar turnos a los diferentes médicos",
            icon: "👨‍⚕️",
            path: "/medicos/asignar_turnos",
            bgColor: "bg-yellow-500",
            hoverColor: "hover:bg-yellow-600"
        },
    ];

    return (
        <main className="pt-28 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Panel de Administración
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Selecciona una opción para gestionar la clínica
                    </p>
                </div>

                <div className="flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => navigate(item.path)}
                                className={`${item.bgColor} ${item.hoverColor} rounded-xl shadow-lg p-6 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50`}
                            >
                                <div className="text-6xl mb-4">{item.icon}</div>
                                <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                                <p className="text-sm opacity-90">{item.description}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

        
