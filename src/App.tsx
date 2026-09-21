import React, { useState, useEffect, useRef, useCallback } from 'react';
import { APP_CONFIG } from './config';
import { BackgroundParticles } from './components/BackgroundParticles';
import { SoilGround } from './components/SoilGround';
import { FallingSunflowerIntro } from './components/FallingSunflowerIntro';
import { SunflowerTree, SunflowerTreeState } from './components/SunflowerTree';
import { GardenFlowers } from './components/GardenFlowers';
import { RomanticLetter } from './components/RomanticLetter';
import { InteractiveTouchLayer } from './components/InteractiveTouchLayer';
import { AudioControl } from './components/AudioControl';
import { CustomizeModal } from './components/CustomizeModal';
import { WishesPanel } from './components/Panels/WishesPanel';
import { GardenPanel } from './components/Panels/GardenPanel';
import { NavBar } from './components/Panels/NavBar';
import { ActivePanel } from './types';
import { FastForward, Zap } from 'lucide-react';

export default function App() {
  // Configurable dedication texts for Génesis 16th Birthday
  const [recipientName, setRecipientName] = useState(APP_CONFIG.recipientName);
  const [greeting, setGreeting] = useState(APP_CONFIG.message.greeting);
  const [bodyText, setBodyText] = useState(APP_CONFIG.message.body);
  const [closingText, setClosingText] = useState(APP_CONFIG.message.closing);
  const [senderText, setSenderText] = useState(APP_CONFIG.message.sender);
  const [badgeText, setBadgeText] = useState('🌻 DULCES 16 • GÉNESIS ✨');

  // Navigation Panel State ('letter' | 'wishes' | 'garden' | 'customize')
  const [activePanel, setActivePanel] = useState<ActivePanel>('letter');
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [wishesDiscoveredCount, setWishesDiscoveredCount] = useState(1);

  // Magic Garden Interaction States
  const [extraPetalRain, setExtraPetalRain] = useState(false);
  const [windBurst, setWindBurst] = useState(false);
  const [firefliesActive, setFirefliesActive] = useState(true);

  // Animation sequence states
  const [soilVisible, setSoilVisible] = useState(true);
  const [fallingFlower, setFallingFlower] = useState({
    visible: true,
    progress: 0,
    landingGlow: 0,
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
  const [animSpeed, setAnimSpeed] = useState<number>(1.0);

  // References
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Fast-forward / Skip directly to full bloom and birthday card
  const handleSkipIntro = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setFallingFlower({
      visible: false,
      progress: 1,
      landingGlow: 0,
    });
    setRootLength(1);
    setGardenStarted(true);
    setGardenProgress(1);
    setTreeState({
      trunkProgress: 1,
      branchProgress: 1,
      bloomProgress: 1,
      sparkleBurst: true,
    });
    setMessageVisible(true);
    setActivePanel('letter');
    setTimeout(() => {
      setTreeState((prev) => ({ ...prev, sparkleBurst: false }));
    }, 1200);
  }, []);

  // Restart complete animation sequence from falling flower
  const startFullSequence = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setSoilVisible(true);
    setFallingFlower({
      visible: true,
      progress: 0,
      landingGlow: 0,
    });
    setTreeState({
      trunkProgress: 0,
      branchProgress: 0,
      bloomProgress: 0,
      sparkleBurst: false,
    });
    setRootLength(0);
    setGardenStarted(false);
    setGardenProgress(0);
    setMessageVisible(false);
    setActivePanel('letter');

    startTimeRef.current = Date.now();
  }, []);

  // Main High-Performance Animation Orchestrator
  useEffect(() => {
    startFullSequence();

    const speed = APP_CONFIG.growthSpeed * animSpeed;
    const dur = APP_CONFIG.durations;

    // Timeline Calculation (ms) - Dynamic, snappy & lively
    const T_FALL_START = dur.flowerFallDelay / speed;
    const T_FALL_END = T_FALL_START + dur.flowerFallDuration / speed;
    const T_ROOTS_END = T_FALL_END + dur.rootGrowth / speed;
    const T_TRUNK_START = T_FALL_END + 150 / speed;
    const T_TRUNK_END = T_TRUNK_START + dur.trunkGrowth / speed;
    const T_BRANCH_START = T_TRUNK_START + (dur.trunkGrowth * 0.35) / speed;
    const T_BRANCH_END = T_BRANCH_START + dur.branchExpand / speed;
    const T_BLOOM_START = T_BRANCH_START + (dur.branchExpand * 0.35) / speed;
    const T_BLOOM_END = T_BLOOM_START + dur.bloomDuration / speed;
    const T_GARDEN_START = T_BLOOM_START + 250 / speed;
    const T_GARDEN_END = T_GARDEN_START + 1200 / speed;
    const T_MESSAGE_START = T_BLOOM_END + dur.messageDelay / speed;
    const T_TOTAL_END = T_MESSAGE_START + 500 / speed;

    let sparkleTriggered = false;

    const tick = () => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current;

      // 1. Initial Falling Sunflower
      if (elapsed < T_FALL_START) {
        setFallingFlower({ visible: true, progress: 0, landingGlow: 0 });
      } else if (elapsed <= T_FALL_END) {
        const p = (elapsed - T_FALL_START) / (T_FALL_END - T_FALL_START);
        setFallingFlower({
          visible: true,
          progress: p,
          landingGlow: p > 0.82 ? (p - 0.82) / 0.18 : 0,
        });
      } else {
        const afterLanding = elapsed - T_FALL_END;
        setFallingFlower({
          visible: afterLanding < 800,
          progress: 1,
          landingGlow: Math.max(0, 1 - afterLanding / 600),
        });
      }

      // 2. Roots in soil
      if (elapsed >= T_FALL_END) {
        const rootProg = Math.min(1, (elapsed - T_FALL_END) / (T_ROOTS_END - T_FALL_END));
        setRootLength(rootProg);
      }

      // 3. Tree Trunk Growth
      let trunkProg = 0;
      if (elapsed >= T_TRUNK_START) {
        trunkProg = Math.min(1, (elapsed - T_TRUNK_START) / (T_TRUNK_END - T_TRUNK_START));
      }

      // 4. Tree Branch Expansion
      let branchProg = 0;
      if (elapsed >= T_BRANCH_START) {
        branchProg = Math.min(1, (elapsed - T_BRANCH_START) / (T_BRANCH_END - T_BRANCH_START));
      }

      // 5. Blooming Sunflowers on Tree
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

      // Stop requesting animation frames once sequence reaches completion (frees 100% CPU!)
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
  }, [startFullSequence, animSpeed]);

  // Magic Garden Action Triggers
  const handleTriggerPetalRain = () => {
    setExtraPetalRain(true);
    setTimeout(() => setExtraPetalRain(false), 5000);
  };

  const handleTriggerWindBurst = () => {
    setWindBurst(true);
    setTreeState((prev) => ({ ...prev, swayAngle: 8 }));
    setTimeout(() => {
      setTreeState((prev) => ({ ...prev, swayAngle: -6 }));
      setTimeout(() => {
        setWindBurst(false);
      }, 1000);
    }, 450);
  };

  const handleTriggerFireflies = () => {
    setFirefliesActive((prev) => !prev);
  };

  const handlePlantRandomSunflower = () => {
    // Triggers petal shower and tree sparkle
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
    <main className="relative w-screen h-[100dvh] overflow-hidden select-none bg-[#120803] flex flex-col items-center justify-center">
      {/* 1. Golden Twilight Canvas Particles & Fireflies */}
      <BackgroundParticles
        speedMultiplier={1}
        extraPetalRain={extraPetalRain}
        windBurst={windBurst}
        firefliesActive={firefliesActive}
      />

      {/* 2. Top-Right Audio Controller with Starboy Instrumental Beat */}
      <AudioControl />

      {/* Quick Skip & Speed Pill Bar during Intro */}
      {!messageVisible && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-stone-900/80 backdrop-blur-md border border-amber-500/40 rounded-full px-3 py-1.5 shadow-xl shadow-black/50 text-xs font-medium text-amber-100">
          <button
            type="button"
            onClick={handleSkipIntro}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-semibold shadow transition-all active:scale-95 cursor-pointer"
            title="Saltar animación y ver el mensaje directamente"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Saltar animación</span>
          </button>
          <span className="text-amber-500/40">|</span>
          <button
            type="button"
            onClick={() => setAnimSpeed((prev) => (prev === 1.0 ? 1.8 : 1.0))}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950/60 hover:bg-amber-900/70 text-amber-200 transition-colors cursor-pointer"
            title="Acelerar velocidad de animación"
          >
            <Zap className="w-3 h-3 text-yellow-400" />
            <span>{animSpeed > 1 ? '2x Rápido' : '1x Normal'}</span>
          </button>
        </div>
      )}

      {/* 3. Initial Falling Yellow Sunflower Sequence */}
      <FallingSunflowerIntro
        visible={fallingFlower.visible}
        progress={fallingFlower.progress}
        landingGlow={fallingFlower.landingGlow}
      />

      {/* 4. Centerpiece Growing & Expanding Sunflower Tree */}
      <SunflowerTree state={treeState} onFlowerClick={handleTreeFlowerClick} />

      {/* 5. Surrounding Garden of Blooming Yellow Sunflowers */}
      <GardenFlowers
        gardenStarted={gardenStarted}
        gardenProgress={gardenProgress}
      />

      {/* 6. Fertile Soil Mound & Golden Sprouting Roots */}
      <SoilGround visible={soilVisible} rootLength={rootLength} />

      {/* 7. Interactive Tap / Click Layer (Spawns mini sunflowers & sparkles) */}
      <InteractiveTouchLayer />

      {/* 8. Active Panels Container (Positioned gracefully in upper/mid center) */}
      <div className="relative z-30 w-full px-4 max-w-2xl mx-auto flex flex-col items-center justify-center -translate-y-8 sm:-translate-y-12">
        {/* Panel 1: Birthday Letter for Génesis */}
        {activePanel === 'letter' && (
          <RomanticLetter
            visible={messageVisible}
            badgeText={badgeText}
            greetingText={greeting}
            bodyText={bodyText}
            closingText={closingText}
            senderText={senderText}
            onRestart={startFullSequence}
            onOpenWishes={() => setActivePanel('wishes')}
            onOpenCustomize={() => setIsCustomizeOpen(true)}
          />
        )}

        {/* Panel 2: 16 Wishes for her 16th Birthday */}
        {activePanel === 'wishes' && (
          <WishesPanel
            onWishDiscovered={(count) => setWishesDiscoveredCount(count)}
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
          />
        )}
      </div>

      {/* 9. Floating Navigation Tab Bar for switching panels */}
      {messageVisible && (
        <NavBar
          activePanel={activePanel}
          onSelectPanel={(panel) => {
            if (panel === 'customize') {
              setIsCustomizeOpen(true);
            } else {
              setActivePanel(panel);
            }
          }}
          wishesDiscoveredCount={wishesDiscoveredCount}
        />
      )}

      {/* 10. Customization Modal */}
      <CustomizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        currentData={{
          greeting,
          message: bodyText,
          closing: closingText,
          sender: senderText,
          badge: badgeText,
        }}
        onSave={(data) => {
          setGreeting(data.greeting);
          setBodyText(data.message);
          setClosingText(data.closing);
          setSenderText(data.sender);
          setBadgeText(data.badge);
        }}
      />

      {/* Bottom atmospheric dark gradient for depth */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-18" />
    </main>
  );
}
