import { CheckCircle } from 'lucide-react';

export default function FertilizacionCompletedView() {
  return (
    <div className="text-center py-8">
      <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">¡Fertilización registrada exitosamente!</h3>
      <p className="text-gray-600">El modal se cerrará automáticamente</p>
    </div>
  );
}
