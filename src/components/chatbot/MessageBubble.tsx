import { Bot, User } from 'lucide-react';
import type { Message } from './types';

interface MessageBubbleProps {
  message: Message;
  isUser: boolean;
}

export default function MessageBubble({ message, isUser }: MessageBubbleProps) {
  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-sm rounded-lg bg-blue-600 px-4 py-3 text-white">
          <div className="mb-1 flex items-center gap-2">
            <User size={14} />
            <span className="text-xs font-medium">Tú</span>
          </div>
          <p className="text-sm leading-relaxed">{message.question}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-sm rounded-lg bg-gray-100 px-4 py-3 text-gray-800">
        <div className="mb-1 flex items-center gap-2">
          <Bot size={14} />
          <span className="text-xs font-medium text-blue-600">Asistente</span>
        </div>
        <p className="text-sm leading-relaxed">{message.answer}</p>
      </div>
    </div>
  );
}
