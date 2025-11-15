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
        <div className="flex flex-col gap-2 mt-auto">
            <button
                // 💡 CAMBIO: Llamamos al handler con la URL del archivo
                onClick={() => onDescargar(orden.archivo)} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
            >
                Descargar Archivo
                <Download size={18} />
            </button>
        </div>
  );
};

export default OrdenCard;