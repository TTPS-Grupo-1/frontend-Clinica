import { useState, useEffect } from "react";

interface SeccionEstudiosProps {
  estudiosAgrupados: {
    persona: string;
    tipos_estudios: {
      tipo: string;
      estudios: { id: number; nombre_estudio: string; valor: string | null }[];
    }[];
  }[];
  onDataChange?: (data: any) => void;
}

export default function SeccionEstudios({ estudiosAgrupados, onDataChange }: SeccionEstudiosProps) {
  const [personaSeleccionada, setPersonaSeleccionada] = useState<string | null>(null);
  const [valores, setValores] = useState<{ [key: string]: string }>({});

  // ✅ avisamos al padre solo cuando cambia algo (no al renderizar)
  useEffect(() => {
    onDataChange?.(valores);
  }, [valores]);

  if (!estudiosAgrupados || estudiosAgrupados.length === 0) {
    return (
      <div className="p-6 border rounded-lg bg-blue-50 text-center">
        <p className="text-gray-600">No hay estudios registrados para esta consulta.</p>
      </div>
    );
  }

  if (!personaSeleccionada) {
    return (
      <div className="p-6 border rounded-lg bg-blue-50">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">
          Seleccioná la persona cuyos estudios querés cargar
        </h3>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {estudiosAgrupados.map((p) => (
            <button
              key={p.persona}
              onClick={() => setPersonaSeleccionada(p.persona)}
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              {p.persona === "PACIENTE"
                ? "Cargar estudios de la paciente"
                : "Cargar estudios del acompañante"}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const personaData = estudiosAgrupados.find((p) => p.persona === personaSeleccionada);

  const handleValorChange = (id: number, valor: string) => {
    setValores((prev) => ({ ...prev, [id]: valor }));
  };

  return (
    <div className="p-6 border rounded-lg bg-blue-50">
      <button
        onClick={() => setPersonaSeleccionada(null)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Volver
      </button>

      <h3 className="text-xl font-semibold text-blue-700 mb-3">
        Estudios de {personaSeleccionada === "PACIENTE" ? "la paciente" : "el acompañante"}
      </h3>

      {personaData?.tipos_estudios.map((tipo) => (
        <div key={tipo.tipo} className="mb-5 border-b pb-3">
          <h4 className="font-semibold text-blue-600 mb-2">{tipo.tipo}</h4>
          <ul className="list-disc ml-6 text-gray-700">
            {tipo.estudios.map((est) => (
              <li key={est.id} className="flex justify-between items-center mb-1">
                <span>{est.nombre_estudio}</span>
                <input
                  type="text"
                  placeholder="Ingresar valor"
                  defaultValue={valores[est.id] || ""}
                  onChange={(e) => handleValorChange(est.id, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm w-40 focus:ring-2 focus:ring-blue-300"
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
