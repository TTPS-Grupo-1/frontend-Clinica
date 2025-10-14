import { useState } from "react";
import type { EstadoOvocito } from "../../../types/Ovocito";
import type { OvocitoModalProps } from "../../../types/Ovocito";

function generarIdentificador(nombre: string, apellido: string): string {
    const fecha = new Date();
    const year = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    const letrasAp = apellido.slice(0, 3).toUpperCase();
    const letrasNom = nombre.slice(0, 3).toUpperCase();
    const random = Math.floor(Math.random() * 10000000);
    return `OVO_${year}${mes}${dia}_${letrasAp}_${letrasNom}_${random}`;
}

export default function OvocitoModal({ open, onClose, onAdd, nombreDonante, apellidoDonante }: OvocitoModalProps) {
    const [estado, setEstado] = useState<EstadoOvocito>("maduro");
    const [cripreservar, setCripreservar] = useState(false);
    const [descartado, setDescartado] = useState(false);

    if (!open) return null;

    const identificador = generarIdentificador(nombreDonante, apellidoDonante);

    const handleAdd = () => {
        onAdd({ identificador, estado, cripreservar, descartado });
        setEstado("maduro");
        setCripreservar(false);
        setDescartado(false);
        onClose();
    };

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-30 backdrop-blur-sm transition-all duration-200">
            <article className="bg-white rounded-xl shadow-2xl p-4 sm:p-8 w-full max-w-md animate-fade-in" role="dialog" aria-modal="true">
                <header>
                    <h2 className="text-2xl text-pink-700 font-bold mb-6 text-center tracking-tight">Registrar Ovocito</h2>
                </header>
                <dl className="mb-4 flex flex-col gap-1">
                    <dt className="text-xs font-medium text-gray-600">Identificador</dt>
                    <dd className="text-black font-mono break-all text-xs sm:text-sm bg-blue-50 rounded px-2 py-1 select-all">{identificador}</dd>
                </dl>
                <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                    <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="estado">Estado</label>
                        <select
                            id="estado"
                            value={estado}
                            onChange={e => setEstado(e.target.value as EstadoOvocito)}
                            className="w-full border border-blue-300 rounded text-black px-2 py-1 focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="muy inmaduro">Muy inmaduro</option>
                            <option value="maduro">Maduro</option>
                            <option value="inmaduro">Inmaduro</option>
                        </select>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={cripreservar}
                                onChange={e => setCripreservar(e.target.checked)}
                                id="cripreservar"
                                className="accent-blue-600"
                            />
                            <label htmlFor="cripreservar" className="text-black text-sm">Cripreservar</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={descartado}
                                onChange={e => setDescartado(e.target.checked)}
                                id="descartado"
                                className="accent-pink-600"
                            />
                            <label htmlFor="descartado" className="text-black text-sm">Descartado</label>
                        </div>
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