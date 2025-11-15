import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface NoOvocitosAlertProps {
  pacienteNombre: string;
  ovocitosCount: number;
}

export const NoOvocitosAlert: React.FC<NoOvocitosAlertProps> = ({
  pacienteNombre,
  ovocitosCount
}) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div className="flex items-center">
        <AlertTriangle className="w-5 h-5 text-red-500 mr-3" />
        <div>
          <h4 className="text-red-800 font-semibold">
            No se pueden realizar fertilizaciones
          </h4>
          <p className="text-red-700 text-sm mt-1">
            La paciente <strong>{pacienteNombre}</strong> no tiene ovocitos disponibles.
            {ovocitosCount === 0 ? 
              ' Es necesario realizar una punción ovárica primero.' : 
              ` Solo tiene ${ovocitosCount} ovocito(s) ya utilizados.`
            }
          </p>
        </div>
      </div>
    </div>
  );
};