import { useState } from "react";

function SeccionEstudios() {
  const [determinaciones, setDeterminaciones] = useState<
    { nombre: string; valor: string }[]
  >([]);
  const [nueva, setNueva] = useState({ nombre: "", valor: "" });

  const agregarDeterminacion = () => {
    if (nueva.nombre.trim() && nueva.valor.trim()) {
      setDeterminaciones((prev) => [...prev, nueva]);
      setNueva({ nombre: "", valor: "" });
    }
  };

  return (
    <div className="mt-8 p-6 border rounded-lg bg-blue-50">
      <h3 className="text-xl font-semibold text-blue-700 mb-3">
        Resultados de estudios
      </h3>
      <p className="text-gray-600 mb-4">
        Ingresá cada determinación y su valor correspondiente.
      </p>

      {/* Inputs para nueva determinación */}
      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        <input
          type="text"
          value={nueva.nombre}
          onChange={(e) => setNueva({ ...nueva, nombre: e.target.value })}
          placeholder="Determinación (ej: FSH)"
          className="flex-1 border border-gray-300 rounded px-3 py-2 
                     bg-white text-gray-900 placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={nueva.valor}
          onChange={(e) => setNueva({ ...nueva, valor: e.target.value })}
          placeholder="Valor obtenido"
          className="flex-1 border border-gray-300 rounded px-3 py-2 
                     bg-white text-gray-900 placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        onClick={agregarDeterminacion}
        className="bg-blue-600 text-white px-5 py-2 rounded 
                   hover:bg-blue-700 transition-all shadow-sm"
      >
        Guardar resultado
      </button>

      {/* Lista de determinaciones guardadas */}
      {determinaciones.length > 0 && (
        <ul className="mt-5 bg-white rounded-lg shadow-inner divide-y border border-gray-200">
          {determinaciones.map((d, i) => (
            <li key={i} className="px-4 py-2 flex justify-between items-center">
              <span className="text-gray-800">{d.nombre}</span>
              <span className="font-semibold text-blue-700">{d.valor}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SeccionEstudios;
