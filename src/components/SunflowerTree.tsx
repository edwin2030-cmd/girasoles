import React, { useMemo } from 'react';

export interface SunflowerTreeState {
  trunkProgress: number; // 0 to 1
  branchProgress: number; // 0 to 1 (expansion phase)
  bloomProgress: number; // 0 to 1 (blooming of sunflowers)
  sparkleBurst: boolean;
  swayAngle: number;
}

interface SunflowerTreeProps {
  state: SunflowerTreeState;
  onFlowerClick?: (x: number, y: number) => void;
}

interface TreeFlowerNode {
  id: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  delay: number;
  branchSide: 'left' | 'right' | 'center' | 'top';
}

export const SunflowerTree: React.FC<SunflowerTreeProps> = ({ state, onFlowerClick }) => {
  const { trunkProgress, branchProgress, bloomProgress, sparkleBurst, swayAngle } = state;

  // Pre-calculated organic sunflower blossom positions distributed across the expanded branches
  const treeFlowers: TreeFlowerNode[] = useMemo(() => {
    return [
      // Top Center Crown Sunflowers (Largest centerpiece)
      { id: 'f-crown-1', x: 360, y: 110, size: 1.25, rotation: 0, delay: 0.05, branchSide: 'top' },
      { id: 'f-crown-2', x: 320, y: 130, size: 0.95, rotation: -20, delay: 0.12, branchSide: 'top' },
      { id: 'f-crown-3', x: 405, y: 125, size: 1.05, rotation: 25, delay: 0.16, branchSide: 'top' },
      { id: 'f-crown-4', x: 360, y: 65, size: 0.88, rotation: 10, delay: 0.22, branchSide: 'top' },

      // Left Expanded Branch Sunflowers (Spread wide to the left)
      { id: 'f-left-tip', x: 130, y: 190, size: 1.15, rotation: -45, delay: 0.18, branchSide: 'left' },
      { id: 'f-left-upper', x: 180, y: 155, size: 0.95, rotation: -30, delay: 0.25, branchSide: 'left' },
      { id: 'f-left-mid', x: 230, y: 200, size: 0.85, rotation: -25, delay: 0.3, branchSide: 'left' },
      { id: 'f-left-lower', x: 155, y: 240, size: 0.9, rotation: -50, delay: 0.38, branchSide: 'left' },
      { id: 'f-left-sub1', x: 210, y: 255, size: 0.78, rotation: -15, delay: 0.42, branchSide: 'left' },
      { id: 'f-left-far', x: 95, y: 220, size: 0.82, rotation: -60, delay: 0.48, branchSide: 'left' },

      // Right Expanded Branch Sunflowers (Spread wide to the right)
      { id: 'f-right-tip', x: 590, y: 180, size: 1.18, rotation: 40, delay: 0.2, branchSide: 'right' },
      { id: 'f-right-upper', x: 540, y: 145, size: 0.95, rotation: 30, delay: 0.28, branchSide: 'right' },
      { id: 'f-right-mid', x: 490, y: 195, size: 0.88, rotation: 22, delay: 0.32, branchSide: 'right' },
      { id: 'f-right-lower', x: 565, y: 235, size: 0.92, rotation: 55, delay: 0.39, branchSide: 'right' },
      { id: 'f-right-sub1', x: 510, y: 250, size: 0.8, rotation: 18, delay: 0.45, branchSide: 'right' },
      { id: 'f-right-far', x: 625, y: 210, size: 0.85, rotation: 65, delay: 0.52, branchSide: 'right' },

      // Middle Canopy & Trunk Nodes
      { id: 'f-mid-1', x: 285, y: 210, size: 0.85, rotation: -12, delay: 0.35, branchSide: 'center' },
      { id: 'f-mid-2', x: 435, y: 205, size: 0.88, rotation: 15, delay: 0.37, branchSide: 'center' },
      { id: 'f-mid-3', x: 360, y: 225, size: 0.92, rotation: 5, delay: 0.4, branchSide: 'center' },
      { id: 'f-mid-4', x: 310, y: 275, size: 0.75, rotation: -20, delay: 0.55, branchSide: 'center' },
      { id: 'f-mid-5', x: 415, y: 270, size: 0.76, rotation: 20, delay: 0.58, branchSide: 'center' },

      // Base / Lower trunk companion sunflowers
      { id: 'f-base-1', x: 280, y: 460, size: 0.7, rotation: -35, delay: 0.62, branchSide: 'center' },
      { id: 'f-base-2', x: 440, y: 455, size: 0.72, rotation: 35, delay: 0.65, branchSide: 'center' },
    ];
  }, []);

  return (
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[360px] sm:w-[580px] md:w-[720px] h-[640px] sm:h-[720px] md:h-[780px] pointer-events-none z-20"
      style={{ transformOrigin: '50% 95%' }}
    >
      <svg
        viewBox="0 0 720 740"
        className="w-full h-full overflow-visible"
        style={{
          transform: `rotate(${swayAngle}deg)`,
          transformOrigin: '360px 690px',
          transition: 'transform 0.08s ease-out',
        }}
      >
        <defs>
          {/* Tree Trunk & Branches Wooden Bark Gradients */}
          <linearGradient id="treeBarkGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#1c0f05" />
            <stop offset="35%" stopColor="#3d2109" />
            <stop offset="70%" stopColor="#5a310e" />
            <stop offset="100%" stopColor="#784212" />
          </linearGradient>

          <linearGradient id="branchGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3d2109" />
            <stop offset="60%" stopColor="#623610" />
            <stop offset="100%" stopColor="#436b1d" />
          </linearGradient>

          {/* Lush Sunflower Leaves Gradients */}
          <linearGradient id="leafGradWarm" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#65a30d" />
            <stop offset="50%" stopColor="#4d7c0f" />
            <stop offset="100%" stopColor="#1e3a0f" />
          </linearGradient>

          {/* Sunflower Petal Gradient */}
          <linearGradient id="sunflowerPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="30%" stopColor="#f59e0b" />
            <stop offset="80%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          {/* Sunflower Inner Ray Petal */}
          <linearGradient id="sunflowerInnerPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fef9c3" />
          </linearGradient>

          {/* Sunflower Center Disc Florets (Dark textured heart) */}
          <radialGradient id="sunflowerDiscGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1f0c03" />
            <stop offset="55%" stopColor="#3d1806" />
            <stop offset="82%" stopColor="#69290a" />
            <stop offset="100%" stopColor="#92400e" />
          </radialGradient>

          {/* Radiant Solar Aura for full blooming tree */}
          <radialGradient id="sunflowerSolarAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(254, 240, 138, 0.45)" />
            <stop offset="35%" stopColor="rgba(251, 191, 36, 0.25)" />
            <stop offset="70%" stopColor="rgba(245, 158, 11, 0.08)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </radialGradient>

          {/* Glow filter */}
          <filter id="solarGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 0. Solar ambient halo behind tree when blooming */}
        {bloomProgress > 0.2 && (
          <circle
            cx="360"
            cy="240"
            r={240 * bloomProgress}
            fill="url(#sunflowerSolarAura)"
            opacity={Math.min(1, bloomProgress * 1.2)}
          />
        )}

        {/* ========================================================== */}
        {/* 1. TRUNK (CRECIMIENTO VERTICAL DEL TRONCO DEL ÁRBOL)        */}
        {/* Base at (360, 690), main branch fork at (360, 310)         */}
        {/* ========================================================== */}
        {trunkProgress > 0 && (
          <g id="tree-trunk">
            {/* Trunk Body */}
            <path
              d="M 342,690 C 348,580 340,460 348,310 L 372,310 C 380,460 372,580 378,690 Z"
              fill="url(#treeBarkGrad)"
              stroke="#271406"
              strokeWidth="2"
              strokeDasharray="420"
              strokeDashoffset={420 * (1 - trunkProgress)}
              filter="drop-shadow(0 4px 10px rgba(0,0,0,0.6))"
            />

            {/* Organic Bark Texture Grooves */}
            {trunkProgress > 0.3 && (
              <g opacity={Math.min(1, (trunkProgress - 0.3) * 1.5)}>
                <path
                  d="M 352,670 C 354,550 349,430 355,330"
                  stroke="#784212"
                  strokeWidth="1.8"
                  fill="none"
                  opacity="0.6"
                />
                <path
                  d="M 364,660 C 368,540 365,420 367,320"
                  stroke="#221105"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.75"
                />
              </g>
            )}

            {/* Tree Base Root Flare */}
            {trunkProgress > 0.15 && (
              <g opacity={trunkProgress}>
                <path
                  d="M 342,685 C 325,690 305,695 285,700 C 310,695 330,692 344,690"
                  stroke="#3d2109"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 378,685 C 395,690 415,695 435,700 C 410,695 390,692 376,690"
                  stroke="#3d2109"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            )}
          </g>
        )}

        {/* ========================================================== */}
        {/* 2. EXPANDED BRANCHES ("Y QUE DESPUES SE AMPLIE")           */}
        {/* Major organic branches arching wide left, right, and top   */}
        {/* ========================================================== */}
        {branchProgress > 0 && (
          <g id="tree-branches">
            {/* Branch 1: Left Major Arm (Spreads outward to left) */}
            <path
              d="M 350,320 C 310,290 230,250 140,200"
              fill="none"
              stroke="url(#branchGrad)"
              strokeWidth="11"
              strokeLinecap="round"
              strokeDasharray="260"
              strokeDashoffset={260 * (1 - branchProgress)}
            />
            {/* Left Sub-Branch A (Arching up) */}
            <path
              d="M 270,275 C 235,230 205,185 180,165"
              fill="none"
              stroke="url(#branchGrad)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="160"
              strokeDashoffset={160 * (1 - Math.max(0, (branchProgress - 0.2) / 0.8))}
            />
            {/* Left Sub-Branch B (Lower curve) */}
            <path
              d="M 220,245 C 190,250 170,255 155,245"
              fill="none"
              stroke="url(#branchGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset={100 * (1 - Math.max(0, (branchProgress - 0.3) / 0.7))}
            />

            {/* Branch 2: Right Major Arm (Spreads outward to right) */}
            <path
              d="M 370,320 C 410,290 490,250 580,195"
              fill="none"
              stroke="url(#branchGrad)"
              strokeWidth="11"
              strokeLinecap="round"
              strokeDasharray="260"
              strokeDashoffset={260 * (1 - branchProgress)}
            />
            {/* Right Sub-Branch A (Arching up) */}
            <path
              d="M 450,275 C 485,230 515,185 540,155"
              fill="none"
              stroke="url(#branchGrad)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="160"
              strokeDashoffset={160 * (1 - Math.max(0, (branchProgress - 0.2) / 0.8))}
            />
            {/* Right Sub-Branch B (Lower curve) */}
            <path
              d="M 500,245 C 530,250 550,255 565,245"
              fill="none"
              stroke="url(#branchGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset={100 * (1 - Math.max(0, (branchProgress - 0.3) / 0.7))}
            />

            {/* Branch 3: Crown Center Fork (Ascends vertically into crown) */}
            <path
              d="M 360,310 C 355,240 358,170 360,120"
              fill="none"
              stroke="url(#branchGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="200"
              strokeDashoffset={200 * (1 - branchProgress)}
            />
            {/* Center Crown Sub-Branch Left */}
            <path
              d="M 358,220 C 340,180 325,150 320,135"
              fill="none"
              stroke="url(#branchGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="120"
              strokeDashoffset={120 * (1 - Math.max(0, (branchProgress - 0.25) / 0.75))}
            />
            {/* Center Crown Sub-Branch Right */}
            <path
              d="M 362,220 C 380,180 398,150 405,130"
              fill="none"
              stroke="url(#branchGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="120"
              strokeDashoffset={120 * (1 - Math.max(0, (branchProgress - 0.25) / 0.75))}
            />

            {/* Branch 4: Lower Trunk Knots (Sprouting lower side twigs) */}
            <path
              d="M 345,450 C 320,440 300,450 285,460"
              fill="none"
              stroke="url(#branchGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="80"
              strokeDashoffset={80 * (1 - Math.max(0, (branchProgress - 0.4) / 0.6))}
            />
            <path
              d="M 375,450 C 400,440 420,450 435,455"
              fill="none"
              stroke="url(#branchGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="80"
              strokeDashoffset={80 * (1 - Math.max(0, (branchProgress - 0.4) / 0.6))}
            />
          </g>
        )}

        {/* ========================================================== */}
        {/* 3. VIBRANT SUNFLOWER LEAVES ON THE EXPANDED BRANCHES       */}
        {/* ========================================================== */}
        {branchProgress > 0.4 && (
          <g id="tree-leaves" opacity={Math.min(1, (branchProgress - 0.4) * 2)}>
            {[
              { x: 195, y: 225, rot: -40, scale: 0.8 },
              { x: 250, y: 250, rot: -20, scale: 0.9 },
              { x: 155, y: 180, rot: -55, scale: 0.75 },
              { x: 525, y: 220, rot: 40, scale: 0.8 },
              { x: 470, y: 250, rot: 20, scale: 0.9 },
              { x: 565, y: 175, rot: 55, scale: 0.75 },
              { x: 338, y: 180, rot: -25, scale: 0.85 },
              { x: 382, y: 175, rot: 25, scale: 0.85 },
              { x: 345, y: 95, rot: -10, scale: 0.7 },
              { x: 375, y: 90, rot: 15, scale: 0.7 },
              { x: 310, y: 440, rot: -30, scale: 0.7 },
              { x: 410, y: 440, rot: 30, scale: 0.7 },
            ].map((leaf, idx) => (
              <g
                key={`leaf-${idx}`}
                transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.rot}) scale(${leaf.scale})`}
              >
                <path
                  d="M 0,0 C -18,-10 -35,-8 -48,8 C -35,22 -16,18 0,0 Z"
                  fill="url(#leafGradWarm)"
                  stroke="#274613"
                  strokeWidth="0.8"
                  opacity="0.95"
                />
                <line x1="0" y1="0" x2="-45" y2="7" stroke="#a3e635" strokeWidth="0.8" opacity="0.6" />
              </g>
            ))}
          </g>
        )}

        {/* ========================================================== */}
        {/* 4. BLOOMING SUNFLOWERS (TODAS LAS FLORES AMARILLAS)        */}
        {/* Sunflowers opening up their yellow ray petals and hearts   */}
        {/* ========================================================== */}
        {bloomProgress > 0 && (
          <g id="tree-sunflowers">
            {treeFlowers.map((flower) => {
              if (bloomProgress < flower.delay) return null;
              const localProg = Math.min(1, (bloomProgress - flower.delay) / (1 - flower.delay));
              // Smooth pop and bloom easing
              const currentScale = (1 - Math.pow(1 - localProg, 3)) * flower.size;
              if (currentScale <= 0.01) return null;

              const rPetal = 32;
              const rDisc = 13.5;

              return (
                <g
                  key={flower.id}
                  transform={`translate(${flower.x}, ${flower.y}) rotate(${flower.rotation}) scale(${currentScale})`}
                  style={{
                    transformOrigin: '0px 0px',
                    filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.45))',
                    cursor: 'pointer',
                  }}
                  onClick={() => onFlowerClick && onFlowerClick(flower.x, flower.y)}
                >
                  {/* Subtle sun ray aura */}
                  <circle cx="0" cy="0" r={rPetal + 8} fill="rgba(254, 240, 138, 0.15)" />

                  {/* Outer Layer: 16 Golden Ray Petals */}
                  {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map(
                    (angle, i) => (
                      <g key={`p1-${i}`} transform={`rotate(${angle})`}>
                        <path
                          d={`M 0,0 C -6,-12 -8,-${rPetal - 6} 0,-${rPetal} C 8,-${rPetal - 6} 6,-12 0,0 Z`}
                          fill="url(#sunflowerPetalGrad)"
                          stroke="#d97706"
                          strokeWidth="0.4"
                          opacity="0.96"
                        />
                        {/* Central petal ray line */}
                        <line x1="0" y1="-8" x2="0" y2={`-${rPetal - 4}`} stroke="#fef9c3" strokeWidth="0.5" opacity="0.6" />
                      </g>
                    )
                  )}

                  {/* Inner Layer: 16 Offset Golden Ray Petals */}
                  {[11.25, 33.75, 56.25, 78.75, 101.25, 123.75, 146.25, 168.75, 191.25, 213.75, 236.25, 258.75, 281.25, 303.75, 326.25, 348.75].map(
                    (angle, i) => (
                      <g key={`p2-${i}`} transform={`rotate(${angle}) scale(0.85)`}>
                        <path
                          d={`M 0,0 C -5,-10 -7,-${rPetal - 6} 0,-${rPetal} C 7,-${rPetal - 6} 5,-10 0,0 Z`}
                          fill="url(#sunflowerInnerPetalGrad)"
                          stroke="#b45309"
                          strokeWidth="0.3"
                          opacity="0.95"
                        />
                      </g>
                    )
                  )}

                  {/* Center Disc Florets (Dark seed heart of sunflower) */}
                  <circle cx="0" cy="0" r={rDisc} fill="url(#sunflowerDiscGrad)" stroke="#78350f" strokeWidth="0.9" />

                  {/* Golden pollen ring pattern */}
                  <circle
                    cx="0"
                    cy="0"
                    r={rDisc * 0.72}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.2"
                    strokeDasharray="2,2"
                    opacity="0.85"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r={rDisc * 0.42}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="1"
                    strokeDasharray="1.5,1.5"
                    opacity="0.9"
                  />
                  <circle cx="0" cy="0" r={2.5} fill="#fef08a" />

                  {/* Tiny glittering dew sparkle */}
                  {localProg > 0.8 && (
                    <circle cx={-rDisc * 0.5} cy={-rDisc * 0.5} r="1.5" fill="#ffffff" opacity="0.9" />
                  )}
                </g>
              );
            })}

            {/* Sparkle burst upon full bloom completion */}
            {sparkleBurst && (
              <g className="animate-ping" opacity="0.8">
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((ang) => (
                  <circle
                    key={ang}
                    cx={360 + Math.cos((ang * Math.PI) / 180) * 220}
                    cy={220 + Math.sin((ang * Math.PI) / 180) * 160}
                    r="4.5"
                    fill="#fef08a"
                  />
                ))}
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};
