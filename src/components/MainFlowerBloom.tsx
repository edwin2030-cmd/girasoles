import React, { useMemo } from 'react';

export interface MainFlowerState {
  seedVisible: boolean;
  seedGlow: number; // 0 to 1
  rootProgress: number; // 0 to 1
  stemProgress: number; // 0 to 1
  leaf1Progress: number; // 0 to 1
  leaf2Progress: number; // 0 to 1
  budProgress: number; // 0 to 1
  bloomProgress: number; // 0 to 1
  sparkleBurst: boolean;
  swayAngle: number; // degrees for ambient wind
}

interface MainFlowerBloomProps {
  state: MainFlowerState;
}

export const MainFlowerBloom: React.FC<MainFlowerBloomProps> = ({ state }) => {
  const {
    seedVisible,
    seedGlow,
    stemProgress,
    leaf1Progress,
    leaf2Progress,
    budProgress,
    bloomProgress,
    sparkleBurst,
    swayAngle,
  } = state;

  // Stem path constants
  // Ground origin: (180, 520). Flower apex: (180, 150)
  const stemPath = "M 180,515 C 168,410 196,280 180,150";
  const stemLength = 370; // approximate path length in px

  // Petal generation for realistic multi-layered bloom
  // Outer layer (5 large petals)
  const outerPetals = useMemo(() => {
    return [0, 72, 144, 216, 288].map((angle, i) => ({
      id: `outer-${i}`,
      angle,
      delay: i * 0.08,
    }));
  }, []);

  // Middle layer (6 petals)
  const midPetals = useMemo(() => {
    return [36, 96, 156, 216, 276, 336].map((angle, i) => ({
      id: `mid-${i}`,
      angle,
      delay: 0.2 + i * 0.07,
    }));
  }, []);

  // Inner layer (5 tight core petals)
  const innerPetals = useMemo(() => {
    return [15, 87, 159, 231, 303].map((angle, i) => ({
      id: `inner-${i}`,
      angle,
      delay: 0.45 + i * 0.06,
    }));
  }, []);

  // Calculate petal expansion factoring individual staggered progress
  const getPetalScale = (delay: number, maxScale: number = 1) => {
    if (bloomProgress <= delay) return 0;
    const localProg = Math.min(1, (bloomProgress - delay) / (1 - delay));
    // Ease out cubic
    const eased = 1 - Math.pow(1 - localProg, 3);
    return eased * maxScale;
  };

  return (
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[340px] sm:w-[420px] md:w-[460px] h-[580px] sm:h-[650px] pointer-events-none z-20"
      style={{
        transformOrigin: '50% 92%',
      }}
    >
      <svg
        viewBox="0 0 360 560"
        className="w-full h-full overflow-visible"
        style={{
          transform: `rotate(${swayAngle}deg)`,
          transformOrigin: '180px 520px',
          transition: 'transform 0.08s ease-out',
        }}
      >
        <defs>
          {/* Gradients for organic stems and leaves */}
          <linearGradient id="stemGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#224229" />
            <stop offset="50%" stopColor="#3d6b38" />
            <stop offset="100%" stopColor="#588e42" />
          </linearGradient>

          <linearGradient id="leafGradLeft" x1="100%" y1="50%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="#32592d" />
            <stop offset="60%" stopColor="#4f803c" />
            <stop offset="100%" stopColor="#7cb658" />
          </linearGradient>

          <linearGradient id="leafGradRight" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#32592d" />
            <stop offset="60%" stopColor="#4f803c" />
            <stop offset="100%" stopColor="#7cb658" />
          </linearGradient>

          {/* Gradients for rose and romantic petals */}
          <linearGradient id="petalOuterGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#881337" />
            <stop offset="35%" stopColor="#be123c" />
            <stop offset="75%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#fda4af" />
          </linearGradient>

          <linearGradient id="petalMidGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#9f1239" />
            <stop offset="40%" stopColor="#e11d48" />
            <stop offset="85%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#fecdd3" />
          </linearGradient>

          <linearGradient id="petalInnerGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#be123c" />
            <stop offset="50%" stopColor="#f43f5e" />
            <stop offset="90%" stopColor="#fda4af" />
            <stop offset="100%" stopColor="#fff1f2" />
          </linearGradient>

          <radialGradient id="centerGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="80%" stopColor="#b45309" />
            <stop offset="100%" stopColor="rgba(180, 83, 9, 0)" />
          </radialGradient>

          <radialGradient id="bloomAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(254, 205, 211, 0.6)" />
            <stop offset="45%" stopColor="rgba(251, 113, 133, 0.3)" />
            <stop offset="85%" stopColor="rgba(244, 63, 94, 0.08)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </radialGradient>

          <filter id="glowEffect" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ======================================================== */}
        {/* 1. SEED AND GERMINATION                                  */}
        {/* ======================================================== */}
        {seedVisible && (
          <g id="seed-element">
            {/* Pulsing golden aura around seed */}
            <circle
              cx="180"
              cy="516"
              r={12 + 6 * seedGlow}
              fill="rgba(253, 224, 71, 0.3)"
              filter="url(#glowEffect)"
            />

            {/* Seed body (teardrop seed lying in soil) */}
            <path
              d="M 180,510 C 185,510 188,515 186,520 C 184,524 176,524 174,520 C 172,515 175,510 180,510 Z"
              fill="#d97706"
              stroke="#b45309"
              strokeWidth="1.2"
            />
            {/* Golden embryo light shining from within seed */}
            <ellipse
              cx="179.5"
              cy="517"
              rx="3"
              ry="4"
              fill="#fef08a"
              opacity={0.6 + 0.4 * seedGlow}
            />
          </g>
        )}

        {/* ======================================================== */}
        {/* 2. THE STEM (CRECIMIENTO DEL TALLO)                      */}
        {/* ======================================================== */}
        {stemProgress > 0 && (
          <path
            d={stemPath}
            fill="none"
            stroke="url(#stemGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={stemLength}
            strokeDashoffset={stemLength * (1 - stemProgress)}
            style={{
              filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.5))',
            }}
          />
        )}

        {/* ======================================================== */}
        {/* 3. LEAVES SPROUTING ON SIDES                             */}
        {/* ======================================================== */}
        {/* Leaf 1: Lower Left Leaf (emerges around 35-40% stem height) */}
        {leaf1Progress > 0 && (
          <g
            transform={`translate(174, 380) scale(${leaf1Progress})`}
            style={{
              transformOrigin: '0px 0px',
              transition: 'transform 0.1s ease-out',
            }}
          >
            {/* Leaf shape curved to the left */}
            <path
              d="M 0,0 C -25,-12 -52,-10 -72,8 C -55,24 -24,20 0,0 Z"
              fill="url(#leafGradLeft)"
              stroke="#2e532a"
              strokeWidth="1.2"
              filter="drop-shadow(0 3px 6px rgba(0,0,0,0.35))"
            />
            {/* Leaf central vein */}
            <path
              d="M 0,0 C -24, -3 -48, 2 -70, 7"
              stroke="#8bc34a"
              strokeWidth="1"
              fill="none"
              opacity="0.75"
            />
            {/* Tiny dew sparkle */}
            <circle cx="-42" cy="-2" r="1.8" fill="#ffffff" opacity="0.85" />
          </g>
        )}

        {/* Leaf 2: Upper Right Leaf (emerges around 65% stem height) */}
        {leaf2Progress > 0 && (
          <g
            transform={`translate(186, 275) scale(${leaf2Progress})`}
            style={{
              transformOrigin: '0px 0px',
              transition: 'transform 0.1s ease-out',
            }}
          >
            {/* Leaf shape curved to the right */}
            <path
              d="M 0,0 C 26,-15 56,-12 76,6 C 58,22 26,18 0,0 Z"
              fill="url(#leafGradRight)"
              stroke="#2e532a"
              strokeWidth="1.2"
              filter="drop-shadow(0 3px 6px rgba(0,0,0,0.35))"
            />
            {/* Leaf central vein */}
            <path
              d="M 0,0 C 26,-4 52, 1 74, 5"
              stroke="#8bc34a"
              strokeWidth="1"
              fill="none"
              opacity="0.75"
            />
            {/* Tiny dew sparkle */}
            <circle cx="46" cy="-3" r="1.8" fill="#ffffff" opacity="0.85" />
          </g>
        )}

        {/* ======================================================== */}
        {/* 4. FLOWER BUD AND SEPALS (BOTÓN DE LA FLOR)              */}
        {/* ======================================================== */}
        {budProgress > 0 && bloomProgress < 0.95 && (
          <g
            transform={`translate(180, 150) scale(${budProgress * (1 - bloomProgress * 0.7)})`}
            style={{
              transformOrigin: '0px 0px',
              opacity: Math.max(0, 1 - bloomProgress * 1.1),
            }}
          >
            {/* Closed petals peeking through sepals */}
            <ellipse cx="0" cy="-12" rx="10" ry="16" fill="#be123c" />
            <ellipse cx="0" cy="-14" rx="7" ry="12" fill="#f43f5e" />

            {/* Sepals enclosing the bud */}
            <path
              d="M -3,5 C -14,-2 -16,-18 -6,-30 C -2,-18 -1,-8 0,5 Z"
              fill="#3a6933"
              stroke="#224229"
              strokeWidth="1"
            />
            <path
              d="M 3,5 C 14,-2 16,-18 6,-30 C 2,-18 1,-8 0,5 Z"
              fill="#3a6933"
              stroke="#224229"
              strokeWidth="1"
            />
            <path
              d="M 0,6 C -5,-4 -4,-22 0,-34 C 4,-22 5,-4 0,6 Z"
              fill="#4a8042"
              stroke="#224229"
              strokeWidth="1"
            />
          </g>
        )}

        {/* ======================================================== */}
        {/* 5. FULL FLOWER BLOOM (PETALOS ABRIÉNDOSE UNO A UNO)     */}
        {/* ======================================================== */}
        {bloomProgress > 0 && (
          <g
            id="flower-head"
            transform="translate(180, 145)"
            className="filter drop-shadow-xl"
          >
            {/* Radiant soft ambient aura around the blooming flower */}
            <circle
              cx="0"
              cy="0"
              r={70 * bloomProgress}
              fill="url(#bloomAura)"
            />

            {/* Back Sepals opening outward */}
            <g opacity={bloomProgress}>
              <path
                d="M 0,5 C -15,10 -30,22 -38,36 C -24,30 -10,18 0,5 Z"
                fill="#366130"
              />
              <path
                d="M 0,5 C 15,10 30,22 38,36 C 24,30 10,18 0,5 Z"
                fill="#366130"
              />
              <path
                d="M 0,6 C 0,22 0,35 0,42 C -4,32 -2,18 0,6 Z"
                fill="#43773b"
              />
            </g>

            {/* LAYER 1: Large Outer Petals (unfurl first from center) */}
            {outerPetals.map((petal) => {
              const scale = getPetalScale(petal.delay, 1);
              if (scale <= 0.01) return null;
              return (
                <g
                  key={petal.id}
                  transform={`rotate(${petal.angle}) scale(${scale})`}
                  style={{
                    transformOrigin: '0px 0px',
                    transition: 'transform 0.05s linear',
                  }}
                >
                  <path
                    d="M 0,0 C -32,-25 -48,-62 -30,-88 C -12,-102 12,-102 30,-88 C 48,-62 32,-25 0,0 Z"
                    fill="url(#petalOuterGrad)"
                    stroke="rgba(255, 228, 230, 0.4)"
                    strokeWidth="0.8"
                    opacity={0.96}
                    filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
                  />
                  {/* Subtle petal highlight crease */}
                  <path
                    d="M 0,-15 C -2,-45 0,-75 0,-92"
                    stroke="rgba(255, 241, 242, 0.35)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </g>
              );
            })}

            {/* LAYER 2: Middle Petals (unfurl next with angle offset) */}
            {midPetals.map((petal) => {
              const scale = getPetalScale(petal.delay, 0.88);
              if (scale <= 0.01) return null;
              return (
                <g
                  key={petal.id}
                  transform={`rotate(${petal.angle}) scale(${scale})`}
                  style={{
                    transformOrigin: '0px 0px',
                    transition: 'transform 0.05s linear',
                  }}
                >
                  <path
                    d="M 0,0 C -26,-20 -38,-50 -24,-72 C -10,-84 10,-84 24,-72 C 38,-50 26,-20 0,0 Z"
                    fill="url(#petalMidGrad)"
                    stroke="rgba(255, 241, 242, 0.5)"
                    strokeWidth="0.8"
                    opacity={0.98}
                  />
                  {/* Inner petal shine */}
                  <path
                    d="M 0,-10 C -1,-35 0,-58 0,-74"
                    stroke="rgba(255, 255, 255, 0.45)"
                    strokeWidth="1"
                  />
                </g>
              );
            })}

            {/* LAYER 3: Inner Core Petals (tight rose heart unfolding) */}
            {innerPetals.map((petal) => {
              const scale = getPetalScale(petal.delay, 0.68);
              if (scale <= 0.01) return null;
              return (
                <g
                  key={petal.id}
                  transform={`rotate(${petal.angle}) scale(${scale})`}
                  style={{
                    transformOrigin: '0px 0px',
                  }}
                >
                  <path
                    d="M 0,0 C -20,-16 -28,-38 -16,-54 C -6,-64 6,-64 16,-54 C 28,-38 20,-16 0,0 Z"
                    fill="url(#petalInnerGrad)"
                    stroke="rgba(255, 255, 255, 0.6)"
                    strokeWidth="0.8"
                  />
                </g>
              );
            })}

            {/* LAYER 4: Golden Stamen & Shimmering Pistil Center */}
            {bloomProgress > 0.65 && (
              <g
                transform={`scale(${Math.min(1, (bloomProgress - 0.65) / 0.35)})`}
                style={{ transformOrigin: '0px 0px' }}
              >
                {/* Core warm glowing sphere */}
                <circle cx="0" cy="0" r="16" fill="url(#centerGlowGrad)" />

                {/* Stamen stamens radiating outward */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((stamenAngle, idx) => (
                  <g key={idx} transform={`rotate(${stamenAngle})`}>
                    <line
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="-15"
                      stroke="#fbbf24"
                      strokeWidth="1"
                    />
                    <circle
                      cx="0"
                      cy="-15"
                      r="1.8"
                      fill="#fef08a"
                      filter="url(#glowEffect)"
                    />
                  </g>
                ))}

                {/* Central golden heart dot */}
                <circle cx="0" cy="0" r="4.5" fill="#fef08a" />
              </g>
            )}

            {/* Shimmering sparkles on the petals when in full bloom */}
            {bloomProgress >= 0.9 && (
              <g className="animate-pulse-subtle">
                <circle cx="-32" cy="-45" r="2" fill="#ffffff" opacity="0.8" />
                <circle cx="28" cy="-52" r="1.8" fill="#ffffff" opacity="0.85" />
                <circle cx="36" cy="18" r="1.5" fill="#fef08a" opacity="0.9" />
                <circle cx="-25" cy="22" r="1.6" fill="#fef08a" opacity="0.9" />
                <circle cx="0" cy="-65" r="2.2" fill="#ffffff" opacity="0.95" />
              </g>
            )}

            {/* SPARKLE BURST UPON FULL BLOOM COMPLETION */}
            {sparkleBurst && (
              <g className="animate-ping" opacity="0.85">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
                  <circle
                    key={ang}
                    cx={Math.cos((ang * Math.PI) / 180) * 85}
                    cy={Math.sin((ang * Math.PI) / 180) * 85}
                    r="3.5"
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
