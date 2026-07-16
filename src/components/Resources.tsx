import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Post = {
  tag: string;
  date: string;
  title: string;
  read: string;
  featured?: boolean;
  excerpt?: string;
};

const featured: Post = {
  tag: "Engineering",
  date: "Mar 2026",
  title: "PP vs PET strap: the load-vs-cost framework we use with buyers",
  excerpt:
    "A simple decision tree — based on 22 years of mill data — that helps procurement pick the right strap for the right load, without overspending.",
  read: "6 min read",
  featured: true,
};

const posts: Post[] = [
  {
    tag: "Sustainability",
    date: "Feb 2026",
    title: "Mono-material films and the road to recyclable e-commerce packaging",
    read: "8 min read",
  },
  {
    tag: "Operations",
    date: "Jan 2026",
    title: "How we hit 98.4% on-time dispatch in 2025 — a playbook",
    read: "5 min read",
  },
];

export default function Resources() {
  return (
    <section id="resources" className="bg-white py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-[var(--color-ink)] md:text-5xl text-balance">
              Field notes from the packaging line.
            </h2>
          </div>
          <div className="md:col-span-5 md:pl-8">
            <a
              href="/blog"
              className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-ink)]"
              data-hover
            >
              View all 84 articles
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {/* Featured large card with real strap image */}
          <motion.a
            href="/blog/pp-vs-pet-strap-framework"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-ink)] text-white lg:col-span-2 lg:row-span-2"
            data-hover
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-auto lg:flex-1">
              <img
                src="/images/desktop/products/straps-detail.jpg"
                alt="Strap rolls"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-blue-deep)]/50 via-transparent to-[var(--color-amber-dark)]/20 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/90 via-[var(--color-ink)]/30 to-transparent" />

              {/* Overlay data points */}
              <div className="absolute right-6 top-6 space-y-2 font-mono text-[10px] text-white/70">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-amber)]" />
                  PET · 4500N
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-blue-3)]" />
                  PP · 1800N
                </div>
              </div>
              <div className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-widest text-white/70">
                WP-INS-2026-03
              </div>
            </div>
            <div className="p-7 md:p-9">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full bg-[var(--color-blue)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  {featured.tag}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                  {featured.date} · {featured.read}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold leading-tight md:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
                {featured.excerpt}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-blue-3)]">
                Read article
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </motion.a>

          {/* Smaller posts with images */}
          {posts.map((p, i) => {
            const img = i === 0 ? "/images/desktop/misc/films-shine.jpg" : "/images/desktop/misc/courier-bags.jpg";
            const slug = i === 0 ? "mono-material-recyclable-films" : "on-time-dispatch-playbook-2025";
            return (
              <motion.a
                key={p.title}
                href={`/blog/${slug}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
                className="group card-premium flex flex-col overflow-hidden rounded-xl border border-[var(--color-line)] bg-white"
                data-hover
              >
                <div className="relative aspect-[5/3] overflow-hidden">
                  <img
                    src={img}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-white/95 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--color-ink)]">
                      {p.tag}
                    </span>
                  </div>
                  <div className="absolute right-4 top-4 rounded-full bg-[var(--color-ink)] px-2.5 py-1 font-mono text-[9px] font-semibold text-white">
                    {p.date}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-base font-bold leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-blue)]">
                    {p.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between pt-5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-mute)]">
                    <span>{p.read}</span>
                    <span className="flex items-center gap-1 font-semibold text-[var(--color-ink)]">
                      Read <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
