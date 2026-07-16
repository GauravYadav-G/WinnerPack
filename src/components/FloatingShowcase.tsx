import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, CalendarCheck, ShieldCheck, Package, MapPin } from "lucide-react";

const items = [
  {
    n: "01",
    tag: "Since",
    title: "Operating since 2018",
    body: "Winner Pack Technologies has supplied industrial packaging materials and machinery from Ghaziabad, UP since 2018.",
    metric: "2018",
    metricUnit: "founded",
    icon: CalendarCheck,
    color: "from-[var(--color-blue)] to-[var(--color-blue-deep)]",
  },
  {
    n: "02",
    tag: "Quality",
    title: "ISO 9001:2015 certified",
    body: "Our quality management system is certified to ISO 9001:2015, backing the material and service standard behind every order.",
    metric: "ISO",
    metricUnit: "9001:2015",
    icon: ShieldCheck,
    color: "from-[var(--color-blue-deep)] to-[var(--color-ink-3)]",
  },
  {
    n: "03",
    tag: "Range",
    title: "Full packaging line",
    body: "Strap rolls, shrink films, stretch films, tapes, corrugated packaging, courier bags, and the machines that run them — all from one supplier.",
    metric: "10+",
    metricUnit: "product lines",
    icon: Package,
    color: "from-[var(--color-blue-2)] to-[var(--color-blue)]",
  },
  {
    n: "04",
    tag: "Base",
    title: "Ghaziabad, UP",
    body: "Registered as Winner Pack Technologies Pvt. Ltd., operating out of Ghaziabad and dispatching to customers across the region.",
    metric: "UP",
    metricUnit: "Ghaziabad base",
    icon: MapPin,
    color: "from-[var(--color-amber)] to-[var(--color-amber-dark)]",
  },
];

export default function FloatingShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-14 md:py-16">
      <div className="absolute inset-0 bg-grid-fine opacity-30" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 grid items-end gap-8 md:grid-cols-12" data-reveal>
          <div className="md:col-span-7">
            <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-[var(--color-ink)] md:text-5xl text-balance">
              Four things worth knowing. Scrollytelling edition.
            </h2>
          </div>
          <div className="md:col-span-5 md:pl-8">
            <p className="text-base leading-relaxed text-[var(--color-mute)] md:text-lg">
              Each card pins, tilts, and reveals a key fact as you scroll. Hover to see
              how the spec sheet would look.
            </p>
          </div>
        </div>

        <div className="relative grid gap-6 md:grid-cols-12">
          {items.map((item, i) => (
            <FloatingCard key={item.n} item={item} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatingCard({ item, index, progress }: { item: any; index: number; progress: any }) {
  // Stagger scroll-driven vertical offset to trigger and complete earlier
  const start = index * 0.12;
  const end = start + 0.18;
  const y = useTransform(progress, [start, end, end + 0.2], [25, 0, 0]);
  const opacity = useTransform(progress, [start, start + 0.05], [0.45, 1]);

  // Column span
  const colSpan = index === 0 || index === 3 ? "md:col-span-7" : "md:col-span-5";
  const align = index % 2 === 0 ? "md:mt-0" : "md:mt-16";

  return (
    <motion.div
      style={{ y, opacity }}
      className={`group relative ${colSpan} ${align} overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white p-8 shadow-lg shadow-[var(--color-ink)]/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[var(--color-blue-deep)]/10 md:p-10`}
      data-hover
    >
      {/* Background gradient orb */}
      <div className={`absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br ${item.color} opacity-[0.08] blur-3xl transition-opacity duration-700 group-hover:opacity-20`} />

      <div className="relative flex items-start justify-between">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-blue)]">
            {item.tag} · {item.n}
          </span>
          <h3 className="font-display mt-3 text-3xl font-bold leading-tight text-[var(--color-ink)] md:text-4xl">
            {item.title}
          </h3>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
          <item.icon className="h-6 w-6" strokeWidth={1.5} />
        </div>
      </div>

      <p className="relative mt-5 max-w-md text-base leading-relaxed text-[var(--color-mute)]">
        {item.body}
      </p>

      <div className="relative mt-8 flex items-end justify-between border-t border-[var(--color-line)] pt-6">
        <div>
          <div className="font-display text-5xl font-bold leading-none tracking-tight text-[var(--color-ink)] md:text-6xl">
            {item.metric}
          </div>
          <div className="mt-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-mute)]">
            {item.metricUnit}
          </div>
        </div>
        <a
          href="#contact"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] transition-all duration-300 group-hover:rotate-45 group-hover:border-[var(--color-blue)] group-hover:bg-[var(--color-blue)] group-hover:text-white"
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      {/* Animated bottom bar */}
      <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[var(--color-blue)] to-[var(--color-amber)] transition-transform duration-700 group-hover:scale-x-100" />
    </motion.div>
  );
}