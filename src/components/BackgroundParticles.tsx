import React, { useEffect, useRef } from 'react';
import { Particle } from '../types';
import { APP_CONFIG } from '../config';

interface BackgroundParticlesProps {
  speedMultiplier?: number;
  extraPetalRain?: boolean;
  windBurst?: boolean;
  firefliesActive?: boolean;
}

const BackgroundParticlesComponent: React.FC<BackgroundParticlesProps> = ({
  speedMultiplier = 1,
  extraPetalRain = false,
  windBurst = false,
  firefliesActive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate warm golden sunflower petals and sunlit pollen motes
    const count = Math.min(Math.floor((width * height) / 14000), 75) + (extraPetalRain ? 45 : 0);
    const particles: Particle[] = [];

    const petalColors = ['#f59e0b', '#fbbf24', '#facc15', '#eab308', '#d97706'];
    const dustColors = ['#d97706', '#b45309', '#ca8a04', '#eab308', '#f59e0b'];

    for (let i = 0; i < count; i++) {
      const isPetal = Math.random() < 0.4 || extraPetalRain;
      particles.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: isPetal ? Math.random() * 7 + 7 : Math.random() * 2.5 + 1.2,
        speedX: ((Math.random() - 0.4) * 0.5 + (windBurst ? 1.8 : 0)) * speedMultiplier,
        speedY: (isPetal ? Math.random() * 0.7 + 0.35 : -(Math.random() * 0.4 + 0.15)) * speedMultiplier,
        opacity: Math.random() * 0.55 + 0.25,
        color: isPetal
          ? petalColors[Math.floor(Math.random() * petalColors.length)]
          : dustColors[Math.floor(Math.random() * dustColors.length)],
        type: isPetal ? 'petal' : Math.random() < 0.4 ? 'sparkle' : 'dust',
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
      });
    }

    // Helper to draw an organic curved sunflower petal
    const drawSunflowerPetal = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
      rotation: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();
      context.moveTo(0, -size);
      context.bezierCurveTo(size * 0.45, -size * 0.3, size * 0.35, size * 0.5, 0, size * 0.9);
      context.bezierCurveTo(-size * 0.35, size * 0.5, -size * 0.45, -size * 0.3, 0, -size);
      context.closePath();
      context.fillStyle = color;
      context.globalAlpha = opacity * 0.9;
      context.fill();

      // Subtle center vein
      context.beginPath();
      context.moveTo(0, -size * 0.8);
      context.lineTo(0, size * 0.7);
      context.strokeStyle = '#fffbeb';
      context.lineWidth = 0.65;
      context.globalAlpha = opacity * 0.45;
      context.stroke();

      context.restore();
    };

    // Helper to draw a 4-point sparkle star
    const drawSparkle = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number
    ) => {
      context.save();
      context.translate(x, y);
      context.beginPath();
      context.moveTo(0, -size);
      context.lineTo(size * 0.2, -size * 0.2);
      context.lineTo(size, 0);
      context.lineTo(size * 0.2, size * 0.2);
      context.lineTo(0, size);
      context.lineTo(-size * 0.2, size * 0.2);
      context.lineTo(-size, 0);
      context.lineTo(-size * 0.2, -size * 0.2);
      context.closePath();
      context.fillStyle = color;
      context.globalAlpha = opacity * 0.9;
      context.fill();
      context.restore();
    };

    let tick = 0;

    // Pre-create background gradient
    let bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, APP_CONFIG.colors.backgroundStart);
    bgGrad.addColorStop(0.5, APP_CONFIG.colors.backgroundMid);
    bgGrad.addColorStop(1, APP_CONFIG.colors.backgroundEnd);

    const render = () => {
      tick += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Warm beige background gradient
      ctx.globalAlpha = 1;
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle warm sunlit ambient glow in upper center
      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.45, Math.min(width, height) * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 158, 11, 0.07)';
      ctx.fill();

      // Soft sunlit pollen dust floating gently in the air
      for (let i = 0; i < 24; i++) {
        const dustX = (width * ((i * 37) % 100)) / 100 + Math.sin(tick * 0.6 + i) * 12;
        const dustY = (height * 0.65 * ((i * 23) % 100)) / 100 + Math.cos(tick * 0.5 + i) * 10;
        const dustBrightness = 0.15 + 0.25 * Math.sin(tick * 1.5 + i);
        ctx.fillStyle = i % 2 === 0 ? '#d97706' : '#b45309';
        ctx.globalAlpha = Math.max(0.04, dustBrightness * 0.4);
        ctx.beginPath();
        ctx.arc(dustX, dustY, i % 3 === 0 ? 1.6 : 1.0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Golden sparkles / fireflies in the warm air
      if (firefliesActive) {
        for (let j = 0; j < 10; j++) {
          const fx = width * 0.5 + Math.sin(tick * 0.8 + j * 1.5) * (width * 0.38);
          const fy = height * 0.5 + Math.cos(tick * 1.1 + j * 2.2) * (height * 0.28);
          const fGlow = 0.3 + 0.5 * Math.sin(tick * 3 + j);

          ctx.beginPath();
          ctx.arc(fx, fy, 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(245, 158, 11, 0.28)';
          ctx.globalAlpha = Math.max(0, fGlow * 0.5);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(fx, fy, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = '#f59e0b';
          ctx.globalAlpha = Math.max(0, fGlow * 0.8);
          ctx.fill();
        }
      }

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX + Math.sin(tick + p.id) * 0.3;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Wrap around boundaries
        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        } else if (p.y > height + 30) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        const pulseOpacity = p.opacity * (0.8 + 0.2 * Math.sin(tick * 2 + p.id));

        if (p.type === 'petal') {
          drawSunflowerPetal(ctx, p.x, p.y, p.size, p.color, pulseOpacity, p.rotation);
        } else if (p.type === 'sparkle') {
          drawSparkle(ctx, p.x, p.y, p.size, p.color, pulseOpacity);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = pulseOpacity * 0.6;
          ctx.fill();
          contextRestore: ctx.restore();
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speedMultiplier, extraPetalRain, windBurst, firefliesActive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export const BackgroundParticles = React.memo(BackgroundParticlesComponent);
