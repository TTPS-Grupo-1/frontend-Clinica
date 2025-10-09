import RegistroForm from '../components/RegistroForm';
import type { PacienteFormData } from '../../../types/Paciente';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { mapSexoToDjango } from '../helpers/utils';

export default function RegistroPage() {
  const navigate = useNavigate();
   
  const handleRegistro = async (data: PacienteFormData) => {
    try {
      console.log('Datos del formulario:', data);
      
      const dataToSend = {
        nombre: data.nombre,
        apellido: data.apellido,
        fecha_nacimiento: data.fechaNacimiento,
        email: data.email,
        telefono: data.telefono,
        obra_social: data.cobertura,
        sexo: mapSexoToDjango(data.sexo),
        contraseña: data.password,
        numero_afiliado: data.numeroCobertura,
        dni: data.dni,

      };
      const response = await axios.post('/api/pacientes/', dataToSend);
      toast.success(response.data.message);
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message);
  
    }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <RegistroForm onSubmit={handleRegistro} />
    </div>
  );
}
