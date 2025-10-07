import AltaMedico from "../components/AltaMedico";

import { useState } from "react";

import type { Medico } from "../../../types/Medico";

export default function AltaMedicoPage() {
	const [medicos, setMedicos] = useState<Medico[]>([]);

	const onRegistrar = async (medico: Omit<Medico, "id">) => {
		const nuevoId = medicos.length + 1;
		setMedicos([
			...medicos,
			{
				id: nuevoId,
				...medico,
			},
		]);
		// Lógica para enviar los datos al backend
		try {
			await fetch("/api/medicos", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: nuevoId, ...medico }),
			});
		} catch (error) {
			console.error("Error al registrar médico", error);
		}
	};

	return (
	
			<AltaMedico onRegistrar={onRegistrar} />
	
	);
}

