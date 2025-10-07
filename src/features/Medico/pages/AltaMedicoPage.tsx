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

	};

	return (
	
			<AltaMedico onRegistrar={onRegistrar} />
	
	);
}

