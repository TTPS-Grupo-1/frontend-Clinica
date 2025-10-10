import FormularioMedico from "../components/FormularioMedico";
import type { Medico } from "../../../types/Medico";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AltaMedicoPage() {
	const navigate = useNavigate();

	const onRegistrar = async (medico: Omit<Medico, "id">) => {
		try {
			console.log('Datos del formulario médico:', medico);
			
			const dataToSend = {
				nombre: medico.nombre,
				apellido: medico.apellido,
				dni: medico.dni,
				email: medico.email,
				telefono: medico.telefono,
			};

			const response = await axios.post('/api/medicos/', dataToSend);
			toast.success(response.data.message || 'Médico registrado exitosamente');
			navigate('/medicos/listado');
		} catch (error: any) {
			console.error('Error al registrar médico:', error);
			toast.error(error.response?.data?.message || 'Error al registrar el médico');
		}
	};

	return (
		<FormularioMedico 
			onRegistrar={onRegistrar} 
			botonTexto="Registrar Médico"
			titulo="Alta de Médico"
		/>
	);
}