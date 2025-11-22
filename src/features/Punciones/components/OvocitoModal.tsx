import { useState } from 'react';
import type { MadurezOvocito, TipoEstadoOvocito, OvocitoModalProps } from '../../../types/Ovocito';
import { generateUniqueId } from '../../../shared/utils/generateUniqueId';

export default function OvocitoModal({
  open,
  onClose,
  onAdd,
  nombreDonante,
  apellidoDonante,
}: OvocitoModalProps) {
  const [madurez, setMadurez] = useState<MadurezOvocito>('maduro');
  const [tipoEstado, setTipoEstado] = useState<TipoEstadoOvocito>('fresco');

  if (!open) return null;

  const identificador = generateUniqueId({
    prefix: 'OVO',
    nombre: nombreDonante,
    apellido: apellidoDonante,
  });

  const handleAdd = () => {
    onAdd({ identificador, madurez, tipo_estado: tipoEstado });
    setMadurez('maduro');
    setTipoEstado('fresco');
    onClose();
  };

  return (
    <section className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-all duration-200">
      <article
        className="animate-fade-in w-full max-w-md rounded-xl bg-white p-4 shadow-2xl sm:p-8"
        role="dialog"
        aria-modal="true"
      >
        <header>
          <h2 className="mb-6 text-center text-2xl font-bold tracking-tight text-pink-700">
            Registrar Ovocito
          </h2>
        </header>
        <dl className="mb-4 flex flex-col gap-1">
          <dt className="text-xs font-bold text-gray-700">Identificador</dt>
          <dd className="rounded bg-blue-50 px-2 py-1 font-mono text-xs break-all text-black select-all sm:text-sm">
            {identificador}
          </dd>
        </dl>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="mb-2 block text-sm font-bold text-black" htmlFor="madurez">
              Nivel de madurez
            </label>
            <select
              id="madurez"
              value={madurez}
              onChange={(e) => setMadurez(e.target.value as MadurezOvocito)}
              className="w-full rounded border border-blue-300 px-2 py-1 text-black focus:ring-2 focus:ring-blue-200"
            >
              <option value="muy inmaduro">Muy inmaduro</option>
              <option value="maduro">Maduro</option>
              <option value="inmaduro">Inmaduro</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-black" htmlFor="tipoEstado">
              Estado
            </label>
            <select
              id="tipoEstado"
              value={tipoEstado}
              onChange={(e) => setTipoEstado(e.target.value as TipoEstadoOvocito)}
              className="w-full rounded border border-pink-300 px-2 py-1 text-black focus:ring-2 focus:ring-pink-200"
            >
              <option value="fresco">Fresco</option>
              <option value="criopreservado">Criopreservado</option>
              <option value="descartado">Descartado</option>
            </select>
          </div>
          <footer className="mt-4 flex flex-col justify-end gap-2 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-blue-300 px-4 py-2 text-gray-700 transition-all duration-150 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleAdd}
              className="rounded bg-blue-600 px-4 py-2 text-white transition-all duration-150 hover:bg-blue-700"
            >
              Agregar
            </button>
          </footer>
        </form>
      </article>
    </section>
  );
}
