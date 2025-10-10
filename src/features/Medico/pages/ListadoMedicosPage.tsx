import { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import MedicoList from "../components/MedicoList";
import type { Medico } from "../../../types/Medico";

export default function ListadoMedicosPage() {
	const [medicos, setMedicos] = useState<Medico[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchMedicos = async () => {
			try {
				const response = await axios.get("http://localhost:8000/api/medicos/");
				setMedicos(response.data);
			} catch (error) {
				console.error("Error al cargar médicos:", error);
				toast.error("Error al cargar la lista de médicos");
			} finally {
				setLoading(false);
			}
		};

		fetchMedicos();
	}, []);


	const handleEliminar = (medico: Medico) => {
		setMedicos((prev) => prev.filter((m) => m.dni !== medico.dni));
	};

	if (loading) {
		return (
			<main className="pt-28 flex flex-col items-center min-h-screen">
				<div className="text-xl">Cargando médicos...</div>
			</main>
		);
	}

	return (
		<main className="pt-28 flex flex-col items-center min-h-screen">
			<Toaster position="top-center" />
			<div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow">
				<h1 className="text-2xl font-bold text-black mb-4">Listado de Médicos</h1>
				{medicos.length === 0 ? (
					<p className="text-gray-500">No hay médicos registrados</p>
				) : (
					<MedicoList medicos={medicos} onEliminar={handleEliminar} />
				)}
			</div>
		</main>
	);
}