import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import axios from 'axios';
import { 
  MessageBubble, 
  TypingIndicator, 
  ChatHeader, 
  ChatInput, 
  WelcomeMessage,
  type Message 
} from './chatbot/index';

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

  // Helper functions
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getUserGender = () => {
    return (user?.gender?.toUpperCase() === 'M' || 
            user?.genero?.toUpperCase() === 'M' || 
            user?.sexo?.toUpperCase() === 'M') ? 'Masculino' : 'Femenino';
  };

  const getUserName = () => {
    return user?.first_name || user?.nombre || 'Usuario';
  };

  const getUserAge = () => {
    return user?.age || user?.edad || 25;
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
        user_name: getUserName(),
        user_age: getUserAge(),
        user_gender: getUserGender(),
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



  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Chatbot Modal */}
      <div className="fixed bottom-4 right-4 z-[9999]">
        <div className="bg-white rounded-xl shadow-2xl w-96 h-[32rem] flex flex-col border border-gray-200 overflow-hidden">
        {/* Header */}
        <ChatHeader onClose={onClose} />

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {isLoadingHistory ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : messages.length === 0 ? (
            <WelcomeMessage />
          ) : (
            messages.map((message) => (
              <div key={message.id} className="space-y-3">
                <MessageBubble message={message} isUser={true} />
                {message.answer && <MessageBubble message={message} isUser={false} />}
              </div>
            ))
          )}
          
          {isLoading && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <ChatInput 
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          onSendMessage={sendMessage}
          isLoading={isLoading}
          showSuggestions={messages.length === 0}
        />
        </div>
      </div>
    </>,
    document.body
  );
}