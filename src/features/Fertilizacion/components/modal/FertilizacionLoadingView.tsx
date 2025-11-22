import { Loader } from 'lucide-react';

export default function FertilizacionLoadingView({ message }: { message?: string }) {
  return (
    <div className="py-8 text-center">
      <Loader className="mx-auto mb-2 h-8 w-8 animate-spin" />
      <p>{message ?? 'Cargando información...'}</p>
    </div>
  );
}
