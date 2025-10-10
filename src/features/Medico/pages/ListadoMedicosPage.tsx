import { useState } from "react";
import MedicoList from "../components/MedicoList";
import type { Medico } from "../../../types/Medico";
import { Toaster } from "react-hot-toast";

export default function ListadoMedicosPage() {
	// Simulación de médicos registrados
	const [medicos, setMedicos] = useState<Medico[]>(
		Array.from({ length: 20 }, (_, i) => ({
			id: i + 1,
			nombre: `Nombre ${i + 1}`,
			apellido: `Apellido ${i + 1}`,
			dni: 10000000 + i,
			email: `medico${i + 1}@ejemplo.com`,
			telefono: 1100000000 + i,
		}))
	);


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
