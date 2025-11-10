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
        first_name: data.nombre,
        last_name: data.apellido,
        fecha_nacimiento: data.fechaNacimiento,
        email: data.email,
        telefono: data.telefono,
        obra_social: data.cobertura,
        sexo: mapSexoToDjango(data.sexo),
        password: data.password,
        numero_afiliado: data.numeroCobertura,
        dni: data.dni,
        rol: 'PACIENTE',

      };
      console.log('Datos a enviar al backend:', dataToSend);
      const response = await axios.post('/api/pacientes/', dataToSend);
      toast.success(response.data.message);
      navigate('/login');
    } catch (error) {
        if (axios.isAxiosError(error)) {
          const data = error.response?.data;
          const message = data?.message || error.message || 'Error en la solicitud';
          toast.error(message);

          // Mostrar errores de cada campo (si existen)
          if (data?.errors && typeof data.errors === 'object') {
            Object.entries(data.errors as Record<string, unknown>).forEach(([campo, errores]) => {
              const mensajes = Array.isArray(errores) ? errores : [errores];
              mensajes.forEach((msg) => {
                toast.error(`${campo}: ${String(msg)}`);
              });
            });
          }
        } else {
          toast.error('Ocurrió un error inesperado');
        }
      }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <RegistroForm onSubmit={handleRegistro} />
    </div>
  );
}
