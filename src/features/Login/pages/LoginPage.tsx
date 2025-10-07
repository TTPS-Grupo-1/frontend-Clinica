import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = (email: string, password: string) => {
    const fake_email = "hola@gmail.com";
    const fake_password = "password123";

    if (email === fake_email && password === fake_password) {
      setError('');
      navigate('/home');
    } else {
      setError('Datos incorrectos, por favor inténtelo otra vez');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div>
        {error && (
          <div className="mb-4 px-4 py-3 rounded bg-red-100 text-red-700 text-center font-semibold border border-red-300">
            {error}
          </div>
        )}
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}