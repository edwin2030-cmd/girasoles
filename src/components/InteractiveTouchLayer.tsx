import React, { useState } from 'react';
import { Sparkles, Sun } from 'lucide-react';

interface ClickBloom {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  type: 'sunflower' | 'star';
}

interface TouchRipple {
  id: number;
  x: number;
  y: number;
}

interface InteractiveTouchLayerProps {
  onTap?: (x: number, y: number) => void;
}

export const InteractiveTouchLayer: React.FC<InteractiveTouchLayerProps> = ({ onTap }) => {
  const [blooms, setBlooms] = useState<ClickBloom[]>([]);
  const [ripples, setRipples] = useState<TouchRipple[]>([]);

  const sunflowerColors = [
    { primary: '#fbbf24', secondary: '#f59e0b', center: '#451a03' },
    { primary: '#facc15', secondary: '#eab308', center: '#3d1806' },
    { primary: '#fde047', secondary: '#f59e0b', center: '#271003' },
    { primary: '#fef08a', secondary: '#fbbf24', center: '#78350f' },
  ];

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('textarea') || target.closest('nav')) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();

    if (onTap) {
      onTap(x, y);
    }

    // Spawn golden solar ripple
    setRipples((prev) => [...prev.slice(-6), { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 900);

    // Spawn mini sunflower and floating golden stars
    const colorObj = sunflowerColors[Math.floor(Math.random() * sunflowerColors.length)];
    const isStarSpecial = Math.random() < 0.3;

    const newBloom: ClickBloom = {
      id,
      x,
      y,
      color: colorObj.primary,
      size: Math.random() * 14 + 32,
      rotation: Math.random() * 360,
      type: isStarSpecial ? 'star' : 'sunflower',
    };

    setBlooms((prev) => [...prev.slice(-12), newBloom]);
    setTimeout(() => {
      setBlooms((prev) => prev.filter((b) => b.id !== id));
    }, 1600);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      className="absolute inset-0 w-full h-full cursor-pointer z-25 overflow-hidden"
      style={{ touchAction: 'manipulation' }}
    >
      {/* Expanding ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute rounded-full border border-amber-300/60 pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '20px',
            height: '20px',
            animation: 'goldRippleExpand 0.9s cubic-bezier(0.1, 0.8, 0.3, 1) forwards',
          }}
        />
      ))}

      {/* Floating blooming sunflowers & golden stars */}
      {blooms.map((item) => (
        <div
          key={item.id}
          className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 select-none"
          style={{
            left: item.x,
            top: item.y,
            animation: 'clickBloomAnim 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {item.type === 'sunflower' ? (
            <div className="relative flex items-center justify-center">
              <svg
                width={item.size}
                height={item.size}
                viewBox="0 0 60 60"
                className="overflow-visible"
                style={{ transform: `rotate(${item.rotation}deg)` }}
              >
                {/* 12 Petals */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => (
                  <ellipse
                    key={idx}
                    cx="30"
                    cy="14"
                    rx="6"
                    ry="13"
                    fill={item.color}
                    stroke="#d97706"
                    strokeWidth="0.5"
                    opacity="0.94"
                    transform={`rotate(${angle} 30 30)`}
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
                  />
                ))}
                {/* Center Disc */}
                <circle cx="30" cy="30" r="9" fill="#451a03" stroke="#78350f" strokeWidth="1" />
                <circle cx="30" cy="30" r="5" fill="#f59e0b" opacity="0.85" />
                <circle cx="30" cy="30" r="2" fill="#fef08a" />
              </svg>

              {/* Accompanying miniature floating sun sparkle */}
              <div
                className="absolute text-amber-300"
                style={{ animation: 'sunFloatUp 1.4s ease-out forwards' }}
              >
                <Sun className="w-3.5 h-3.5 fill-amber-300" />
              </div>
            </div>
          ) : (
            <div className="relative flex items-center justify-center">
              <div
                className="text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]"
                style={{ animation: 'starPopAnim 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
              >
                <Sparkles
                  style={{ width: `${item.size}px`, height: `${item.size}px` }}
                  className="fill-amber-400 text-amber-200"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <style>{`
        @keyframes goldRippleExpand {
          0% {
            width: 10px;
            height: 10px;
            opacity: 0.95;
            box-shadow: 0 0 15px rgba(251, 191, 36, 0.8);
          }
          100% {
            width: 140px;
            height: 140px;
            opacity: 0;
            box-shadow: 0 0 35px rgba(251, 191, 36, 0);
          }
        }

        @keyframes clickBloomAnim {
          0% {
            transform: translate(-50%, -50%) scale(0.2) rotate(0deg);
            opacity: 0;
          }
          25% {
            transform: translate(-50%, -50%) scale(1.15) rotate(15deg);
            opacity: 1;
          }
          70% {
            transform: translate(-50%, -65%) scale(1) rotate(25deg);
            opacity: 0.95;
          }
          100% {
            transform: translate(-50%, -90%) scale(0.6) rotate(35deg);
            opacity: 0;
          }
        }

        @keyframes sunFloatUp {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 0;
          }
          30% {
            transform: translateY(-15px) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-45px) scale(0.7);
            opacity: 0;
          }
        }

        @keyframes starPopAnim {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          30% {
            transform: scale(1.2);
            opacity: 1;
          }
          70% {
            transform: translateY(-20px) scale(1);
            opacity: 0.9;
          }
          100% {
            transform: translateY(-50px) scale(0.7);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
