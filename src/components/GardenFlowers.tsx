import React, { useMemo } from 'react';
import { FlowerConfig } from '../types';

interface GardenFlowersProps {
  gardenStarted: boolean;
  gardenProgress: number; // 0 to 1 overall garden emergence
  currentTime: number; // for smooth wind swaying
}

export const GardenFlowers: React.FC<GardenFlowersProps> = ({
  gardenStarted,
  gardenProgress,
  currentTime,
}) => {
  // All flowers are vibrant yellow sunflowers and golden blossoms
  const sunflowerGarden: FlowerConfig[] = useMemo(() => {
    return [
      // 1. Tall Golden Sunflower (Left-mid)
      {
        id: 'sunflower-1',
        type: 'sunflower',
        colorPalette: {
          petalPrimary: '#fbbf24',
          petalSecondary: '#f59e0b',
          petalHighlight: '#fef08a',
          petalShadow: '#d97706',
          center: '#451a03',
          centerPollen: '#f59e0b',
          stem: '#2d4a1d',
          stemHighlight: '#4d7c0f',
          leaf: '#3f6212',
          glow: 'rgba(251,191,36,0.4)',
        },
        x: 22,
        groundY: 90,
        height: 280,
        curvature: -0.35,
        size: 0.9,
        layer: 'mid',
        delay: 0.05,
        growthSpeed: 1.1,
        swaySpeed: 1.3,
        swayAmount: 3.0,
        swayPhase: 0.8,
      },

      // 2. Radiant Sunflower (Right-mid)
      {
        id: 'sunflower-2',
        type: 'sunflower',
        colorPalette: {
          petalPrimary: '#facc15',
          petalSecondary: '#eab308',
          petalHighlight: '#fef9c3',
          petalShadow: '#ca8a04',
          center: '#3d1806',
          centerPollen: '#fbbf24',
          stem: '#28461f',
          stemHighlight: '#4d7c0f',
          leaf: '#365314',
          glow: 'rgba(250,204,21,0.45)',
        },
        x: 78,
        groundY: 91,
        height: 310,
        curvature: 0.3,
        size: 0.95,
        layer: 'front',
        delay: 0.1,
        growthSpeed: 1.0,
        swaySpeed: 1.2,
        swayAmount: 2.7,
        swayPhase: 2.1,
      },

      // 3. Petite Sunflower (Left-far)
      {
        id: 'sunflower-3',
        type: 'small_sunflower',
        colorPalette: {
          petalPrimary: '#fde047',
          petalSecondary: '#f59e0b',
          petalHighlight: '#ffffff',
          petalShadow: '#d97706',
          center: '#451a03',
          centerPollen: '#fef08a',
          stem: '#28461f',
          stemHighlight: '#4d7c0f',
          leaf: '#365314',
          glow: 'rgba(253,224,71,0.4)',
        },
        x: 12,
        groundY: 92,
        height: 230,
        curvature: -0.25,
        size: 0.75,
        layer: 'back',
        delay: 0.18,
        growthSpeed: 1.2,
        swaySpeed: 1.6,
        swayAmount: 3.4,
        swayPhase: 1.2,
      },

      // 4. Wild Golden Sunflower (Right-far)
      {
        id: 'sunflower-4',
        type: 'wild_sunflower',
        colorPalette: {
          petalPrimary: '#fbbf24',
          petalSecondary: '#f59e0b',
          petalHighlight: '#fef08a',
          petalShadow: '#b45309',
          center: '#2e1003',
          centerPollen: '#fde047',
          stem: '#2d4a1d',
          stemHighlight: '#4d7c0f',
          leaf: '#365314',
          glow: 'rgba(251,191,36,0.4)',
        },
        x: 88,
        groundY: 92,
        height: 250,
        curvature: 0.4,
        size: 0.8,
        layer: 'back',
        delay: 0.22,
        growthSpeed: 1.05,
        swaySpeed: 1.4,
        swayAmount: 3.1,
        swayPhase: 3.5,
      },

      // 5. Grand Sunflower (Center-left)
      {
        id: 'sunflower-5',
        type: 'sunflower',
        colorPalette: {
          petalPrimary: '#f59e0b',
          petalSecondary: '#d97706',
          petalHighlight: '#fef08a',
          petalShadow: '#b45309',
          center: '#361404',
          centerPollen: '#fbbf24',
          stem: '#233d1b',
          stemHighlight: '#3f6212',
          leaf: '#2d4a1d',
          glow: 'rgba(245,158,11,0.45)',
        },
        x: 32,
        groundY: 93,
        height: 340,
        curvature: -0.18,
        size: 1.0,
        layer: 'mid',
        delay: 0.3,
        growthSpeed: 0.95,
        swaySpeed: 1.1,
        swayAmount: 2.5,
        swayPhase: 4.2,
      },

      // 6. Amber Sunflower (Center-right)
      {
        id: 'sunflower-6',
        type: 'sunflower',
        colorPalette: {
          petalPrimary: '#fbbf24',
          petalSecondary: '#f59e0b',
          petalHighlight: '#fffbeb',
          petalShadow: '#d97706',
          center: '#2a0e02',
          centerPollen: '#fef08a',
          stem: '#28461f',
          stemHighlight: '#4d7c0f',
          leaf: '#365314',
          glow: 'rgba(251,191,36,0.5)',
        },
        x: 68,
        groundY: 93,
        height: 330,
        curvature: 0.2,
        size: 0.98,
        layer: 'mid',
        delay: 0.36,
        growthSpeed: 0.95,
        swaySpeed: 1.2,
        swayAmount: 2.6,
        swayPhase: 5.0,
      },

      // 7. Small Golden Sprout (Left-near)
      {
        id: 'sunflower-7',
        type: 'small_sunflower',
        colorPalette: {
          petalPrimary: '#fde047',
          petalSecondary: '#eab308',
          petalHighlight: '#ffffff',
          petalShadow: '#ca8a04',
          center: '#451a03',
          centerPollen: '#fef08a',
          stem: '#365314',
          stemHighlight: '#65a30d',
          leaf: '#3f6212',
          glow: 'rgba(253,224,71,0.4)',
        },
        x: 42,
        groundY: 94,
        height: 200,
        curvature: -0.15,
        size: 0.68,
        layer: 'front',
        delay: 0.45,
        growthSpeed: 1.25,
        swaySpeed: 1.8,
        swayAmount: 3.5,
        swayPhase: 2.0,
      },

      // 8. Baby Sunflower (Right-near)
      {
        id: 'sunflower-8',
        type: 'small_sunflower',
        colorPalette: {
          petalPrimary: '#facc15',
          petalSecondary: '#f59e0b',
          petalHighlight: '#fef9c3',
          petalShadow: '#d97706',
          center: '#3d1806',
          centerPollen: '#fef08a',
          stem: '#2d4a1d',
          stemHighlight: '#4d7c0f',
          leaf: '#365314',
          glow: 'rgba(250,204,21,0.4)',
        },
        x: 58,
        groundY: 94,
        height: 210,
        curvature: 0.15,
        size: 0.7,
        layer: 'front',
        delay: 0.5,
        growthSpeed: 1.2,
        swaySpeed: 1.7,
        swayAmount: 3.3,
        swayPhase: 0.4,
      },

      // 9. Far-Left Golden Blossom
      {
        id: 'sunflower-9',
        type: 'golden_blossom',
        colorPalette: {
          petalPrimary: '#fef08a',
          petalSecondary: '#fbbf24',
          petalHighlight: '#ffffff',
          petalShadow: '#f59e0b',
          center: '#5c2207',
          centerPollen: '#fef08a',
          stem: '#223d18',
          stemHighlight: '#365314',
          leaf: '#28461f',
          glow: 'rgba(254,240,138,0.4)',
        },
        x: 5,
        groundY: 95,
        height: 180,
        curvature: -0.28,
        size: 0.62,
        layer: 'back',
        delay: 0.58,
        growthSpeed: 1.3,
        swaySpeed: 2.0,
        swayAmount: 3.8,
        swayPhase: 1.6,
      },

      // 10. Far-Right Golden Blossom
      {
        id: 'sunflower-10',
        type: 'golden_blossom',
        colorPalette: {
          petalPrimary: '#fef08a',
          petalSecondary: '#fbbf24',
          petalHighlight: '#ffffff',
          petalShadow: '#f59e0b',
          center: '#5c2207',
          centerPollen: '#fef08a',
          stem: '#223d18',
          stemHighlight: '#365314',
          leaf: '#28461f',
          glow: 'rgba(254,240,138,0.4)',
        },
        x: 95,
        groundY: 95,
        height: 185,
        curvature: 0.28,
        size: 0.64,
        layer: 'back',
        delay: 0.62,
        growthSpeed: 1.3,
        swaySpeed: 1.9,
        swayAmount: 3.7,
        swayPhase: 4.0,
      },
    ];
  }, []);

  if (!gardenStarted) return null;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-15">
      {sunflowerGarden.map((flower) => {
        if (gardenProgress < flower.delay) return null;

        const localProgress = Math.min(
          1,
          ((gardenProgress - flower.delay) / (1 - flower.delay)) * flower.growthSpeed
        );

        const stemGrowth = Math.min(1, localProgress * 1.6);
        const bloomProgress = Math.max(0, (localProgress - 0.35) / 0.65);

        const sway =
          Math.sin(currentTime * flower.swaySpeed + flower.swayPhase) * flower.swayAmount;

        const widthPx = 150 * flower.size;
        const heightPx = (flower.height + 70) * flower.size;

        return (
          <div
            key={flower.id}
            className="absolute pointer-events-none"
            style={{
              left: `${flower.x}%`,
              bottom: `${100 - flower.groundY}%`,
              width: `${widthPx}px`,
              height: `${heightPx}px`,
              transform: 'translateX(-50%)',
              transformOrigin: '50% 100%',
              zIndex: flower.layer === 'back' ? 12 : flower.layer === 'mid' ? 14 : 16,
              opacity: flower.layer === 'back' ? 0.85 : 1,
            }}
          >
            <svg
              viewBox="0 0 150 340"
              className="w-full h-full overflow-visible"
              style={{
                transform: `rotate(${sway}deg)`,
                transformOrigin: '75px 335px',
                transition: 'transform 0.05s linear',
              }}
            >
              <defs>
                <linearGradient id={`stem-${flower.id}`} x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor={flower.colorPalette.stem} />
                  <stop offset="100%" stopColor={flower.colorPalette.stemHighlight} />
                </linearGradient>

                <linearGradient id={`petal-${flower.id}`} x1="50%" y1="100%" x2="50%" y2="0%">
                  <stop offset="0%" stopColor={flower.colorPalette.petalShadow} />
                  <stop offset="30%" stopColor={flower.colorPalette.petalSecondary} />
                  <stop offset="85%" stopColor={flower.colorPalette.petalPrimary} />
                  <stop offset="100%" stopColor={flower.colorPalette.petalHighlight} />
                </linearGradient>
              </defs>

              {/* STEM */}
              {stemGrowth > 0 && (
                <path
                  d={`M 75,335 Q ${75 + flower.curvature * 55},190 75,65`}
                  fill="none"
                  stroke={`url(#stem-${flower.id})`}
                  strokeWidth={4.2 * flower.size}
                  strokeLinecap="round"
                  strokeDasharray="290"
                  strokeDashoffset={290 * (1 - stemGrowth)}
                />
              )}

              {/* LEAF 1 (Left) */}
              {stemGrowth > 0.38 && (
                <g
                  transform={`translate(${75 + flower.curvature * 18}, 225) scale(${Math.min(
                    1,
                    (stemGrowth - 0.38) * 2.2
                  )})`}
                  style={{ transformOrigin: '0px 0px' }}
                >
                  <path
                    d="M 0,0 C -18,-8 -32,-6 -44,6 C -32,18 -14,14 0,0 Z"
                    fill={flower.colorPalette.leaf}
                    opacity="0.95"
                  />
                  <line x1="0" y1="0" x2="-40" y2="5" stroke="#84cc16" strokeWidth="0.8" opacity="0.6" />
                </g>
              )}

              {/* LEAF 2 (Right) */}
              {stemGrowth > 0.62 && (
                <g
                  transform={`translate(${75 + flower.curvature * 32}, 155) scale(${Math.min(
                    1,
                    (stemGrowth - 0.62) * 2.4
                  )})`}
                  style={{ transformOrigin: '0px 0px' }}
                >
                  <path
                    d="M 0,0 C 18,-8 32,-6 44,6 C 32,18 14,14 0,0 Z"
                    fill={flower.colorPalette.leaf}
                    opacity="0.95"
                  />
                  <line x1="0" y1="0" x2="40" y2="5" stroke="#84cc16" strokeWidth="0.8" opacity="0.6" />
                </g>
              )}

              {/* SUNFLOWER HEAD BLOOM */}
              {bloomProgress > 0 && (
                <g
                  transform={`translate(75, 65) scale(${bloomProgress})`}
                  style={{
                    transformOrigin: '0px 0px',
                    filter: `drop-shadow(0 2px 8px ${flower.colorPalette.glow})`,
                  }}
                >
                  {/* Outer 14 Ray Petals */}
                  {[0, 25.7, 51.4, 77.1, 102.8, 128.5, 154.2, 180, 205.7, 231.4, 257.1, 282.8, 308.5, 334.2].map(
                    (angle, idx) => (
                      <g key={idx} transform={`rotate(${angle})`}>
                        <path
                          d="M 0,0 C -7,-12 -9,-30 0,-38 C 9,-30 7,-12 0,0 Z"
                          fill={`url(#petal-${flower.id})`}
                          stroke={flower.colorPalette.petalShadow}
                          strokeWidth="0.3"
                          opacity="0.96"
                        />
                      </g>
                    )
                  )}

                  {/* Inner 14 Offset Ray Petals */}
                  {[12.8, 38.5, 64.2, 89.9, 115.6, 141.3, 167, 192.8, 218.5, 244.2, 269.9, 295.6, 321.3, 347].map(
                    (angle, idx) => (
                      <g key={`in-${idx}`} transform={`rotate(${angle}) scale(0.86)`}>
                        <path
                          d="M 0,0 C -6,-10 -8,-28 0,-36 C 8,-28 6,-10 0,0 Z"
                          fill={flower.colorPalette.petalSecondary}
                          opacity="0.95"
                        />
                      </g>
                    )
                  )}

                  {/* Center Disc Florets (Dark Seed Heart) */}
                  <circle cx="0" cy="0" r="14" fill={flower.colorPalette.center} stroke="#78350f" strokeWidth="0.8" />
                  <circle cx="0" cy="0" r="10" fill="none" stroke={flower.colorPalette.centerPollen} strokeWidth="1.2" strokeDasharray="2,2" opacity="0.85" />
                  <circle cx="0" cy="0" r="6" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="1.5,1.5" opacity="0.9" />
                  <circle cx="0" cy="0" r="3" fill="#fef08a" />
                </g>
              )}
            </svg>
          </div>
        );
      })}
    </div>
  );
};
