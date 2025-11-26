import type { UbicacionBanco } from '../../../interfaces/Donaciones';

interface UbicacionBancoFormProps {
  value: Partial<UbicacionBanco>;
  onChange: (value: Partial<UbicacionBanco>) => void;
}

export default function UbicacionBancoForm({ value, onChange }: UbicacionBancoFormProps) {
  return (
    <section className="mb-6 rounded-xl bg-gray-50 p-6">
      <div className="grid gap-4 md:grid-cols-3">
        <article>
          <label className="mb-2 block text-sm font-medium text-gray-700">Tanque *</label>
          <input
            type="text"
            required
            value={value.tanque || ''}
            onChange={(e) => onChange({ ...value, tanque: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            placeholder="ej: T001"
          />
        </article>
        <article>
          <label className="mb-2 block text-sm font-medium text-gray-700">Rack *</label>
          <input
            type="text"
            required
            value={value.rack || ''}
            onChange={(e) => onChange({ ...value, rack: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            placeholder="ej: R12"
          />
        </article>
        <article>
          <label className="mb-2 block text-sm font-medium text-gray-700">Tubo *</label>
          <input
            type="text"
            required
            value={value.tubo || ''}
            onChange={(e) => onChange({ ...value, tubo: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            placeholder="ej: 045"
          />
        </article>
      </div>
    </section>
  );
}
