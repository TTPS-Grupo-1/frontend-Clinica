import { X, Bot } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
}

export default function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-white/20 p-2">
          <Bot size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Asistente Virtual</h3>
          <p className="text-xs text-blue-100">¿En qué puedo ayudarte?</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="rounded-full p-1 text-white transition-colors hover:bg-white/20 hover:text-gray-200"
      >
        <X size={20} />
      </button>
    </div>
  );
}
