import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, Bot, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import axios from 'axios';

interface Message {
  id: number;
  question: string;
  answer: string;
  timestamp: string;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const user = useSelector((state: RootState) => (state.auth as any)?.user);
  console.log('User data in Chatbot:', user);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cargar historial de mensajes al abrir el chat
  useEffect(() => {
    if (isOpen && user) {
      loadChatHistory();
    }
  }, [isOpen, user]);

  const loadChatHistory = async () => {
    if (!user) return;
    
    setIsLoadingHistory(true);
    try {
      const response = await axios.get('/api/chatbot/history/', {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        setMessages(response.data.messages || []);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !user || isLoading) return;

    const newMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    try {
    
      const response = await axios.post('/api/chatbot/message/', {
        message: newMessage,
        user_name: user.first_name || user.nombre || 'Usuario',
        user_age: user.age || user.edad || 25,
        user_gender: (user.gender?.toUpperCase() === 'M' || user.genero?.toUpperCase() === 'M' || user.sexo?.toUpperCase() === 'M') ? 'Masculino' : 'Femenino',
        date: new Date().toISOString().split('T')[0]
      }, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        const newMessageComplete = {
          id: response.data.message.id,
          question: response.data.message.question,
          answer: response.data.message.answer,
          timestamp: response.data.message.timestamp
        };
        
        setMessages(prev => [...prev, newMessageComplete]);
      } else {
        throw new Error(response.data.error || 'Error enviando mensaje');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Mostrar mensaje de error
      const errorMessage = {
        id: Date.now(),
        question: newMessage,
        answer: 'Lo siento, hubo un error al procesar tu mensaje. Por favor intenta nuevamente.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Chatbot Modal */}
      <div className="fixed bottom-4 right-4 z-[9999]">
        <div className="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col border border-gray-200">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot size={20} />
            <h3 className="font-semibold">Asistente Virtual</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {isLoadingHistory ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-gray-500 text-center text-sm">
              ¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className="space-y-2">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white px-3 py-2 rounded-lg max-w-xs">
                    <div className="flex items-center gap-1 mb-1">
                      <User size={12} />
                      <span className="text-xs">Tú</span>
                    </div>
                    <p className="text-sm">{message.question}</p>
                  </div>
                </div>
                
                {/* Bot Response */}
                {message.answer && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg max-w-xs">
                      <div className="flex items-center gap-1 mb-1">
                        <Bot size={12} />
                        <span className="text-xs">Asistente</span>
                      </div>
                      <p className="text-sm">{message.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Bot size={12} />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
        </div>
      </div>
    </>,
    document.body
  );
}