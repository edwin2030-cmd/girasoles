import React from 'react';

interface FallingSunflowerIntroProps {
  progress: number; // 0 to 1 (0 = at top, 1 = landed on ground)
  visible: boolean;
  landingGlow: number; // 0 to 1
}

export const FallingSunflowerIntro: React.FC<FallingSunflowerIntroProps> = ({
  progress,
  visible,
  landingGlow,
}) => {
  if (!visible) return null;

  // Gentle s-curve falling motion and rotation
  const swayX = Math.sin(progress * Math.PI * 4) * 45;
  const rotation = progress * 360 + Math.sin(progress * Math.PI * 3) * 30;
  // Fall from top -12% to soil level ~78%
  const currentYPercent = -10 + progress * 88;
  const scale = 0.75 + Math.sin(progress * Math.PI) * 0.35;

  return (
    <div className="absolute inset-0 pointer-events-none z-25 overflow-hidden">
      {/* Landing impact golden halo */}
      {landingGlow > 0 && (
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{
            top: '78%',
            width: `${140 * landingGlow}px`,
            height: `${45 * landingGlow}px`,
            background: 'radial-gradient(ellipse, rgba(251, 191, 36, 0.8) 0%, rgba(245, 158, 11, 0.4) 45%, rgba(0,0,0,0) 80%)',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(4px)',
            opacity: 1 - landingGlow * 0.3,
          }}
        />
      )}

      {/* The falling sunflower */}
      {progress < 1.05 && (
        <div
          className="absolute left-1/2 pointer-events-none transition-transform"
          style={{
            top: `${currentYPercent}%`,
            transform: `translate(calc(-50% + ${swayX}px), -50%) rotate(${rotation}deg) scale(${scale})`,
            filter: 'drop-shadow(0 0 16px rgba(251, 191, 36, 0.75))',
          }}
        >
          {/* Sunflower SVG */}
          <svg width="100" height="100" viewBox="0 0 100 100" className="overflow-visible">
            <defs>
              <linearGradient id="fallingPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="40%" stopColor="#f59e0b" />
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

            {/* Glowing aura */}
            <circle cx="50" cy="50" r="42" fill="rgba(253, 224, 71, 0.25)" filter="url(#goldGlow)" />

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
                  <line x1="50" y1="48" x2="50" y2="12" stroke="#fef9c3" strokeWidth="0.6" opacity="0.6" />
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
            <circle cx="50" cy="50" r="14" fill="none" stroke="#f59e0b" strokeWidth="1.4" strokeDasharray="2,2" opacity="0.8" />
            <circle cx="50" cy="50" r="9" fill="none" stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="1.5,1.5" opacity="0.9" />
            <circle cx="50" cy="50" r="4" fill="#fef08a" opacity="0.85" />
          </svg>

          {/* Golden fairy dust trailing the falling flower */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-amber-200 animate-ping"
                style={{
                  top: `${(i - 2) * 12}px`,
                  left: `${((i * 7) % 15) - 7}px`,
                  animationDuration: `${0.8 + i * 0.2}s`,
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
