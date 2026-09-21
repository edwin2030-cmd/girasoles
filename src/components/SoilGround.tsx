import React from 'react';
import { APP_CONFIG } from '../config';

interface SoilGroundProps {
  visible: boolean;
  rootLength: number; // 0 to 1 progress of root penetration
}

const SoilGroundComponent: React.FC<SoilGroundProps> = ({ visible, rootLength }) => {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 w-full pointer-events-none transition-opacity duration-1000 z-10 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ height: '24vh', minHeight: '140px', maxHeight: '220px' }}
    >
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 1000 240"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="soilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7a4d31" />
            <stop offset="40%" stopColor={APP_CONFIG.colors.soilColor} />
            <stop offset="100%" stopColor="#452714" />
          </linearGradient>

          <radialGradient id="soilGlow" cx="50%" cy="20%" r="60%">
            <stop offset="0%" stopColor="rgba(245, 158, 11, 0.22)" />
            <stop offset="60%" stopColor="rgba(217, 119, 6, 0.08)" />
            <stop offset="100%" stopColor="rgba(245, 238, 228, 0)" />
          </radialGradient>

          <filter id="soilBlur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Ambient warm golden glow behind soil mound */}
        <ellipse
          cx="500"
          cy="90"
          rx="340"
          ry="75"
          fill="url(#soilGlow)"
        />

        {/* Layer 1: Background soil contour */}
        <path
          d="M 0,160 Q 250,90 500,85 T 1000,160 L 1000,240 L 0,240 Z"
          fill="#53331e"
          opacity="0.9"
        />

        {/* Layer 2: Main center fertile mound where the flower lands and the tree sprouts */}
        <path
          d="M 120,200 C 320,115 420,70 500,70 C 580,70 680,115 880,200 L 1000,240 L 0,240 Z"
          fill="url(#soilGradient)"
        />

        {/* Subtle luminous crest highlight */}
        <path
          d="M 380,84 C 440,71 470,70 500,70 C 530,70 560,71 620,84"
          stroke="#f59e0b"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.5"
          filter="url(#soilBlur)"
        />

        {/* Little fertile pebbles and golden sparkles around tree base */}
        <circle cx="478" cy="82" r="2.5" fill="#f59e0b" opacity="0.5" />
        <circle cx="518" cy="80" r="3" fill="#fbbf24" opacity="0.55" />
        <circle cx="494" cy="86" r="2" fill="#fef08a" opacity="0.65" />
        <circle cx="455" cy="88" r="2" fill="#d97706" opacity="0.45" />
        <circle cx="540" cy="85" r="2.2" fill="#b45309" opacity="0.4" />

        {/* Golden Roots growing progressively into the fertile soil */}
        {rootLength > 0 && (
          <g className="transition-all duration-300">
            {/* Main taproot */}
            <path
              d="M 500,78 Q 498,95 501,118 T 499,150"
              stroke="#fbbf24"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="75"
              strokeDashoffset={Math.max(0, 75 * (1 - rootLength))}
              opacity="0.95"
            />
            {/* Left lateral root */}
            <path
              d="M 500,90 Q 485,102 470,120 T 455,135"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="55"
              strokeDashoffset={Math.max(0, 55 * (1 - Math.max(0, rootLength - 0.2) / 0.8))}
              opacity="0.85"
            />
            {/* Right lateral root */}
            <path
              d="M 500,92 Q 515,105 530,124 T 545,140"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="55"
              strokeDashoffset={Math.max(0, 55 * (1 - Math.max(0, rootLength - 0.3) / 0.7))}
              opacity="0.85"
            />
            {/* Fine secondary root hairs */}
            <path
              d="M 478,110 Q 468,115 458,124"
              stroke="#d97706"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="25"
              strokeDashoffset={Math.max(0, 25 * (1 - Math.max(0, rootLength - 0.4) / 0.6))}
              opacity="0.75"
            />
            <path
              d="M 522,112 Q 534,118 544,128"
              stroke="#d97706"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="25"
              strokeDashoffset={Math.max(0, 25 * (1 - Math.max(0, rootLength - 0.5) / 0.5))}
              opacity="0.75"
            />
          </g>
        )}
      </svg>
    </div>
  );
};

export const SoilGround = React.memo(SoilGroundComponent);
