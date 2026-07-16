import { cn } from "@/utils/cn";

interface StatCounterProps {
  value: string;
  label: string;
  sub?: string;
  tone?: "default" | "light";
}

export function StatCounter({ value, label, sub, tone = "default" }: StatCounterProps) {
  return (
    <div className="flex flex-col">
      <span className={cn(
        "font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl",
        tone === "light" ? "text-white" : "text-[var(--color-ink)]"
      )}>
        {value}
      </span>
      <span className={cn(
        "mt-2 text-sm font-semibold tracking-wide uppercase font-mono",
        tone === "light" ? "text-[var(--color-amber)]" : "text-[var(--color-blue)]"
      )}>
        {label}
      </span>
      {sub && (
        <span className={cn(
          "mt-1 text-xs",
          tone === "light" ? "text-white/60" : "text-[var(--color-mute)]"
        )}>
          {sub}
        </span>
      )}
    </div>
  );
}
