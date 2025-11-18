import { useState, useRef } from "react";
import { FileUp, CheckCircle, Trash, AlertCircle } from "lucide-react";

interface SeccionConsentimientoProps {
  initialData?: File | null;
  onDataChange?: (file: File | null) => void;
}

export default function SeccionConsentimiento({ onDataChange, initialData }: SeccionConsentimientoProps) {
  const [archivo, setArchivo] = useState<File | null>(initialData || null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Solo se permiten archivos PDF.");
      setArchivo(null);
      setPreview(null);
      onDataChange?.(null);
      return;
    }
    setError(null);
    setArchivo(file);
    setPreview(URL.createObjectURL(file));
    onDataChange?.(file);
  };

  const eliminarArchivo = () => {
    setArchivo(null);
    setPreview(null);
    onDataChange?.(null);
  };

  return (
    <div className="p-6 border rounded-lg bg-purple-50">
      <h3 className="text-xl font-semibold text-purple-700 mb-3">
        Subir consentimiento informado
      </h3>

      <div className="flex flex-col items-center gap-4">
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          onChange={handleArchivo}
          className="hidden"
        />

        {!archivo ? (
          <button
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700"
          >
            <FileUp className="w-5 h-5" /> Seleccionar PDF
          </button>
        ) : (
          <div className="w-full bg-white p-4 rounded border shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">{archivo.name}</span>
              <div className="flex gap-2 items-center">
                <CheckCircle className="text-green-600 w-5 h-5" />
                <button
                  onClick={eliminarArchivo}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>
            {preview && (
              <iframe src={preview} className="w-full h-64 mt-3 rounded border" />
            )}
          </div>
        )}

        {error && (
          <div className="flex items-center text-red-600 mt-2">
            <AlertCircle className="w-4 h-4 mr-1" /> {error}
          </div>
        )}
      </div>
    </div>
  );
}
