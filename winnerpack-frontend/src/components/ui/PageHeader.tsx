import OptimizedImage from '@/components/OptimizedImage';
import { FramedHeading } from '@/components/ui/FramedHeading';
import { cn } from '@/utils/cn';

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
  eyebrow,
  title,
  intro: _intro,
  crumbs: _crumbs,
  theme = "dark",
  align = "left",
  children,
}: PageHeaderProps) {
  const isLight = theme === "light";

  return (
    <section className={`relative overflow-hidden min-h-[190px] sm:min-h-[310px] md:min-h-[350px] flex items-center justify-center py-[58px] sm:py-[82px] md:py-[98px] border-b border-white/10 ${isLight ? "bg-[var(--color-bone)] border-b border-[var(--color-line)]" : "bg-[var(--color-blue-deep)]"
      }`}>
      {/* Permanent Header Background Image */}
      {!isLight && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <OptimizedImage
            src="/images/header-bg.png"
            alt="WinnerPack Header Background"
            className="w-full h-full object-cover object-center scale-100 opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/40 via-[var(--color-blue-deep)]/25 to-[var(--color-ink)]/40 pointer-events-none" />
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10 w-full">
        <FramedHeading
          as="h1"
          title={title}
          subtitle={eyebrow}
          theme={theme}
          align={align}
          titleClassName="text-2xl sm:text-4xl md:text-5xl lg:text-6xl"
        />
        {children && (
          <div
            className={cn(
              "mt-3 sm:mt-4 flex flex-col",
              align === "left" ? "items-start justify-start" : "items-center justify-center"
            )}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
