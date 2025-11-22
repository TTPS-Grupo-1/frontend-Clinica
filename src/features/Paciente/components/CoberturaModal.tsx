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
        const res = await axios.get(
          'https://ueozxvwsckonkqypfasa.supabase.co/functions/v1/getObrasSociales'
        );
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
  const filtered = obras.filter((os) => os.nombre.toLowerCase().includes(search.toLowerCase()));

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
            className="relative flex w-full max-w-md flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            {/* ❌ Botón de cierre */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-2xl font-bold text-gray-400 hover:text-red-500"
              aria-label="Cerrar modal"
            >
              ×
            </button>

            {/* 🩺 Encabezado */}
            <header className="mb-4 flex items-center justify-center gap-2">
              <ShieldPlus className="h-6 w-6 text-blue-600" />
              <h2 className="text-center text-xl font-bold text-blue-700">
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
                className="mb-4 w-full rounded border border-gray-300 bg-white px-4 py-3 text-base text-blue-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />

              {/* ⏳ Estado de carga */}
              {loading ? (
                <p className="py-4 text-center text-gray-500">Cargando...</p>
              ) : (
                <>
                  {/* 📋 Lista de obras */}
                  <ul className="max-h-60 divide-y overflow-y-auto">
                    {paginated.map((os) => (
                      <li key={os.id}>
                        <button
                          className="w-full rounded px-3 py-2 text-left font-medium text-blue-900 transition hover:bg-blue-100 hover:text-blue-700"
                          onClick={() => {
                            onSelect(os);
                            onClose();
                          }}
                        >
                          {os.nombre}
                          <span className="ml-1 text-sm text-gray-400">({os.sigla})</span>
                        </button>
                      </li>
                    ))}

                    {/* 🚫 Sin resultados */}
                    {!paginated.length && !loading && (
                      <li className="px-3 py-2 text-gray-400">No se encontraron resultados</li>
                    )}
                  </ul>

                  {/* 📄 Controles de paginación */}
                  {totalPages > 1 && (
                    <div className="mt-4 flex items-center justify-between">
                      <button
                        onClick={handlePrev}
                        disabled={page === 1}
                        className={`rounded px-3 py-1 ${
                          page === 1
                            ? 'cursor-not-allowed text-gray-400'
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
                        className={`rounded px-3 py-1 ${
                          page === totalPages
                            ? 'cursor-not-allowed text-gray-400'
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
