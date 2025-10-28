import { Bot } from 'lucide-react';

export default function WelcomeMessage() {
  return (
    <div className="text-center py-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <Bot size={32} className="mx-auto text-blue-600 mb-3" />
        <h4 className="font-medium text-gray-800 mb-2">¡Hola! 👋</h4>
        <p className="text-gray-600 text-sm">
          Soy tu asistente virtual especializado en fertilidad. 
          <br />¿En qué puedo ayudarte hoy?
        </p>
      </div>
    </div>
  );
}