import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FertilizacionSemenSection({
  plan,
  expandedSections,
  toggleSection,
}: {
  plan: any;
  expandedSections: any;
  toggleSection: (s: string) => void;
}) {
  return (
    <div className="mb-4 rounded-lg border border-gray-200">
      <button
        onClick={() => toggleSection('semen')}
        className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-800">Material Espermático</span>
          {plan.usandoDonantes?.semen && (
            <span className="rounded bg-orange-100 px-2 py-1 text-xs text-orange-800">Donante</span>
          )}
        </div>
        {expandedSections.semen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {expandedSections.semen && (
        <div className="p-4 pt-0">
          {plan.semen ? (
            <div className="rounded border border-green-200 bg-green-50 p-3">
              <p className="font-medium text-green-800">
                {plan.usandoDonantes?.semen
                  ? '✓ Donante compatible encontrado'
                  : '✓ Semen de pareja viable'}
              </p>
              <p className="text-sm text-green-700">
                Origen: {plan.usandoDonantes?.semen ? 'Banco de donantes' : 'Pareja del paciente'}
              </p>
            </div>
          ) : (
            <div className="rounded border border-red-200 bg-red-50 p-3">
              <p className="text-red-800">✗ No se encontró material espermático viable</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
