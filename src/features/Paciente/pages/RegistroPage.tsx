import RegistroForm from '../components/RegistroForm';
import type { PacienteFormData } from '../../../types/Paciente';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function RegistroPage() {
  const navigate = useNavigate();

  const handleRegistro = (data: PacienteFormData) => {
    // Aquí iría la lógica real de registro (API)
    if (data.email && data.password) {
      toast.success('¡Registro exitoso!');
      navigate('/login');
    } else {
      toast.error('Por favor complete todos los campos.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <RegistroForm onSubmit={handleRegistro} />
    </div>
  );
}
