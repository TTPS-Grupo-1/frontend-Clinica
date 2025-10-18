import { useState } from "react";
import type { MadurezOvocito, TipoEstadoOvocito, OvocitoModalProps } from "../../../types/Ovocito";
import { generateUniqueId } from "../../../shared/utils/generateUniqueId";

export default function OvocitoModal({ open, onClose, onAdd, nombreDonante, apellidoDonante }: OvocitoModalProps) {
    const [madurez, setMadurez] = useState<MadurezOvocito>("maduro");
    const [tipoEstado, setTipoEstado] = useState<TipoEstadoOvocito>("fresco");

    if (!open) return null;

    const identificador = generateUniqueId({
        prefix: "OVO",
        nombre: nombreDonante,
        apellido: apellidoDonante,
    });

    const handleAdd = () => {
        onAdd({ identificador, madurez, tipo_estado: tipoEstado });
        setMadurez("maduro");
        setTipoEstado("fresco");
        onClose();
    };

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-30 backdrop-blur-sm transition-all duration-200">
            <article className="bg-white rounded-xl shadow-2xl p-4 sm:p-8 w-full max-w-md animate-fade-in" role="dialog" aria-modal="true">
                <header>
                    <h2 className="text-2xl text-pink-700 font-bold mb-6 text-center tracking-tight">Registrar Ovocito</h2>
                </header>
                <dl className="mb-4 flex flex-col gap-1">
                    <dt className="text-xs font-bold text-gray-700">Identificador</dt>
                    <dd className="text-black font-mono break-all text-xs sm:text-sm bg-blue-50 rounded px-2 py-1 select-all">{identificador}</dd>
                </dl>
                <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                    <div>
                        <label className="block text-sm text-black font-bold mb-2" htmlFor="madurez">Nivel de madurez</label>
                        <select
                            id="madurez"
                            value={madurez}
                            onChange={e => setMadurez(e.target.value as MadurezOvocito)}
                            className="w-full border border-blue-300 rounded text-black px-2 py-1 focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="muy inmaduro">Muy inmaduro</option>
                            <option value="maduro">Maduro</option>
                            <option value="inmaduro">Inmaduro</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-black font-bold mb-2" htmlFor="tipoEstado">Estado</label>
                        <select
                            id="tipoEstado"
                            value={tipoEstado}
                            onChange={e => setTipoEstado(e.target.value as TipoEstadoOvocito)}
                            className="w-full border border-pink-300 rounded text-black px-2 py-1 focus:ring-2 focus:ring-pink-200"
                        >
                            <option value="fresco">Fresco</option>
                            <option value="criopreservado">Criopreservado</option>
                            <option value="descartado">Descartado</option>
                        </select>
                    </div>
                    <footer className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-blue-300 rounded text-gray-700 hover:bg-gray-100 transition-all duration-150"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleAdd}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-150"
                        >
                            Agregar
                        </button>
                    </footer>
                </form>
            </article>
        </section>
    );
}