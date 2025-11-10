import OrdenCard from "../components/OrdenesMedicasComponente";
import { motion } from "framer-motion";


export default function OrdenesMedicas() {
  const ordenes = [
    { id: 1, fecha: "10/10/2025", tipo: "Estudios PREQUIRÚRGICOS", archivo: "archivo1.pdf" },
    { id: 2, fecha: "12/10/2025", tipo: "Estudios GINECOLÓGICOS", archivo: "archivo2.pdf" },
    { id: 3, fecha: "15/10/2025", tipo: "Estudios LABORATORIO", archivo: "archivo3.pdf" },
  ];

  const handleDescargar = (archivo: string) => {
    console.log("Descargar archivo:", archivo);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto mt-16 md:mt-20 px-4 sm:px-6 py-6 min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 overflow-x-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-2xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full opacity-30 blur-2xl" />
      </div>
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-center mb-2 text-blue-700 drop-shadow-lg">Órdenes Médicas</h1>
          <p className="text-gray-700 text-center text-lg">
            Descargá tus órdenes médicas <span className="font-semibold">({ordenes.length})</span>
          </p>
        </motion.div>

        {/* Grid más compacto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4"
        >
          {ordenes.map((orden) => (
            <OrdenCard key={orden.id} orden={orden} onDescargar={handleDescargar} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}