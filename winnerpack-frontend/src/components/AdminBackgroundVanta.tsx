"use client";

import { useEffect, useRef } from "react";

export default function AdminBackgroundVanta() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    let effectInstance: any = null;

    const initVanta = () => {
      const VANTA = (window as any).VANTA;
      if (VANTA && VANTA.FOG && containerRef.current && !effectInstance) {
        try {
          effectInstance = VANTA.FOG({
            el: containerRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: 0xffc300,
            midtoneColor: 0xff1f00,
            lowlightColor: 0x2d00ff,
            baseColor: 0xffebeb,
            blurFactor: 0.6,
            zoom: 1.00,
            speed: 1.00
          });
        } catch (e) {
          console.error("Vanta initialization failed:", e);
        }
      }
    };

    const loadScript = (src: string, callback: () => void) => {
      // Check if script is already present in document
      const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;
      
      if (existing) {
        // Check if global object is already available
        if (src.includes("three") && (window as any).THREE) {
          callback();
        } else if (src.includes("fog") && (window as any).VANTA?.FOG) {
          callback();
        } else {
          existing.addEventListener("load", callback);
        }
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = callback;
      document.body.appendChild(script);
    };

    // Sequentially load Three.js, then Vanta Fog
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js", () => {
      if (!active) return;
      loadScript("https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js", () => {
        if (!active) return;
        initVanta();
      });
    });

    return () => {
      active = false;
      if (effectInstance) {
        effectInstance.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#ffebeb]"
    />
  );
}
