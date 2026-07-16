import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, Truck, Star, Zap } from "lucide-react";

const rotatingWords = ["fastest", "strongest", "cleanest", "smartest"];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -12]);
  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 1, 0]);

  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % rotatingWords.length), 2400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, []);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden bg-[var(--color-ink)] text-white pt-20 md:pt-28">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-[0.20] pointer-events-none z-0"
      >
        <source src="/images/video/generate_an_video_for_hero_sec.mp4" type="video/mp4" />
      </video>

      {/* Background layers */}
      <div className="absolute inset-0 bg-grid-dark opacity-35 z-0" />
      <div className="absolute inset-x-0 -top-32 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(110,95,250,0.22),transparent_60%)] z-0" />

      {/* Parallax floating orbs */}
      <motion.div
        style={{ y: y2, rotate: rotate1, scale: scale1 }}
        className="pointer-events-none absolute -left-40 top-60 h-[500px] w-[500px] rounded-full bg-[var(--color-blue-deep)]/25 blur-3xl"
      />
      <motion.div
        style={{ y: y3, rotate: rotate2 }}
        className="pointer-events-none absolute -right-32 top-32 h-96 w-96 rounded-full bg-[var(--color-amber)]/18 blur-3xl"
      />

      {/* Floating decorative shapes */}
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="pointer-events-none absolute right-[12%] top-[28%] hidden h-16 w-16 lg:block"
      >
        <div className="h-full w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur" />
      </motion.div>
      <motion.div
        style={{ y: y3, rotate: rotate2 }}
        className="pointer-events-none absolute left-[8%] top-[55%] hidden h-12 w-12 rounded-full border border-white/10 bg-white/5 backdrop-blur lg:block"
      />


      {/* Side rails (desktop) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-8 border-r border-white/5 md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-8 border-r border-white/5 md:block" />

      <motion.div style={{ opacity }} className="relative mx-auto max-w-7xl px-5 pb-12 md:px-8 md:pb-32">


        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left content */}
          <div className="lg:col-span-7">


            <h1 className="font-display mt-5 text-[30px] font-bold leading-[0.95] tracking-[-0.035em] text-white sm:text-[44px] md:text-[64px] lg:text-[78px] xl:text-[84px]">
              <RevealLine delay={2.0}>
                The packaging line
              </RevealLine>
              <RevealLine delay={2.15}>
                behind India&apos;s
              </RevealLine>
              <RevealLine delay={2.3}>
                <span className="relative inline-flex items-baseline">
                  <span
                    className="relative z-10 italic font-light text-[var(--color-amber)]"
                    style={{ fontFamily: "Fraunces, serif" }}
                  >
                    {rotatingWords[wordIndex]}
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[var(--color-amber)]/40" />
                  <span className="ml-2 animate-blink text-[var(--color-amber)]">_</span>
                </span>{" "}
                goods.
              </RevealLine>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.5 }}
              className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 md:text-xl"
            >
              Strap rolls, shrink &amp; stretch films, BOPP tapes, protective wraps
              and packaging machinery — engineered in our Ghaziabad facility,
              dispatched to 1,200+ pin codes in 24 hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.65 }}
              className="mt-6 flex flex-wrap items-center gap-2.5 md:mt-9"
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--color-blue)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--color-blue)]/30 transition hover:bg-[var(--color-blue-2)]"
                data-hover
              >
                <span className="relative z-10">Request a quote</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
              <a
                href="#products"
                className="group inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 hover:border-white"
                data-hover
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[var(--color-ink)]">
                  <Play className="h-3 w-3 fill-[var(--color-ink)] text-[var(--color-ink)]" />
                </span>
                <span>Tour the facility</span>
                <span className="font-mono text-[10px] text-white/50">02:14</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.85 }}
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/60 md:mt-12 md:gap-x-7 md:text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[var(--color-amber)] text-[var(--color-amber)]" />
                  ))}
                </div>
                <span><strong className="font-semibold text-white">4.9/5</strong> from 220+ buyers</span>
              </div>
              <div className="hidden h-4 w-px bg-white/10 sm:block" />
              <div className="flex items-center gap-1.5 text-white/70">
                <ShieldCheck className="h-4 w-4 text-[var(--color-blue-3)]" />
                <span>BIS-grade raw materials</span>
              </div>
              <div className="hidden h-4 w-px bg-white/10 sm:block" />
              <div className="flex items-center gap-1.5 text-white/70">
                <Truck className="h-4 w-4 text-[var(--color-blue-3)]" />
                <span>24-hour dispatch</span>
              </div>
              <div className="hidden h-4 w-px bg-white/10 sm:block" />
              <div className="flex items-center gap-1.5 text-white/70">
                <Zap className="h-4 w-4 text-[var(--color-blue-3)]" />
                <span>48-hour custom runs</span>
              </div>
            </motion.div>
          </div>

          {/* Right visual — real factory photograph */}
          <motion.div
            style={{ y: y1 }}
            className="relative lg:col-span-5"
          >
            <FactoryVisual />
          </motion.div>
        </div>


      </motion.div>

      {/* Floating scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-9 w-5 rounded-full border border-[var(--color-ink)]/30 bg-white/50 backdrop-blur"
        >
          <motion.div
            animate={{ y: [4, 14, 4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mt-1 h-1.5 w-1 rounded-full bg-[var(--color-blue)]"
          />
        </motion.div>
        <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[var(--color-mute)]">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}

function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="split-line block">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.65, 0, 0.35, 1] }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function FactoryVisual() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 80, damping: 20 });
  const smy = useSpring(my, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth, h = window.innerHeight;
      mx.set((e.clientX / w - 0.5) * 16);
      my.set((e.clientY / h - 0.5) * 16);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 2.0 }}
      className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none"
    >
      {/* Glow */}
      <div className="absolute -inset-6 -z-10 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(110,95,250,0.30),transparent_70%)] blur-2xl" />

      {/* Main card with real photo */}
      <motion.div
        style={{ x: smx, y: smy }}
        className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-ink-2)] shadow-2xl shadow-black/80"
      >
        <div className="absolute inset-0 z-10 animate-scan h-px bg-[var(--color-amber)]/60" />

        {/* Real factory image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/desktop/hero/hero-factory.jpg')" }}
        />
        {/* Blue tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-blue-deep)]/45 via-transparent to-[var(--color-amber-dark)]/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/80 via-transparent to-transparent" />



        {/* Top right meta */}
        <div className="absolute right-4 top-4 z-10 font-mono text-[9px] font-semibold uppercase tracking-widest text-white/80">
          28.67°N · 77.44°E
        </div>


      </motion.div>


    </motion.div>
  );
}
