import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

const steps = [
  {
    n: "01",
    phase: "Discovery",
    title: "Tell us your line.",
    body: "Share your SKU, payload profile and dispatch rhythm. Our team scopes the right strapping, shrink film or courier packaging for your operation.",
    deliverable: "Requirement scoping",
    icon: "M3 12h18M12 3v18",
  },
  {
    n: "02",
    phase: "Sample",
    title: "Material in your hands.",
    body: "We share a sample of the exact gauge, width and grade — PP/PET strap, shrink film or bubble roll — so you can test it before committing.",
    deliverable: "Sample dispatch",
    icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
  },
  {
    n: "03",
    phase: "Trial",
    title: "Line qualification.",
    body: "For strapping, shrink wrapping and taping machines, our team helps set up and tune equipment against your throughput and operator handling.",
    deliverable: "Machine setup support",
    icon: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83",
  },
  {
    n: "04",
    phase: "Order",
    title: "Confirmed pricing.",
    body: "We quote based on your volume and material spec, and confirm terms before production and delivery are scheduled.",
    deliverable: "Quote & confirmation",
    icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  },
  {
    n: "05",
    phase: "Dispatch",
    title: "Delivered from Ghaziabad.",
    body: "Orders are dispatched from our Ghaziabad, UP base and delivered to your site as per the scheduled timeframe.",
    deliverable: "Scheduled delivery",
    icon: "M16 3h5v5M21 3l-7 7M8 21H3v-5M3 21l7-7M21 16v5h-5M14 14l7 7M3 8V3h5M3 3l7 7",
  },
  {
    n: "06",
    phase: "Support",
    title: "Ongoing service.",
    body: "We stay on for spares, machine servicing and repeat supply of strap rolls, films and packaging tools as your needs continue.",
    deliverable: "Service & repeat supply",
    icon: "M3 12a9 9 0 0 1 15-6.7L21 8 M21 3v5h-5 M21 12a9 9 0 0 1-15 6.7L3 16 M3 21v-5h5",
  },
];

interface StepCardProps {
  s: typeof steps[0];
  scrollYProgress: any;
  isMobile: boolean;
  startProgress: number;
  endProgress: number;
}

function StepCard({ s, scrollYProgress, isMobile, startProgress, endProgress }: StepCardProps) {
  const opacity = useTransform(scrollYProgress, [startProgress, endProgress], [0.15, 1]);
  const y = useTransform(scrollYProgress, [startProgress, endProgress], [35, 0]);
  const scale = useTransform(scrollYProgress, [startProgress, endProgress], [0.96, 1]);

  const dotBorderColor = useTransform(
    scrollYProgress,
    [startProgress, startProgress + 0.05],
    ["rgba(255, 255, 255, 0.3)", "#F59E0B"]
  );
  const dotBgColor = useTransform(
    scrollYProgress,
    [startProgress, startProgress + 0.05],
    ["#06101F", "#F59E0B"]
  );

  return (
    <motion.div
      style={!isMobile ? { opacity, y, scale } : {}}
      className="group relative w-[300px] flex-shrink-0 snap-start md:w-auto"
      data-hover
    >
      {/* Dot on the line */}
      <div className="absolute left-8 top-[-20px] z-10 hidden h-4 w-4 -translate-y-1/2 items-center justify-center md:flex">
        <motion.div
          style={!isMobile ? { borderColor: dotBorderColor, backgroundColor: dotBgColor } : {}}
          className="h-4 w-4 rounded-full border-2 transition-all duration-300"
        />
      </div>

      <div className="relative h-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:border-[var(--color-blue-2)]/50 group-hover:bg-white/[0.06]">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-display text-2xl font-bold text-white/30 transition-colors group-hover:text-white/50">
            {s.n}
          </span>
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[var(--color-blue-3)]">
            {s.phase}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold leading-tight text-white md:text-2xl">
          {s.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          {s.body}
        </p>

        <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4">
          <ArrowUpRight className="h-3.5 w-3.5 text-[var(--color-amber)]" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-white/70">
            {s.deliverable}
          </span>
        </div>

        {/* Glow on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
          <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-[var(--color-blue)]/20 via-transparent to-[var(--color-amber)]/10" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "start 0%"]
  });

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineGlow = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="hidden md:block relative overflow-hidden bg-[var(--color-ink)] py-10 text-white md:py-20">
      {/* Background atmosphere */}
      <div className="bg-noise absolute inset-0" />
      <div className="absolute inset-0 bg-grid-dark opacity-40" />
      <div className="absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--color-blue)]/15 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 translate-x-1/2 rounded-full bg-[var(--color-amber)]/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 grid items-end gap-8 md:grid-cols-12" data-reveal>
          <div className="md:col-span-7">
            <h2 className="font-display text-2xl font-bold leading-[1.1] tracking-tight text-white sm:text-3xl md:text-5xl text-balance">
              How a buyer becomes a long-term partner.
            </h2>
          </div>
          <div className="md:col-span-5 md:pl-8">
            <p className="text-base leading-relaxed text-white/65 md:text-lg">
              Winner Pack Technologies has followed the same process since 2018 —
              from a first sample to repeat supply — for strap rolls, shrink films
              and packaging machines out of our Ghaziabad, UP base.
            </p>
          </div>
        </div>

        {/* Sticky horizontal journey */}
        <div ref={timelineRef} className="relative">
          {/* Animated connecting line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-[44px] z-0 hidden h-px md:block">
            <div className="relative h-full w-full bg-white/10">
              <motion.div
                style={{ scaleX, originX: 0 }}
                className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[var(--color-blue-2)] via-[var(--color-blue-3)] to-[var(--color-amber)]"
              />
              <motion.div
                style={{ opacity: lineGlow }}
                className="absolute -inset-1 -z-10 bg-gradient-to-r from-[var(--color-blue)] to-[var(--color-amber)] blur-md"
              />
            </div>
          </div>

          <div className="journey-track mt-16 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 md:grid md:grid-cols-6 md:gap-3 md:overflow-visible md:px-0 md:pb-0">
            {steps.map((s, i) => {
              const targetCenter = i / 5;
              const startProgress = Math.max(0, targetCenter - 0.08);
              const endProgress = Math.min(1.0, targetCenter + 0.08);
              return (
                <StepCard
                  key={s.n}
                  s={s}
                  scrollYProgress={scrollYProgress}
                  isMobile={isMobile}
                  startProgress={startProgress}
                  endProgress={endProgress}
                />
              );
            })}
          </div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex justify-center border-t border-white/10 pt-8"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--color-ink)] transition hover:bg-[var(--color-amber)]"
            data-hover
          >
            Start your journey
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}