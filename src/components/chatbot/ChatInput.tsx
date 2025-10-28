import { Send } from 'lucide-react';

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
  showSuggestions: boolean;
}

export default function ChatInput({ 
  inputMessage, 
  setInputMessage, 
  onSendMessage, 
  isLoading, 
  showSuggestions 
}: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
            disabled={isLoading}
            rows={1}
            style={{ maxHeight: '80px' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 80) + 'px';
            }}
          />
        </div>
        <button
          onClick={onSendMessage}
          disabled={!inputMessage.trim() || isLoading}
          className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          <Send size={18} />
        </button>
      </div>
      
      {/* Quick suggestions */}
      {showSuggestions && (
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => setInputMessage('¿Qué es la fertilización in vitro?')}
            className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
          >
            FIV
          </button>
          <button
            onClick={() => setInputMessage('¿Cuáles son los síntomas de infertilidad?')}
            className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
          >
            Síntomas
          </button>
          <button
            onClick={() => setInputMessage('¿Qué edad es recomendable para tratamientos?')}
            className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
          >
            Edad
          </button>
        </div>
      )}
    </div>
  );
}