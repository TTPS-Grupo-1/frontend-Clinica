import { AlertTriangle } from 'lucide-react';

export default function FertilizacionErrorsBanner({ errores }: { errores: string[] }) {
  if (!errores || errores.length === 0) return null;
  return (
    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
      <div className="flex items-start gap-2">
        <AlertTriangle className="mt-0.5 h-5 w-5 text-red-500" />
        <div>
          <h4 className="font-medium text-red-800">Errores encontrados:</h4>
          <ul className="mt-1 list-inside list-disc text-sm text-red-700">
            {errores.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
