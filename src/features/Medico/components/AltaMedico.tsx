import { useState } from "react";
import type { AltaMedicoProps } from "../../../interfaces/Medico";


<<<<<<< Updated upstream:src/features/Medico/components/AltaMedico.tsx
export default function AltaMedico({ onRegistrar }: AltaMedicoProps) {
=======

export default function FormularioMedico({ onRegistrar, initialValues, titulo, botonTexto }: FormMedicoProps & { titulo?: string, botonTexto?: string }) {
>>>>>>> Stashed changes:src/features/Medico/components/FormularioMedico.tsx
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegistrar({
      nombre,
      apellido,
      dni: Number(dni),
      email,
      telefono: Number(telefono),
    });
    setNombre("");
    setApellido("");
    setDni("");
    setEmail("");
    setTelefono("");
  };

  return (
  <div className="max-w-md mx-auto mt-24 p-6 bg-gray-100 rounded shadow border border-gray-300">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Alta de Médico</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={e => setApellido(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">DNI:</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={dni}
            onChange={e => setDni(e.target.value.replace(/[^0-9]/g, ""))}
            required
            className="w-full px-3 py-2 border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Teléfono:</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={telefono}
            onChange={e => setTelefono(e.target.value.replace(/[^0-9]/g, ""))}
            required
            className="w-full px-3 py-2 border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          Registrar Médico
        </button>
      </form>
    </div>
  );
}
