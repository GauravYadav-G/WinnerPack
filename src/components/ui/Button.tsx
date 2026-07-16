import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  variant?: "primary" | "secondary" | "outline" | "outlineLight";
  iconRight?: boolean;
  children: React.ReactNode;
}

export function Button({ to, variant = "primary", iconRight, className, children, ...props }: ButtonProps) {
  const baseClass = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300";
  
  const variants = {
    primary: "bg-[var(--color-blue-deep)] text-white hover:bg-[var(--color-blue-deep)]/90 border border-transparent shadow-sm",
    secondary: "bg-[var(--color-amber)] text-[var(--color-blue-deep)] hover:bg-[var(--color-amber)]/90 border border-transparent shadow-sm",
    outline: "border border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-blue-deep)]/30 hover:bg-[var(--color-blue-deep)]/5",
    outlineLight: "border border-white/30 text-white hover:border-white hover:bg-white/10",
  };

  const content = (
    <>
      {children}
      {iconRight && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
    </>
  );

  if (to) {
    return (
      <Link href={to} className={cn(baseClass, variants[variant], "group", className)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={cn(baseClass, variants[variant], "group", className)} {...props}>
      {content}
    </button>
  );
}
