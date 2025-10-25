import type { FC } from "react";
import { Download, FileText } from "lucide-react";

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
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 border border-gray-100 flex flex-col justify-between min-h-[180px]">
      <div className="flex flex-col items-center mb-4">
        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-2 shadow">
          <FileText className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-md font-bold text-blue-700 text-center mb-1">{orden.tipo}</h3>
      </div>
      <div className="mb-4 text-center">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Fecha de orden:</span> <span className="text-blue-700 font-semibold">{orden.fecha}</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 mt-auto">
        <button
          onClick={() => onDescargar(orden.archivo)}
          className="mx-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white border-none py-2 px-6 rounded-md font-semibold hover:scale-105 hover:from-blue-600 hover:to-blue-800 transition-all shadow"
        >
          Descargar
          <Download size={18} />
        </button>
      </div>
    </div>
  );
};

export default OrdenCard;