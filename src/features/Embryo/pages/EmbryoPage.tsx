
import { useState } from "react";
import axios from "axios";
import EmbryoList from "../components/EmbryoList";
import { useEmbryoFetch } from "../../../shared/hooks/useEmbryoFetch";
import { usePacientesFetch } from "../../../shared/hooks/usePacientesFetch";
import { useOvocitosFetch } from "../../../shared/hooks/useOvocitosFetch";
export default function EmbryoPage() {
  const { pacientes } = usePacientesFetch();
  const [selectedPacienteId, setSelectedPacienteId] = useState<number | null>(null);
  const { embriones } = useEmbryoFetch(selectedPacienteId);
  const { ovocitos } = useOvocitosFetch(selectedPacienteId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(ovocitos)
  // Modal submit handler
  const handleSubmitEmbrion = async (nuevoEmbryo: any) => {
    // Mapear los datos del modal al modelo backend
    
    console.log(nuevoEmbryo)
    const payload = {
      identificador: nuevoEmbryo.id,
      fecha_fertilizacion: nuevoEmbryo.fecha_fertilizacion || new Date().toISOString().slice(0, 10),
      ovocito: nuevoEmbryo.ovocito, // Debe ser el identificador o el id según backend
      tecnica: nuevoEmbryo.tecnica || "",
      tecnico_laboratorio: nuevoEmbryo.tecnico_laboratorio || "",
      calidad: Number(nuevoEmbryo.calidad),
      estado: nuevoEmbryo.estado || "no_transferido",
      fecha_alta: new Date().toISOString().slice(0, 10),
      fecha_baja: nuevoEmbryo.fecha_baja || null,
      info_semen: nuevoEmbryo.info_semen || "",
    };
    try {
      await axios.post("/api/embriones/", payload);
      // Aquí podrías refrescar la lista de embriones si lo necesitas
    } catch (err) {
      // Manejo de error: podrías mostrar un toast o alerta
      console.error("Error registrando embrión", err);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 md:mt-22 px-4 sm:px-6 py-6 mb-10 bg-white rounded-lg shadow min-h-screen flex flex-col">
      <h1 className="text-xl sm:text-2xl font-bold text-black mb-4 text-center">Registrar Embriones</h1>
      <div className="mb-4 flex flex-col sm:flex-row gap-2 items-center">
        <label className="block text-sm font-medium text-gray-700">Seleccionar paciente</label>
        <select
          value={selectedPacienteId ?? ""}
          onChange={e => setSelectedPacienteId(Number(e.target.value))}
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-80 bg-white focus:ring-2 text-black focus:ring-blue-300 shadow-sm"
        >
          <option className="text-black"value="">-- Selecciona un paciente --</option>
          {pacientes.map(p => (
            <option key={p.id} value={p.id}>{p.last_name}, {p.first_name}</option>
          ))}
        </select>
        
      </div>
  <EmbryoList embryos={embriones} selectedPacienteId={selectedPacienteId} />
    </div>
  );
}