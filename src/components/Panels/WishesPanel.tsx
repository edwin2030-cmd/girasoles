import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Gift } from 'lucide-react';
import { APP_CONFIG } from '../../config';

interface WishesPanelProps {
  onWishDiscovered?: (count: number) => void;
}

export const WishesPanel: React.FC<WishesPanelProps> = ({ onWishDiscovered }) => {
  const [openedWishIds, setOpenedWishIds] = useState<number[]>([1]); // First one open by default
  const [activeWishId, setActiveWishId] = useState<number>(1);

  const wishes = APP_CONFIG.wishes16;

  const handleOpenWish = (id: number) => {
    setActiveWishId(id);
    if (!openedWishIds.includes(id)) {
      const updated = [...openedWishIds, id];
      setOpenedWishIds(updated);
      if (onWishDiscovered) {
        onWishDiscovered(updated.length);
      }
    }
  };

  const activeWish = wishes.find((w) => w.id === activeWishId) || wishes[0];
  const allOpened = openedWishIds.length === 16;

  return (
    <div className="w-full max-w-xl mx-auto backdrop-blur-xl bg-stone-950/85 border border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-[0_12px_45px_rgba(0,0,0,0.6),0_0_30px_rgba(251,191,36,0.18)] text-amber-100 animate-fade-in select-text">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-amber-500/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300 border border-amber-400/40 shadow-[0_0_10px_rgba(251,191,36,0.3)]">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-serif-title text-base sm:text-lg text-amber-200 tracking-wide">
              16 Deseos para tus 16 Años
            </h2>
            <p className="text-[11px] sm:text-xs text-amber-300/70">
              Toca cada girasol para descubrir un deseo especial de amistad para Génesis
            </p>
          </div>
        </div>

        {/* Progress badge */}
        <div className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-mono font-semibold flex items-center gap-1.5 whitespace-nowrap">
          <span>{openedWishIds.length}/16</span>
          <span>🌻</span>
        </div>
      </div>

      {/* Grid of 16 Interactive Sunflowers */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 py-4">
        {wishes.map((w) => {
          const isOpened = openedWishIds.includes(w.id);
          const isSelected = activeWishId === w.id;

          return (
            <button
              key={w.id}
              onClick={() => handleOpenWish(w.id)}
              className={`relative flex flex-col items-center justify-center p-2 rounded-2xl border transition-all duration-300 cursor-pointer active:scale-95 ${
                isSelected
                  ? 'bg-amber-500/30 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)] scale-105'
                  : isOpened
                  ? 'bg-stone-900/80 border-amber-500/30 hover:border-amber-400/60 hover:bg-amber-500/10'
                  : 'bg-stone-950/70 border-amber-900/40 hover:border-amber-500/40 opacity-75'
              }`}
              title={`Deseo #${w.id}: ${w.title}`}
            >
              {/* Mini sunflower graphic */}
              <div className="relative w-7 h-7 flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => (
                    <ellipse
                      key={i}
                      cx="20"
                      cy="8"
                      rx="3.5"
                      ry="7"
                      fill={isOpened ? '#f59e0b' : '#78350f'}
                      transform={`rotate(${ang} 20 20)`}
                    />
                  ))}
                  <circle
                    cx="20"
                    cy="20"
                    r="6.5"
                    fill={isOpened ? '#451a03' : '#1f0c03'}
                    stroke={isOpened ? '#fbbf24' : '#78350f'}
                    strokeWidth="1"
                  />
                  <circle cx="20" cy="20" r="2.5" fill={isOpened ? '#fef08a' : '#92400e'} />
                </svg>
                {isOpened && (
                  <span className="absolute -top-1 -right-1 text-[10px]">
                    <CheckCircle2 className="w-3 h-3 text-amber-400 fill-amber-950" />
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold font-mono mt-1 text-amber-200">
                #{w.id}
              </span>
            </button>
          );
        })}
      </div>

      {/* Featured Wish Card */}
      <div className="relative mt-2 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-stone-900/60 to-amber-900/30 border border-amber-400/35 shadow-inner">
        <div className="flex items-center gap-2.5 mb-2">
          <span className="text-2xl">{activeWish.emoji}</span>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-amber-400/80">
              Deseo #{activeWish.id} de 16
            </div>
            <h3 className="font-serif-title text-base sm:text-lg text-amber-200">
              {activeWish.title}
            </h3>
          </div>
        </div>

        <p className="font-poetic italic text-sm sm:text-base text-amber-100/90 leading-relaxed pl-1">
          "{activeWish.message}"
        </p>

        {/* Celebratory badge if all opened */}
        {allOpened && (
          <div className="mt-3 pt-2.5 border-t border-amber-500/20 flex items-center justify-center gap-2 text-xs text-amber-300 font-semibold animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>¡Has desbloqueado los 16 deseos de amistad para Génesis! 🌻🎉</span>
          </div>
        )}
      </div>
    </div>
  );
};
