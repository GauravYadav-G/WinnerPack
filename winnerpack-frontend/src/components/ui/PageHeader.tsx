import OptimizedImage from '@/components/OptimizedImage';

interface Crumb {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  crumbs?: Crumb[];
  theme?: "dark" | "light";
  align?: "left" | "center";
  bgImage?: string;
  bgImages?: string[];
  children?: React.ReactNode;
}

export function PageHeader({
  eyebrow: _eyebrow,
  title,
  intro,
  crumbs: _crumbs,
  theme = "dark",
  align = "center",
  children,
}: PageHeaderProps) {
  const isLight = theme === "light";
  const isCenter = align === "center";

  return (
    <section className={`relative overflow-hidden min-h-[120px] sm:min-h-[300px] md:min-h-[340px] flex items-center justify-center py-4 sm:py-12 md:py-16 lg:py-20 border-b border-white/10 ${
      isLight ? "bg-[var(--color-bone)] border-b border-[var(--color-line)]" : "bg-[var(--color-blue-deep)]"
    }`}>
      {/* Permanent Header Background Image */}
      {!isLight && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <OptimizedImage
            src="/images/header-bg.png"
            alt="WinnerPack Header Background"
            className="w-full h-full object-cover object-center scale-100 opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/75 via-[var(--color-blue-deep)]/50 to-[var(--color-ink)]/75 pointer-events-none" />
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
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" aria-hidden />
          <div
            className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-[var(--color-amber)]/10 blur-[100px]"
            aria-hidden
          />
        </>
      )}
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10 ${
        isCenter ? "flex flex-col items-center text-center" : ""
      }`}>
        <h1 className={`text-balance font-display text-xl sm:text-4xl md:text-6xl font-extrabold leading-[1.1] sm:leading-[1.05] tracking-tight max-w-4xl drop-shadow-lg ${
          isCenter ? "text-center mx-auto" : ""
        } ${
          isLight ? "text-[var(--color-ink)]" : "text-white"
        }`}>
          {title}
        </h1>
        {intro && (
          <p className={`hidden sm:block mt-1.5 sm:mt-3 md:mt-6 max-w-2xl text-[11px] sm:text-sm md:text-lg leading-relaxed drop-shadow-md px-1 ${
            isCenter ? "text-center mx-auto" : ""
          } ${
            isLight ? "text-[var(--color-mute)]" : "text-white/90 font-medium"
          }`}>
            {intro}
          </p>
        )}
        {children && <div className="mt-3 sm:mt-4 flex flex-col items-center justify-center">{children}</div>}
      </div>
    </section>
  );
}
