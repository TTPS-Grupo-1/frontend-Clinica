import { useState } from 'react';
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
      nombre: '', apellido: '', dni: '', email: '', sexo: '', fechaNacimiento: '', telefono: '', password: '', cobertura: '', numeroCobertura: '',
    }
  );
  const [showCoberturaModal, setShowCoberturaModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCoberturaSelect = (cobertura: string) => {
    setForm(f => ({ ...f, cobertura }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl w-full mx-auto p-6 bg-black rounded-xl shadow space-y-6 border-2 border-gray-400 mt-32">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Registro de Paciente</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-base font-medium text-white">Nombre</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} className="w-full border border-gray-400 rounded px-3 py-2 text-base bg-black text-white placeholder-gray-400 focus:outline-none focus:border-blue-500" required />
        </div>
        <div>
          <label className="block mb-2 text-base font-medium text-white">Apellido</label>
          <input name="apellido" value={form.apellido} onChange={handleChange} className="w-full border border-gray-400 rounded px-3 py-2 text-base bg-black text-white placeholder-gray-400 focus:outline-none focus:border-blue-500" required />
        </div>
        <div>
          <label className="block mb-2 text-base font-medium text-white">DNI</label>
          <input name="dni" value={form.dni} onChange={handleChange} className="w-full border border-gray-400 rounded px-3 py-2 text-base bg-black text-white placeholder-gray-400 focus:outline-none focus:border-blue-500" required />
        </div>
        <div>
          <label className="block mb-2 text-base font-medium text-white">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full border border-gray-400 rounded px-3 py-2 text-base bg-black text-white placeholder-gray-400 focus:outline-none focus:border-blue-500" required />
        </div>
        <div>
          <label className="block mb-2 text-base font-medium text-white">Sexo al nacer</label>
          <select name="sexo" value={form.sexo} onChange={handleChange} className="w-full border border-gray-400 rounded px-3 py-2 text-base bg-black text-white focus:outline-none focus:border-blue-500" required>
            <option value="">Seleccione...</option>
            {SEXOS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-base font-medium text-white">Fecha de nacimiento</label>
          <input name="fechaNacimiento" type="date" value={form.fechaNacimiento} onChange={handleChange} className="w-full border border-gray-400 rounded px-3 py-2 text-base bg-black text-white focus:outline-none focus:border-blue-500" required />
        </div>
        <div>
          <label className="block mb-2 text-base font-medium text-white">Teléfono</label>
          <input name="telefono" value={form.telefono} onChange={handleChange} className="w-full border border-gray-400 rounded px-3 py-2 text-base bg-black text-white placeholder-gray-400 focus:outline-none focus:border-blue-500" required />
        </div>
        <div>
          <label className="block mb-2 text-base font-medium text-white">Contraseña</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full border border-gray-400 rounded px-3 py-2 text-base bg-black text-white placeholder-gray-400 focus:outline-none focus:border-blue-500" required />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2 text-base font-medium text-white">Cobertura médica</label>
          <div className="flex gap-2">
            <input name="cobertura" value={form.cobertura} readOnly className="w-full border border-gray-400 rounded px-3 py-2 text-base bg-black text-white placeholder-gray-400 cursor-pointer focus:outline-none focus:border-blue-500" onClick={() => setShowCoberturaModal(true)} placeholder="Seleccionar..." required />
            <button type="button" onClick={() => setShowCoberturaModal(true)} className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">Elegir</button>
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2 text-base font-medium text-white">Número de cobertura</label>
          <input name="numeroCobertura" value={form.numeroCobertura} onChange={handleChange} className="w-full border border-gray-400 rounded px-3 py-2 text-base bg-black text-white placeholder-gray-400 focus:outline-none focus:border-blue-500" required />
        </div>
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 text-base rounded hover:bg-blue-700 font-semibold">Registrarse</button>
      <CoberturaModal isOpen={showCoberturaModal} onClose={() => setShowCoberturaModal(false)} onSelect={handleCoberturaSelect} />
    </form>
  );
}
