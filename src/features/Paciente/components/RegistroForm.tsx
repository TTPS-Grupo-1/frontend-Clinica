import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import CoberturaModal from './CoberturaModal';
import type { PacienteFormData } from '../../../types/Paciente';
import type { PropsPaciente } from '../../../interfaces/Paciente';

const SEXOS = [
  'Femenino',
  'Masculino',
  'Intersex',
  'Otro'
];



export default function RegistroForm({ onSubmit, initialData }: PropsPaciente) {
  const [form, setForm] = useState<PacienteFormData>(
    initialData || {
      nombre: '', apellido: '', dni: '', email: '', sexo: '', fechaNacimiento: '', telefono: '', password: '', coberturaNombre: '', cobertura: 0, numeroCobertura: '',
    }
  );
  const [showCoberturaModal, setShowCoberturaModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCoberturaSelect = (cobertura: { id: number; nombre: string; sigla: string }) => {
    setForm(f => ({ ...f, 
      cobertura: cobertura.id,
      coberturaNombre: cobertura.nombre
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
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
        className="max-w-2xl w-full mx-auto p-8 bg-white rounded-2xl shadow-2xl space-y-8 border border-gray-100 z-10 relative"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <UserPlus className="w-7 h-7 text-blue-600" />
          <h2 className="text-2xl font-bold text-center text-blue-700">Registro de Paciente</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-base font-medium text-blue-700">Nombre</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-base bg-white text-blue-900 placeholder-gray-400 focus:outline-none focus:border-blue-500" required />
          </div>
          <div>
            <label className="block mb-2 text-base font-medium text-blue-700">Apellido</label>
            <input name="apellido" value={form.apellido} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-base bg-white text-blue-900 placeholder-gray-400 focus:outline-none focus:border-blue-500" required />
          </div>
          <div>
            <label className="block mb-2 text-base font-medium text-blue-700">DNI</label>
            <input name="dni" value={form.dni} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-base bg-white text-blue-900 placeholder-gray-400 focus:outline-none focus:border-blue-500" required />
          </div>
          <div>
            <label className="block mb-2 text-base font-medium text-blue-700">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-base bg-white text-blue-900 placeholder-gray-400 focus:outline-none focus:border-blue-500" required />
          </div>
          <div>
            <label className="block mb-2 text-base font-medium text-blue-700">Sexo al nacer</label>
            <select name="sexo" value={form.sexo} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-base bg-white text-blue-900 focus:outline-none focus:border-blue-500" required>
              <option value="">Seleccione...</option>
              {SEXOS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-base font-medium text-blue-700">Fecha de nacimiento</label>
            <input name="fechaNacimiento" type="date" value={form.fechaNacimiento} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-base bg-white text-blue-900 focus:outline-none focus:border-blue-500" required />
          </div>
          <div>
            <label className="block mb-2 text-base font-medium text-blue-700">Teléfono</label>
            <input name="telefono" value={form.telefono} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-base bg-white text-blue-900 placeholder-gray-400 focus:outline-none focus:border-blue-500" required />
          </div>
          <div>
            <label className="block mb-2 text-base font-medium text-blue-700">Contraseña</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-base bg-white text-blue-900 placeholder-gray-400 focus:outline-none focus:border-blue-500" required />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2 text-base font-medium text-blue-700">Cobertura médica</label>
            <div className="flex gap-2">
              <input name="cobertura" value={form.coberturaNombre} readOnly className="w-full border border-gray-300 rounded px-3 py-2 text-base bg-white text-blue-900 placeholder-gray-400 cursor-pointer focus:outline-none focus:border-blue-500" onClick={() => setShowCoberturaModal(true)} placeholder="Seleccionar..." required />
              <button type="button" onClick={() => setShowCoberturaModal(true)} className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">Elegir</button>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2 text-base font-medium text-blue-700">Número de cobertura</label>
            <input name="numeroCobertura" value={form.numeroCobertura} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-base bg-white text-blue-900 placeholder-gray-400 focus:outline-none focus:border-blue-500" required />
          </div>
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 text-lg rounded-xl hover:scale-105 hover:from-blue-600 hover:to-blue-800 font-semibold transition-all shadow">
          Registrarse
        </button>
        <CoberturaModal isOpen={showCoberturaModal} onClose={() => setShowCoberturaModal(false)} onSelect={handleCoberturaSelect} />
      </motion.form>
    </div>
  );
}
