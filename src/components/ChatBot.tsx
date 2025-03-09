import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Minimize2, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ollamaStatus, setOllamaStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkOllamaStatus();
    const interval = setInterval(checkOllamaStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const checkOllamaStatus = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/status');
      setOllamaStatus(response.data.status === 'online' ? 'online' : 'offline');
      if (response.data.status === 'online' && messages.length === 0) {
        setMessages([{ 
          id: 1, 
          text: "Hi! I'm AniBot powered by Ollama! Let's talk about anime! 🎭", 
          isBot: true 
        }]);
      }
    } catch (error) {
      setOllamaStatus('offline');
    }
  };

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const newMessage = { id: Date.now(), text: message, isBot: false };
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/api/chat', {
        message: message
      });

      const botResponse = {
        id: Date.now(),
        text: response.data.response,
        isBot: true
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorMessage = {
        id: Date.now(),
        text: "Sorry, I'm having trouble connecting to my AI brain right now. Please try again later! 🙇‍♂️",
        isBot: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.3 }}
            className="bg-white rounded-lg shadow-2xl mb-4 w-[350px] overflow-hidden"
          >
            <div className="bg-indigo-600 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-semibold">AniBot Chat</h3>
                {ollamaStatus === 'checking' && (
                  <span className="text-indigo-200 text-sm">Checking status...</span>
                )}
                {ollamaStatus === 'offline' && (
                  <span className="flex items-center gap-1 text-red-200 text-sm">
                    <AlertCircle size={14} />
                    Offline
                  </span>
                )}
                {ollamaStatus === 'online' && (
                  <span className="flex items-center gap-1 text-green-200 text-sm">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Online
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-white hover:text-indigo-200 transition-colors"
                >
                  <Minimize2 size={18} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-indigo-200 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="h-[400px] flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.isBot
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-indigo-600 text-white'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                      <div className="flex gap-1">
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                        <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled={ollamaStatus !== 'online'}
                  />
                  <button
                    onClick={handleSend}
                    disabled={ollamaStatus !== 'online' || isLoading}
                    className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-white rounded-lg shadow-lg mb-4 p-4 cursor-pointer"
            onClick={() => setIsMinimized(false)}
          >
            <div className="flex items-center gap-2 text-indigo-600">
              <MessageSquare size={20} />
              <span className="font-medium">Chat with AniBot</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && !isMinimized && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        >
          <MessageSquare size={24} />
        </motion.button>
      )}
    </div>
  );
}