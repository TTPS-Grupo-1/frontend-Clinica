import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();


  const handleLogin = (email: string, password: string) => {
    const fake_email = "hola@gmail.com";
    const fake_password = "password123";

    if (email === fake_email && password === fake_password) {
      navigate('/home');
      toast['success']('Bienvenido de nuevo!');
    } else {
      toast['error']('Error de autenticación. Verifique sus credenciales.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}