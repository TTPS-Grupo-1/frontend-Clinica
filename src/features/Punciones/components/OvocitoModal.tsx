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
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
            <article className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md" role="dialog" aria-modal="true">
                <header>
                    <h2 className="text-xl text-black font-bold mb-4 text-center">Registrar Ovocito</h2>
                </header>
                <dl className="mb-4">
                    <dt className="text-sm font-medium text-gray-600">Identificador</dt>
                    <dd className="text-black font-mono break-all">{identificador}</dd>
                </dl>
                <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                    <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="estado">Estado</label>
                        <select
                            id="estado"
                            value={estado}
                            onChange={e => setEstado(e.target.value as EstadoOvocito)}
                            className="w-full border rounded text-black px-2 py-1"
                        >
                            <option value="muy inmaduro">Muy inmaduro</option>
                            <option value="maduro">Maduro</option>
                            <option value="inmaduro">Inmaduro</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={cripreservar}
                            onChange={e => setCripreservar(e.target.checked)}
                            id="cripreservar"
                        />
                        <label htmlFor="cripreservar" className="text-black">Cripreservar</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={descartado}
                            onChange={e => setDescartado(e.target.checked)}
                            id="descartado"
                        />
                        <label htmlFor="descartado" className="text-black">Descartado</label>
                    </div>
                    <footer className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleAdd}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Agregar
                        </button>
                    </footer>
                </form>
            </article>
        </section>
    );
}