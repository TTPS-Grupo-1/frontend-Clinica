import React from 'react';
import OvocitoStateDiagram from './OvocitoStateDiagram';
import { useHistorialOvocitoFetch } from '../../../shared/hooks/useHistorialOvocitoFetch';

type Props = {
  ovocitoId: number | null;
  ovocitoIdentificador?: string;
  open: boolean;
  onClose: () => void;
};

export default function OvocitoHistoryModal({ ovocitoId, ovocitoIdentificador, open, onClose }: Props) {
  // Intentar cargar historial real (si hay token en localStorage se enviará en headers)
  const { historial: historialReal, loading, error } = useHistorialOvocitoFetch(ovocitoId);
  // Si no hay historial real, usar datos hardcodeados de ejemplo para pruebas
  const fallbackHistorial = (ovocitoId !== null && ovocitoId !== undefined) ? [
    { id: -1, ovocito: ovocitoId, ovocito_identificador: ovocitoIdentificador ?? `OV-${ovocitoId}`, estado: 'recuperado', fecha: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), nota: 'Registro de ejemplo: recuperado', usuario_rep: 'Seed' },
    { id: -2, ovocito: ovocitoId, ovocito_identificador: ovocitoIdentificador ?? `OV-${ovocitoId}`, estado: 'clasificado', fecha: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), nota: 'Registro de ejemplo: clasificado', usuario_rep: 'Seed' },
    { id: -3, ovocito: ovocitoId, ovocito_identificador: ovocitoIdentificador ?? `OV-${ovocitoId}`, estado: 'fertilizado', fecha: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), nota: 'Registro de ejemplo: fertilizado', usuario_rep: 'Seed' },
  ] : [];

  // Priorizar el historial real si llegó, si no usar fallback
  const historial = (historialReal && historialReal.length > 0) ? historialReal : fallbackHistorial;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="bg-white/95 rounded-lg w-full max-w-4xl mx-4 p-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Historial de {ovocitoIdentificador ?? ovocitoId}</h3>
          <button className="text-gray-600 hover:text-gray-900" onClick={onClose}>Cerrar</button>
        </div>

        <div>
          {loading ? (
            <div className="text-gray-500">Cargando historial...</div>
          ) : error ? (
            <div className="text-red-500">Error al cargar historial: {String(error?.message || error)}</div>
          ) : (
            <>
              <OvocitoStateDiagram historial={historial} onNodeClick={(/* estado */) => { /* opcional: filtrar timeline por estado */ }} />

              <div className="mt-4 max-h-44 overflow-y-auto bg-gray-50 p-2 rounded">
                <h4 className="font-medium mb-2">Eventos (más recientes primero)</h4>
                {historial.length === 0 ? (
                  <div className="text-gray-500">No hay eventos registrados.</div>
                ) : (
                  <ul className="text-sm">
                    {historial.slice().sort((a,b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()).map(ev => (
                      <li key={ev.id} className="py-1 border-b last:border-b-0">
                        <div className="flex justify-between">
                          <div><strong>{ev.estado}</strong> — {new Date(ev.fecha).toLocaleString()}</div>
                          <div className="text-gray-500">{(ev as any).usuario_rep || '-'}</div>
                        </div>
                        {ev.nota ? <div className="text-gray-600">{ev.nota}</div> : null}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
