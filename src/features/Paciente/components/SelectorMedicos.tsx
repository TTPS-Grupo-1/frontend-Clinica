import { useEffect, useState } from "react";

interface Medico {
  dni: number;
  nombre: string;
  apellido: string;
}

interface MedicoSelectProps {
  selected: string;
  onChange: (value: string) => void;
}

export default function MedicoSelect({ selected, onChange }: MedicoSelectProps) {
  const [medicos, setMedicos] = useState<Medico[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/medicos/")
      .then((res) => res.json())
      .then((data) => {
        setMedicos(data);
      })
      .catch((err) => {
        console.error("Error cargando médicos:", err);
      });
  }, []);


  return (
    <div>
      <label className="block text-sm font-medium mb-2">Médico</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg p-2 bg-white"
      >
        <option value="">Seleccionar...</option>
        {medicos.map((m) => (
          <option key={m.dni} value={m.dni}>
            {m.nombre} {m.apellido}
          </option>
        ))}
      </select>
    </div>
  );
}