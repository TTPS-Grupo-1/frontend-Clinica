import { useState, useRef } from 'react';
import { FileUp, CheckCircle, Trash, AlertCircle } from 'lucide-react';

interface SeccionConsentimientoProps {
  initialData?: File | null;
  onDataChange?: (file: File | null) => void;
}

export default function SeccionConsentimiento({
  onDataChange,
  initialData,
}: SeccionConsentimientoProps) {
  const [archivo, setArchivo] = useState<File | null>(initialData || null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setError('Solo se permiten archivos PDF.');
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
    <div className="rounded-lg border bg-purple-50 p-6">
      <h3 className="mb-3 text-xl font-semibold text-purple-700">Subir consentimiento informado</h3>

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
            className="flex items-center gap-2 rounded bg-purple-600 px-5 py-2 text-white hover:bg-purple-700"
          >
            <FileUp className="h-5 w-5" /> Seleccionar PDF
          </button>
        ) : (
          <div className="w-full rounded border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">{archivo.name}</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <button onClick={eliminarArchivo} className="text-red-600 hover:text-red-700">
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </div>
            {preview && <iframe src={preview} className="mt-3 h-64 w-full rounded border" />}
          </div>
        )}

        {error && (
          <div className="mt-2 flex items-center text-red-600">
            <AlertCircle className="mr-1 h-4 w-4" /> {error}
          </div>
        )}
      </div>
    </div>
  );
}
