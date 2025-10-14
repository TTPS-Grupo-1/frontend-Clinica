export type EstadoOvocito = "muy inmaduro" | "maduro" | "inmaduro";

export type OvocitoModalProps = {
    open: boolean;
    onClose: () => void;
    onAdd: (nuevo: {
        identificador: string;
        estado: EstadoOvocito;
        cripreservar: boolean;
        descartado: boolean;
    }) => void;
    nombreDonante: string;
    apellidoDonante: string;
};
export type OvocitoModalRow = {
    identificador: string;
    estado: EstadoOvocito;
    cripreservar: boolean;
    descartado: boolean;
};
