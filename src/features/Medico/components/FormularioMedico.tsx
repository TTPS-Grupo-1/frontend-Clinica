import { useState, useEffect } from 'react';
import type { Medico } from '../../../types/Medico';

interface FormularioMedicoProps {
  medico?: Medico;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

export default function FormularioMedico({
  medico,
  onSubmit,
  onCancel,
  isEdit = false,
}: FormularioMedicoProps) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [firma, setFirma] = useState<File | null>(null);
  const [tieneFirmaExistente, setTieneFirmaExistente] = useState(false); // 👈 Nuevo estado

  useEffect(() => {
    if (typeof medico !== 'undefined') {
      setNombre(medico.first_name ?? '');
      setApellido(medico.last_name ?? '');
      setDni(medico.dni !== undefined ? String(medico.dni) : '');
      setEmail(medico.email ?? '');
      setTelefono(medico.telefono !== undefined ? String(medico.telefono) : '');

      // 👇 Verificar si tiene firma existente
      if (medico.firma_medico) {
        setTieneFirmaExistente(true);
      }
    }
  }, [medico]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('📤 Preparando envío de formulario');
    console.log('📝 Modo:', isEdit ? 'Edición' : 'Alta');

    // Validar contraseña solo en alta
    if (!isEdit) {
      if (!password || password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres');
        return;
      }

      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
    }

    const formData = new FormData();
    formData.append('first_name', nombre);
    formData.append('last_name', apellido);
    formData.append('email', email);
    formData.append('telefono', telefono);
    formData.append('rol', 'MEDICO');

    // 👇 SOLO agregar DNI y password en ALTA (no en edición)
    if (!isEdit) {
      formData.append('dni', dni);
      if (password) formData.append('password', password);
    }

    // Solo agregar firma si se seleccionó una nueva
    if (firma) {
      console.log('📎 Agregando firma:', firma.name);
      formData.append('firma_medico', firma);
    }

    // Log de datos a enviar
    console.log('📤 Datos del FormData:');
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: [File] ${value.name}`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }

    onSubmit(formData);
  };

  return (
    <div className="w-full rounded border border-gray-300 bg-gray-100 p-10 shadow">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
        {isEdit ? 'Editar Médico' : 'Registrar Médico'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Primera fila: Nombre, Apellido y DNI */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="mb-2 block text-base font-medium text-gray-700">Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full rounded border border-gray-400 bg-white px-4 py-2.5 text-base text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-base font-medium text-gray-700">Apellido:</label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
              className="w-full rounded border border-gray-400 bg-white px-4 py-2.5 text-base text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-base font-medium text-gray-700">DNI:</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={dni}
              onChange={(e) => setDni(e.target.value.replace(/[^0-9]/g, ''))}
              required
              disabled={isEdit} // 👈 Deshabilitar DNI en edición
              className="w-full rounded border border-gray-400 bg-white px-4 py-2.5 text-base text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
              autoComplete="off"
            />
          </div>
        </div>

        {/* Segunda fila: Email y Teléfono */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="mb-2 block text-base font-medium text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded border border-gray-400 bg-white px-4 py-2.5 text-base text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-base font-medium text-gray-700">Teléfono:</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value.replace(/[^0-9]/g, ''))}
              required
              className="w-full rounded border border-gray-400 bg-white px-4 py-2.5 text-base text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              autoComplete="off"
            />
          </div>
        </div>

        {/* Fila de firma médica */}
        <div>
          <label className="mb-2 block text-base font-medium text-gray-700">
            {tieneFirmaExistente
              ? 'Cambiar firma del médico (PNG o JPG):'
              : 'Firma del médico (PNG o JPG):'}
          </label>

          {/* 👇 Mensaje si ya tiene firma */}
          {tieneFirmaExistente && (
            <div className="mb-2 rounded border border-blue-200 bg-blue-50 p-3">
              <p className="flex items-center gap-2 text-sm text-blue-700">
                <span>✅</span>
                <span>
                  Este médico ya tiene una firma cargada. Puede cargar una nueva si desea
                  reemplazarla.
                </span>
              </p>
            </div>
          )}

          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => setFirma(e.target.files?.[0] || null)}
            className="w-full rounded border border-gray-400 bg-white px-4 py-2.5 text-base text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {firma && (
            <p className="mt-2 flex items-center gap-2 text-sm text-green-600">
              <span>📄</span>
              <span>
                Nueva firma seleccionada: <strong>{firma.name}</strong>
              </span>
            </p>
          )}
        </div>

        {/* Tercera fila: Contraseñas - solo en alta */}
        {!isEdit && (
          <>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="mb-2 block text-base font-medium text-gray-700">
                  Contraseña:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full rounded border border-gray-400 bg-white px-4 py-2.5 pr-10 text-base text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-lg text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-base font-medium text-gray-700">
                  Confirmar Contraseña:
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="Repite la contraseña"
                  className="w-full rounded border border-gray-400 bg-white px-4 py-2.5 text-base text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {password && confirmPassword && password !== confirmPassword && (
              <p className="text-center text-sm text-red-500">❌ Las contraseñas no coinciden</p>
            )}
          </>
        )}

        {/* Botones */}
        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            className="flex-1 rounded bg-blue-600 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
          >
            {isEdit ? 'Guardar Cambios' : 'Registrar Médico'}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded bg-gray-300 py-3 text-lg font-semibold text-gray-700 transition hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
