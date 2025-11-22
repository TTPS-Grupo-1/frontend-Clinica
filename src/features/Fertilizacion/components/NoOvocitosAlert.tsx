import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface NoOvocitosAlertProps {
  pacienteNombre: string;
  ovocitosCount: number;
}

export const NoOvocitosAlert: React.FC<NoOvocitosAlertProps> = ({
  pacienteNombre,
  ovocitosCount,
}) => {
  return (
    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
      <div className="flex items-center">
        <AlertTriangle className="mr-3 h-5 w-5 text-red-500" />
        <div>
          <h4 className="font-semibold text-red-800">No se pueden realizar fertilizaciones</h4>
          <p className="mt-1 text-sm text-red-700">
            La paciente <strong>{pacienteNombre}</strong> no tiene ovocitos disponibles.
            {ovocitosCount === 0
              ? ' Es necesario realizar una punción ovárica primero.'
              : ` Solo tiene ${ovocitosCount} ovocito(s) ya utilizados.`}
          </p>
        </div>
      </div>
    </div>
  );
};
