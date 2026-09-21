import React, { useState, useEffect } from 'react';
import { RotateCcw, Sparkles, Gift, Heart } from 'lucide-react';
import { APP_CONFIG } from '../config';

interface BirthdayLetterProps {
  visible: boolean;
  badgeText: string;
  greetingText: string;
  bodyText: string;
  closingText: string;
  senderText: string;
  onRestart: () => void;
  onOpenWishes: () => void;
  onOpenCustomize: () => void;
}

export const RomanticLetter: React.FC<BirthdayLetterProps> = ({
  visible,
  badgeText,
  greetingText,
  bodyText,
  closingText,
  senderText,
  onRestart,
  onOpenWishes,
  onOpenCustomize,
}) => {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedBody, setDisplayedBody] = useState('');
  const [titleDone, setTitleDone] = useState(false);
  const [bodyDone, setBodyDone] = useState(false);

  // Typewriter effect execution
  useEffect(() => {
    if (!visible) {
      setDisplayedTitle('');
      setDisplayedBody('');
      setTitleDone(false);
      setBodyDone(false);
      return;
    }

    let titleIndex = 0;
    let bodyIndex = 0;
    let titleTimer: number | null = null;
    let bodyTimer: number | null = null;

    // Type Title first
    titleTimer = window.setInterval(() => {
      if (titleIndex < greetingText.length) {
        setDisplayedTitle(greetingText.slice(0, titleIndex + 1));
        titleIndex++;
      } else {
        if (titleTimer) clearInterval(titleTimer);
        setTitleDone(true);

        // Pause, then type body
        setTimeout(() => {
          bodyTimer = window.setInterval(() => {
            if (bodyIndex < bodyText.length) {
              setDisplayedBody(bodyText.slice(0, bodyIndex + 1));
              bodyIndex++;
            } else {
              if (bodyTimer) clearInterval(bodyTimer);
              setBodyDone(true);
            }
          }, APP_CONFIG.durations.typewriterSpeed);
        }, 350);
      }
    }, 55);

    return () => {
      if (titleTimer) clearInterval(titleTimer);
      if (bodyTimer) clearInterval(bodyTimer);
    };
  }, [visible, greetingText, bodyText]);

  if (!visible) return null;

  return (
    <div
      className="w-full max-w-xl mx-auto z-30 transition-all duration-1000 ease-out select-text"
      style={{ animation: 'floatGentle 6s ease-in-out infinite' }}
    >
      <div className="relative backdrop-blur-xl bg-gradient-to-b from-stone-950/90 via-amber-950/40 to-stone-950/90 border border-amber-400/35 rounded-3xl p-6 sm:p-7 shadow-[0_12px_45px_rgba(0,0,0,0.65),0_0_35px_rgba(251,191,36,0.22)] text-center">
        {/* Subtle decorative corners */}
        <div className="absolute top-3 left-3 text-amber-400/40">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="absolute top-3 right-3 text-amber-400/40">
          <Sparkles className="w-4 h-4" />
        </div>

        {/* Badge / Subtitle */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-[11px] font-mono uppercase tracking-widest mb-2.5">
          <span>{badgeText || '🌻 DULCES 16 • GÉNESIS ✨'}</span>
        </div>

        {/* Title / Greeting */}
        <h1 className="font-serif-title text-2xl sm:text-3xl text-amber-200 tracking-wide mb-3 filter drop-shadow-[0_2px_10px_rgba(251,191,36,0.4)]">
          {displayedTitle}
          {!titleDone && <span className="animate-pulse text-amber-400 font-bold ml-1">|</span>}
        </h1>

        {/* Body Text with Typewriter */}
        <p className="font-poetic text-base sm:text-lg text-amber-100/90 leading-relaxed min-h-[76px] transition-all px-1">
          {displayedBody}
          {titleDone && !bodyDone && (
            <span className="animate-pulse text-amber-400 font-bold ml-0.5">|</span>
          )}
        </p>

        {/* Closing phrase & Sender */}
        <div
          className={`mt-4 pt-3 border-t border-amber-500/20 flex flex-col items-center justify-center gap-1 transition-opacity duration-1000 ${
            bodyDone ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="font-poetic text-xs sm:text-sm tracking-wider uppercase text-amber-300/80">
              {closingText}
            </span>
            <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
          </div>
          {senderText && (
            <span className="text-xs text-amber-400/90 font-medium italic mt-0.5">
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
          {/* Button: Open 16 Wishes */}
          <button
            onClick={onOpenWishes}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 text-xs font-bold tracking-wide transition-all shadow-[0_0_15px_rgba(251,191,36,0.4)] active:scale-95 cursor-pointer"
          >
            <Gift className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Ver 16 Deseos para Génesis</span>
          </button>

          {/* Button: Replay */}
          <button
            onClick={onRestart}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-stone-900/60 hover:bg-amber-500/15 active:scale-95 border border-amber-400/30 text-amber-200 text-xs font-body tracking-wide transition-all cursor-pointer"
            title="Volver a ver la flor y el árbol florecer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
            <span>{APP_CONFIG.buttons.restartText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
