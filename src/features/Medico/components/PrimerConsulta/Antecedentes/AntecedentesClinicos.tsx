import React, { useState, useEffect } from 'react';
import Paginador from '../Paginador';
import type { AntecedenteClinicosProps } from '../../../../../interfaces/Medico';

const LIMIT = 7;

const AntecedentesClinicos: React.FC<AntecedenteClinicosProps> = ({
  titulo,
  onDataChange,
  value = [], // controlado desde el padre
}) => {
  const [pagina, setPagina] = useState(1);
  const [inputBusqueda, setInputBusqueda] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState<string[]>([]);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(false);

  // Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setBusqueda(inputBusqueda);
      setPagina(1);
    }, 1000);
    return () => clearTimeout(handler);
  }, [inputBusqueda]);

  // Fetch
  useEffect(() => {
    if (busqueda.length < 3) {
      setResultados([]);
      setTotalPaginas(1);
      return;
    }

    const fetchTerminos = async () => {
      try {
        setLoading(true);
        const url = new URL(
          'https://stqzgokdxgpqjinrmpfu.supabase.co/functions/v1/search_terminos'
        );
        url.searchParams.set('q', busqueda);
        url.searchParams.set('page', pagina.toString());
        url.searchParams.set('limit', LIMIT.toString());

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error('Error al obtener términos');
        const data = await res.json();

        const rows = Array.isArray(data.rows) ? data.rows : [];
        setResultados(rows);

        const total = data.total_count || 0;
        setTotalPaginas(Math.max(1, Math.ceil(total / LIMIT)));
      } catch (err) {
        console.error(err);
        setResultados([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTerminos();
  }, [busqueda, pagina]);

  // ✅ Toggle directo sobre value (sin estado local)
  const handleToggle = (descripcion: string) => {
    const nuevo = value.includes(descripcion)
      ? value.filter((d) => d !== descripcion)
      : [...value, descripcion];
    onDataChange?.(nuevo);
  };

  return (
    <div className="max-w-2xl mx-auto rounded-xl shadow-lg p-8 border border-gray-300 bg-white text-black flex flex-col justify-between min-h-[400px]">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">
        {titulo || 'Antecedentes Clínicos'}
      </h2>

      {/* 🔍 Input */}
      <input
        type="text"
        value={inputBusqueda}
        onChange={(e) => setInputBusqueda(e.target.value)}
        placeholder="Buscar antecedentes (mínimo 3 letras)..."
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded text-blue-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
      />

      {/* 🧠 Estado de carga o resultados */}
      {loading ? (
        <p className="text-center text-gray-500 py-6">Cargando...</p>
      ) : busqueda.length < 3 ? (
        <p className="text-center text-gray-400 py-6">
          Escribí al menos 3 caracteres para buscar
        </p>
      ) : resultados.length === 0 ? (
        <p className="text-center text-gray-400 py-6">
          No se encontraron resultados
        </p>
      ) : (
        <div className="space-y-2">
          {resultados.map((item, index) => (
            <label key={`${item}-${index}`} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={value.includes(item)} // usa directamente value
                onChange={() => handleToggle(item)}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-gray-800">{item}</span>
            </label>
          ))}
        </div>
      )}

      {/* 📄 Paginador */}
      {totalPaginas > 1 && resultados.length > 0 && (
        <div className="mt-4">
          <Paginador
            paginaActual={pagina}
            totalPaginas={totalPaginas}
            onPageChange={setPagina}
          />
        </div>
      )}
    </div>
  );
};

export default AntecedentesClinicos;
