import OrdenCard from "../components/OrdenesMedicasComponente";


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
    <div className="w-full max-w-7xl mx-auto mt-16 md:mt-20 px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-center mb-2">Órdenes Médicas</h1>
        <p className="text-gray-600 text-center">
          Descargá tus órdenes médicas - Total: {ordenes.length}
        </p>
      </div>

      {/* Grid más compacto */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {ordenes.map((orden) => (
          <OrdenCard key={orden.id} orden={orden} onDescargar={handleDescargar} />
        ))}
      </div>
    </div>
  );
}