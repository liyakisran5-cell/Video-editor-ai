import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../config/contact';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      id="floating-whatsapp-btn"
      href={getWhatsAppUrl('Hello DayaCuts! I have a question and want to connect.')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-400 hover:scale-105 hover:shadow-emerald-500/50 active:scale-95 group"
      title="Chat with us on WhatsApp"
    >
      <div className="relative flex items-center justify-center">
        <MessageCircle className="h-4 w-4 fill-white text-emerald-500" />
        <span className="absolute -top-1 -right-1 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
        </span>
      </div>
      <span className="font-semibold tracking-wide">Contact Us</span>
    </a>
  );
};
