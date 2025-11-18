import { useNavigate } from "react-router-dom";
import DashboardCard from "../../Medico/components/DashboardCard";

export default function HomePage() {
    const navigate = useNavigate();

    const menuItems = [
        {
            title: "Médicos",
            description: "Ver listado de médicos",
            path: "/medicos/listado",
            bgColor: "bg-blue-500",
            hoverColor: "hover:bg-blue-600"
        },
        {
            title: "Cargar Médico",
            description: "Dar de alta un nuevo médico",
            path: "/medicos/alta",
            bgColor: "bg-green-500",
            hoverColor: "hover:bg-green-600"
        },
                {
            title: "Asignar Turnos a Médico",
            description: "Asignar turnos a los diferentes médicos",
            path: "/medicos/asignar_turnos",
            bgColor: "bg-yellow-500",
            hoverColor: "hover:bg-yellow-600"
        },
    ];

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Panel de Administración</h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Selecciona una opción para gestionar la clínica</p>
                    </div>

                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {menuItems.map((item, index) => (
                            <DashboardCard
                                key={index}
                                title={item.title}
                                description={item.description}
                                icon={(
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-8 0h8m-8 0V7a3 3 0 000 6h8a3 3 0 000-6m-8 6v8a1 1 0 001 1h6a1 1 0 001-1v-8" />
                                    </svg>
                                )}
                                onClick={() => navigate(item.path)}
                                iconColor={item.bgColor === 'bg-green-500' ? 'text-green-500' : item.bgColor === 'bg-yellow-500' ? 'text-yellow-500' : 'text-blue-600'}
                            />
                        ))}
                    </section>
                </div>
            </div>
        </main>
    );
}

        
