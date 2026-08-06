"use client";

import { useEffect, useRef } from "react";

export default function AdminBackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      if (!canvas) return;
      // Fixed viewport tracking covering 100% screen top-to-bottom
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Particle nodes definition
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
    }

    const particles: Particle[] = [];
    const colors = ["#fe8220", "#482dbf", "#6b46c1", "#3182ce", "#ed8936"];

    // Initialize floating particle nodes
    const initParticles = () => {
      particles.length = 0;
      const w = window.innerWidth;
      const h = window.innerHeight;
      for (let i = 0; i < 55; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius: Math.random() * 3.5 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.5 + 0.25,
        });
      }
    };

    initParticles();

    let waveOffset = 0;

    const render = () => {
      const width = canvas.width || window.innerWidth;
      const height = canvas.height || window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw animated fluid background gradient covering full viewport top-to-bottom
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "rgba(248, 247, 244, 0.96)");
      grad.addColorStop(0.5, "rgba(242, 238, 255, 0.88)");
      grad.addColorStop(1, "rgba(255, 245, 235, 0.92)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw animated vector wave 1
      waveOffset += 0.009;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.55);
      for (let x = 0; x <= width; x += 30) {
        const y = Math.sin(x * 0.003 + waveOffset) * 55 + Math.cos(x * 0.002 + waveOffset * 0.8) * 30 + height * 0.65;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const waveGrad1 = ctx.createLinearGradient(0, height * 0.4, width, height);
      waveGrad1.addColorStop(0, "rgba(254, 130, 32, 0.11)");
      waveGrad1.addColorStop(1, "rgba(72, 45, 191, 0.08)");
      ctx.fillStyle = waveGrad1;
      ctx.fill();

      // 3. Draw animated vector wave 2
      ctx.beginPath();
      ctx.moveTo(0, height * 0.35);
      for (let x = 0; x <= width; x += 30) {
        const y = Math.cos(x * 0.0025 - waveOffset * 1.2) * 65 + Math.sin(x * 0.004 + waveOffset) * 35 + height * 0.45;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const waveGrad2 = ctx.createLinearGradient(0, height * 0.2, width, height);
      waveGrad2.addColorStop(0, "rgba(72, 45, 191, 0.09)");
      waveGrad2.addColorStop(1, "rgba(254, 130, 32, 0.07)");
      ctx.fillStyle = waveGrad2;
      ctx.fill();

      // 4. Update & Draw floating particle nodes + constellation connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Connect nearby nodes with subtle constellation lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 150) * 0.22;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
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
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
