import { Loader } from 'lucide-react';

export default function FertilizacionLoadingView({ message }: { message?: string }) {
  return (
    <div className="text-center py-8">
      <Loader className="animate-spin h-8 w-8 mx-auto mb-2" />
      <p>{message ?? 'Cargando información...'}</p>
    </div>
  );
}
