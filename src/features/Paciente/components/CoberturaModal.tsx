import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldPlus } from 'lucide-react';
import type { CoberturaModalProps } from '../../../interfaces/Paciente';
import axios from 'axios';

const PAGE_SIZE = 10;

export default function CoberturaModal({ isOpen, onClose, onSelect }: CoberturaModalProps) {
  const [search, setSearch] = useState('');
  const [obras, setObras] = useState<{ id: number; nombre: string; sigla: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // 🔄 Fetch de obras sociales desde Supabase Function
  useEffect(() => {
    if (!isOpen) return; // solo cargar cuando el modal está abierto

    const fetchObras = async () => {
      try {
        setLoading(true);
        const res = await axios.get('https://ueozxvwsckonkqypfasa.supabase.co/functions/v1/getObrasSociales');
        if (res.status !== 200) throw new Error('Error al obtener obras sociales');
        const data = res.data;

        setObras(data.data || []);
      } catch (error) {
        console.error(error);
        setObras([]);
      } finally {
        setLoading(false);
      }
    };

    fetchObras();
  }, [isOpen]);

  // 🔎 Filtrado por nombre o sigla
  const filtered = obras.filter(
    (os) =>
      os.nombre.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Paginación local
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginated = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  const handleNext = () => page < totalPages && setPage((p) => p + 1);
  const handlePrev = () => page > 1 && setPage((p) => p - 1);

  // 🔁 Reiniciar a la primera página al cambiar la búsqueda
  useEffect(() => setPage(1), [search]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        >
          <motion.main
            initial={{ scale: 0.95, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 40, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border border-gray-100 relative flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            {/* ❌ Botón de cierre */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold"
              aria-label="Cerrar modal"
            >
              ×
            </button>

            {/* 🩺 Encabezado */}
            <header className="flex items-center justify-center gap-2 mb-4">
              <ShieldPlus className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-blue-700 text-center">
                Seleccionar cobertura médica
              </h2>
            </header>

            {/* 🔍 Input de búsqueda */}
            <nav aria-label="Buscar cobertura">
              <input
                type="text"
                placeholder="Buscar por nombre o sigla..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full mb-4 px-4 py-3 border border-gray-300 rounded text-base bg-white text-blue-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />

              {/* ⏳ Estado de carga */}
              {loading ? (
                <p className="text-center text-gray-500 py-4">Cargando...</p>
              ) : (
                <>
                  {/* 📋 Lista de obras */}
                  <ul className="max-h-60 overflow-y-auto divide-y">
                    {paginated.map((os) => (
                      <li key={os.id}>
                        <button
                          className="w-full text-left px-3 py-2 hover:bg-blue-100 hover:text-blue-700 rounded text-blue-900 font-medium transition"
                          onClick={() => {
                            onSelect(os);
                            onClose();
                          }}
                        >
                          {os.nombre}
                          <span className="text-gray-400 text-sm ml-1">
                            ({os.sigla})
                          </span>
                        </button>
                      </li>
                    ))}

                    {/* 🚫 Sin resultados */}
                    {!paginated.length && !loading && (
                      <li className="text-gray-400 px-3 py-2">
                        No se encontraron resultados
                      </li>
                    )}
                  </ul>

                  {/* 📄 Controles de paginación */}
                  {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={handlePrev}
                        disabled={page === 1}
                        className={`px-3 py-1 rounded ${
                          page === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-blue-600 hover:underline'
                        }`}
                      >
                        Anterior
                      </button>
                      <span className="text-sm text-gray-600">
                        Página {page} de {totalPages}
                      </span>
                      <button
                        onClick={handleNext}
                        disabled={page === totalPages}
                        className={`px-3 py-1 rounded ${
                          page === totalPages
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-blue-600 hover:underline'
                        }`}
                      >
                        Siguiente
                      </button>
                    </div>
                  )}
                </>
              )}
            </nav>
          </motion.main>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
