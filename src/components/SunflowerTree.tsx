import React, { useMemo } from 'react';

export interface SunflowerTreeState {
  trunkProgress: number; // 0 to 1
  branchProgress: number; // 0 to 1 (expansion phase)
  bloomProgress: number; // 0 to 1 (blooming of sunflowers)
  sparkleBurst: boolean;
  swayAngle?: number;
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
}

const SunflowerTreeComponent: React.FC<SunflowerTreeProps> = ({ state, onFlowerClick }) => {
  const { trunkProgress, branchProgress, bloomProgress, sparkleBurst } = state;

  // LUSH, LARGE SUNFLOWERS BLANKETING ALL BRANCHES IN A HEART SILHOUETTE
  const heartSunflowers: TreeFlowerNode[] = useMemo(() => {
    return [
      // -------------------------------------------------------------
      // 1. HEART PERIMETER CONTOUR (Defines the distinct heart outline)
      // -------------------------------------------------------------
      // Center Dip & Cleft of the Heart
      { id: 'f-cleft-deep', x: 360, y: 195, size: 1.22, rotation: 0, delay: 0.05 },
      { id: 'f-cleft-mid', x: 360, y: 155, size: 1.15, rotation: 10, delay: 0.1 },
      { id: 'f-cleft-l', x: 325, y: 175, size: 1.25, rotation: -12, delay: 0.12 },
      { id: 'f-cleft-r', x: 395, y: 175, size: 1.25, rotation: 12, delay: 0.12 },

      // Left Heart Lobe (Crown apex arching up and out)
      { id: 'f-l-apex-1', x: 285, y: 140, size: 1.3, rotation: -22, delay: 0.15 },
      { id: 'f-l-apex-2', x: 235, y: 115, size: 1.35, rotation: -35, delay: 0.18 },
      { id: 'f-l-apex-3', x: 180, y: 110, size: 1.32, rotation: -48, delay: 0.22 }, // High crest apex
      { id: 'f-l-shoulder-1', x: 130, y: 135, size: 1.28, rotation: -60, delay: 0.25 },
      { id: 'f-l-shoulder-2', x: 95, y: 180, size: 1.35, rotation: -72, delay: 0.28 },
      { id: 'f-l-shoulder-3', x: 85, y: 235, size: 1.32, rotation: -85, delay: 0.32 }, // Widest left point

      // Left Taper (Sweeping down diagonally to the bottom tip)
      { id: 'f-l-taper-1', x: 98, y: 290, size: 1.3, rotation: -75, delay: 0.35 },
      { id: 'f-l-taper-2', x: 130, y: 340, size: 1.28, rotation: -62, delay: 0.38 },
      { id: 'f-l-taper-3', x: 175, y: 385, size: 1.25, rotation: -50, delay: 0.42 },
      { id: 'f-l-taper-4', x: 230, y: 418, size: 1.22, rotation: -38, delay: 0.45 },
      { id: 'f-l-taper-5', x: 290, y: 440, size: 1.2, rotation: -24, delay: 0.48 },

      // Right Heart Lobe (Crown apex arching up and out)
      { id: 'f-r-apex-1', x: 435, y: 140, size: 1.3, rotation: 22, delay: 0.15 },
      { id: 'f-r-apex-2', x: 485, y: 115, size: 1.35, rotation: 35, delay: 0.18 },
      { id: 'f-r-apex-3', x: 540, y: 110, size: 1.32, rotation: 48, delay: 0.22 }, // High crest apex
      { id: 'f-r-shoulder-1', x: 590, y: 135, size: 1.28, rotation: 60, delay: 0.25 },
      { id: 'f-r-shoulder-2', x: 625, y: 180, size: 1.35, rotation: 72, delay: 0.28 },
      { id: 'f-r-shoulder-3', x: 635, y: 235, size: 1.32, rotation: 85, delay: 0.32 }, // Widest right point

      // Right Taper (Sweeping down diagonally to the bottom tip)
      { id: 'f-r-taper-1', x: 622, y: 290, size: 1.3, rotation: 75, delay: 0.35 },
      { id: 'f-r-taper-2', x: 590, y: 340, size: 1.28, rotation: 62, delay: 0.38 },
      { id: 'f-r-taper-3', x: 545, y: 385, size: 1.25, rotation: 50, delay: 0.42 },
      { id: 'f-r-taper-4', x: 490, y: 418, size: 1.22, rotation: 38, delay: 0.45 },
      { id: 'f-r-taper-5', x: 430, y: 440, size: 1.2, rotation: 24, delay: 0.48 },

      // Bottom Tip of the Heart
      { id: 'f-heart-tip', x: 360, y: 455, size: 1.3, rotation: 0, delay: 0.52 },

      // -------------------------------------------------------------
      // 2. INNER CANOPY & BRANCH COVERS (Dense coverage over all boughs)
      // -------------------------------------------------------------
      // Upper Internal Tier
      { id: 'f-in-up-1', x: 260, y: 165, size: 1.25, rotation: -28, delay: 0.24 },
      { id: 'f-in-up-2', x: 460, y: 165, size: 1.25, rotation: 28, delay: 0.24 },
      { id: 'f-in-up-3', x: 310, y: 205, size: 1.28, rotation: -15, delay: 0.26 },
      { id: 'f-in-up-4', x: 410, y: 205, size: 1.28, rotation: 15, delay: 0.26 },
      { id: 'f-in-up-5', x: 360, y: 245, size: 1.35, rotation: 0, delay: 0.28 },

      // Mid-Upper Tier (covering main curving branches)
      { id: 'f-in-mid-1', x: 195, y: 175, size: 1.28, rotation: -42, delay: 0.28 },
      { id: 'f-in-mid-2', x: 525, y: 175, size: 1.28, rotation: 42, delay: 0.28 },
      { id: 'f-in-mid-3', x: 155, y: 215, size: 1.3, rotation: -55, delay: 0.3 },
      { id: 'f-in-mid-4', x: 565, y: 215, size: 1.3, rotation: 55, delay: 0.3 },
      { id: 'f-in-mid-5', x: 245, y: 225, size: 1.32, rotation: -25, delay: 0.32 },
      { id: 'f-in-mid-6', x: 475, y: 225, size: 1.32, rotation: 25, delay: 0.32 },

      // Center Core Canopy (lush and full)
      { id: 'f-in-cen-1', x: 300, y: 260, size: 1.35, rotation: -12, delay: 0.34 },
      { id: 'f-in-cen-2', x: 420, y: 260, size: 1.35, rotation: 12, delay: 0.34 },
      { id: 'f-in-cen-3', x: 360, y: 295, size: 1.38, rotation: 5, delay: 0.36 },
      { id: 'f-in-cen-4', x: 210, y: 275, size: 1.3, rotation: -38, delay: 0.36 },
      { id: 'f-in-cen-5', x: 510, y: 275, size: 1.3, rotation: 38, delay: 0.36 },
      { id: 'f-in-cen-6', x: 150, y: 275, size: 1.25, rotation: -68, delay: 0.38 },
      { id: 'f-in-cen-7', x: 570, y: 275, size: 1.25, rotation: 68, delay: 0.38 },

      // Mid-Lower Tier (bridging to the trunk convergence)
      { id: 'f-in-low-1', x: 265, y: 315, size: 1.32, rotation: -24, delay: 0.4 },
      { id: 'f-in-low-2', x: 455, y: 315, size: 1.32, rotation: 24, delay: 0.4 },
      { id: 'f-in-low-3', x: 360, y: 345, size: 1.35, rotation: 0, delay: 0.42 },
      { id: 'f-in-low-4', x: 195, y: 335, size: 1.28, rotation: -48, delay: 0.42 },
      { id: 'f-in-low-5', x: 525, y: 335, size: 1.28, rotation: 48, delay: 0.42 },
      { id: 'f-in-low-6', x: 315, y: 375, size: 1.3, rotation: -18, delay: 0.44 },
      { id: 'f-in-low-7', x: 405, y: 375, size: 1.3, rotation: 18, delay: 0.44 },

      // Lower Heart Convergence (where crown meets top of trunk)
      { id: 'f-in-bot-1', x: 250, y: 375, size: 1.25, rotation: -32, delay: 0.46 },
      { id: 'f-in-bot-2', x: 470, y: 375, size: 1.25, rotation: 32, delay: 0.46 },
      { id: 'f-in-bot-3', x: 360, y: 405, size: 1.35, rotation: 0, delay: 0.48 },
      { id: 'f-in-bot-4', x: 330, y: 415, size: 1.22, rotation: -15, delay: 0.5 },
      { id: 'f-in-bot-5', x: 390, y: 415, size: 1.22, rotation: 15, delay: 0.5 },

      // Lower Trunk Bloom Accents
      { id: 'f-trunk-l', x: 320, y: 485, size: 1.1, rotation: -25, delay: 0.55 },
      { id: 'f-trunk-r', x: 400, y: 485, size: 1.1, rotation: 25, delay: 0.55 },
      { id: 'f-trunk-b', x: 360, y: 525, size: 1.05, rotation: 0, delay: 0.58 },
    ];
  }, []);

  return (
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[360px] sm:w-[580px] md:w-[720px] h-[640px] sm:h-[720px] md:h-[780px] pointer-events-none z-20"
      style={{ transformOrigin: '50% 95%' }}
    >
      <svg viewBox="0 0 720 740" className="w-full h-full overflow-visible animate-tree-sway">
        <defs>
          {/* Tree Trunk & Heart Branches Wooden Bark Gradients */}
          <linearGradient id="heartTreeBarkGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#3d220f" />
            <stop offset="35%" stopColor="#5c3416" />
            <stop offset="70%" stopColor="#7c461d" />
            <stop offset="100%" stopColor="#9a5a27" />
          </linearGradient>

          <linearGradient id="heartBranchGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5c3416" />
            <stop offset="55%" stopColor="#7c461d" />
            <stop offset="100%" stopColor="#4f772d" />
          </linearGradient>

          {/* Fresh Sunflower Leaves */}
          <linearGradient id="heartLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#84cc16" />
            <stop offset="50%" stopColor="#65a30d" />
            <stop offset="100%" stopColor="#3f6212" />
          </linearGradient>

          {/* Large Radiant Sunflower Outer Petal Gradient */}
          <linearGradient id="lushOuterPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="25%" stopColor="#f59e0b" />
            <stop offset="75%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          {/* Large Radiant Sunflower Inner Petal Gradient */}
          <linearGradient id="lushInnerPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="85%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#fffbeb" />
          </linearGradient>

          {/* Sunflower Center Seed Disc */}
          <radialGradient id="lushDiscGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e0b02" />
            <stop offset="55%" stopColor="#3b1504" />
            <stop offset="80%" stopColor="#632707" />
            <stop offset="100%" stopColor="#85360b" />
          </radialGradient>

          {/* Golden Solar Aura behind blooming heart canopy */}
          <radialGradient id="heartSolarAura" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="rgba(245, 158, 11, 0.3)" />
            <stop offset="45%" stopColor="rgba(251, 191, 36, 0.16)" />
            <stop offset="80%" stopColor="rgba(254, 240, 138, 0.04)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </radialGradient>

          {/* ========================================================== */}
          {/* FULL, LARGE & LUSH SUNFLOWER BLOOM SYMBOL                   */}
          {/* Substantial, radiant, rich petals that cover the branches  */}
          {/* ========================================================== */}
          <g id="lushSunflowerBloomSymbol">
            {/* Ambient golden halo under each large flower */}
            <circle cx="0" cy="0" r="38" fill="rgba(254, 240, 138, 0.22)" filter="blur(2px)" />

            {/* Outer Ray Petals Layer (16 long, sculpted golden petals) */}
            {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map(
              (angle, i) => (
                <g key={`lush-p1-${i}`} transform={`rotate(${angle})`}>
                  <path
                    d="M 0,0 C -5,-10 -6.5,-25 0,-33 C 6.5,-25 5,-10 0,0 Z"
                    fill="url(#lushOuterPetalGrad)"
                    stroke="#d97706"
                    strokeWidth="0.5"
                    opacity="0.98"
                  />
                  {/* Subtle central ridge */}
                  <line x1="0" y1="-8" x2="0" y2="-30" stroke="#fef9c3" strokeWidth="0.6" opacity="0.75" />
                </g>
              )
            )}

            {/* Inner Ray Petals Layer (16 dense petals offset by 11.25 deg) */}
            {[11.25, 33.75, 56.25, 78.75, 101.25, 123.75, 146.25, 168.75, 191.25, 213.75, 236.25, 258.75, 281.25, 303.75, 326.25, 348.75].map(
              (angle, i) => (
                <g key={`lush-p2-${i}`} transform={`rotate(${angle}) scale(0.85)`}>
                  <path
                    d="M 0,0 C -4.5,-8 -6,-23 0,-30 C 6,-23 4.5,-8 0,0 Z"
                    fill="url(#lushInnerPetalGrad)"
                    stroke="#b45309"
                    strokeWidth="0.4"
                    opacity="0.96"
                  />
                </g>
              )
            )}

            {/* Sunflower Heart Center Disc Florets */}
            <circle cx="0" cy="0" r="13.5" fill="url(#lushDiscGrad)" stroke="#78350f" strokeWidth="1.2" />
            
            {/* Concentric rings of fertile golden pollen florets */}
            <circle
              cx="0"
              cy="0"
              r="10"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1.3"
              strokeDasharray="2.2,2"
              opacity="0.9"
            />
            <circle
              cx="0"
              cy="0"
              r="6.5"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1.1"
              strokeDasharray="1.8,1.6"
              opacity="0.92"
            />
            <circle
              cx="0"
              cy="0"
              r="3.5"
              fill="none"
              stroke="#fef08a"
              strokeWidth="0.9"
              strokeDasharray="1.2,1.2"
              opacity="0.95"
            />
            <circle cx="0" cy="0" r="1.8" fill="#fef9c3" />
            {/* Sunlit glint */}
            <circle cx="-4" cy="-4" r="1.2" fill="#ffffff" opacity="0.85" />
          </g>
        </defs>

        {/* 0. Solar ambient halo behind tree when blooming */}
        {bloomProgress > 0.15 && (
          <ellipse
            cx="360"
            cy="270"
            rx={320 * bloomProgress}
            ry={260 * bloomProgress}
            fill="url(#heartSolarAura)"
            opacity={Math.min(1, bloomProgress * 1.4)}
          />
        )}

        {/* ========================================================== */}
        {/* 1. TRUNK (CRECIMIENTO VERTICAL HASTA LA CÚSPIDE DEL CORAZÓN) */}
        {/* Base at (360, 690), ascends to (360, 420)                  */}
        {/* ========================================================== */}
        {trunkProgress > 0 && (
          <g id="tree-trunk">
            {/* Main Trunk Body */}
            <path
              d="M 342,690 C 346,580 348,480 353,410 L 367,410 C 372,480 374,580 378,690 Z"
              fill="url(#heartTreeBarkGrad)"
              stroke="#3d220f"
              strokeWidth="1.5"
              strokeDasharray="320"
              strokeDashoffset={320 * (1 - trunkProgress)}
              filter="drop-shadow(0 4px 10px rgba(92,52,22,0.25))"
            />

            {/* Organic Bark Texture Grooves */}
            {trunkProgress > 0.3 && (
              <g opacity={Math.min(1, (trunkProgress - 0.3) * 1.5)}>
                <path
                  d="M 352,670 C 354,560 352,450 356,415"
                  stroke="#8e5022"
                  strokeWidth="1.6"
                  fill="none"
                  opacity="0.65"
                />
                <path
                  d="M 366,660 C 368,550 367,440 364,418"
                  stroke="#381e0c"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.75"
                />
              </g>
            )}

            {/* Tree Base Root Flare in fertile soil */}
            {trunkProgress > 0.15 && (
              <g opacity={trunkProgress}>
                <path
                  d="M 342,685 C 324,690 304,695 284,700 C 310,695 330,692 344,690"
                  stroke="#5c3416"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 378,685 C 396,690 416,695 436,700 C 410,695 390,692 376,690"
                  stroke="#5c3416"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            )}
          </g>
        )}

        {/* ========================================================== */}
        {/* 2. BRANCHES IN THE SHAPE OF A HEART (FORMA DE CORAZÓN)     */}
        {/* Symmetrical organic boughs tracing out a loving heart      */}
        {/* ========================================================== */}
        {branchProgress > 0 && (
          <g id="tree-heart-branches">
            {/* --- LEFT HEART ARCH (Outer contour of left lobe) --- */}
            <path
              d="M 356,415 C 260,395 130,335 110,240 C 98,160 155,105 235,105 C 295,105 340,145 360,195"
              fill="none"
              stroke="url(#heartBranchGrad)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray="640"
              strokeDashoffset={640 * (1 - branchProgress)}
            />

            {/* --- RIGHT HEART ARCH (Outer contour of right lobe) --- */}
            <path
              d="M 364,415 C 460,395 590,335 610,240 C 622,160 565,105 485,105 C 425,105 380,145 360,195"
              fill="none"
              stroke="url(#heartBranchGrad)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray="640"
              strokeDashoffset={640 * (1 - branchProgress)}
            />

            {/* --- LEFT INNER HEART SUPPORT BRANCHES --- */}
            <path
              d="M 358,390 C 285,340 210,270 200,185"
              fill="none"
              stroke="url(#heartBranchGrad)"
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeDasharray="290"
              strokeDashoffset={290 * (1 - Math.max(0, (branchProgress - 0.2) / 0.8))}
            />
            <path
              d="M 255,300 C 195,260 155,230 140,185"
              fill="none"
              stroke="url(#heartBranchGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="170"
              strokeDashoffset={170 * (1 - Math.max(0, (branchProgress - 0.3) / 0.7))}
            />
            <path
              d="M 285,210 C 255,170 235,145 220,125"
              fill="none"
              stroke="url(#heartBranchGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeDasharray="130"
              strokeDashoffset={130 * (1 - Math.max(0, (branchProgress - 0.35) / 0.65))}
            />

            {/* --- RIGHT INNER HEART SUPPORT BRANCHES --- */}
            <path
              d="M 362,390 C 435,340 510,270 520,185"
              fill="none"
              stroke="url(#heartBranchGrad)"
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeDasharray="290"
              strokeDashoffset={290 * (1 - Math.max(0, (branchProgress - 0.2) / 0.8))}
            />
            <path
              d="M 465,300 C 525,260 565,230 580,185"
              fill="none"
              stroke="url(#heartBranchGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="170"
              strokeDashoffset={170 * (1 - Math.max(0, (branchProgress - 0.3) / 0.7))}
            />
            <path
              d="M 435,210 C 465,170 485,145 500,125"
              fill="none"
              stroke="url(#heartBranchGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeDasharray="130"
              strokeDashoffset={130 * (1 - Math.max(0, (branchProgress - 0.35) / 0.65))}
            />

            {/* --- CENTER HEART CLEFT SUPPORT BRANCH --- */}
            <path
              d="M 360,390 C 360,310 360,240 360,190"
              fill="none"
              stroke="url(#heartBranchGrad)"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeDasharray="200"
              strokeDashoffset={200 * (1 - Math.max(0, (branchProgress - 0.25) / 0.75))}
            />

            {/* --- LOWER TRUNK KNOT BRANCHES --- */}
            <path
              d="M 348,485 C 330,480 320,485 310,490"
              fill="none"
              stroke="url(#heartBranchGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="55"
              strokeDashoffset={55 * (1 - Math.max(0, (branchProgress - 0.4) / 0.6))}
            />
            <path
              d="M 372,485 C 390,480 400,485 410,488"
              fill="none"
              stroke="url(#heartBranchGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="55"
              strokeDashoffset={55 * (1 - Math.max(0, (branchProgress - 0.4) / 0.6))}
            />
          </g>
        )}

        {/* ========================================================== */}
        {/* 3. FRESH GREEN LEAVES ACCENTING THE HEART SILHOUETTE       */}
        {/* ========================================================== */}
        {branchProgress > 0.35 && (
          <g id="tree-heart-leaves" opacity={Math.min(1, (branchProgress - 0.35) * 2)}>
            {[
              // Left heart outer leaves
              { x: 125, y: 245, rot: -75, scale: 0.9 },
              { x: 150, y: 180, rot: -60, scale: 0.95 },
              { x: 220, y: 125, rot: -35, scale: 0.95 },
              { x: 275, y: 130, rot: -18, scale: 0.9 },
              { x: 145, y: 315, rot: -65, scale: 0.85 },
              { x: 240, y: 375, rot: -32, scale: 0.85 },

              // Right heart outer leaves
              { x: 595, y: 245, rot: 75, scale: 0.9 },
              { x: 570, y: 180, rot: 60, scale: 0.95 },
              { x: 500, y: 125, rot: 35, scale: 0.95 },
              { x: 445, y: 130, rot: 18, scale: 0.9 },
              { x: 575, y: 315, rot: 65, scale: 0.85 },
              { x: 480, y: 375, rot: 32, scale: 0.85 },

              // Inner heart leaves
              { x: 340, y: 195, rot: -12, scale: 0.8 },
              { x: 380, y: 195, rot: 12, scale: 0.8 },
              { x: 260, y: 245, rot: -22, scale: 0.85 },
              { x: 460, y: 245, rot: 22, scale: 0.85 },
              { x: 360, y: 270, rot: 0, scale: 0.8 },
              { x: 315, y: 475, rot: -35, scale: 0.75 },
              { x: 405, y: 475, rot: 35, scale: 0.75 },
            ].map((leaf, idx) => (
              <g
                key={`h-leaf-${idx}`}
                transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.rot}) scale(${leaf.scale})`}
              >
                <path
                  d="M 0,0 C -16,-9 -32,-7 -42,7 C -32,20 -15,16 0,0 Z"
                  fill="url(#heartLeafGrad)"
                  stroke="#2b4711"
                  strokeWidth="0.7"
                  opacity="0.95"
                />
                <line x1="0" y1="0" x2="-40" y2="6" stroke="#bef264" strokeWidth="0.7" opacity="0.7" />
              </g>
            ))}
          </g>
        )}

        {/* ========================================================== */}
        {/* 4. LARGE LUSH SUNFLOWERS BLANKETING THE HEART TREE         */}
        {/* ========================================================== */}
        {bloomProgress > 0 && (
          <g id="tree-heart-sunflowers">
            {heartSunflowers.map((flower) => {
              if (bloomProgress < flower.delay) return null;
              const localProg = Math.min(1, (bloomProgress - flower.delay) / (1 - flower.delay));
              // Organic elastic blooming curve
              const currentScale = (1 - Math.pow(1 - localProg, 3)) * flower.size;
              if (currentScale <= 0.01) return null;

              return (
                <g
                  key={flower.id}
                  transform={`translate(${flower.x}, ${flower.y}) rotate(${flower.rotation}) scale(${currentScale})`}
                  style={{
                    cursor: 'pointer',
                    filter: 'drop-shadow(0 4px 8px rgba(180, 83, 9, 0.22))',
                  }}
                  onClick={() => onFlowerClick && onFlowerClick(flower.x, flower.y)}
                >
                  <use href="#lushSunflowerBloomSymbol" />
                </g>
              );
            })}

            {/* Sparkle burst upon full bloom completion */}
            {sparkleBurst && (
              <g className="animate-ping" opacity="0.85">
                {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((ang) => (
                  <circle
                    key={ang}
                    cx={360 + Math.cos((ang * Math.PI) / 180) * 220}
                    cy={260 + Math.sin((ang * Math.PI) / 180) * 160}
                    r="4"
                    fill="#fbbf24"
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

export const SunflowerTree = React.memo(SunflowerTreeComponent);
