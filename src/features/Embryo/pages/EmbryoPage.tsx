import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import EmbryoList from '../components/EmbryoList';
import { useEmbryoFetch } from '../../../shared/hooks/useEmbryoFetch';
import { usePacientesFetch } from '../../../shared/hooks/usePacientesFetch';
import { useOvocitosFetch } from '../../../shared/hooks/useOvocitosFetch';
export default function EmbryoPage() {
  const { pacientes } = usePacientesFetch();
  const [selectedPacienteId, setSelectedPacienteId] = useState<number | null>(null);
  const { embriones } = useEmbryoFetch(selectedPacienteId);
  const { ovocitos } = useOvocitosFetch(selectedPacienteId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ AGREGAR estos logs:
  console.log('Paciente seleccionado:', selectedPacienteId);
  console.log('Embriones cargados:', embriones);

  console.log(ovocitos);
  // Modal submit handler
  const handleSubmitEmbrion = async (nuevoEmbryo: any) => {
    // Mapear los datos del modal al modelo backend

    console.log(nuevoEmbryo);
    const payload = {
      identificador: nuevoEmbryo.id,
      fecha_fertilizacion: nuevoEmbryo.fecha_fertilizacion || new Date().toISOString().slice(0, 10),
      ovocito: nuevoEmbryo.ovocito, // Debe ser el identificador o el id según backend
      tecnica: nuevoEmbryo.tecnica || '',
      tecnico_laboratorio: nuevoEmbryo.tecnico_laboratorio || '',
      calidad: Number(nuevoEmbryo.calidad),
      estado: nuevoEmbryo.estado || 'fresco',
      fecha_alta: new Date().toISOString().slice(0, 10),
      fecha_baja: nuevoEmbryo.fecha_baja || null,
      info_semen: nuevoEmbryo.info_semen || '',
    };
    try {
      await axios.post('/api/embriones/', payload);
      // Aquí podrías refrescar la lista de embriones si lo necesitas
    } catch (err) {
      // Manejo de error: podrías mostrar un toast o alerta
      console.error('Error registrando embrión', err);
    }
    setIsModalOpen(false);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 pt-20 pb-8`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen flex-col rounded-2xl bg-white p-8 shadow-xl">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-4 text-center text-xl font-bold text-rose-300 sm:text-2xl"
          >
            Registrar Embriones
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-4 flex flex-col items-center gap-2 sm:flex-row"
          >
            <label className="block text-sm font-medium text-gray-700">Seleccionar paciente</label>
            <select
              value={selectedPacienteId ?? ''}
              onChange={(e) => setSelectedPacienteId(Number(e.target.value))}
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-black shadow-sm focus:ring-2 focus:ring-blue-300 sm:w-80"
            >
              <option className="text-black" value="">
                -- Selecciona un paciente --
              </option>
              {pacientes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.last_name}, {p.first_name}
                </option>
              ))}
            </select>
          </motion.div>

          {selectedPacienteId ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.06 }}
            >
              <EmbryoList
                key={selectedPacienteId} // ✅ AGREGAR esta línea
                embryos={embriones}
                selectedPacienteId={selectedPacienteId}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="py-8 text-center text-gray-500"
            >
              Selecciona un paciente para ver los embriones
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
