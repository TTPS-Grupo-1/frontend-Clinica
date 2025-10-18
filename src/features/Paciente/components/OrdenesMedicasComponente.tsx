import type { FC } from "react";
import { Download } from "lucide-react";

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
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-lg text-black font-semibold mb-2">{orden.tipo}</h3>
      <p className="text-black mb-2">Fecha de orden: {orden.fecha}</p>
      <button onClick={() => onDescargar(orden.archivo)} className="mx-auto flex items-center justify-center gap-2 bg-white text-black border border-gray-400 py-2 px-6 rounded-md font-medium hover:bg-gray-100 transition">
        Descargar
        <Download size={18} />
      </button>
    
    </div>
  );
};

export default OrdenCard;