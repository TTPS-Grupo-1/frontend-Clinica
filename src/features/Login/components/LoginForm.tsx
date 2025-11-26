import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import RoleHomeButton from '../../../shared/components/RoleHomeButton';

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
    <div className="fixed inset-0 flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-gradient-to-br from-blue-100 via-white to-blue-300 px-4 py-12">
      {/* Fondo decorativo */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-200 opacity-30 blur-2xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-300 opacity-30 blur-2xl" />
      </div>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto max-w-lg space-y-8 rounded-2xl border border-gray-100 bg-white p-10 shadow-2xl"
      >
        <RoleHomeButton className="!static mr-4" />
        <div className="mb-2 flex items-center justify-center gap-2">
          <LogIn className="h-7 w-7 text-blue-600" />

          <h2 className="text-center text-3xl font-bold text-blue-700">Iniciar sesión</h2>
        </div>
        <div>
          <label className="mb-2 block text-lg font-medium text-blue-700">Email</label>
          <input
            type="email"
            className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-lg text-blue-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-lg font-medium text-blue-700">Contraseña</label>
          <input
            type="password"
            className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-lg text-blue-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 py-3 text-lg font-semibold text-white shadow transition-all hover:scale-105 hover:from-blue-600 hover:to-blue-800"
        >
          Ingresar
        </button>
        <button
          type="button"
          className="mt-2 w-full rounded-xl bg-gray-200 py-3 text-lg font-semibold text-blue-700 shadow transition-all hover:bg-blue-100"
          onClick={() => (window.location.href = '/registro')}
        >
          Crear cuenta
        </button>
      </motion.form>
    </div>
  );
}
