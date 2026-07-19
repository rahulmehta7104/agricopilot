import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, User, Loader2, Trash2 } from 'lucide-react';
import { Button } from './ui';
import { startChatSession, sendChatMessage } from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function AiChatModal({ isOpen, onClose }) {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  // Initialize session on open
  useEffect(() => {
    if (isOpen && !sessionId) {
      const initSession = async () => {
        try {
          let userId = null;
          if (token) {
            try {
              const payload = JSON.parse(atob(token.split('.')[1]));
              userId = payload.id;
            } catch(e){ console.error("Error decoding token"); }
          }
          
          if (!userId) {
             toast.error("User not authenticated.");
             return;
          }

          const res = await startChatSession({ userId, title: 'New Chat' });
          setSessionId(res.data.data.id);
          setMessages([
            { role: 'assistant', content: 'Hello! I am AgriCopilot. How can I help you with your farm today?' }
          ]);
        } catch (error) {
          toast.error("Failed to start chat session.");
          console.error("Session start error:", error);
        }
      };
      initSession();
    }
  }, [isOpen, sessionId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleClear = () => {
    setSessionId(null);
    setMessages([]);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !sessionId || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const res = await sendChatMessage(sessionId, { content: userMessage });
      const { aiMsg } = res.data.data;
      setMessages(prev => [...prev, { role: 'assistant', content: aiMsg.content }]);
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Chat error:", error);
      // Remove the user message if it failed, or show an error message
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error connecting to the AI API.' }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md h-full bg-white dark:bg-slate-950 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-emerald-500 text-white">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6" />
            <h2 className="font-bold text-lg">AgriCopilot AI</h2>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={handleClear}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors tooltip-trigger"
              title="Clear Chat"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' 
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300' 
                  : 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                msg.role === 'user' 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                <span className="text-sm text-slate-500">Copilot is typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Copilot..."
              disabled={loading}
              className="flex-1 bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-emerald-500 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-900 dark:text-white placeholder:text-slate-500"
            />
            <Button type="submit" disabled={!input.trim() || loading} className="shrink-0 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white px-4">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
