
import { useState } from "react";
import EmbryoList from "../components/EmbryoList";
import EmbryoModal from "../components/EmbryoModal";
import type { Embryo } from "../../../types/Embryo";



export default function EmbryoPage() {
  const pacientes = [
    { id: 1, nombre: "Paciente 1" },
    { id: 2, nombre: "Paciente 2" },
    { id: 3, nombre: "Paciente 3" },
  ];


  const [selectedPaciente, setSelectedPaciente] = useState<number>(pacientes[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [embryos, setEmbryos] = useState<Embryo[]>([
    {
      id: 1,
      calidad: "Alta",
      pot: "POT1",
      estado: "Viable",
      causaDescarte: "",
      ovocito: "Ovocito 1",
      observaciones: "Sin observaciones"
    },
    {
      id: 2,
      calidad: "Media",
      pot: "POT2",
      estado: "No viable",
      causaDescarte: "Fragmentación",
      ovocito: "Ovocito 2",
      observaciones: ""
    },
  ]);


  const handleSubmitEmbrion = (newEmbryo: Omit<Embryo, "id"> & { id: string }) => {
    setEmbryos([...embryos, newEmbryo as Embryo]);
  };

  const selectedPacienteNombre = pacientes.find(p => p.id === selectedPaciente)?.nombre || "";

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 md:mt-22 px-4 sm:px-6 py-6 mb-10 bg-white rounded-lg shadow min-h-screen flex flex-col">
      <h1 className="text-xl sm:text-2xl font-bold text-black mb-4 text-center">Registrar Embriones</h1>
      <div className="mb-4">
        <label htmlFor="paciente" className="block mb-2 font-medium text-black">
          Seleccionar paciente
        </label>
        <select
          id="paciente"
          value={selectedPaciente}
          onChange={(e) => setSelectedPaciente(Number(e.target.value))}
          className="w-full p-2 border rounded bg-black text-white"
        >
          {pacientes.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Registrar nuevo embrión
      </button>
      <EmbryoList embryos={embryos} />
      
      <EmbryoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitEmbrion}
        pacienteNombre={selectedPacienteNombre}
      />
    </div>
  );
}