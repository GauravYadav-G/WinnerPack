"use client";

import { useEffect, useId, useState } from "react";
import { CheckCircle2, Loader2, Package, Send, ShieldCheck, X } from "lucide-react";
import { submitInquiryForm } from "@/lib/api";

type ProductInquiryModalProps = {
  productId: string;
  productTitle: string;
  onClose: () => void;
};

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 sm:py-3 text-sm font-medium text-[var(--color-ink)] placeholder:text-slate-400 placeholder:font-normal placeholder:text-xs sm:placeholder:text-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 focus:border-[var(--color-amber)] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[var(--color-amber)]/15 shadow-2xs";

export default function ProductInquiryModal({
  productId,
  productTitle,
  onClose,
}: ProductInquiryModalProps) {
  const titleId = useId();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    lineSpeed: "",
    message: "",
  });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  const update =
    (field: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("submitting");
    try {
      const success = await submitInquiryForm({
        ...form,
        skuProfile: `${productTitle} (${productId})`,
      });
      if (!success) throw new Error("Unable to submit inquiry");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end bg-[var(--color-ink)]/65 p-0 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6 transition-opacity animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        className="absolute inset-0 cursor-default"
        aria-label="Close inquiry form"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl border border-white/20">
        {/* Modal Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[var(--color-blue-deep)] via-[var(--color-ink)] to-[var(--color-blue-deep)] px-5 py-4 text-white sm:px-8 sm:py-6">
          <div className="absolute -right-12 -top-14 h-48 w-48 rounded-full bg-[var(--color-amber)]/20 blur-3xl pointer-events-none" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--color-amber)] animate-pulse" />
                <p className="font-mono text-xs font-bold tracking-[0.14em] text-[var(--color-amber)]">
                  Direct Factory Inquiry
                </p>
              </div>
              <h2
                id={titleId}
                className="mt-1.5 font-display text-xl font-extrabold sm:text-2xl leading-snug tracking-tight text-white"
              >
                Request a Quote for {productTitle}
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-300 sm:text-sm">
                Share your requirements. Our technical team will return with custom specifications and factory-direct pricing within 24 hours.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-white/80 transition-all duration-200 hover:bg-white/25 hover:text-white hover:scale-105 active:scale-95"
              aria-label="Close inquiry form"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {status === "success" ? (
          <div className="px-6 py-12 text-center sm:px-10">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 shadow-xs">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-extrabold text-[var(--color-ink)]">
              Quote Request Received
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[var(--color-mute)]">
              Thank you, <strong className="text-[var(--color-ink)]">{form.name || "Customer"}</strong>. Our technical engineering team has logged your inquiry for <strong className="text-[var(--color-ink)]">{productTitle}</strong>. We will review your specs and dispatch details within 1 business day.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-7 rounded-full bg-[var(--color-blue-deep)] px-8 py-3 text-sm font-bold text-white transition hover:bg-[var(--color-steel)] shadow-md hover:shadow-lg"
            >
              Return to Product
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4 px-5 py-5 sm:px-8 sm:py-6">
            {/* Active Product Confirmation Chip */}
            <div className="flex items-center justify-between rounded-xl border border-[var(--color-line)] bg-[var(--color-bone)]/80 px-3.5 py-2.5 text-xs">
              <div className="flex items-center gap-2 text-[var(--color-ink)] font-semibold truncate">
                <Package className="h-4 w-4 text-[var(--color-amber-dark)] shrink-0" />
                <span className="truncate">
                  Selected: <strong className="font-bold text-[var(--color-ink)]">{productTitle}</strong>
                </span>
              </div>
              <span className="font-mono text-[11px] font-bold text-[var(--color-mute)] shrink-0 ml-2">
                ID: {productId}
              </span>
            </div>

            {/* 2x2 Primary Inputs Grid */}
            <div className="grid gap-3.5 grid-cols-1 sm:grid-cols-2">
              <label className="block space-y-1.5 text-xs font-bold text-[var(--color-ink)]">
                <span>
                  Full Name <span className="text-[var(--color-amber-dark)]">*</span>
                </span>
                <input
                  required
                  value={form.name}
                  onChange={update("name")}
                  className={fieldClass}
                  placeholder="e.g. Rajesh Kumar Sharma"
                />
              </label>

              <label className="block space-y-1.5 text-xs font-bold text-[var(--color-ink)]">
                <span>
                  Company Name <span className="text-[var(--color-amber-dark)]">*</span>
                </span>
                <input
                  required
                  value={form.company}
                  onChange={update("company")}
                  className={fieldClass}
                  placeholder="e.g. Apex Logistics India Pvt. Ltd."
                />
              </label>

              <label className="block space-y-1.5 text-xs font-bold text-[var(--color-ink)]">
                <span>
                  Work Email <span className="text-[var(--color-amber-dark)]">*</span>
                </span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  className={fieldClass}
                  placeholder="e.g. procurement@apexlogistics.in"
                />
              </label>

              <label className="block space-y-1.5 text-xs font-bold text-[var(--color-ink)]">
                <span>
                  Phone Number <span className="text-[var(--color-amber-dark)]">*</span>
                </span>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  className={fieldClass}
                  placeholder="e.g. +91 98201 45678"
                />
              </label>
            </div>

            {/* Monthly Volume Field */}
            <label className="block space-y-1.5 text-xs font-bold text-[var(--color-ink)]">
              <span>
                Estimated Monthly Volume or Line Speed{" "}
                <span className="font-normal text-[var(--color-mute)] text-[11px]">(Optional)</span>
              </span>
              <input
                value={form.lineSpeed}
                onChange={update("lineSpeed")}
                className={fieldClass}
                placeholder="e.g. 5,000 rolls/month, 2.5 metric tonnes, or 40 pallets/day"
              />
            </label>

            {/* Requirements Textarea */}
            <label className="block space-y-1.5 text-xs font-bold text-[var(--color-ink)]">
              <span>
                Technical Requirements & Specifications{" "}
                <span className="font-normal text-[var(--color-mute)] text-[11px]">(Optional)</span>
              </span>
              <textarea
                value={form.message}
                onChange={update("message")}
                className={`${fieldClass} min-h-[92px] sm:min-h-[105px] resize-y leading-relaxed`}
                placeholder="e.g. 50mm width × 45 micron thickness, 3-inch paper core, custom brand logo print, dispatch required to Bhiwandi warehouse by 15th..."
              />
            </label>

            {status === "error" && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 border border-red-200 px-3.5 py-2.5 text-xs font-medium text-red-700"
              >
                We couldn’t send the inquiry. Please check your network or call us directly at{" "}
                <strong>+91 98200 00000</strong>.
              </p>
            )}

            {/* Modal Footer */}
            <div className="flex flex-col gap-3.5 border-t border-[var(--color-line)] pt-3.5 sm:pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs text-[var(--color-mute)]">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Direct manufacturer pricing • No distributor markups</span>
              </div>
              <button
                disabled={status === "submitting"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-amber)] px-7 py-3 text-sm font-extrabold text-[var(--color-ink)] transition-all duration-300 hover:bg-[var(--color-amber-2)] hover:shadow-lg hover:shadow-[var(--color-amber)]/25 disabled:opacity-60 cursor-pointer shadow-sm active:scale-98"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending Request…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Quote Request
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
