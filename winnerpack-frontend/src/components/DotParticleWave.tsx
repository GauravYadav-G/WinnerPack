"use client";

import { useEffect, useRef } from "react";

export default function DotParticleWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let count = 0;

    const AMOUNT_X = 85;
    const AMOUNT_Y = 50;
    const SEPARATION = 42;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 700;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let ix = 0; ix < AMOUNT_X; ix++) {
        for (let iy = 0; iy < AMOUNT_Y; iy++) {
          // 3D Grid Position
          const x = (ix - AMOUNT_X / 2) * SEPARATION;
          const y = (iy - AMOUNT_Y / 2) * SEPARATION;
          
          // Undulating Sine Wave
          const z = Math.sin((ix + count) * 0.22) * 35 + Math.sin((iy + count) * 0.18) * 35;

          // 3D Perspective Projection
          const cameraDistance = 500;
          const perspective = cameraDistance / (cameraDistance + y * 0.5 + 350);
          
          const screenX = centerX + x * perspective;
          const screenY = centerY + (y * 0.35 - z) * perspective + 40;

          // Scale particle dot radius & muted opacity
          const radius = Math.max(0.8, (z + 40) / 20) * perspective * 1.4;
          const opacity = Math.min(0.45, Math.max(0.04, (iy / AMOUNT_Y) * 0.35 + (z + 40) / 180));

          if (screenX >= 0 && screenX <= canvas.width && screenY >= 0 && screenY <= canvas.height) {
            ctx.beginPath();
            ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(147, 197, 253, ${opacity})`; // Softer muted sky blue
            ctx.fill();
          }
        }
      }

      count += 0.03;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-25 w-full h-full"
    />
  );
}
