import { X, Bot } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
}

export default function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-full">
          <Bot size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Asistente Virtual</h3>
          <p className="text-xs text-blue-100">¿En qué puedo ayudarte?</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200 transition-colors p-1 hover:bg-white/20 rounded-full"
      >
        <X size={20} />
      </button>
    </div>
  );
}