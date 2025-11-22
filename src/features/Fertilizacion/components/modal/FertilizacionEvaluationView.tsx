import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function FertilizacionEvaluationView({
  semenViable,
  ovocitosViables,
  ovocitosFrescosCount,
  ovocitosCriopreservadosCount,
  puedeRealizar,
  onContinue,
}: {
  semenViable: boolean;
  ovocitosViables: boolean;
  ovocitosFrescosCount: number;
  ovocitosCriopreservadosCount: number;
  puedeRealizar: boolean;
  onContinue: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-blue-500 opacity-0" />
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            {semenViable ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            <span>Semen viable: {semenViable ? 'Sí' : 'No'}</span>
          </div>

          <div className="flex items-center space-x-2">
            {ovocitosViables ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            <span>Ovocitos viables: {ovocitosViables ? 'Sí' : 'No'}</span>
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <h4 className="mb-2 font-medium">Material disponible:</h4>
          <ul className="space-y-1 text-sm">
            <li>• Ovocitos frescos: {ovocitosFrescosCount}</li>
            <li>• Ovocitos criopreservados: {ovocitosCriopreservadosCount}</li>
          </ul>
        </div>

        {!puedeRealizar ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-red-500" />
              <div>
                <h4 className="font-medium text-red-800">No se puede realizar fertilización</h4>
                <ul className="mt-1 text-sm text-red-700">
                  {!semenViable && <li>• No hay semen viable</li>}
                  {!ovocitosViables && <li>• No hay ovocitos viables</li>}
                  {ovocitosFrescosCount === 0 && ovocitosCriopreservadosCount === 0 && (
                    <li>• No hay material reproductivo disponible</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              onClick={onContinue}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
