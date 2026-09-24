"use client";

import React from "react";
import { cn } from "@/utils/cn";

export interface FramedHeadingProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  theme?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

/**
 * FramedHeading
 * Implements the cinematic title + accent line header design from user specification:
 * - Line 1: Bold uppercase display title
 * - Line 2: Vibrant WinnerPack orange horizontal accent bar (────) paired with uppercase subtitle
 */
export function FramedHeading({
  title,
  subtitle,
  as: Component = "h2",
  theme = "dark",
  align = "left",
  className,
  titleClassName,
  subtitleClassName,
}: FramedHeadingProps) {
  const isDark = theme === "dark";
  const isLeft = align === "left";

  return (
    <div
      className={cn(
        "w-full flex",
        isLeft ? "justify-start" : "justify-center",
        className
      )}
    >
      <div
        className={cn(
          "relative inline-flex flex-col select-none max-w-full",
          isLeft ? "items-start text-left" : "items-center text-center"
        )}
      >
        {/* Main Title Heading (Bold, Display Font, Title Case — individual letter blur via layered shadow) */}
        <Component
          className={cn(
            "font-display font-extrabold tracking-tight leading-none",
            isDark
              ? "text-white [text-shadow:_0_0_8px_rgba(0,0,0,0.95),_0_0_16px_rgba(0,0,0,0.9),_0_0_28px_rgba(0,0,0,0.8),_0_0_45px_rgba(0,0,0,0.65)]"
              : "text-[#0d072c] [text-shadow:_0_0_8px_rgba(255,255,255,0.9),_0_0_16px_rgba(255,255,255,0.8)]",
            titleClassName || "text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
          )}
        >
          {title}
        </Component>

        {/* Accent Bar + Subtitle Row */}
        {subtitle ? (
          <div
            className={cn(
              "mt-3 sm:mt-4 flex items-center gap-2.5 sm:gap-3.5 flex-wrap sm:flex-nowrap",
              isLeft ? "justify-start" : "justify-center"
            )}
          >
            {/* Orange Horizontal Accent Bar */}
            <span
              className="h-[3px] sm:h-[3.5px] md:h-1 w-10 sm:w-16 md:w-20 bg-[#fe8220] rounded-full shrink-0 shadow-[0_0_8px_rgba(254,130,32,0.4)]"
              aria-hidden="true"
            />

            {/* Subtitle / Eyebrow Text (Title Case — individual letter blur) */}
            <span
              className={cn(
                "font-mono text-xs sm:text-sm md:text-base font-bold tracking-[0.08em] leading-tight",
                isDark
                  ? "text-slate-100 [text-shadow:_0_0_6px_rgba(0,0,0,0.95),_0_0_14px_rgba(0,0,0,0.85),_0_0_24px_rgba(0,0,0,0.7)]"
                  : "text-slate-700",
                subtitleClassName
              )}
            >
              {subtitle}
            </span>
          </div>
        ) : (
          <div className="mt-3 sm:mt-4">
            <span
              className="block h-[3px] sm:h-[3.5px] md:h-1 w-14 sm:w-20 bg-[#fe8220] rounded-full shadow-[0_0_8px_rgba(254,130,32,0.4)]"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default FramedHeading;
