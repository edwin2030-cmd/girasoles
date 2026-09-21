export interface FlowerConfig {
  id: string;
  type: 'sunflower' | 'small_sunflower' | 'golden_blossom' | 'wild_sunflower';
  colorPalette: {
    petalPrimary: string;
    petalSecondary: string;
    petalHighlight: string;
    petalShadow: string;
    center: string;
    centerPollen: string;
    stem: string;
    stemHighlight: string;
    leaf: string;
    glow: string;
  };
  x: number; // percentage along width (0 - 100)
  groundY: number; // base Y percentage
  height: number; // stem length in px
  curvature: number; // stem curve (-1 to 1)
  size: number; // scale multiplier
  layer: 'back' | 'mid' | 'front';
  delay: number; // ms to start sprouting
  growthSpeed: number; // multiplier
  swaySpeed: number; // sway oscillation frequency
  swayAmount: number; // degrees of sway
  swayPhase: number;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  type: 'dust' | 'sparkle' | 'petal' | 'sunflower_seed';
  rotation: number;
  rotationSpeed: number;
}

export interface BirthdayWish {
  id: number;
  title: string;
  message: string;
  icon: string;
  opened: boolean;
}

export type ActivePanel = 'letter' | 'wishes' | 'garden' | 'customize';

export interface TouchRipple {
  id: number;
  x: number;
  y: number;
  color: string;
  createdAt: number;
}

export interface InteractiveClickFlower {
  id: number;
  x: number;
  y: number;
  color: string;
  scale: number;
  type: string;
  createdAt: number;
}

