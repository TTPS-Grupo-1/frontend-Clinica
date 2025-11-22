import type { MedicoListProps } from '../../../interfaces/Medico';
import { useState, useMemo } from 'react';
import type { Medico } from '../../../types/Medico';
import toast from 'react-hot-toast';
import Pagination from '../../../components/Pagination';
import { useNavigate } from 'react-router-dom';

type Props = MedicoListProps & {
  onEliminar?: (medico: Medico) => void;
  canEliminar?: (medico: Medico) => boolean; // optional check provided by parent
  razonNoEliminar?: (medico: Medico) => string | undefined;
};

export default function MedicoList({ medicos, onEliminar, canEliminar, razonNoEliminar }: Props) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  // keep simple for now; sort controls can be surfaced later
  const [sortBy] = useState<'name' | 'dni'>('name');
  const [sortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    let list = medicos.slice();
    if (s) {
      list = list.filter(
        (m) =>
          `${m.first_name} ${m.last_name}`.toLowerCase().includes(s) ||
          (m.dni + '').includes(s) ||
          (m.email || '').toLowerCase().includes(s)
      );
    }
    list.sort((a, b) => {
      if (sortBy === 'dni') {
        const av = String(a.dni);
        const bv = String(b.dni);
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      const an = `${a.first_name} ${a.last_name}`.toLowerCase();
      const bn = `${b.first_name} ${b.last_name}`.toLowerCase();
      return sortDir === 'asc' ? an.localeCompare(bn) : bn.localeCompare(an);
    });
    return list;
  }, [medicos, search, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMedicos = filtered.slice(startIndex, startIndex + itemsPerPage);

  const confirmEliminar = (medico: Medico) => {
    toast(
      (t) => (
        <span className="text-black">
          ¿Seguro que quieres eliminar a{' '}
          <b>
            {medico.first_name} {medico.last_name}
          </b>
          ?
          <div className="mt-2 flex gap-2">
            <button
              className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
              onClick={() => {
                toast.dismiss(t.id);
                if (onEliminar) onEliminar(medico);
              }}
            >
              Sí, eliminar
            </button>
            <button
              className="rounded bg-gray-600 px-3 py-1 text-white hover:bg-gray-700"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancelar
            </button>
          </div>
        </span>
      ),
      { duration: 6000 }
    );
  };

  return (
    <div className="mb-12 w-full max-w-5xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-blue-700">Listado de Médicos</h2>
        <div className="flex items-center gap-3">
          <input
            placeholder="Buscar por nombre, DNI o email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-64 rounded border bg-white px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded border bg-white px-2 py-1 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full rounded bg-white">
          <thead>
            <tr className="bg-blue-50">
              <th className="px-3 py-2 text-left text-blue-700">Nombre completo</th>
              <th className="px-3 py-2 text-left text-blue-700">DNI</th>
              <th className="px-3 py-2 text-left text-blue-700">Email</th>
              <th className="px-3 py-2 text-left text-blue-700">Teléfono</th>
              <th className="px-3 py-2 text-left text-blue-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentMedicos.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">
                  No hay médicos que coincidan con la búsqueda.
                </td>
              </tr>
            ) : (
              currentMedicos.map((medico) => {
                const disabled = canEliminar ? !canEliminar(medico) : false;
                const razon = razonNoEliminar ? razonNoEliminar(medico) : undefined;
                return (
                  <tr key={medico.dni} className="border-b last:border-b-0 hover:bg-blue-50">
                    <td className="px-3 py-3 text-blue-800">
                      {medico.first_name} {medico.last_name}
                    </td>
                    <td className="px-3 py-3 text-blue-800">{medico.dni}</td>
                    <td className="px-3 py-3 text-blue-800">{medico.email}</td>
                    <td className="px-3 py-3 text-blue-800">{medico.telefono}</td>
                    <td className="px-3 py-3">
                      <div className="flex gap-2">
                        <button
                          className="rounded bg-gradient-to-r from-blue-500 to-blue-700 px-3 py-1 font-semibold text-white shadow-sm hover:from-blue-600 hover:to-blue-800 focus:outline-none"
                          onClick={() => navigate(`/medicos/editar/${medico.dni}`)}
                        >
                          Editar
                        </button>
                        <button
                          className={`rounded px-3 py-1 font-semibold shadow-sm focus:outline-none ${disabled ? 'cursor-not-allowed bg-gray-200 text-gray-400' : 'bg-red-600 text-white hover:bg-red-700'}`}
                          onClick={() => !disabled && confirmEliminar(medico)}
                          title={
                            disabled
                              ? razon || 'No se puede eliminar este médico'
                              : 'Eliminar médico'
                          }
                          aria-disabled={disabled}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <div className="p-3">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filtered.length}
          />
        </div>
      </div>
    </div>
  );
}
