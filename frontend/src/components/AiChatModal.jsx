import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, Loader2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { startChatSession, sendChatMessage } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function AiChatModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState(null);
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  // Animation Stages: 'hidden' | 'robot-intro' | 'robot-blast' | 'chat-active'
  const [stage, setStage] = useState('hidden');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (stage === 'chat-active') {
      scrollToBottom();
    }
  }, [messages, stage]);

  // Handle the intro and blast sequence
  useEffect(() => {
    let t1, t2;
    if (isOpen) {
      setStage('robot-intro');
      // Stay happy robot for 1.2s
      t1 = setTimeout(() => setStage('robot-blast'), 1200);
      // Blast takes 0.4s, then show chat
      t2 = setTimeout(() => setStage('chat-active'), 1600);
    } else {
      setStage('hidden');
    }
    return () => { 
      if (t1) clearTimeout(t1); 
      if (t2) clearTimeout(t2); 
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !chatSession && messages.length === 0 && stage === 'chat-active') {
      const initChat = async () => {
        try {
          setIsLoading(true);
          const res = await startChatSession({ userId: user?.id, title: "Dashboard Chat" });
          setChatSession(res.data.data.chatId || res.data.data.id);
          setMessages([
            { id: 1, role: 'model', text: res.data.data.message || "Hello! I am AgriCopilot. How can I help?" }
          ]);
        } catch (error) {
          console.warn("Backend chat init failed, falling back to mock mode.");
          setChatSession('mock-session-id');
          setMessages([
            { id: 1, role: 'model', text: "Hello! I am AgriCopilot (Offline Mode). The live AI server is currently unreachable, but I'm still here to chat!" }
          ]);
        } finally {
          setIsLoading(false);
        }
      };
      initChat();
    }
  }, [isOpen, chatSession, messages.length, stage]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !chatSession) return;

    const userText = input.trim();
    setInput('');
    const userMsg = { id: Date.now(), role: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    if (chatSession === 'mock-session-id') {
      setTimeout(() => {
        const botMsg = { id: Date.now() + 1, role: 'model', text: "That is an excellent point! Since I am currently operating in mock-mode due to API limits, I recommend checking the Market & Weather tabs on your dashboard for the most up-to-date information on your crops." };
        setMessages(prev => [...prev, botMsg]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const res = await sendChatMessage(chatSession, { content: userText });
      const botMsg = { id: Date.now() + 1, role: 'model', text: res.data.data.message };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      toast.error("Failed to send message");
      const botMsg = { id: Date.now() + 1, role: 'model', text: "I'm having trouble connecting to my servers right now. Please try again later!" };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setChatSession(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[100] flex items-end justify-end w-[400px] h-[600px] pointer-events-none">
          
          {/* Stage 1 & 2: The Robot Intro and Blast */}
          <AnimatePresence>
            {(stage === 'robot-intro' || stage === 'robot-blast') && (
              <motion.div 
                key="robot-animation"
                initial={{ scale: 0, y: 100, opacity: 0 }}
                animate={
                  stage === 'robot-intro' 
                    ? { scale: [0, 1.2, 1], y: 0, opacity: 1, rotate: [0, -10, 10, -5, 0] } // Happy pop-up with a wiggle
                    : { scale: 3, opacity: 0, filter: "brightness(2) blur(10px)" } // The Blast!
                }
                transition={
                  stage === 'robot-intro' 
                    ? { duration: 0.8, type: "spring", bounce: 0.5 }
                    : { duration: 0.4, ease: "easeOut" }
                }
                exit={{ opacity: 0, scale: 0 }}
                className="absolute bottom-0 right-0 w-48 h-48 drop-shadow-[0_0_40px_rgba(16,185,129,0.8)] z-[120]"
              >
                <img src="/robot_avatar.png" alt="Happy Robot" className="w-full h-full object-contain" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stage 3: The Chat Box */}
          <AnimatePresence>
            {stage === 'chat-active' && (
              <motion.div 
                key="chatbox"
                initial={{ opacity: 0, scale: 0.8, y: 50, filter: "brightness(2)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "brightness(1)" }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-[350px] md:w-[400px] h-[550px] max-h-[75vh] bg-slate-900/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col rounded-[2rem] overflow-hidden border border-slate-700/50 pointer-events-auto relative z-[110]"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-slate-800/50 text-white relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <h2 className="font-bold text-lg tracking-tight">AgriCopilot AI</h2>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={clearChat} className="p-2 hover:bg-slate-700/50 rounded-full transition-colors text-slate-400 hover:text-white" title="Clear chat">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button onClick={onClose} className="p-2 hover:bg-slate-700/50 rounded-full transition-colors text-slate-400 hover:text-white" title="Close">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gradient-to-b from-slate-900/50 to-slate-900/80">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                      <div className={`max-w-[85%] p-3.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-emerald-600 text-white rounded-tr-sm' 
                          : 'bg-slate-800 border border-slate-700/50 text-slate-200 rounded-tl-sm'
                      }`}>
                        {msg.role === 'model' && (
                          <div className="flex items-center gap-2 mb-1.5 opacity-80">
                            <Bot className="w-3.5 h-3.5" /> <span className="text-xs font-semibold uppercase tracking-wider">Copilot</span>
                          </div>
                        )}
                        <div className="whitespace-pre-line">{msg.text}</div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-800 border border-slate-700/50 text-emerald-400 p-3.5 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm font-medium">Analyzing...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-slate-800/80 border-t border-slate-700/50">
                  <form onSubmit={handleSend} className="flex gap-2 relative z-20">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about crops, weather, or market..."
                      className="flex-1 bg-slate-900/50 border border-slate-600/50 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 placeholder:text-slate-500 transition-all shadow-inner"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="bg-emerald-500 text-white p-3 rounded-xl hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </AnimatePresence>
  );
}
