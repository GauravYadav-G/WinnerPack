import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [hidden, setHidden] = useState(true);
  const [hover, setHover] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 35, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 400, damping: 35, mass: 0.5 });
  const rx = useSpring(x, { stiffness: 200, damping: 25, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 200, damping: 25, mass: 0.6 });

  useEffect(() => {
    const checkDevice = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const isSmall = window.innerWidth < 768;
      setIsMobile(isTouch || isSmall);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 3);
      y.set(e.clientY - 3);
      rx.set(e.clientX - 20);
      ry.set(e.clientY - 20);
      setHidden(false);
    };
    const leave = () => setHidden(true);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-hover]")) setHover(true);
      else setHover(false);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseout", leave);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseout", leave);
      window.removeEventListener("mouseover", onOver);
    };
  }, [isMobile, x, y, rx, ry]);

  if (isMobile || hidden) return null;

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x: sx, y: sy }}
        animate={{ scale: hover ? 0 : 1 }}
      />
      <motion.div
        className={`cursor-ring ${hover ? "hover" : ""}`}
        style={{ x: rx, y: ry }}
      />
    </>
  );
}
