import { useState } from "react";
import FormularioMedico from "../components/FormularioMedico";
import type { Medico } from "../../../types/Medico";




export default function EditMedicoPage() {
	// Simulación: datos del médico a editar (en la práctica, vendrían de props, contexto, o fetch)
	const medicoActual: Medico = {
		id: 1,
		nombre: "Juan",
		apellido: "Pérez",
		dni: 12345678,
		email: "juan.perez@ejemplo.com",
		telefono: 1122334455,
	};

	const [medico, setMedico] = useState<Medico>(medicoActual);

	const onEditar = (medicoEditado: Omit<Medico, "id">) => {
		// Aquí iría la lógica para actualizar el médico en el backend
		setMedico({ ...medico, ...medicoEditado });
		// Por ejemplo, fetch/axios PUT a /api/medicos/:id
	};

	return (
		<div>
			<FormularioMedico
				onRegistrar={onEditar}
				initialValues={medicoActual}
                titulo="Editar Médico"
                botonTexto="Actualizar Médico"
			/>
		</div>
	);
}
