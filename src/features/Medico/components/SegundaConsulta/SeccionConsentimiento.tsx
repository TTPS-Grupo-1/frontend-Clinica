import { useState, useRef } from "react";
import { FileUp, CheckCircle, AlertCircle } from "lucide-react";

function SeccionConsentimiento() {
  const [archivo, setArchivo] = useState<File | null>(null);
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
      return;
    }

    setError(null);
    setArchivo(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = () => {
    if (!archivo) {
      setError("Debes seleccionar un archivo antes de subirlo.");
      return;
    }

    // 🔹 Simulamos el upload (en futuro llamará al backend/Supabase)
    console.log("Archivo subido:", archivo);
    alert("Consentimiento informado subido correctamente ✅");
  };

  return (
    <div className="mt-8 p-6 border rounded-lg bg-purple-50">
      <h3 className="text-xl font-semibold text-purple-700 mb-3">
        Subir consentimiento informado
      </h3>
      <p className="text-gray-600 mb-4">
        Este documento debe ser firmado y cargado en formato PDF antes de avanzar con el tratamiento.
      </p>

      <div className="flex flex-col items-center gap-4">
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          onChange={handleArchivo}
          className="hidden"
        />

        <button
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700"
        >
          <FileUp className="w-5 h-5" />
          Seleccionar archivo PDF
        </button>

        {archivo && (
          <div className="bg-white w-full p-4 rounded border shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">{archivo.name}</span>
              <CheckCircle className="text-green-600 w-5 h-5" />
            </div>
            {preview && (
              <iframe
                src={preview}
                title="Vista previa PDF"
                className="mt-3 w-full h-64 border rounded"
              ></iframe>
            )}
          </div>
        )}

        {error && (
          <div className="flex items-center text-red-600 mt-2">
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
          </div>
        )}

        <button
          onClick={handleUpload}
          className="mt-4 bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700"
        >
          Subir consentimiento
        </button>
      </div>
    </div>
  );
}

export default SeccionConsentimiento;
