import React, { useState, useEffect } from 'react';
import { Sparkles, Eye, X } from 'lucide-react';

interface RomanticLetterProps {
  visible: boolean;
  badgeText?: string;
  greetingText: string;
  bodyText: string;
  closingText: string;
  senderText?: string;
  onClose: () => void;
}

const RomanticLetterComponent: React.FC<RomanticLetterProps> = ({
  visible,
  badgeText,
  greetingText,
  bodyText,
  closingText,
  senderText,
  onClose,
}) => {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedBody, setDisplayedBody] = useState('');
  const [titleDone, setTitleDone] = useState(false);
  const [bodyDone, setBodyDone] = useState(false);

  // Typewriter effect sequence
  useEffect(() => {
    if (!visible) {
      setDisplayedTitle('');
      setDisplayedBody('');
      setTitleDone(false);
      setBodyDone(false);
      return;
    }

    let titleIdx = 0;
    let bodyIdx = 0;
    let titleTimer: NodeJS.Timeout;
    let bodyTimer: NodeJS.Timeout;

    // Step 1: Typewriter for Greeting Title
    titleTimer = setInterval(() => {
      if (titleIdx < greetingText.length) {
        setDisplayedTitle(greetingText.slice(0, titleIdx + 1));
        titleIdx++;
      } else {
        clearInterval(titleTimer);
        setTitleDone(true);

        // Step 2: Typewriter for Body Text (smooth and fluid)
        bodyTimer = setInterval(() => {
          if (bodyIdx < bodyText.length) {
            setDisplayedBody(bodyText.slice(0, bodyIdx + 1));
            bodyIdx++;
          } else {
            clearInterval(bodyTimer);
            setBodyDone(true);
          }
        }, 16);
      }
    }, 45);

    return () => {
      if (titleTimer) clearInterval(titleTimer);
      if (bodyTimer) clearInterval(bodyTimer);
    };
  }, [visible, greetingText, bodyText]);

  if (!visible) return null;

  return (
    <div
      className="w-full max-w-xl mx-auto z-30 transition-all duration-700 ease-out select-text"
      style={{ animation: 'floatGentle 6s ease-in-out infinite' }}
    >
      <div className="relative backdrop-blur-xl bg-[#fffdfa]/95 border border-amber-600/30 rounded-3xl p-6 sm:p-7 shadow-[0_16px_45px_rgba(180,83,9,0.18),0_2px_12px_rgba(0,0,0,0.06)] text-center">
        {/* Close / Minimize button in top-right corner */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 active:scale-90 border border-amber-600/30 text-amber-900 flex items-center justify-center transition-all cursor-pointer shadow-sm"
          title="Cerrar / Minimizar carta"
          aria-label="Cerrar o minimizar carta"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Subtle decorative corner icon */}
        <div className="absolute top-3.5 left-3.5 text-amber-600/50">
          <Sparkles className="w-4 h-4" />
        </div>

        {/* Badge / Subtitle */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-600/30 text-amber-900 text-[11px] font-mono uppercase tracking-widest mb-2.5">
          <span>{badgeText || 'DULCES 16 • GÉNESIS'}</span>
        </div>

        {/* Title / Greeting */}
        <h1 className="font-serif-title text-2xl sm:text-3xl text-amber-950 tracking-wide mb-3 drop-shadow-sm">
          {displayedTitle}
          {!titleDone && <span className="animate-pulse text-amber-600 font-bold ml-1">|</span>}
        </h1>

        {/* Body Text with Typewriter and multi-line paragraph preservation */}
        <div className="font-poetic text-base sm:text-lg text-stone-700 leading-relaxed min-h-[76px] transition-all px-1 sm:px-3 text-center whitespace-pre-line">
          {displayedBody}
          {titleDone && !bodyDone && (
            <span className="animate-pulse text-amber-600 font-bold ml-0.5">|</span>
          )}
        </div>

        {/* Closing phrase & Sender */}
        <div
          className={`mt-4 pt-3 border-t border-amber-600/20 flex flex-col items-center justify-center gap-1 transition-opacity duration-1000 ${
            bodyDone ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="font-poetic text-sm sm:text-base tracking-wide text-amber-900 font-medium">
              {closingText}
            </span>
          </div>
          {senderText && (
            <span className="text-xs text-amber-800 font-medium italic mt-0.5">
              {senderText}
            </span>
          )}
        </div>

        {/* Interactive Actions */}
        <div
          className={`mt-4 pt-1 flex flex-wrap items-center justify-center gap-2.5 transition-opacity duration-700 ${
            bodyDone ? 'opacity-100' : 'opacity-30 pointer-events-none'
          }`}
        >
          {/* Button: Minimize / View Garden */}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500/20 hover:bg-amber-500/30 active:scale-95 border border-amber-600/35 text-amber-950 text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-sm"
            title="Minimizar para apreciar el árbol y las flores"
          >
            <Eye className="w-3.5 h-3.5 text-amber-700" />
            <span>Ver árbol y jardín</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const RomanticLetter = React.memo(RomanticLetterComponent);
