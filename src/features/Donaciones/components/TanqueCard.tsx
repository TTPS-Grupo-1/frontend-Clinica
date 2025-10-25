interface Tanque {
  id: number;
  tipo: "esperma" | "ovocito";
  capacidad: number;
  ocupados: number;
}

export default function TanqueCard({ tanque }: { tanque: Tanque }) {
  const espacioRestante = tanque.capacidad - tanque.ocupados;
  const color =
    tanque.tipo === "esperma"
      ? espacioRestante === 0
        ? "bg-blue-200 border-blue-400 text-blue-700 opacity-60"
        : "bg-blue-50 border-blue-300 text-blue-800"
      : espacioRestante === 0
      ? "bg-pink-200 border-pink-400 text-pink-700 opacity-60"
      : "bg-pink-50 border-pink-300 text-pink-800";

  return (
    <div className={`rounded-xl border-2 shadow-lg p-6 flex flex-col items-center ${color}`}>
      <h2 className="text-xl font-bold mb-2">Tanque #{tanque.id}</h2>
      <span className="text-base font-semibold mb-1 capitalize">Tipo: {tanque.tipo}</span>
      <div className="mb-2">
        <span className="text-sm">Capacidad: {tanque.capacidad}</span>
        <span className="mx-2">|</span>
        <span className="text-sm">Ocupados: {tanque.ocupados}</span>
      </div>
      <div className="w-full flex justify-center items-center mb-2">
        <div className="w-32 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={
              tanque.tipo === "esperma"
                ? "bg-blue-500 h-4 rounded-full"
                : "bg-pink-500 h-4 rounded-full"
            }
            style={{ width: `${(tanque.ocupados / tanque.capacidad) * 100}%` }}
          ></div>
        </div>
      </div>
      <span className="text-sm font-medium">
        Espacio restante: {espacioRestante} / {tanque.capacidad}
      </span>
      {espacioRestante === 0 && (
        <span className="mt-2 text-xs text-red-600 font-semibold">Tanque lleno</span>
      )}
    </div>
  );
}
