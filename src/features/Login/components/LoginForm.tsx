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
    <div className="fixed inset-0 min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-300 px-4 py-12 overflow-x-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-2xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full opacity-30 blur-2xl" />
      </div>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg mx-auto p-10 bg-white rounded-2xl shadow-2xl space-y-8 border border-gray-100 z-10 relative"
      >
        <RoleHomeButton className="!static mr-4" />
        <div className="flex items-center justify-center gap-2 mb-2">
          
          <LogIn className="w-7 h-7 text-blue-600" />
          
          <h2 className="text-3xl font-bold text-center text-blue-700">Iniciar sesión</h2>
          
        </div>
        <div>
          <label className="block mb-2 text-lg font-medium text-blue-700">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-4 py-3 text-lg bg-white text-blue-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-lg font-medium text-blue-700">Contraseña</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-4 py-3 text-lg bg-white text-blue-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 text-lg rounded-xl hover:scale-105 hover:from-blue-600 hover:to-blue-800 font-semibold transition-all shadow"
        >
          Ingresar
        </button>
        <button
          type="button"
          className="w-full mt-2 bg-gray-200 text-blue-700 py-3 text-lg rounded-xl hover:bg-blue-100 font-semibold transition-all shadow"
          onClick={() => window.location.href = '/registro'}
        >
          Crear cuenta
        </button>
      </motion.form>
    </div>
  );
}
