import { useState } from "react";

interface GenerarOrdenParams {
  url: string;
  payload: any;
  firma: File | null;
  nombreArchivo?: string;
}

export function useGenerarOrden() {
  const [loading, setLoading] = useState(false);

  const generar = async ({ url, payload, firma, nombreArchivo = "orden_estudio.pdf" }: GenerarOrdenParams) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      if (firma) formData.append("firma_medico", firma);
      const response = await fetch(url, {
        method: "POST",
        body: formData
      });
      const blob = await response.blob();
      const urlBlob = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = urlBlob;
      a.download = nombreArchivo;
      a.click();
    } catch (err: any) {
      alert("Error generando PDF: " + (err.response?.status || "desconocido"));
    } finally {
      setLoading(false);
    }
  };

  return { generar, loading };
}