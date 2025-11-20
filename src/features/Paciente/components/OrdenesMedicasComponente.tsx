import type { FC } from 'react';
import { Download, FileText } from 'lucide-react';

interface OrdenCardProps {
  orden: {
    id: number;
    fecha: string;
    tipo: string;
    archivo: string;
  };
  onDescargar: (archivo: string) => void;
}

const OrdenCard: FC<OrdenCardProps> = ({ orden, onDescargar }) => {
  return (
    <div className="flex min-h-[180px] flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-shadow duration-200 hover:shadow-xl">
      <div className="mb-4 flex flex-col items-center">
        <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 shadow">
          <FileText className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-md mb-1 text-center font-bold text-blue-700">{orden.tipo}</h3>
      </div>
      <div className="mb-4 text-center">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Fecha de orden:</span>{' '}
          <span className="font-semibold text-blue-700">{orden.fecha}</span>
        </p>
      </div>
      <div className="mt-auto flex flex-col gap-2">
        <button
          onClick={() => onDescargar(orden.archivo)}
          className="mx-auto flex items-center justify-center gap-2 rounded-md border-none bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-2 font-semibold text-white shadow transition-all hover:scale-105 hover:from-blue-600 hover:to-blue-800"
        >
          Descargar
          <Download size={18} />
        </button>
      </div>
    </div>
  );
};

export default OrdenCard;
