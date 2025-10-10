import { useState } from 'react';

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(email, password);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-10 bg-black rounded-xl shadow space-y-6 border-2 border-gray-400">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Iniciar sesión</h2>
        <div>
          <label className="block mb-2 text-lg font-medium text-white">Email</label>
          <input
            type="email"
            className="w-full border border-gray-400 rounded px-4 py-3 text-lg bg-black text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-lg font-medium text-white">Contraseña</label>
          <input
            type="password"
            className="w-full border border-gray-400 rounded px-4 py-3 text-lg bg-black text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 text-lg rounded hover:bg-blue-700 transition"
        >
          Ingresar
        </button>
        <button
          type="button"
          className="w-full mt-2 bg-gray-700 text-white py-3 text-lg rounded hover:bg-gray-800 transition"
          onClick={() => window.location.href = '/registro'}
        >
          Crear cuenta
        </button>
      </form>
    </>
  );
}
