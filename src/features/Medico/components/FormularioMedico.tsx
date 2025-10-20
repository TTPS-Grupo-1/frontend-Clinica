import { useState, useEffect } from "react";
import type { Medico } from "../../../types/Medico";

interface FormularioMedicoProps {
  medico?: Medico;
  onSubmit: (data: FormData) => void; // ✅ ahora usamos FormData para enviar imagen
  onCancel: () => void;
  isEdit?: boolean;
}

export default function FormularioMedico({
  medico,
  onSubmit,
  onCancel,
  isEdit = false
}: FormularioMedicoProps) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firma, setFirma] = useState<File | null>(null); // ✅ nueva firma

  useEffect(() => {
    if (typeof medico !== "undefined") {
      setNombre(medico.nombre ?? "");
      setApellido(medico.apellido ?? "");
      setDni(medico.dni !== undefined ? String(medico.dni) : "");
      setEmail(medico.email ?? "");
      setTelefono(medico.telefono !== undefined ? String(medico.telefono) : "");
    }
  }, [medico]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar contraseña solo en alta
    if (!isEdit) {
      if (!password || password.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres");
        return;
      }

      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }
    }

    // ✅ Usamos FormData para incluir imagen
    const formData = new FormData();
    formData.append("first_name", nombre);
    formData.append("last_name", apellido);
    formData.append("dni", dni);
    formData.append("email", email);
    formData.append("telefono", telefono);
    formData.append("rol", "MEDICO"); // 👈 se fuerza el rol
    if (!isEdit && password) formData.append("password", password);
    if (firma) formData.append("firma_medico", firma); // 👈 se incluye la firma

    onSubmit(formData);
  };

  return (
    <div className="w-full p-10 bg-gray-100 rounded shadow border border-gray-300">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        {isEdit ? "Editar Médico" : "Registrar Médico"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Primera fila: Nombre, Apellido y DNI */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-base font-medium mb-2 text-gray-700">Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
              className="w-full px-4 py-2.5 text-base border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-base font-medium mb-2 text-gray-700">Apellido:</label>
            <input
              type="text"
              value={apellido}
              onChange={e => setApellido(e.target.value)}
              required
              className="w-full px-4 py-2.5 text-base border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-base font-medium mb-2 text-gray-700">DNI:</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={dni}
              onChange={e => setDni(e.target.value.replace(/[^0-9]/g, ""))}
              required
              className="w-full px-4 py-2.5 text-base border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="off"
            />
          </div>
        </div>

        {/* Segunda fila: Email y Teléfono */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-base font-medium mb-2 text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 text-base border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-base font-medium mb-2 text-gray-700">Teléfono:</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={telefono}
              onChange={e => setTelefono(e.target.value.replace(/[^0-9]/g, ""))}
              required
              className="w-full px-4 py-2.5 text-base border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="off"
            />
          </div>
        </div>

        {/* Nueva fila: firma médica */}
        <div>
          <label className="block text-base font-medium mb-2 text-gray-700">
            Firma del médico (PNG o JPG):
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => setFirma(e.target.files?.[0] || null)}
            className="w-full px-4 py-2.5 text-base border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {firma && (
            <p className="text-sm text-gray-600 mt-1">
              Archivo seleccionado: {firma.name}
            </p>
          )}
        </div>

        {/* Tercera fila: Contraseñas - solo en alta */}
        {!isEdit && (
          <>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-medium mb-2 text-gray-700">Contraseña:</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full px-4 py-2.5 text-base border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-lg"
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-base font-medium mb-2 text-gray-700">
                  Confirmar Contraseña:
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="Repite la contraseña"
                  className="w-full px-4 py-2.5 text-base border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {password && confirmPassword && password !== confirmPassword && (
              <p className="text-sm text-red-500 text-center">
                Las contraseñas no coinciden
              </p>
            )}
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white text-lg py-3 rounded font-semibold hover:bg-blue-700 transition mt-8"
        >
          {isEdit ? "Guardar Cambios" : "Registrar Médico"}
        </button>
      </form>
    </div>
  );
}
