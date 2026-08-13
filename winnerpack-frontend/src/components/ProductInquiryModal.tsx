"use client";

import { useEffect, useId, useState } from "react";
import { CheckCircle2, Loader2, Send, X } from "lucide-react";
import { apiFetch } from "@/lib/api";

type ProductInquiryModalProps = {
  productId: string;
  productTitle: string;
  onClose: () => void;
};

const fieldClass = "w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-bone)] px-3.5 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-mute)] transition focus:border-[var(--color-amber)] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[var(--color-amber)]/10";

export default function ProductInquiryModal({ productId, productTitle, onClose }: ProductInquiryModalProps) {
  const titleId = useId();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", lineSpeed: "", message: "" });

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

  const update = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("submitting");
    try {
      const response = await apiFetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, skuProfile: `${productTitle} (${productId})` }),
      });
      if (!response.ok) throw new Error("Unable to submit inquiry");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end bg-[var(--color-ink)]/60 p-0 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button className="absolute inset-0 cursor-default" aria-label="Close inquiry form" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        <div className="relative overflow-hidden bg-[var(--color-blue-deep)] px-5 py-4 text-white sm:px-8 sm:py-7">
          <div className="absolute -right-14 -top-16 h-44 w-44 rounded-full bg-[var(--color-amber)]/20 blur-3xl" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-amber)]">Product inquiry</p>
              <h2 id={titleId} className="mt-1 font-display text-lg font-extrabold sm:text-2xl leading-snug">Request a quote for {productTitle}</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-white/75 sm:text-sm hidden sm:block">Tell us the essentials. Our technical team will return with the right specification and pricing.</p>
            </div>
            <button type="button" onClick={onClose} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 transition hover:bg-white/20" aria-label="Close inquiry form">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {status === "success" ? (
          <div className="px-6 py-12 text-center sm:px-10">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600"><CheckCircle2 className="h-7 w-7" /></span>
            <h3 className="mt-5 font-display text-2xl font-extrabold text-[var(--color-ink)]">Inquiry received</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[var(--color-mute)]">Thank you. We’ll review your requirements and respond within one business day.</p>
            <button type="button" onClick={onClose} className="mt-7 rounded-full bg-[var(--color-blue-deep)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--color-steel)]">Close</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3.5 px-4 py-4 sm:px-8 sm:py-7">
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
              <label className="space-y-1 text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider">Name <span className="text-red-500">*</span><input required value={form.name} onChange={update("name")} className={fieldClass} placeholder="Your full name" /></label>
              <label className="space-y-1 text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider">Company <span className="text-red-500">*</span><input required value={form.company} onChange={update("company")} className={fieldClass} placeholder="Company name" /></label>
              <label className="space-y-1 text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider">Work email <span className="text-red-500">*</span><input required type="email" value={form.email} onChange={update("email")} className={fieldClass} placeholder="name@company.com" /></label>
              <label className="space-y-1 text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider">Phone <span className="text-red-500">*</span><input required type="tel" value={form.phone} onChange={update("phone")} className={fieldClass} placeholder="+91 00000 00000" /></label>
            </div>
            <label className="block space-y-1 text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider">Monthly volume or line speed <span className="font-normal text-[var(--color-mute)] font-sans lowercase">(optional)</span><input value={form.lineSpeed} onChange={update("lineSpeed")} className={fieldClass} placeholder="e.g. 2 tonnes/month or 40 packs/min" /></label>
            <label className="block space-y-1 text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider">Requirements <span className="font-normal text-[var(--color-mute)] font-sans lowercase">(optional)</span><textarea value={form.message} onChange={update("message")} className={`${fieldClass} min-h-20 sm:min-h-24 resize-y`} placeholder="Width, gauge, core size, application, or any other requirement" /></label>
            {status === "error" && <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-700">We couldn’t send the inquiry. Please try again or call us directly.</p>}
            <div className="flex flex-col gap-3 border-t border-[var(--color-line)] pt-3 sm:pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] text-[var(--color-mute)] text-center sm:text-left">No spam — direct response from our technical team.</p>
              <button disabled={status === "submitting"} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-amber)] px-6 py-3 text-sm font-extrabold text-[var(--color-ink)] transition hover:bg-[var(--color-amber-2)] disabled:opacity-60 cursor-pointer shadow-md">
                {status === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} {status === "submitting" ? "Sending…" : "Request quote"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
