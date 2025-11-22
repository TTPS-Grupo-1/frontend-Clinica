import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-lg bg-gray-100 px-4 py-3 text-gray-800">
        <div className="flex items-center gap-2">
          <Bot size={14} />
          <span className="text-xs font-medium text-blue-600">Asistente</span>
        </div>
        <div className="mt-2 flex space-x-1">
          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
            style={{ animationDelay: '0.2s' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
