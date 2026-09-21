import React, { useState, useEffect, useRef, useCallback } from 'react';
import { APP_CONFIG } from './config';
import { BackgroundParticles } from './components/BackgroundParticles';
import { SoilGround } from './components/SoilGround';
import { FallingSunflowerIntro } from './components/FallingSunflowerIntro';
import { SunflowerTree, SunflowerTreeState } from './components/SunflowerTree';
import { GardenFlowers } from './components/GardenFlowers';
import { RomanticLetter } from './components/RomanticLetter';
import { FriendLettersPanel } from './components/FriendLettersPanel';
import { InteractiveTouchLayer } from './components/InteractiveTouchLayer';
import { GardenPanel } from './components/Panels/GardenPanel';
import { NavBar } from './components/Panels/NavBar';
import { ActivePanel } from './types';

export default function App() {
  // Dedication texts for Génesis 16th Birthday
  const [greeting] = useState(APP_CONFIG.message.greeting);
  const [bodyText] = useState(APP_CONFIG.message.body);
  const [closingText] = useState(APP_CONFIG.message.closing);
  const [senderText] = useState(APP_CONFIG.message.sender);
  const [badgeText] = useState(APP_CONFIG.message.badge);

  // Interaction journey state: starts when the user clicks the initial yellow flower
  const [hasStarted, setHasStarted] = useState(false);

  // Navigation Panel State ('letter' | 'garden')
  const [activePanel, setActivePanel] = useState<ActivePanel>('letter');
  const [isLetterOpen, setIsLetterOpen] = useState(true);

  // Magic Garden Interaction States
  const [extraPetalRain, setExtraPetalRain] = useState(false);
  const [windBurst, setWindBurst] = useState(false);
  const [firefliesActive, setFirefliesActive] = useState(true);

  // Animation sequence states
  const [soilVisible] = useState(true);
  const [fallingFlower, setFallingFlower] = useState({
    visible: true,
    progress: 0,
    landingGlow: 0,
    fadeOpacity: 1,
  });

  const [treeState, setTreeState] = useState<SunflowerTreeState>({
    trunkProgress: 0,
    branchProgress: 0,
    bloomProgress: 0,
    sparkleBurst: false,
    swayAngle: 0,
  });

  const [rootLength, setRootLength] = useState(0);
  const [gardenStarted, setGardenStarted] = useState(false);
  const [gardenProgress, setGardenProgress] = useState(0);
  const [messageVisible, setMessageVisible] = useState(false);

  // References
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Triggered when user clicks the initial hovering yellow flower
  const handleInitialFlowerClick = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);
    startTimeRef.current = Date.now();
  }, [hasStarted]);

  // Main High-Performance Animation Orchestrator (triggered upon initial flower click)
  useEffect(() => {
    if (!hasStarted) {
      // In the waiting phase, ensure initial state
      setFallingFlower({
        visible: true,
        progress: 0,
        landingGlow: 0,
        fadeOpacity: 1,
      });
      return;
    }

    const dur = APP_CONFIG.durations;
    if (!startTimeRef.current || startTimeRef.current === 0) {
      startTimeRef.current = Date.now();
    }

    // Timeline Calculation (ms) - Dynamic, graceful & fluid
    const T_FALL_START = 0;
    const T_FALL_END = dur.flowerFallDuration; // Flower descends to soil
    const T_FADE_DURATION = 900; // Flower dissolves softly into fertile ground
    const T_FADE_END = T_FALL_END + T_FADE_DURATION; // Flower is 100% dissolved here

    // Golden roots start penetrating into the ground as the flower's essence enters the soil
    const T_ROOTS_START = T_FALL_END + 150;
    const T_ROOTS_END = T_FADE_END + 450;

    // Strict constraint: Tree trunk only starts rising AFTER the flower has completely faded out!
    const T_TRUNK_START = T_FADE_END + 120;
    const T_TRUNK_END = T_TRUNK_START + dur.trunkGrowth;
    const T_BRANCH_START = T_TRUNK_START + dur.trunkGrowth * 0.35;
    const T_BRANCH_END = T_BRANCH_START + dur.branchExpand;
    const T_BLOOM_START = T_BRANCH_START + dur.branchExpand * 0.35;
    const T_BLOOM_END = T_BLOOM_START + dur.bloomDuration;
    const T_GARDEN_START = T_BLOOM_START + 250;
    const T_GARDEN_END = T_GARDEN_START + 1200;
    const T_MESSAGE_START = T_BLOOM_END + dur.messageDelay;
    const T_TOTAL_END = T_MESSAGE_START + 500;

    let sparkleTriggered = false;

    const tick = () => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current;

      // 1. Initial Falling Sunflower from top to soil & Fluid Soft Dissolution
      if (elapsed <= T_FALL_END) {
        const p = Math.min(1, elapsed / T_FALL_END);
        setFallingFlower({
          visible: true,
          progress: p,
          landingGlow: p > 0.82 ? (p - 0.82) / 0.18 : 0,
          fadeOpacity: 1,
        });
      } else if (elapsed <= T_FADE_END) {
        // Fluid, soft fading of the flower upon touching the soil
        const fadeProg = (elapsed - T_FALL_END) / T_FADE_DURATION;
        const opacity = Math.max(0, Math.cos((fadeProg * Math.PI) / 2));
        const glow = Math.sin(fadeProg * Math.PI);
        setFallingFlower({
          visible: true,
          progress: 1,
          landingGlow: glow,
          fadeOpacity: opacity,
        });
      } else {
        // Flower is completely gone before the tree begins to sprout
        setFallingFlower({
          visible: false,
          progress: 1,
          landingGlow: 0,
          fadeOpacity: 0,
        });
      }

      // 2. Roots in fertile soil
      if (elapsed >= T_ROOTS_START) {
        const rootProg = Math.min(1, (elapsed - T_ROOTS_START) / (T_ROOTS_END - T_ROOTS_START));
        setRootLength(rootProg);
      }

      // 3. Tree Trunk Growth (Begins strictly after flower has fully faded away)
      let trunkProg = 0;
      if (elapsed >= T_TRUNK_START) {
        trunkProg = Math.min(1, (elapsed - T_TRUNK_START) / (T_TRUNK_END - T_TRUNK_START));
      }

      // 4. Heart-Shaped Branches Expansion
      let branchProg = 0;
      if (elapsed >= T_BRANCH_START) {
        branchProg = Math.min(1, (elapsed - T_BRANCH_START) / (T_BRANCH_END - T_BRANCH_START));
      }

      // 5. Blooming Sunflowers on Heart Tree
      let bloomProg = 0;
      let isSparkle = false;
      if (elapsed >= T_BLOOM_START) {
        bloomProg = Math.min(1, (elapsed - T_BLOOM_START) / (T_BLOOM_END - T_BLOOM_START));

        if (bloomProg >= 0.95 && !sparkleTriggered) {
          sparkleTriggered = true;
          isSparkle = true;
          setTimeout(() => {
            setTreeState((prev) => ({ ...prev, sparkleBurst: false }));
          }, 1200);
        }
      }

      // Update tree state
      setTreeState((prev) => ({
        ...prev,
        trunkProgress: trunkProg,
        branchProgress: branchProg,
        bloomProgress: bloomProg,
        sparkleBurst: isSparkle ? true : prev.sparkleBurst,
      }));

      // 6. Surrounding Sunflower Garden
      if (elapsed >= T_GARDEN_START) {
        setGardenStarted(true);
        const gProg = Math.min(1, (elapsed - T_GARDEN_START) / (T_GARDEN_END - T_GARDEN_START));
        setGardenProgress(gProg);
      }

      // 7. Birthday Card Revelation
      if (elapsed >= T_MESSAGE_START) {
        setMessageVisible(true);
      }

      // Stop requesting animation frames once sequence reaches completion
      if (elapsed < T_TOTAL_END) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        // Guarantee 100% final state
        setRootLength(1);
        setGardenStarted(true);
        setGardenProgress(1);
        setMessageVisible(true);
        setTreeState((prev) => ({
          ...prev,
          trunkProgress: 1,
          branchProgress: 1,
          bloomProgress: 1,
        }));
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [hasStarted]);

  // Magic Garden Action Triggers
  const handleTriggerPetalRain = () => {
    setExtraPetalRain(true);
    setTimeout(() => setExtraPetalRain(false), 5000);
  };

  const handleTriggerWindBurst = () => {
    setWindBurst(true);
    setTreeState((prev) => ({ ...prev, swayAngle: 6 }));
    setTimeout(() => {
      setTreeState((prev) => ({ ...prev, swayAngle: -4 }));
      setTimeout(() => {
        setWindBurst(false);
      }, 1000);
    }, 450);
  };

  const handleTriggerFireflies = () => {
    setFirefliesActive((prev) => !prev);
  };

  const handlePlantRandomSunflower = () => {
    setTreeState((prev) => ({ ...prev, sparkleBurst: true }));
    setTimeout(() => {
      setTreeState((prev) => ({ ...prev, sparkleBurst: false }));
    }, 1200);
  };

  const handleTreeFlowerClick = () => {
    setTreeState((prev) => ({ ...prev, sparkleBurst: true }));
    setTimeout(() => {
      setTreeState((prev) => ({ ...prev, sparkleBurst: false }));
    }, 1000);
  };

  return (
    <main className="relative w-screen h-[100dvh] overflow-hidden select-none bg-[#f5eee4] text-stone-800 flex flex-col items-center justify-center">
      {/* 1. Warm Sunlit Canvas Particles & Golden Motes */}
      <BackgroundParticles
        speedMultiplier={1}
        extraPetalRain={extraPetalRain}
        windBurst={windBurst}
        firefliesActive={firefliesActive}
      />

      {/* 2. Initial Yellow Flower (Waiting for Click, then gracefully drops down) */}
      <FallingSunflowerIntro
        visible={fallingFlower.visible}
        progress={fallingFlower.progress}
        landingGlow={fallingFlower.landingGlow}
        fadeOpacity={fallingFlower.fadeOpacity}
        isWaitingForClick={!hasStarted}
        onClickFlower={handleInitialFlowerClick}
      />

      {/* Screen-wide click catcher during initial intro to ensure touch/click anywhere also starts the animation */}
      {!hasStarted && (
        <div
          onClick={handleInitialFlowerClick}
          onTouchStart={handleInitialFlowerClick}
          className="absolute inset-0 z-30 cursor-pointer bg-transparent"
          aria-label="Toca cualquier parte de la pantalla para comenzar"
        />
      )}

      {/* 3. Centerpiece Growing Heart-Shaped Sunflower Tree with Lush, Large Flowers (Emerges strictly after flower fades) */}
      {hasStarted && treeState.trunkProgress > 0 && (
        <SunflowerTree state={treeState} onFlowerClick={handleTreeFlowerClick} />
      )}

      {/* 4. Surrounding Garden of Blooming Yellow Sunflowers */}
      {hasStarted && (
        <GardenFlowers
          gardenStarted={gardenStarted}
          gardenProgress={gardenProgress}
        />
      )}

      {/* 5. Fertile Warm Earth Soil Mound & Golden Sprouting Roots */}
      <SoilGround visible={soilVisible} rootLength={rootLength} />

      {/* 6. Interactive Tap / Click Layer (Spawns mini sunflowers & sparkles - active only after starting) */}
      {hasStarted && <InteractiveTouchLayer />}

      {/* 7. Active Panels Container (Positioned gracefully in upper/mid center) */}
      <div className="relative z-30 w-full px-4 max-w-2xl mx-auto flex flex-col items-center justify-center -translate-y-8 sm:-translate-y-12">
        {/* Panel 1: Birthday Letter for Génesis */}
        {activePanel === 'letter' && messageVisible && isLetterOpen && (
          <RomanticLetter
            visible={messageVisible}
            badgeText={badgeText}
            greetingText={greeting}
            bodyText={bodyText}
            closingText={closingText}
            senderText={senderText}
            onClose={() => setIsLetterOpen(false)}
            onOpenFriendLetters={() => {
              setActivePanel('friend_letters');
              setIsLetterOpen(true);
            }}
          />
        )}

        {/* Panel 2: Three Special Friend Letters (Alicia, Elianis, Joice) */}
        {activePanel === 'friend_letters' && messageVisible && isLetterOpen && (
          <FriendLettersPanel
            visible={messageVisible}
            onClose={() => setIsLetterOpen(false)}
            onGoBackToMainLetter={() => {
              setActivePanel('letter');
              setIsLetterOpen(true);
            }}
          />
        )}

        {/* Panel 3: Interactive Garden Controls */}
        {activePanel === 'garden' && (
          <GardenPanel
            onTriggerPetalRain={handleTriggerPetalRain}
            onTriggerWindBurst={handleTriggerWindBurst}
            onTriggerFireflies={handleTriggerFireflies}
            onPlantRandomSunflower={handlePlantRandomSunflower}
            firefliesActive={firefliesActive}
            onClose={() => setActivePanel('letter')}
          />
        )}
      </div>

      {/* 8. Floating Navigation Tab Bar for switching panels (Carta, Mensajes & Jardín) */}
      {messageVisible && (
        <NavBar
          activePanel={activePanel}
          onSelectPanel={(panel) => {
            setActivePanel(panel);
            if (panel === 'letter' || panel === 'friend_letters') {
              setIsLetterOpen(true);
            }
          }}
          isLetterMinimized={!isLetterOpen}
        />
      )}

      {/* Subtle warm base shading for ground depth */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#63432d]/10 to-transparent pointer-events-none z-18" />
    </main>
  );
}
