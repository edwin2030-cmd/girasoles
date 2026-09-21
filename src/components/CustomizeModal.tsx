import React, { useState } from 'react';
import { X, Sparkles, Check, Copy, Share2 } from 'lucide-react';
import { APP_CONFIG } from '../config';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customData: {
    greeting: string;
    message: string;
    closing: string;
    sender: string;
    badge: string;
  }) => void;
  currentData: {
    greeting: string;
    message: string;
    closing: string;
    sender: string;
    badge: string;
  };
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentData,
}) => {
  const [recipientName, setRecipientName] = useState('Génesis');
  const [age, setAge] = useState('16');
  const [greeting, setGreeting] = useState(currentData.greeting);
  const [message, setMessage] = useState(currentData.message);
  const [closing, setClosing] = useState(currentData.closing);
  const [sender, setSender] = useState(currentData.sender);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleApplyPreset = (presetType: 'amistad' | 'alegre' | 'eterno') => {
    if (presetType === 'amistad') {
      setGreeting(`¡Feliz Cumpleaños 16, ${recipientName}! 🌻💛`);
      setMessage(
        `¡Felices 16 años, Génesis! Hoy celebramos tu vida, tu luz y esa hermosa energía que ilumina a todos los que tenemos la dicha de ser tus amigos. Que este nuevo año esté lleno de risas sinceras, metas cumplidas y momentos tan dorados y radiantes como un campo eterno de girasoles.`
      );
      setClosing('Con todo el cariño y la mejor amistad');
    } else if (presetType === 'alegre') {
      setGreeting(`¡Llegaron los 16, querida ${recipientName}! 🎉🌻`);
      setMessage(
        `¡Qué gran día para celebrar a una amiga increíble! Que tus 16 sean el comienzo de tus mejores aventuras, rodeada de personas que te aprecian y de momentos inolvidables. ¡Nunca dejes de brillar con esa sonrisa contagiosa!`
      );
      setClosing('¡A festejar a lo grande siempre!');
    } else {
      setGreeting(`Para mi gran amiga ${recipientName} en sus 16 🌻✨`);
      setMessage(
        `Génesis, que cada día de tus 16 años sea como un girasol: buscando siempre la luz, creciendo fuerte y compartiendo alegría con el mundo. Gracias por ser una amiga tan especial y auténtica.`
      );
      setClosing('Tu amistad es un regalo dorado');
    }
  };

  const handleSave = () => {
    onSave({
      greeting,
      message,
      closing,
      sender,
      badge: `🌻 DULCES ${age} • ${recipientName.toUpperCase()} ✨`,
    });
    onClose();
  };

  const handleCopyText = () => {
    const fullText = `${greeting}\n\n${message}\n\n${closing} - ${sender}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in select-text">
      <div className="relative w-full max-w-lg bg-stone-950/95 border border-amber-500/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(251,191,36,0.2)] text-amber-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-amber-400 hover:text-amber-200 transition-colors cursor-pointer border border-amber-500/20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-amber-500/20">
          <span className="text-2xl">🌻</span>
          <div>
            <h2 className="font-serif-title text-xl text-amber-200">
              Personalizar Dedicatoria de Cumpleaños
            </h2>
            <p className="text-xs text-amber-400/70">
              Edita el mensaje amistoso para los 16 años de Génesis
            </p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mb-4">
          <label className="block text-xs font-mono uppercase tracking-wider text-amber-300 mb-1.5">
            Plantillas de Amistad Rápidas:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleApplyPreset('amistad')}
              className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-200 text-xs font-medium text-center transition-all cursor-pointer"
            >
              💛 Amistad Pura
            </button>
            <button
              onClick={() => handleApplyPreset('alegre')}
              className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-200 text-xs font-medium text-center transition-all cursor-pointer"
            >
              🎉 Fiesta & Alegría
            </button>
            <button
              onClick={() => handleApplyPreset('eterno')}
              className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-200 text-xs font-medium text-center transition-all cursor-pointer"
            >
              🌻 Girasol de Luz
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-3.5">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-amber-300 mb-1">
                Nombre de la cumpleañera
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => {
                  setRecipientName(e.target.value);
                  setGreeting(`¡Feliz Cumpleaños ${age}, ${e.target.value}! 🌻💛`);
                }}
                className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-amber-500/30 text-amber-100 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-amber-300 mb-1">
                Edad
              </label>
              <input
                type="text"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  setGreeting(`¡Feliz Cumpleaños ${e.target.value}, ${recipientName}! 🌻💛`);
                }}
                className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-amber-500/30 text-amber-100 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-amber-300 mb-1">
              Encabezado / Saludo
            </label>
            <input
              type="text"
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-amber-500/30 text-amber-100 text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-amber-300 mb-1">
              Mensaje Amistoso
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-amber-500/30 text-amber-100 text-sm focus:outline-none focus:border-amber-400 resize-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-amber-300 mb-1">
                Frase de Cierre
              </label>
              <input
                type="text"
                value={closing}
                onChange={(e) => setClosing(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-amber-500/30 text-amber-100 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-amber-300 mb-1">
                Firma / Tu nombre
              </label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-amber-500/30 text-amber-100 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-5 pt-3.5 border-t border-amber-500/20 flex items-center justify-between gap-2.5">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-amber-500/30 text-amber-300 text-xs font-medium transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '¡Copiado!' : 'Copiar Texto'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-xl text-xs font-medium text-amber-300/80 hover:text-amber-100 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 text-xs font-bold transition-all shadow-[0_0_15px_rgba(251,191,36,0.4)] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Guardar y Aplicar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
