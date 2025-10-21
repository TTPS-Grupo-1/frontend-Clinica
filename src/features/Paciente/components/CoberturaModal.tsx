import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldPlus } from 'lucide-react';
import type { CoberturaModalProps } from '../../../interfaces/Paciente';

const OBRAS_SOCIALES = [
  'OSDE',
  'Swiss Medical',
  'Galeno',
  'Medicus',
  'Omint',
  'PAMI',
  'IOMA',
  'OSPE',
  'OSPAT',
  'OSDEPYM',
  'Sancor Salud',
  'Federada Salud',
  'Prevención Salud',
  'Jerárquicos Salud',
  'Accord Salud',
  'Otros'
];



export default function CoberturaModal({ isOpen, onClose, onSelect }: CoberturaModalProps) {
  const [search, setSearch] = useState('');
  const filtered = OBRAS_SOCIALES.filter(os => os.toLowerCase().includes(search.toLowerCase()));

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
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold" aria-label="Cerrar modal">×</button>
            <header className="flex items-center justify-center gap-2 mb-4">
              <ShieldPlus className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-blue-700 text-center">Seleccionar cobertura médica</h2>
            </header>
            <nav aria-label="Buscar cobertura">
              <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full mb-4 px-4 py-3 border border-gray-300 rounded text-base bg-white text-blue-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <ul className="max-h-60 overflow-y-auto divide-y">
                {filtered.map((os) => (
                  <li key={os}>
                    <button
                      className="w-full text-left px-3 py-2 hover:bg-blue-100 hover:text-blue-700 rounded text-blue-900 font-medium transition"
                      onClick={() => { onSelect(os); onClose(); }}
                    >
                      {os}
                    </button>
                  </li>
                ))}
                {filtered.length === 0 && (
                  <li className="text-gray-400 px-3 py-2">No se encontraron resultados</li>
                )}
              </ul>
            </nav>
          </motion.main>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
