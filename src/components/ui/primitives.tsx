import { cn } from "@/utils/cn";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function Section({ className, children, ...props }: SectionProps) {
  return (
    <section className={cn("py-16 md:py-20 bg-white", className)} {...props}>
      {children}
    </section>
  );
}

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow";
  children: React.ReactNode;
}

export function Container({ size = "default", className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-5 md:px-8",
        size === "narrow" ? "max-w-4xl" : "max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "default" | "light";
  children: React.ReactNode;
}

export function Eyebrow({ tone = "default", className, children, ...props }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider",
        tone === "light"
          ? "bg-white/10 text-[var(--color-amber-2)]"
          : "bg-[var(--color-amber)]/15 text-[var(--color-amber-dark)]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
