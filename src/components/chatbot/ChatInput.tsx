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
  showSuggestions,
}: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm text-black focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
          className="transform rounded-xl bg-blue-600 p-3 text-white transition-all duration-200 hover:scale-105 hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>

      {/* Quick suggestions */}
      {showSuggestions && (
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => setInputMessage('¿Qué es la fertilización in vitro?')}
            className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600 transition-colors hover:bg-blue-100"
          >
            FIV
          </button>
          <button
            onClick={() => setInputMessage('¿Cuáles son los síntomas de infertilidad?')}
            className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600 transition-colors hover:bg-blue-100"
          >
            Síntomas
          </button>
          <button
            onClick={() => setInputMessage('¿Qué edad es recomendable para tratamientos?')}
            className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600 transition-colors hover:bg-blue-100"
          >
            Edad
          </button>
        </div>
      )}
    </div>
  );
}
