import { Loader } from 'lucide-react';

export default function FertilizacionExecutingView() {
  return (
    <div className="py-8 text-center">
      <Loader className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-500" />
      <h3 className="mb-2 text-lg font-semibold text-gray-900">Procesando fertilización...</h3>
      <p className="text-gray-600">Por favor espere</p>
    </div>
  );
}
