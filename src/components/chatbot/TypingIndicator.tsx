import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg">
        <div className="flex items-center gap-2">
          <Bot size={14} />
          <span className="text-xs font-medium text-blue-600">Asistente</span>
        </div>
        <div className="flex space-x-1 mt-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}