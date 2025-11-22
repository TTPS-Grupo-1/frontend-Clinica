import { Bot } from 'lucide-react';

export default function WelcomeMessage() {
  return (
    <div className="py-8 text-center">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <Bot size={32} className="mx-auto mb-3 text-blue-600" />
        <h4 className="mb-2 font-medium text-gray-800">¡Hola! 👋</h4>
        <p className="text-sm text-gray-600">
          Soy tu asistente virtual especializado en fertilidad.
          <br />
          ¿En qué puedo ayudarte hoy?
        </p>
      </div>
    </div>
  );
}
