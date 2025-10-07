import { useState } from "react";
import type { AltaMedicoProps } from "../../../interfaces/Medico";


export default function AltaMedico({ onRegistrar }: AltaMedicoProps) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [matricula, setMatricula] = useState("");
  const [especialidad, setEspecialidad] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegistrar({ nombre, apellido, matricula, especialidad });
    setNombre("");
    setApellido("");
    setMatricula("");
    setEspecialidad("");
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
          <label className="block text-sm font-medium mb-1 text-gray-700">Matrícula:</label>
          <input
            type="text"
            value={matricula}
            onChange={e => setMatricula(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Especialidad:</label>
          <input
            type="text"
            value={especialidad}
            onChange={e => setEspecialidad(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
