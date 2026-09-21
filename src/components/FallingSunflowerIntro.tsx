import React from 'react';

interface FallingSunflowerIntroProps {
  progress: number; // 0 to 1 (0 = at top/hover, 1 = landed on ground)
  visible: boolean;
  landingGlow: number; // 0 to 1
  fadeOpacity?: number; // 1 down to 0 (smooth dissipation into soil)
  isWaitingForClick?: boolean;
  onClickFlower?: () => void;
}

const FallingSunflowerIntroComponent: React.FC<FallingSunflowerIntroProps> = ({
  progress,
  visible,
  landingGlow,
  fadeOpacity = 1,
  isWaitingForClick = false,
  onClickFlower,
}) => {
  if (!visible || fadeOpacity <= 0.01) return null;

  // Gentle s-curve falling motion and rotation
  const swayX = isWaitingForClick ? 0 : Math.sin(progress * Math.PI * 4) * 45;
  const rotation = isWaitingForClick ? 0 : progress * 360 + Math.sin(progress * Math.PI * 3) * 30;
  // Hover at 28% when waiting, then fall to soil level ~78%. During fade, settle gently 2% deeper into earth
  const currentYPercent = isWaitingForClick
    ? 28
    : 28 + progress * 50 + (1 - fadeOpacity) * 2;
  const scale = isWaitingForClick
    ? 1.05
    : (0.95 + Math.sin(progress * Math.PI) * 0.2) * (0.75 + 0.25 * fadeOpacity);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${isWaitingForClick ? 'z-40' : 'z-20'}`}>
      {/* Landing impact golden halo on soil */}
      {landingGlow > 0 && (
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none transition-opacity"
          style={{
            top: '78%',
            width: `${170 * landingGlow}px`,
            height: `${50 * landingGlow}px`,
            background:
              'radial-gradient(ellipse, rgba(245, 158, 11, 0.75) 0%, rgba(251, 191, 36, 0.45) 45%, rgba(245, 238, 228, 0) 80%)',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(5px)',
            opacity: Math.min(1, landingGlow * 1.2),
          }}
        />
      )}

      {/* Floating golden motes radiating from ground as the flower dissolves into fertile soil */}
      {fadeOpacity < 0.95 && (
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ top: '77%' }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const angle = (i * Math.PI) / 4;
            const dist = 28 * (1 - fadeOpacity);
            return (
              <span
                key={`dissolve-${i}`}
                className="absolute w-2 h-2 rounded-full bg-amber-400"
                style={{
                  transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist - (1 - fadeOpacity) * 35}px)`,
                  opacity: fadeOpacity * 0.85,
                  filter: 'blur(0.5px)',
                  transition: 'transform 0.1s ease-out',
                }}
              />
            );
          })}
        </div>
      )}

      {/* The sunflower */}
      {(isWaitingForClick || progress < 1.05) && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (isWaitingForClick && onClickFlower) {
              onClickFlower();
            }
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            if (isWaitingForClick && onClickFlower) {
              onClickFlower();
            }
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            if (isWaitingForClick && onClickFlower) {
              onClickFlower();
            }
          }}
          aria-label={isWaitingForClick ? 'Toca la flor amarilla para comenzar' : undefined}
          disabled={!isWaitingForClick}
          className={`absolute left-1/2 flex flex-col items-center justify-center p-4 bg-transparent border-0 outline-none ${
            isWaitingForClick
              ? 'pointer-events-auto cursor-pointer select-none group z-50 active:scale-95'
              : 'pointer-events-none'
          }`}
          style={{
            top: `${currentYPercent}%`,
            transform: `translate(calc(-50% + ${swayX}px), -50%) rotate(${rotation}deg) scale(${scale})`,
            opacity: fadeOpacity,
            transition: isWaitingForClick ? 'transform 0.3s ease' : 'none',
            willChange: 'transform, top, opacity',
          }}
        >
          {/* Gentle float animation when hovering waiting for click */}
          <div
            className={isWaitingForClick ? 'animate-bounce' : ''}
            style={isWaitingForClick ? { animationDuration: '2.5s' } : undefined}
          >
            {/* Sunflower SVG */}
            <svg
              width="105"
              height="105"
              viewBox="0 0 100 100"
              className={`overflow-visible drop-shadow-[0_8px_20px_rgba(217,119,6,0.35)] transition-transform duration-300 ${
                isWaitingForClick ? 'group-hover:scale-110 group-active:scale-95' : ''
              }`}
            >
              <defs>
                <linearGradient id="fallingPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="35%" stopColor="#f59e0b" />
                  <stop offset="85%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#fef08a" />
                </linearGradient>

                <radialGradient id="fallingCenterGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#271003" />
                  <stop offset="65%" stopColor="#451a03" />
                  <stop offset="90%" stopColor="#78350f" />
                  <stop offset="100%" stopColor="#92400e" />
                </radialGradient>

                <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Glowing golden halo */}
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="rgba(251, 191, 36, 0.28)"
                filter="url(#goldGlow)"
                className={isWaitingForClick ? 'animate-pulse' : ''}
              />

              {/* Sunflower Ray Petals (Outer Layer - 16 petals) */}
              {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map(
                (angle, idx) => (
                  <g key={`out-${idx}`} transform={`rotate(${angle} 50 50)`}>
                    <path
                      d="M 50,50 C 44,32 42,16 50,4 C 58,16 56,32 50,50 Z"
                      fill="url(#fallingPetalGrad)"
                      stroke="#d97706"
                      strokeWidth="0.4"
                    />
                    <line x1="50" y1="48" x2="50" y2="12" stroke="#fef9c3" strokeWidth="0.6" opacity="0.65" />
                  </g>
                )
              )}

              {/* Sunflower Ray Petals (Inner Layer - offset by 11.25 deg) */}
              {[11.25, 33.75, 56.25, 78.75, 101.25, 123.75, 146.25, 168.75, 191.25, 213.75, 236.25, 258.75, 281.25, 303.75, 326.25, 348.75].map(
                (angle, idx) => (
                  <g key={`in-${idx}`} transform={`rotate(${angle} 50 50)`}>
                    <path
                      d="M 50,50 C 45,35 44,22 50,10 C 56,22 55,35 50,50 Z"
                      fill="url(#fallingPetalGrad)"
                      opacity="0.95"
                    />
                  </g>
                )
              )}

              {/* Sunflower Center Disc Florets (Dark textured heart) */}
              <circle cx="50" cy="50" r="19" fill="url(#fallingCenterGrad)" stroke="#b45309" strokeWidth="1.2" />

              {/* Concentric pollen rings in center */}
              <circle
                cx="50"
                cy="50"
                r="14"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.4"
                strokeDasharray="2,2"
                opacity="0.85"
              />
              <circle
                cx="50"
                cy="50"
                r="9"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="1.2"
                strokeDasharray="1.5,1.5"
                opacity="0.9"
              />
              <circle cx="50" cy="50" r="4" fill="#fef08a" opacity="0.85" />
            </svg>
          </div>

          {/* Invitation text when waiting for the user's initial click */}
          {isWaitingForClick && (
            <div className="mt-5 flex flex-col items-center gap-1 animate-fade-in pointer-events-none">
              <span className="px-4 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-600/35 text-stone-800 text-xs font-semibold tracking-wider shadow-sm transition-transform group-hover:scale-105">
                Toca la flor
              </span>
            </div>
          )}

          {/* Golden fairy dust trailing when falling */}
          {!isWaitingForClick && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping"
                  style={{
                    top: `${(i - 2) * 12}px`,
                    left: `${((i * 7) % 15) - 7}px`,
                    animationDuration: `${0.8 + i * 0.2}s`,
                    opacity: 0.8,
                  }}
                />
              ))}
            </div>
          )}
        </button>
      )}
    </div>
  );
};

export const FallingSunflowerIntro = React.memo(FallingSunflowerIntroComponent);
