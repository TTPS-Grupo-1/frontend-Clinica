export default function FertilizacionOvocitosSection({ plan, expandedSections, toggleSection }: { plan: any; expandedSections: any; toggleSection: (s: string) => void }) {
  return (
    <div className="border border-gray-200 rounded-lg">
      <button onClick={() => toggleSection('ovocitos')} className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-800">Ovocitos ({plan.ovocitos.length})</span>
          {plan.usandoDonantes?.ovocitos && (
            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Donante</span>
          )}
          {plan.descripPreservados && plan.descripPreservados.length > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Descriopreservados</span>
          )}
        </div>
        {expandedSections.ovocitos ? <span className="w-4 h-4">˄</span> : <span className="w-4 h-4">˅</span>}
      </button>

      {expandedSections.ovocitos && (
        <div className="p-4 pt-0">
          {plan.ovocitos.length > 0 ? (
            <div className="space-y-2">
              {plan.ovocitos.map((ovocito: any, idx: number) => (
                <div key={idx} className="bg-green-50 border border-green-200 rounded p-3">
                  <p className="text-green-800 text-sm">
                    {'estado' in ovocito ? (
                      <>
                        Ovocito propio #{ovocito.id} {ovocito.estado === 'fresco' ? ' (Fresco)' : ' (Criopreservado)'}
                        {plan.descripPreservados && plan.descripPreservados.includes(ovocito.id) && ' → Descriopreservado'}
                      </>
                    ) : (
                      `Ovocito donado #${ovocito.id} (Compatible por fenotipo)`
                    )}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded p-3">
              <p className="text-red-800">✗ No se encontraron ovocitos viables</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
