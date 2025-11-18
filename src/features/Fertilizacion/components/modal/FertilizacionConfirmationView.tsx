import { CheckCircle } from 'lucide-react';

export default function FertilizacionConfirmationView({
  tecnica,
  setTecnica,
  ovocitosFrescos,
  ovocitosCriopreservados,
  ovocitoSeleccionado,
  setOvocitoSeleccionado,
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
  resultado: 'exitosa' | 'fallida';
  setResultado: (r: 'exitosa' | 'fallida') => void;
  observaciones: string;
  setObservaciones: (s: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900">Registrar Fertilización</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Técnica</label>
          <select value={tecnica} onChange={(e) => setTecnica(e.target.value as 'ICSI' | 'FIV')} className="w-full p-2 border border-gray-300 rounded-lg">
            <option value="ICSI">ICSI</option>
            <option value="FIV">FIV</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ovocitos a utilizar</label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {ovocitosFrescos.map((ovocito) => (
              <label key={ovocito.id_ovocito} className="flex items-center space-x-2">
                <input type="radio" name="ovocito" value={ovocito.id_ovocito} checked={ovocitoSeleccionado === ovocito.id_ovocito} onChange={() => setOvocitoSeleccionado(ovocito.id_ovocito)} className="rounded" />
                <span className="text-sm">Ovocito fresco: {ovocito.identificador}</span>
              </label>
            ))}

            {ovocitosCriopreservados.map((ovocito) => (
              <label key={ovocito.id_ovocito} className="flex items-center space-x-2">
                <input type="radio" name="ovocito" value={ovocito.id} checked={ovocitoSeleccionado === ovocito.id} onChange={() => setOvocitoSeleccionado(ovocito.id)} className="rounded" />
                <span className="text-sm text-blue-600">Ovocito criopreservado (se descriopreservará)</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Resultado</label>
          <select value={resultado} onChange={(e) => setResultado(e.target.value as 'exitosa' | 'fallida')} className="w-full p-2 border border-gray-300 rounded-lg">
            <option value="exitosa">Exitosa</option>
            <option value="fallida">Fallida</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Observaciones</label>
          <textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" rows={3} placeholder="Observaciones adicionales..." />
        </div>

        <div className="flex justify-between">
          <button onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Volver</button>
          <button onClick={onSubmit} disabled={ovocitoSeleccionado === null} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">Registrar Fertilización</button>
        </div>
      </div>
    </div>
  );
}
