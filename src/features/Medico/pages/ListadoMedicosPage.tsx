import { useState } from "react";
import MedicoList from "../components/MedicoList";
import type { Medico } from "../../../types/Medico";
import { Toaster } from "react-hot-toast";

export default function ListadoMedicosPage() {
	// Simulación de médicos registrados
	const [medicos, setMedicos] = useState<Medico[]>([
		{
			id: 1,
			nombre: "Juan",
			apellido: "Pérez",
			dni: 12345678,
			email: "juan.perez@ejemplo.com",
			telefono: 1122334455,
		},
		{
			id: 2,
			nombre: "Ana",
			apellido: "García",
			dni: 87654321,
			email: "ana.garcia@ejemplo.com",
			telefono: 2233445566,
		},
	]);


	const handleEliminar = (medico: Medico) => {
		setMedicos((prev) => prev.filter((m) => m.dni !== medico.dni));
	};

	return (
	<main className="pt-28 flex flex-col items-center min-h-screen">
			<Toaster position="top-center" />
			<div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow">
				<h1 className="text-2xl font-bold text-black mb-4">Listado de Médicos</h1>
				<MedicoList medicos={medicos} onEliminar={handleEliminar} />
			</div>
		</main>
	);
}
