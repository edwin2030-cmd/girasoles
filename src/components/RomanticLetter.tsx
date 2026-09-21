import React, { useState, useEffect } from 'react';
import { Sparkles, Eye, X, Heart, ArrowRight } from 'lucide-react';

interface RomanticLetterProps {
  visible: boolean;
  badgeText?: string;
  greetingText: string;
  bodyText: string;
  closingText: string;
  senderText?: string;
  onClose: () => void;
  onOpenFriendLetters?: () => void;
}

const RomanticLetterComponent: React.FC<RomanticLetterProps> = ({
  visible,
  badgeText,
  greetingText,
  bodyText,
  closingText,
  senderText,
  onClose,
  onOpenFriendLetters,
}) => {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedBody, setDisplayedBody] = useState('');
  const [titleDone, setTitleDone] = useState(false);
  const [bodyDone, setBodyDone] = useState(false);
  const [autoPromptVisible, setAutoPromptVisible] = useState(false);

  // Typewriter effect sequence
  useEffect(() => {
    if (!visible) {
      setDisplayedTitle('');
      setDisplayedBody('');
      setTitleDone(false);
      setBodyDone(false);
      setAutoPromptVisible(false);
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

  // 5-second graceful timer after writing completes for the button prompt
  useEffect(() => {
    if (!bodyDone) {
      setAutoPromptVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setAutoPromptVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [bodyDone]);

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
        <div
          id="romantic-letter-body"
          onClick={() => {
            if (!bodyDone) {
              setDisplayedTitle(greetingText);
              setDisplayedBody(bodyText);
              setTitleDone(true);
              setBodyDone(true);
            }
          }}
          className="font-poetic text-base sm:text-lg text-stone-700 leading-relaxed min-h-[76px] transition-all px-1 sm:px-3 text-center whitespace-pre-line cursor-pointer select-text"
          title={!bodyDone ? "Toca para mostrar todo el texto de una vez" : undefined}
        >
          {displayedBody}
          {titleDone && !bodyDone && (
            <span className="animate-pulse text-amber-600 font-bold ml-0.5">|</span>
          )}
        </div>

        {/* Closing phrase & Sender */}
        <div
          className={`mt-4 pt-3 border-t border-amber-600/20 flex flex-col items-center justify-center gap-1 transition-opacity duration-1000 ${
            bodyDone ? 'opacity-100' : 'opacity-60'
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
          id="romantic-letter-actions"
          className="mt-4 pt-1 flex flex-col sm:flex-row items-center justify-center gap-2.5 transition-opacity duration-700 opacity-100"
        >
          {/* Main Next Button: "Ver más mensajes" (Section: Unos mensajes para ti) */}
          {onOpenFriendLetters && (
            <button
              id="btn-open-friend-letters"
              type="button"
              onClick={onOpenFriendLetters}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-500 cursor-pointer shadow-md min-h-[44px] ${
                autoPromptVisible
                  ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 scale-105 shadow-[0_4px_15px_rgba(245,158,11,0.4)] animate-pulse'
                  : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 active:scale-95 text-stone-950'
              }`}
              title="Descubrir mensajes adicionales para ti"
            >
              <Heart className="w-4 h-4 fill-stone-950 text-stone-950" />
              <span>Ver más mensajes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {/* Button: Minimize / View Garden */}
          <button
            id="btn-view-garden"
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500/20 hover:bg-amber-500/30 active:scale-95 border border-amber-600/35 text-amber-950 text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-sm min-h-[44px]"
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
