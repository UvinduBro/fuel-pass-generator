import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { type Language, translations } from '@/lib/translations';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export function GuideModal({ isOpen, onClose, lang }: GuideModalProps) {
  if (!isOpen) return null;

  const t = translations[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm sm:p-6" onClick={onClose}>
      <div 
        className="bg-card w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
          <h2 className="text-lg font-bold text-foreground">{t.howToGetQr}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            aria-label={t.closeBtn}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-background space-y-6">
          <p className="text-sm text-muted-foreground mb-4">
            Follow the guide below in your preferred language to obtain your National Fuel Pass QR code from fuelpass.gov.lk.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="flex flex-col items-center space-y-2">
               <span className="font-semibold text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">English</span>
               <img src="/NFP-E.jpg" alt="English Guide" className="w-full rounded-xl border border-border shadow-sm" />
             </div>
             
             <div className="flex flex-col items-center space-y-2">
               <span className="font-semibold text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">සිංහල</span>
               <img src="/NFP-S.jpg" alt="Sinhala Guide" className="w-full rounded-xl border border-border shadow-sm" />
             </div>

             <div className="flex flex-col items-center space-y-2">
               <span className="font-semibold text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">தமிழ்</span>
               <img src="/NFP-T.jpg" alt="Tamil Guide" className="w-full rounded-xl border border-border shadow-sm" />
             </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <a 
              href="https://fuelpass.gov.lk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Visit fuelpass.gov.lk <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
