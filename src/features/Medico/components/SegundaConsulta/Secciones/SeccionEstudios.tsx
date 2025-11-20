import { useState, useEffect } from 'react';

interface SeccionEstudiosProps {
  estudiosAgrupados: {
    persona: string;
    tipos_estudios: {
      tipo: string;
      estudios: { id: number; nombre_estudio: string; valor: string | null }[];
    }[];
  }[];
  onDataChange?: (data: any) => void;
  initialData?: { [key: string]: string };
}

export default function SeccionEstudios({
  estudiosAgrupados,
  onDataChange,
  initialData,
}: SeccionEstudiosProps) {
  const [personaSeleccionada, setPersonaSeleccionada] = useState<string | null>(null);
  const [valores, setValores] = useState<{ [key: string]: string }>(initialData || {});

  // ✅ avisamos al padre solo cuando cambia algo (no al renderizar)
  useEffect(() => {
    onDataChange?.(valores);
  }, [valores]);

  if (!estudiosAgrupados || estudiosAgrupados.length === 0) {
    return (
      <div className="rounded-lg border bg-blue-50 p-6 text-center">
        <p className="text-gray-600">No hay estudios registrados para esta consulta.</p>
      </div>
    );
  }

  if (!personaSeleccionada) {
    return (
      <div className="rounded-lg border bg-blue-50 p-6">
        <h3 className="mb-4 text-xl font-semibold text-blue-700">
          Seleccioná la persona cuyos estudios querés cargar
        </h3>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          {estudiosAgrupados.map((p) => (
            <button
              key={p.persona}
              onClick={() => setPersonaSeleccionada(p.persona)}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              {p.persona === 'PACIENTE'
                ? 'Cargar estudios de la paciente'
                : 'Cargar estudios del acompañante'}
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
    <div className="rounded-lg border bg-blue-50 p-6">
      <button
        onClick={() => setPersonaSeleccionada(null)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Volver
      </button>

      <h3 className="mb-3 text-xl font-semibold text-blue-700">
        Estudios de {personaSeleccionada === 'PACIENTE' ? 'la paciente' : 'el acompañante'}
      </h3>

      {personaData?.tipos_estudios.map((tipo) => (
        <div key={tipo.tipo} className="mb-5 border-b pb-3">
          <h4 className="mb-2 font-semibold text-blue-600">{tipo.tipo}</h4>
          <ul className="ml-6 list-disc text-gray-700">
            {tipo.estudios.map((est) => (
              <li key={est.id} className="mb-1 flex items-center justify-between">
                <span>{est.nombre_estudio}</span>
                <input
                  type="text"
                  placeholder="Ingresar valor"
                  defaultValue={valores[est.id] || ''}
                  onChange={(e) => handleValorChange(est.id, e.target.value)}
                  className="w-40 rounded border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-300"
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
