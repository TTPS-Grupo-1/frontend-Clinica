import { useState } from 'react';

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

interface CoberturaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (cobertura: string) => void;
}

export default function CoberturaModal({ isOpen, onClose, onSelect }: CoberturaModalProps) {
  const [search, setSearch] = useState('');
  const filtered = OBRAS_SOCIALES.filter(os => os.toLowerCase().includes(search.toLowerCase()));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
      <div className="bg-black border-2 border-gray-400 rounded-xl shadow p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-300 hover:text-red-400 text-2xl">×</button>
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Seleccionar cobertura médica</h2>
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full mb-4 px-4 py-3 border border-gray-400 rounded text-lg bg-black text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
        <ul className="max-h-60 overflow-y-auto divide-y">
          {filtered.map((os) => (
            <li key={os}>
              <button
                className="w-full text-left px-2 py-2 hover:bg-blue-900 hover:text-white rounded text-white"
                onClick={() => { onSelect(os); onClose(); }}
              >
                {os}
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="text-gray-400 px-2 py-2">No se encontraron resultados</li>
          )}
        </ul>
      </div>
    </div>
  );
}
