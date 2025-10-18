import { useState } from "react";
import FertilizacionModal from "../components/FertilizacionModal";
import { usePacientesFetch } from "../../../shared/hooks/usePacientesFetch";
import { useOvocitosFetch } from "../../../shared/hooks/useOvocitosFetch";
import { useFertilizacionesFetch } from "../../../shared/hooks/useFertilizacionesFetch";
import FertilizacionesTable from "../components/Fertilizaciones";
import { AnimatePresence, motion } from "framer-motion";

export default function FertilizacionPage() {
  const { pacientes } = usePacientesFetch();
  const [selectedPacienteId, setSelectedPacienteId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ovocitos } = useOvocitosFetch(selectedPacienteId);
  const { fertilizaciones, loading } = useFertilizacionesFetch(selectedPacienteId);

  // ...existing code...

  async function handleFertilize(payload: any) {
    try {
      const response = await fetch("/api/fertilizacion/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("Error al registrar fertilización");
      // Opcional: recargar fertilizaciones, mostrar mensaje, etc.
    } catch (err) {
      alert("No se pudo registrar la fertilización");
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-10 px-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow px-6 py-8">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Gestión de Fertilizaciones y Embriones</h1>
        <div className="mb-6 flex flex-col sm:flex-row gap-2 items-center justify-center">
        <label className="block text-sm font-medium text-gray-700">Seleccionar paciente</label>
        <select
          value={selectedPacienteId ?? ""}
          onChange={e => setSelectedPacienteId(Number(e.target.value))}
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-80 bg-white focus:ring-2 text-black focus:ring-blue-300 shadow-sm"
        >
          <option value="">-- Selecciona un paciente --</option>
          {pacientes.map(p => (
            <option key={p.id} value={p.id}>{p.apellido}, {p.nombre}</option>
          ))}
        </select>
      </div>
        <AnimatePresence>
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center h-32"
            >
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-2" />
              <span className="text-blue-500 font-medium">Cargando fertilizaciones...</span>
            </motion.div>
          ) : (
            selectedPacienteId && (
              <motion.div
                key="fertilizaciones"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full"
              >
                <FertilizacionesTable fertilizaciones={fertilizaciones} />
              </motion.div>
            )
          )}
        </AnimatePresence>
        {selectedPacienteId && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all font-semibold self-center"
            onClick={() => setIsModalOpen(true)}
          >
            Registrar nueva fertilización
          </motion.button>
        )}
        <FertilizacionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onFertilize={handleFertilize}
          ovocitos={ovocitos}
          semenes={[]}
          selectedPacienteId={selectedPacienteId}
          currentUser={null}
        />
      </div>
    </div>
  );
}
