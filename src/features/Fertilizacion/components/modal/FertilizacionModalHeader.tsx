import { NotebookPen } from 'lucide-react';

export default function FertilizacionModalHeader({ title }: { title: string }) {
  return (
    <div className="text-center">
      <NotebookPen className="mx-auto mb-4 h-12 w-12 text-blue-500" />
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
    </div>
  );
}
