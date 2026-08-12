import Link from "next/link";
import { ChevronRight } from "lucide-react";
import OptimizedImage from '@/components/OptimizedImage';

interface Crumb {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  crumbs?: Crumb[];
  theme?: "dark" | "light";
  align?: "left" | "center";
  bgImage?: string;
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
  theme = "dark",
  align = "center",
  bgImage = "/images/desktop/about/blown_film_tower.png",
}: PageHeaderProps) {
  const isLight = theme === "light";
  const isCenter = align === "center";

  return (
    <section className={`relative overflow-hidden pb-12 pt-10 md:pb-16 md:pt-12 lg:pb-20 ${
      isLight ? "bg-[var(--color-bone)] border-b border-[var(--color-line)]" : "bg-[var(--color-blue-deep)]"
    }`}>
      {/* Background Manufacturing Image for Dark Header Theme */}
      {!isLight && (
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={bgImage}
            alt="WinnerPack Industrial Plant Background"
            className="w-full h-full object-cover object-center opacity-55 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/80 via-[var(--color-blue-deep)]/60 to-[var(--color-ink)]/80 pointer-events-none" />
        </div>
      )}

      {isLight ? (
        <>
          <div className="absolute inset-0 bg-grid-fine opacity-20" aria-hidden />
          <div
            className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-[var(--color-blue)]/5 blur-[130px]"
            aria-hidden
          />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" aria-hidden />
          <div
            className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-[var(--color-amber)]/10 blur-[100px]"
            aria-hidden
          />
        </>
      )}
      <div className={`mx-auto max-w-7xl px-5 md:px-8 relative z-10 ${
        isCenter ? "flex flex-col items-center text-center" : ""
      }`}>
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className={`flex flex-wrap items-center gap-1.5 font-mono text-xs ${
              isCenter ? "justify-center" : ""
            } ${
              isLight ? "text-[var(--color-mute)]" : "text-white/45"
            }`}>
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className={`h-3 w-3 ${isLight ? "text-slate-400/60" : "text-white/25"}`} />}
                  {c.to ? (
                    <Link href={c.to} className={`transition-colors hover:text-[var(--color-amber-dark)] ${
                      isLight ? "text-[var(--color-ink)]" : "hover:text-[var(--color-amber)]"
                    }`}>
                      {c.label}
                    </Link>
                  ) : (
                    <span className={isLight ? "text-[var(--color-ink)] font-semibold" : "text-white/75"}>{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <span className={`inline-block rounded-full px-2.5 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-semibold uppercase tracking-wider ${
          isLight
            ? "bg-[var(--color-blue-soft)] text-[var(--color-blue)] border border-[var(--color-blue-3)]/10"
            : "bg-[var(--color-amber)]/15 text-[var(--color-amber)]"
        }`}>
          {eyebrow}
        </span>
        <h1 className={`mt-3 md:mt-5 text-balance font-display text-3xl md:text-6xl font-bold leading-[1.05] tracking-tight max-w-4xl ${
          isCenter ? "text-center mx-auto" : ""
        } ${
          isLight ? "text-[var(--color-ink)]" : "text-white"
        }`}>
          {title}
        </h1>
        <p className={`mt-3 md:mt-6 max-w-2xl text-xs md:text-lg leading-relaxed ${
          isCenter ? "text-center mx-auto" : ""
        } ${
          isLight ? "text-[var(--color-mute)]" : "text-white/70"
        }`}>
          {intro}
        </p>
      </div>
    </section>
  );
}
