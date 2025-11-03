import { useState } from "react";

interface SeccionConclusionProps {
  initialData?: { ovocitoViable: boolean; semenViable: boolean };
  onDataChange?: (data: any) => void;
}

export default function SeccionConclusion({
  initialData = { ovocitoViable: false, semenViable: false },
  onDataChange,
}: SeccionConclusionProps) {
  const [conclusion, setConclusion] = useState(initialData);

  const toggleCheck = (campo: keyof typeof conclusion) => {
    const nuevo = { ...conclusion, [campo]: !conclusion[campo] };
    setConclusion(nuevo);
    onDataChange?.(nuevo);
  };

  return (
    <div className="p-6 border rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold text-gray-700 mb-3">
        Conclusión de la evaluación
      </h3>

      <div className="space-y-3">
        <label className="flex items-center gap-2 text-gray-800">
          <input
            type="checkbox"
            checked={conclusion.ovocitoViable}
            onChange={() => toggleCheck("ovocitoViable")}
            className="w-5 h-5 text-blue-600"
          />
          Ovocito viable
        </label>

        <label className="flex items-center gap-2 text-gray-800">
          <input
            type="checkbox"
            checked={conclusion.semenViable}
            onChange={() => toggleCheck("semenViable")}
            className="w-5 h-5 text-blue-600"
          />
          Semen viable
        </label>
      </div>
    </div>
  );
}
