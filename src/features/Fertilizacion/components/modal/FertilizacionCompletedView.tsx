import { CheckCircle } from 'lucide-react';

export default function FertilizacionCompletedView() {
  return (
    <div className="py-8 text-center">
      <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
      <h3 className="mb-2 text-lg font-semibold text-gray-900">
        ¡Fertilización registrada exitosamente!
      </h3>
      <p className="text-gray-600">El modal se cerrará automáticamente</p>
    </div>
  );
}
