import React, { useState, useRef, useEffect } from 'react';
import { LogoOlimpiade } from './Logos';
import { APP_CONFIG } from '../../appConfig.js';
import { ApiService } from '../services/apiClient';
import { MessageSquare, Send, X, Bot, User, Sparkles, Loader2, Minimize2 } from 'lucide-react';

export const AIConsultantDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: `Halo Ayah, Bunda, dan Adik Berprestasi! Saya adalah **Konsultan Edukasi Resmi ${APP_CONFIG.brandName}** (didukung oleh *${APP_CONFIG.supportedBy}*).\n\nAda yang bisa saya bantu terkait silabus kompetisi (Matematika, IPA, B. Inggris, B. Indonesia), sistem 20 soal HOTS, simulasi try out, atau alur pendaftaran?`
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || loading) return;

    const userMsg = text.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    if (!textToSend) setInputMessage('');
    setLoading(true);

    try {
      const reply = await ApiService.askAI(userMsg);
      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `Mohon maaf, sistem konsultan sedang sibuk. Silakan hubungi langsung panitia via WhatsApp resmi di ${APP_CONFIG.contact.whatsappFormatted}.`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickChips = [
    'Silabus Matematika Kategori A',
    'Tips menjawab 20 soal HOTS dalam 30 menit',
    'Info promo Tiket Final BCA Rp 99.000',
    'Kapan pengumuman babak penyisihan?'
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 font-extrabold text-xs sm:text-sm py-3 px-5 rounded-full shadow-2xl flex items-center gap-2.5 border-2 border-amber-300 cursor-pointer transform hover:scale-105 active:scale-95 transition-all"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute -top-1 -right-1 border-2 border-amber-500 animate-ping" />
          </div>
          <span>Tanya Konsultan AI</span>
        </button>
      )}

      {/* Slide-in Chat Drawer / Modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[420px] h-[550px] max-h-[85vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Konsultan AI Olimpiade</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-mono px-1.5 py-0.2 rounded-full border border-emerald-500/30">
                    Online 24 Jam
                  </span>
                </p>
                <p className="text-[10px] text-slate-400">{APP_CONFIG.brandName}</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-xs'
                      : 'bg-slate-800 text-slate-200 border border-slate-700/80 rounded-tl-xs whitespace-pre-line'
                  }`}
                >
                  {m.text}
                </div>
                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs py-1">
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span className="italic">Konsultan AI sedang menyusun penjelasan mendalam...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickChips.map((chip, i) => (
              <button
                key={i}
                onClick={() => handleSend(chip)}
                className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-full whitespace-nowrap border border-slate-700 transition-all cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder="Tanyakan materi, silabus, atau info ujian..."
              className="flex-1 bg-slate-900 border border-slate-700 px-3.5 py-2.5 rounded-xl text-white text-xs outline-hidden focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="bg-amber-500 hover:bg-amber-600 disabled:opacity-30 text-slate-950 p-2.5 rounded-xl transition-all cursor-pointer font-bold"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
