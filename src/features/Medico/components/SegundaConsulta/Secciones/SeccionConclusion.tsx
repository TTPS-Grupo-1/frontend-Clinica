import { useState } from 'react';

interface SeccionConclusionProps {
  initialData?: { ovocitoViable: boolean; semenViable: boolean };
  objetivo?: string;
  onDataChange?: (data: any) => void;
}

export default function SeccionConclusion({
  initialData = { ovocitoViable: false, semenViable: false },
  objetivo,
  onDataChange,
}: SeccionConclusionProps) {
  const [conclusion, setConclusion] = useState(initialData);

  const toggleCheck = (campo: keyof typeof conclusion) => {
    const nuevo = { ...conclusion, [campo]: !conclusion[campo] };
    setConclusion(nuevo);
    onDataChange?.(nuevo);
  };

  return (
    <div className="rounded-lg border bg-gray-50 p-6">
      <h3 className="mb-3 text-xl font-semibold text-gray-700">Conclusión de la evaluación</h3>

      <div className="space-y-3">
        <label className="flex items-center gap-2 text-gray-800">
          <input
            type="checkbox"
            checked={conclusion.ovocitoViable}
            onChange={() => toggleCheck('ovocitoViable')}
            className="h-5 w-5 text-blue-600"
          />
          Ovocito viable
        </label>
        {objetivo === 'pareja_heterosexual' && (
          <label className="flex items-center gap-2 text-gray-800">
            <input
              type="checkbox"
              checked={conclusion.semenViable}
              onChange={() => toggleCheck('semenViable')}
              className="h-5 w-5 text-blue-600"
            />
            Semen viable
          </label>
        )}
      </div>
    </div>
  );
}
