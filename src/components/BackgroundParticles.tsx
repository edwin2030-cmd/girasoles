import React, { useEffect, useRef } from 'react';
import { Particle } from '../types';
import { APP_CONFIG } from '../config';

interface BackgroundParticlesProps {
  speedMultiplier?: number;
  extraPetalRain?: boolean;
  windBurst?: boolean;
  firefliesActive?: boolean;
}

export const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({
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

    // Generate golden sunflower petals, solar dust and sparkles
    const count = Math.min(Math.floor((width * height) / 12000), 80) + (extraPetalRain ? 45 : 0);
    const particles: Particle[] = [];

    const petalColors = ['#f59e0b', '#fbbf24', '#facc15', '#eab308', '#fef08a'];
    const dustColors = ['#fef08a', '#fde047', '#fed7aa', '#ffffff', '#fef9c3'];

    for (let i = 0; i < count; i++) {
      const isPetal = Math.random() < 0.35 || extraPetalRain;
      particles.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: isPetal ? Math.random() * 8 + 8 : Math.random() * 2.8 + 1,
        speedX: ((Math.random() - 0.4) * 0.6 + (windBurst ? 1.8 : 0)) * speedMultiplier,
        speedY: (isPetal ? Math.random() * 0.7 + 0.3 : -(Math.random() * 0.5 + 0.2)) * speedMultiplier,
        opacity: Math.random() * 0.65 + 0.25,
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
      context.globalAlpha = opacity * 0.88;
      context.shadowColor = color;
      context.shadowBlur = 8;
      context.fill();

      // Subtle center vein
      context.beginPath();
      context.moveTo(0, -size * 0.8);
      context.lineTo(0, size * 0.7);
      context.strokeStyle = '#fef9c3';
      context.lineWidth = 0.8;
      context.globalAlpha = opacity * 0.5;
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
      const spikes = 4;
      const step = Math.PI / spikes;
      let rot = (Math.PI / 2) * 3;
      const outerRadius = size * 2.2;
      const innerRadius = size * 0.5;

      context.moveTo(0, -outerRadius);
      for (let i = 0; i < spikes; i++) {
        let px = Math.cos(rot) * outerRadius;
        let py = Math.sin(rot) * outerRadius;
        context.lineTo(px, py);
        rot += step;
        px = Math.cos(rot) * innerRadius;
        py = Math.sin(rot) * innerRadius;
        context.lineTo(px, py);
        rot += step;
      }
      context.closePath();
      context.fillStyle = color;
      context.globalAlpha = opacity;
      context.shadowColor = color;
      context.shadowBlur = 8;
      context.fill();
      context.restore();
    };

    let tick = 0;

    const render = () => {
      tick += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Deep golden twilight sky gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, APP_CONFIG.colors.backgroundStart);
      bgGrad.addColorStop(0.55, APP_CONFIG.colors.backgroundMid);
      bgGrad.addColorStop(1, APP_CONFIG.colors.backgroundEnd);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Warm radial sun glow centered around the tree crown
      const radialGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.65,
        30,
        width * 0.5,
        height * 0.65,
        Math.max(width, height) * 0.7
      );
      radialGlow.addColorStop(0, 'rgba(251, 191, 36, 0.22)');
      radialGlow.addColorStop(0.4, 'rgba(217, 119, 6, 0.1)');
      radialGlow.addColorStop(0.8, 'rgba(120, 53, 15, 0.04)');
      radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Twinkling golden stars in the night sky
      for (let i = 0; i < 30; i++) {
        const starX = (width * ((i * 41) % 100)) / 100;
        const starY = (height * 0.45 * ((i * 29) % 100)) / 100;
        const starBrightness = 0.2 + 0.35 * Math.sin(tick * 1.8 + i);
        ctx.fillStyle = i % 2 === 0 ? '#fef08a' : '#ffffff';
        ctx.globalAlpha = Math.max(0.05, starBrightness);
        ctx.beginPath();
        ctx.arc(starX, starY, i % 4 === 0 ? 1.8 : 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Fireflies wandering in the warm garden air
      if (firefliesActive) {
        for (let j = 0; j < 14; j++) {
          const fx = width * 0.5 + Math.sin(tick * 0.8 + j * 1.5) * (width * 0.38);
          const fy = height * 0.6 + Math.cos(tick * 1.1 + j * 2.2) * (height * 0.25);
          const fGlow = 0.3 + 0.5 * Math.sin(tick * 3 + j);

          ctx.save();
          ctx.beginPath();
          ctx.arc(fx, fy, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#fef08a';
          ctx.globalAlpha = Math.max(0, fGlow);
          ctx.shadowColor = '#fbbf24';
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.restore();
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
          ctx.globalAlpha = pulseOpacity;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.restore();
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
