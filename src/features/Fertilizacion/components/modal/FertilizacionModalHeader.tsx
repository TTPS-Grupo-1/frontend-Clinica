import { NotebookPen } from 'lucide-react';

export default function FertilizacionModalHeader({ title }: { title: string }) {
  return (
    <div className="text-center">
      <NotebookPen className="mx-auto h-12 w-12 text-blue-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    </div>
  );
}
