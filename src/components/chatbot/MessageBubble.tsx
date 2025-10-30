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
        <div className="bg-blue-600 text-white px-4 py-3 rounded-lg max-w-sm">
          <div className="flex items-center gap-2 mb-1">
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
      <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg max-w-sm">
        <div className="flex items-center gap-2 mb-1">
          <Bot size={14} />
          <span className="text-xs font-medium text-blue-600">Asistente</span>
        </div>
        <p className="text-sm leading-relaxed">{message.answer}</p>
      </div>
    </div>
  );
}