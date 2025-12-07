import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import CoberturaModal from './CoberturaModal';
import type { PacienteFormData } from '../../../types/Paciente';
import type { PropsPaciente } from '../../../interfaces/Paciente';
import RoleHomeButton from '../../../shared/components/RoleHomeButton';

const SEXOS = ['Femenino', 'Masculino', 'Otro'];

export default function RegistroForm({ onSubmit, initialData }: PropsPaciente) {
  const [form, setForm] = useState<PacienteFormData>(
    initialData || {
      nombre: '',
      apellido: '',
      dni: '',
      email: '',
      sexo: '',
      fechaNacimiento: '',
      telefono: '',
      password: '',
      coberturaNombre: '',
      cobertura: 0,
      numeroCobertura: '',
    }
  );
  const [showCoberturaModal, setShowCoberturaModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCoberturaSelect = (cobertura: { id: number; nombre: string; sigla: string }) => {
    setForm((f) => ({ ...f, cobertura: cobertura.id, coberturaNombre: cobertura.nombre }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
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
        className="relative z-10 mx-auto w-full max-w-2xl space-y-8 rounded-2xl border border-gray-100 bg-white p-8 pt-15 shadow-2xl"
      >
        <RoleHomeButton className="!static mr-4" />
        <div className="mb-2 flex items-center justify-center gap-2">
          <UserPlus className="h-7 w-7 text-blue-600" />
          <h2 className="text-center text-2xl font-bold text-blue-700">Registro de Paciente</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-base font-medium text-blue-700">Nombre</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-base text-blue-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-base font-medium text-blue-700">Apellido</label>
            <input
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-base text-blue-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-base font-medium text-blue-700">DNI</label>
            <input
              name="dni"
              value={form.dni}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-base text-blue-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-base font-medium text-blue-700">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-base text-blue-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-base font-medium text-blue-700">Sexo al nacer</label>
            <select
              name="sexo"
              value={form.sexo}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-base text-blue-900 focus:border-blue-500 focus:outline-none"
              required
            >
              <option value="">Seleccione...</option>
              {SEXOS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-base font-medium text-blue-700">
              Fecha de nacimiento
            </label>
            <input
              name="fechaNacimiento"
              type="date"
              value={form.fechaNacimiento}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-base text-blue-900 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-base font-medium text-blue-700">Teléfono</label>
            <input
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-base text-blue-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-base font-medium text-blue-700">Contraseña</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-base text-blue-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-base font-medium text-blue-700">
              Cobertura médica
            </label>
            <div className="flex gap-2">
              <input
                name="cobertura"
                value={form.coberturaNombre}
                readOnly
                className="w-full cursor-pointer rounded border border-gray-300 bg-white px-3 py-2 text-base text-blue-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                onClick={() => setShowCoberturaModal(true)}
                placeholder="Seleccionar..."
                required
              />
              <button
                type="button"
                onClick={() => setShowCoberturaModal(true)}
                className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
              >
                Elegir
              </button>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-base font-medium text-blue-700">
              Número de cobertura
            </label>
            <input
              name="numeroCobertura"
              value={form.numeroCobertura}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-base text-blue-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 py-3 text-lg font-semibold text-white shadow transition-all hover:scale-105 hover:from-blue-600 hover:to-blue-800"
        >
          Registrarse
        </button>
        <CoberturaModal
          isOpen={showCoberturaModal}
          onClose={() => setShowCoberturaModal(false)}
          onSelect={handleCoberturaSelect}
        />
      </motion.form>
    </div>
  );
}
