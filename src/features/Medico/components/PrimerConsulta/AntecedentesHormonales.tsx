import React, { useEffect, useMemo, useState } from "react";

type FieldType = "checkbox" | "select" | "text";

type FieldDefinition = {
    id: string;
    label: string;
    type?: FieldType;
    // for select type
    options?: string[];
    // placeholder for text inputs/details
    placeholder?: string;
};

type FieldValue =
    | { checked: boolean; detail?: string }
    | { value?: string }; // for select/text

type Props = {
    // optional override for future API-driven fields
    fields?: FieldDefinition[];
    // optional initial values
    initialValues?: Record<string, any>;
    // receives a payload with current form state whenever it changes
    onChange?: (values: Record<string, FieldValue>) => void;
    // optional simple readOnly mode
    readOnly?: boolean;
};

const DEFAULT_FIELDS: FieldDefinition[] = [
    { id: "anticonceptivos", label: "Anticonceptivos", type: "select", options: ["Ninguno", "Oral", "Inyectable", "Implante", "DIU"], placeholder: "Seleccionar" },
    { id: "terapia_hormonal", label: "Terapia hormonal (uso actual)", type: "checkbox", placeholder: "Indicar cuál/desde cuándo" },
    { id: "corticoides", label: "Corticoides", type: "checkbox", placeholder: "Dosis / frecuencia" },
    { id: "tiroxina", label: "Tiroxina", type: "checkbox", placeholder: "Dosis / desde cuándo" },
    { id: "insulina", label: "Insulina", type: "checkbox", placeholder: "Tipo / régimen" },
    { id: "otro", label: "Otro (especificar)", type: "text", placeholder: "Descripción" },
];

export default function AntecedentesHormonales(props: Props) {
    const fields = props.fields ?? DEFAULT_FIELDS;

    // Map of fieldId -> value
    const [values, setValues] = useState<Record<string, FieldValue>>(() => {
        const init: Record<string, FieldValue> = {};
        for (const f of fields) {
            if (f.type === "select") {
                init[f.id] = { value: props.initialValues?.[f.id] ?? (f.options ? f.options[0] : "") };
            } else if (f.type === "text") {
                init[f.id] = { value: props.initialValues?.[f.id] ?? "" };
            } else {
                // checkbox
                init[f.id] = { checked: !!props.initialValues?.[f.id], detail: props.initialValues?.[`${f.id}_detail`] ?? "" };
            }
        }
        return init;
    });

    // If parent replaces fields (e.g., after API load), reinitialize missing entries
    useEffect(() => {
        setValues((prev) => {
            const next = { ...prev };
            for (const f of fields) {
                if (!(f.id in next)) {
                    if (f.type === "select") next[f.id] = { value: props.initialValues?.[f.id] ?? (f.options ? f.options[0] : "") };
                    else if (f.type === "text") next[f.id] = { value: props.initialValues?.[f.id] ?? "" };
                    else next[f.id] = { checked: !!props.initialValues?.[f.id], detail: props.initialValues?.[`${f.id}_detail`] ?? "" };
                }
            }
            return next;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fields.map((f) => f.id).join(",")]);

    useEffect(() => {
        props.onChange?.(values);
    }, [values, props]);

    const handleCheckboxToggle = (id: string) => {
        if (props.readOnly) return;
        setValues((v) => ({ ...v, [id]: { checked: !(v[id] as any)?.checked, detail: (v[id] as any)?.detail ?? "" } }));
    };

    const handleDetailChange = (id: string, detail: string) => {
        if (props.readOnly) return;
        setValues((v) => ({ ...v, [id]: { ...(v[id] as any), detail } }));
    };

    const handleSelectChange = (id: string, value: string) => {
        if (props.readOnly) return;
        setValues((v) => ({ ...v, [id]: { value } }));
    };

    const handleTextChange = (id: string, value: string) => {
        if (props.readOnly) return;
        setValues((v) => ({ ...v, [id]: { value } }));
    };

    const serialized = useMemo(() => {
        // convenient serializable shape for parent consumption
        const out: Record<string, any> = {};
        for (const k of Object.keys(values)) {
            const val = values[k] as FieldValue;
            if ("checked" in val) {
                out[k] = val.checked;
                if (val.detail) out[`${k}_detail`] = val.detail;
            } else {
                out[k] = (val as any).value ?? "";
            }
        }
        return out;
    }, [values]);

    // Expose serialized in onChange too (helpful for consumers that want a plain object).
    useEffect(() => {
        // if parent expects just values they already get FieldValue map; this provides plain mapping too
        // Not strictly necessary, but handy during integration.
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        props.onChange && props.onChange(values);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serialized]);

    return (
        <div role="group" aria-label="Antecedentes hormonales">
            {fields.map((f) => {
                const val = values[f.id];
                if (!val) return null;
                if (f.type === "select") {
                    return (
                        <div key={f.id} style={{ marginBottom: 8 }}>
                            <label htmlFor={f.id} style={{ display: "block", fontWeight: 600 }}>
                                {f.label}
                            </label>
                            <select
                                id={f.id}
                                value={(val as any).value ?? ""}
                                onChange={(e) => handleSelectChange(f.id, e.target.value)}
                                disabled={props.readOnly}
                            >
                                {(f.options ?? []).map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        </div>
                    );
                }

                if (f.type === "text") {
                    return (
                        <div key={f.id} style={{ marginBottom: 8 }}>
                            <label htmlFor={f.id} style={{ display: "block", fontWeight: 600 }}>
                                {f.label}
                            </label>
                            <input
                                id={f.id}
                                type="text"
                                placeholder={f.placeholder}
                                value={(val as any).value ?? ""}
                                onChange={(e) => handleTextChange(f.id, e.target.value)}
                                disabled={props.readOnly}
                            />
                        </div>
                    );
                }

                // default: checkbox with optional detail input
                const checked = (val as any).checked;
                const detail = (val as any).detail ?? "";
                return (
                    <div key={f.id} style={{ marginBottom: 8 }}>
                        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <input
                                type="checkbox"
                                checked={!!checked}
                                onChange={() => handleCheckboxToggle(f.id)}
                                disabled={props.readOnly}
                            />
                            <span style={{ fontWeight: 600 }}>{f.label}</span>
                        </label>
                        {checked && (
                            <div style={{ marginLeft: 24, marginTop: 6 }}>
                                <input
                                    type="text"
                                    placeholder={f.placeholder ?? "Detalle"}
                                    value={detail}
                                    onChange={(e) => handleDetailChange(f.id, e.target.value)}
                                    disabled={props.readOnly}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}