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
  const [currentTime, setCurrentTime] = useState(0);

  // References
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Restart complete animation sequence from falling flower
  const startFullSequence = useCallback(() => {
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
      swayAngle: 0,
    });
    setRootLength(0);
    setGardenStarted(false);
    setGardenProgress(0);
    setMessageVisible(false);
    setActivePanel('letter');

    startTimeRef.current = Date.now();
  }, []);

  // Main Animation Orchestrator
  useEffect(() => {
    startFullSequence();

    const speed = APP_CONFIG.growthSpeed;
    const dur = APP_CONFIG.durations;

    // Timeline Calculation (ms)
    // 1. Flower falls from sky to soil
    const T_FALL_START = 200 / speed;
    const T_FALL_END = T_FALL_START + dur.flowerFallDuration / speed; // ~3200ms
    // 2. Roots penetrate soil
    const T_ROOTS_END = T_FALL_END + 1200 / speed;
    // 3. Tree trunk rises vertically
    const T_TRUNK_START = T_FALL_END + 400 / speed;
    const T_TRUNK_END = T_TRUNK_START + dur.trunkGrowth / speed; // ~3000ms
    // 4. Tree branches expand outwards widely ("que después se amplie")
    const T_BRANCH_START = T_TRUNK_START + (dur.trunkGrowth * 0.45) / speed;
    const T_BRANCH_END = T_BRANCH_START + dur.branchExpand / speed; // ~3500ms
    // 5. Sunflowers bloom across branches & crown
    const T_BLOOM_START = T_BRANCH_START + (dur.branchExpand * 0.4) / speed;
    const T_BLOOM_END = T_BLOOM_START + dur.bloomDuration / speed; // ~3000ms
    // 6. Surrounding sunflower garden emerges
    const T_GARDEN_START = T_BLOOM_START + 800 / speed;
    const T_GARDEN_END = T_GARDEN_START + 2500 / speed;
    // 7. Birthday card view expands
    const T_MESSAGE_START = T_BLOOM_END + dur.messageDelay / speed;

    let sparkleTriggered = false;

    const tick = () => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current;
      const tSec = elapsed / 1000;
      setCurrentTime(tSec);

      // Organic wind swaying
      const breezeSway = Math.sin(tSec * 1.6) * 1.8 + Math.cos(tSec * 0.9) * 0.8;

      // 1. Initial Falling Sunflower
      if (elapsed < T_FALL_START) {
        setFallingFlower({ visible: true, progress: 0, landingGlow: 0 });
      } else if (elapsed <= T_FALL_END) {
        const p = (elapsed - T_FALL_START) / (T_FALL_END - T_FALL_START);
        setFallingFlower({
          visible: true,
          progress: p,
          landingGlow: p > 0.85 ? (p - 0.85) / 0.15 : 0,
        });
      } else {
        // Landed & sprouted
        const afterLanding = elapsed - T_FALL_END;
        setFallingFlower({
          visible: afterLanding < 1400,
          progress: 1,
          landingGlow: Math.max(0, 1 - afterLanding / 1000),
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
          }, 1500);
        }
      }

      // Update tree state
      setTreeState((prev) => ({
        ...prev,
        trunkProgress: trunkProg,
        branchProgress: branchProg,
        bloomProgress: bloomProg,
        sparkleBurst: isSparkle ? true : prev.sparkleBurst,
        swayAngle: breezeSway,
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

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [startFullSequence]);

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
        currentTime={currentTime}
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
