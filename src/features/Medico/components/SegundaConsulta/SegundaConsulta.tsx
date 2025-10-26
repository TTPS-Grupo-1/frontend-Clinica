import { useState } from "react";
import { FlaskConical, Syringe } from "lucide-react";

function SegundaConsulta() {
  const [seccionActiva, setSeccionActiva] = useState<string | null>(null);

  const handleAbrir = (seccion: string) => {
    setSeccionActiva((prev) => (prev === seccion ? null : seccion));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">
        Segunda Consulta
      </h2>

      <p className="text-gray-600 text-center mb-6">
        Aquí podés cargar los resultados de los estudios y registrar el protocolo de estimulación.
      </p>

      {/* Botones principales */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={() => handleAbrir("estudios")}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-sm border
            ${
              seccionActiva === "estudios"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
        >
          <FlaskConical className="w-5 h-5" />
          Cargar estudios
        </button>

        <button
          onClick={() => handleAbrir("protocolo")}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-sm border
            ${
              seccionActiva === "protocolo"
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
        >
          <Syringe className="w-5 h-5" />
          Registrar protocolo de estimulación
        </button>
      </div>

      {/* Sección de carga de estudios */}
      {seccionActiva === "estudios" && (
        <div className="mt-8 p-6 border rounded-lg bg-blue-50">
          <h3 className="text-xl font-semibold text-blue-700 mb-3">
            Resultados de estudios
          </h3>
          <p className="text-gray-600 mb-4">
            Aquí iría el formulario dinámico para registrar las determinaciones y sus valores.
          </p>

          {/* Simulación de formulario */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Determinación (ej: FSH)"
                className="w-1/2 border border-gray-300 rounded px-2 py-1"
              />
              <input
                type="text"
                placeholder="Valor obtenido"
                className="w-1/2 border border-gray-300 rounded px-2 py-1"
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700">
              Guardar resultado
            </button>
          </div>
        </div>
      )}

      {/* Sección del protocolo de estimulación */}
      {seccionActiva === "protocolo" && (
        <div className="mt-8 p-6 border rounded-lg bg-green-50">
          <h3 className="text-xl font-semibold text-green-700 mb-3">
            Protocolo de estimulación
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Droga</label>
              <input
                type="text"
                placeholder="Nombre de la droga"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Tipo</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2">
                <option value="">Seleccione...</option>
                <option>Oral</option>
                <option>Inyectable</option>
                <option>Mixta</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Dosis</label>
              <input
                type="text"
                placeholder="Ej: 150 UI diarias"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Duración (días)</label>
              <input
                type="number"
                min="1"
                className="w-full border border-gray-300 rounded px-3 py-2"
                defaultValue={15}
              />
            </div>
          </div>
          <button className="mt-4 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
            Generar orden médica
          </button>
        </div>
      )}
    </div>
  );
}

export default SegundaConsulta;
