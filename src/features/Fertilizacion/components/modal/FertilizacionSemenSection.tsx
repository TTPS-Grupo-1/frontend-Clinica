import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FertilizacionSemenSection({ plan, expandedSections, toggleSection }: { plan: any; expandedSections: any; toggleSection: (s: string) => void }) {
  return (
    <div className="border border-gray-200 rounded-lg mb-4">
      <button onClick={() => toggleSection('semen')} className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-800">Material Espermático</span>
          {plan.usandoDonantes?.semen && (
            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Donante</span>
          )}
        </div>
        {expandedSections.semen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {expandedSections.semen && (
        <div className="p-4 pt-0">
          {plan.semen ? (
            <div className="bg-green-50 border border-green-200 rounded p-3">
              <p className="text-green-800 font-medium">{plan.usandoDonantes?.semen ? '✓ Donante compatible encontrado' : '✓ Semen de pareja viable'}</p>
              <p className="text-green-700 text-sm">Origen: {plan.usandoDonantes?.semen ? 'Banco de donantes' : 'Pareja del paciente'}</p>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded p-3">
              <p className="text-red-800">✗ No se encontró material espermático viable</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
