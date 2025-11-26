export default function FertilizacionOvocitosSection({
  plan,
  expandedSections,
  toggleSection,
}: {
  plan: any;
  expandedSections: any;
  toggleSection: (s: string) => void;
}) {
  return (
    <div className="rounded-lg border border-gray-200">
      <button
        onClick={() => toggleSection('ovocitos')}
        className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-800">Ovocitos ({plan.ovocitos.length})</span>
          {plan.usandoDonantes?.ovocitos && (
            <span className="rounded bg-orange-100 px-2 py-1 text-xs text-orange-800">Donante</span>
          )}
          {plan.descripPreservados && plan.descripPreservados.length > 0 && (
            <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
              Descriopreservados
            </span>
          )}
        </div>
        {expandedSections.ovocitos ? (
          <span className="h-4 w-4">˄</span>
        ) : (
          <span className="h-4 w-4">˅</span>
        )}
      </button>

      {expandedSections.ovocitos && (
        <div className="p-4 pt-0">
          {plan.ovocitos.length > 0 ? (
            <div className="space-y-2">
              {plan.ovocitos.map((ovocito: any, idx: number) => (
                <div key={idx} className="rounded border border-green-200 bg-green-50 p-3">
                  <p className="text-sm text-green-800">
                    {'estado' in ovocito ? (
                      <>
                        Ovocito propio #{ovocito.id}{' '}
                        {ovocito.estado === 'fresco' ? ' (Fresco)' : ' (Criopreservado)'}
                        {plan.descripPreservados &&
                          plan.descripPreservados.includes(ovocito.id) &&
                          ' → Descriopreservado'}
                      </>
                    ) : (
                      `Ovocito donado #${ovocito.id} (Compatible por fenotipo)`
                    )}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded border border-red-200 bg-red-50 p-3">
              <p className="text-red-800">✗ No se encontraron ovocitos viables</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
