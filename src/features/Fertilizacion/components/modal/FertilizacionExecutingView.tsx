import { Loader } from 'lucide-react';

export default function FertilizacionExecutingView() {
  return (
    <div className="text-center py-8">
      <Loader className="animate-spin h-12 w-12 mx-auto mb-4 text-blue-500" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Procesando fertilización...</h3>
      <p className="text-gray-600">Por favor espere</p>
    </div>
  );
}
