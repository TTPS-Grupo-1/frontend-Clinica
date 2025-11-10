import { AlertTriangle } from 'lucide-react';

export default function FertilizacionErrorsBanner({ errores }: { errores: string[] }) {
  if (!errores || errores.length === 0) return null;
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-2">
        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
        <div>
          <h4 className="font-medium text-red-800">Errores encontrados:</h4>
          <ul className="list-disc list-inside text-red-700 text-sm mt-1">
            {errores.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
