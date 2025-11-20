import { CheckCircle } from 'lucide-react';

export default function FertilizacionConfirmationView({
  tecnica,
  setTecnica,
  ovocitosFrescos,
  ovocitosCriopreservados,
  ovocitoSeleccionado,
  setOvocitoSeleccionado,
  ovocitoDonadoSeleccionado,
  resultado,
  setResultado,
  observaciones,
  setObservaciones,
  onBack,
  onSubmit,
}: {
  tecnica: 'ICSI' | 'FIV';
  setTecnica: (t: 'ICSI' | 'FIV') => void;
  ovocitosFrescos: any[];
  ovocitosCriopreservados: any[];
  ovocitoSeleccionado: number | null;
  setOvocitoSeleccionado: (id: number | null) => void;
  ovocitoDonadoSeleccionado: any | null;
  resultado: 'exitosa' | 'fallida';
  setResultado: (r: 'exitosa' | 'fallida') => void;
  observaciones: string;
  setObservaciones: (s: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="mb-6 text-center">
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
        <h3 className="text-lg font-semibold text-gray-900">Registrar Fertilización</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Técnica</label>
          <select
            value={tecnica}
            onChange={(e) => setTecnica(e.target.value as 'ICSI' | 'FIV')}
            className="w-full rounded-lg border border-gray-300 p-2"
          >
            <option value="ICSI">ICSI</option>
            <option value="FIV">FIV</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Ovocitos a utilizar
          </label>
          <div className="max-h-32 space-y-2 overflow-y-auto">
            {ovocitoDonadoSeleccionado ? (
              // Si hay un ovocito donado seleccionado, mostrarlo directamente
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-purple-800">
                    Ovocito donado seleccionado: {ovocitoDonadoSeleccionado.identificador}
                  </span>
                </div>
                <div className="mt-1 text-xs text-purple-600">
                  Compatibilidad: {ovocitoDonadoSeleccionado.compatibilidad}% | Color de ojos:{' '}
                  {ovocitoDonadoSeleccionado.color_ojos} | Color de pelo:{' '}
                  {ovocitoDonadoSeleccionado.color_pelo}
                </div>
              </div>
            ) : (
              // Si no hay ovocito donado, mostrar opciones normales
              <>
                {ovocitosFrescos.map((ovocito) => (
                  <label key={ovocito.id_ovocito} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="ovocito"
                      value={ovocito.id_ovocito}
                      checked={ovocitoSeleccionado === ovocito.id_ovocito}
                      onChange={() => setOvocitoSeleccionado(ovocito.id_ovocito)}
                      className="rounded"
                    />
                    <span className="text-sm">Ovocito fresco: {ovocito.identificador}</span>
                  </label>
                ))}

                {ovocitosCriopreservados.map((ovocito) => (
                  <label key={ovocito.id_ovocito} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="ovocito"
                      value={ovocito.id_ovocito}
                      checked={ovocitoSeleccionado === ovocito.id_ovocito}
                      onChange={() => setOvocitoSeleccionado(ovocito.id_ovocito)}
                      className="rounded"
                    />
                    <span className="text-sm text-blue-600">
                      Ovocito criopreservado (se descriopreservará)
                    </span>
                  </label>
                ))}
              </>
            )}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Resultado</label>
          <select
            value={resultado}
            onChange={(e) => setResultado(e.target.value as 'exitosa' | 'fallida')}
            className="w-full rounded-lg border border-gray-300 p-2"
          >
            <option value="exitosa">Exitosa</option>
            <option value="fallida">Fallida</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Observaciones</label>
          <textarea
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2"
            rows={3}
            placeholder="Observaciones adicionales..."
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            Volver
          </button>
          <button
            onClick={onSubmit}
            disabled={ovocitoSeleccionado === null && !ovocitoDonadoSeleccionado}
            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Registrar Fertilización
          </button>
        </div>
      </div>
    </div>
  );
}
