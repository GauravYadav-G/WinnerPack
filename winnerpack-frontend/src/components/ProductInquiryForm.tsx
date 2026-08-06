"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  Zap,
  ShieldCheck,
  ChevronDown,
  Mail,
  Phone
} from "lucide-react";

interface CategoryGroup {
  id: string;
  name: string;
  badge: string;
  items: string[];
}

const mainCategoryGroups: CategoryGroup[] = [
  {
    id: "film-products",
    name: "Film Products",
    badge: "LDPE · POF · Coloured · BOPP · PVC · Stretch Film · Lamination · Compostable",
    items: [
      "LDPE Films & Pouches",
      "POF Films & Pouches",
      "Coloured Films & Pouches",
      "BOPP Films & Pouches",
      "PVC Shrink Rolls & Pouches",
      "Stretch Film",
      "Lamination Films & Pouches",
      "Compostable Films & Pouches",
    ]
  },
  {
    id: "label-sticker-products",
    name: "Labels & Stickers",
    badge: "Thermal · Adhesive · Printed · Barcode",
    items: [
      "Plain Labels",
      "Printed Labels",
      "Barcode Labels",
      "Product Labels",
      "Self Adhesive Labels",
      "Thermal Labels"
    ]
  },
  {
    id: "tapes",
    name: "Tapes",
    badge: "BOPP Tapes · Custom Printed · Silicon Sealing",
    items: [
      "BOPP Tapes",
      "Printed BOPP Tapes",
      "Coloured BOPP Tapes",
      "Silicon Tapes"
    ]
  },
  {
    id: "pp-strap",
    name: "PP Strap",
    badge: "PP Strapping · PET Strapping · Custom Printed",
    items: [
      "PP Strap",
      "Printed PP Strap",
      "Colored PP Strap",
      "PET Strap"
    ]
  }
];

export default function ProductInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string>("film-products");

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    productInterest: "POF Shrink Rolls & Pouches",
    monthlyVolume: "",
    notes: "",
  });

  const activeGroup = mainCategoryGroups.find((g) => g.id === activeCategoryId) || mainCategoryGroups[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("http://localhost:4000/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.companyName,
          productInterest: formData.productInterest,
          monthlyVolume: formData.monthlyVolume,
          message: formData.notes,
        }),
      });
    } catch (err) {
      console.warn("API submission error (using client confirmation):", err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <section id="inquiry-form" className="relative overflow-hidden bg-[var(--color-bone)] py-10 sm:py-16 lg:py-24 border-t border-b border-[var(--color-line)]">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-stripes opacity-20 pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-[var(--color-amber)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        {/* Main Integrated Split Container matching WinnerPack UI/UX Design System */}
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--color-line)] bg-white shadow-xl sm:shadow-2xl grid grid-cols-1 lg:grid-cols-12">

          {/* LEFT COLUMN: WinnerPack Light Top Narrative + WinnerPack Deep Navy Bottom Panel */}
          <div className="lg:col-span-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--color-line)]">

            {/* Top Light Block */}
            <div className="bg-[var(--color-bone)] p-4 sm:p-8 lg:p-14 space-y-2 sm:space-y-4">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[var(--color-amber-dark)] font-mono">
                Technical Specification & Quote
              </span>

              <h2 className="font-display text-lg sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-ink)] leading-snug sm:leading-[1.15] text-balance">
                Tell us your line speed. <br className="hidden sm:inline" />
                We&apos;ll spec the right roll, film & strapping.
              </h2>

              <p className="text-xs sm:text-base text-[var(--color-mute)] leading-relaxed font-normal hidden sm:block">
                Share your SKU, payload profile and monthly volume. Our application team responds with a tailored spec sheet and indicative pricing within one business day.
              </p>

              {/* Mobile Direct Quick Contact Bar */}
              <div className="flex sm:hidden items-center gap-3 pt-2 text-[11px] font-medium text-[var(--color-ink)]">
                <a href="mailto:sales@winnerpack.in" className="flex items-center gap-1 text-[var(--color-amber-dark)] font-semibold">
                  <Mail className="h-3 w-3" />
                  <span>sales@winnerpack.in</span>
                </a>
                <span>•</span>
                <a href="tel:+918595072187" className="flex items-center gap-1 text-[var(--color-amber-dark)] font-semibold">
                  <Phone className="h-3 w-3" />
                  <span>+91 85950 72187</span>
                </a>
              </div>
            </div>

            {/* Bottom WinnerPack Deep Navy Block (Shown on Desktop & Tablet, Hidden on Mobile for Maximum Compactness) */}
            <div className="hidden lg:flex bg-[var(--color-blue-deep)] p-8 lg:p-14 text-white space-y-8 flex-1 flex-col justify-center">

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[var(--color-amber)] border border-white/15">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-display text-base sm:text-lg font-bold text-white leading-snug">
                    Direct Application Engineering Consultation
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed font-normal">
                    Get personalized guidance on gauge thickness, elongation percentage, and load stabilization tailored to your plant lines.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-6 border-t border-white/10">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[var(--color-amber)] border border-white/15">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-display text-base sm:text-lg font-bold text-white leading-snug">
                    Free Material Sample Kit & Automated Line Testing
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed font-normal">
                    We&apos;ll supply physical sample rolls and tapes to assess your packaging system and validate feed reliability on your automated machinery.
                  </p>
                </div>
              </div>

              {/* Direct Quick Contact Bar */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
                <a href="mailto:sales@winnerpack.in" className="flex items-center gap-1.5 hover:text-[var(--color-amber)] transition-colors">
                  <Mail className="h-4 w-4 text-[var(--color-amber)]" />
                  <span>sales@winnerpack.in</span>
                </a>
                <a href="tel:+918595072187" className="flex items-center gap-1.5 hover:text-[var(--color-amber)] transition-colors">
                  <Phone className="h-4 w-4 text-[var(--color-amber)]" />
                  <span>+91 85950 72187</span>
                </a>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: WinnerPack Modern Clean Form Card */}
          <div className="lg:col-span-6 bg-white p-4 sm:p-8 lg:p-14 flex flex-col justify-center">

            <div className="mb-3 sm:mb-6 pb-2.5 sm:pb-4 border-b border-[var(--color-line)]">
              <h3 className="font-display text-base sm:text-2xl font-extrabold text-[var(--color-ink)]">
                Request Spec Sheet & Free Quote
              </h3>
              <p className="text-[11px] sm:text-sm text-[var(--color-mute)] mt-0.5">
                Select your product range and enter your payload requirements.
              </p>
            </div>

            {submitted ? (
              <div className="py-6 sm:py-12 text-center space-y-3 sm:space-y-6">
                <div className="h-10 w-10 sm:h-16 sm:w-16 bg-[var(--color-blue-deep)] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="h-6 w-6 sm:h-10 sm:w-10 text-[var(--color-amber)]" />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <h4 className="font-display text-lg sm:text-2xl font-bold text-[var(--color-ink)]">Inquiry Received!</h4>
                  <p className="max-w-md mx-auto text-xs sm:text-sm text-[var(--color-mute)] leading-relaxed">
                    Thank you. Our technical application engineering team will send your customized spec sheet and indicative pricing within one business day.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 sm:mt-4 px-6 sm:px-8 py-2 sm:py-3.5 rounded-full bg-[var(--color-amber)] text-white text-xs font-bold uppercase tracking-wider hover:bg-[var(--color-amber-dark)] transition-all cursor-pointer shadow-md"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-4">

                {/* 2-Column Inputs Grid on Mobile & Tablet: Name + Company */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] sm:text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full rounded-lg sm:rounded-2xl border border-[var(--color-line)] bg-[var(--color-bone)] px-3 py-2 sm:px-5 sm:py-3.5 text-xs sm:text-sm text-[var(--color-ink)] placeholder-[var(--color-mute)] focus:border-[var(--color-amber)] focus:ring-2 focus:ring-[var(--color-amber)]/20 focus:outline-none transition-all shadow-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] sm:text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider">
                      Company <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Winner Packaging"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full rounded-lg sm:rounded-2xl border border-[var(--color-line)] bg-[var(--color-bone)] px-3 py-2 sm:px-5 sm:py-3.5 text-xs sm:text-sm text-[var(--color-ink)] placeholder-[var(--color-mute)] focus:border-[var(--color-amber)] focus:ring-2 focus:ring-[var(--color-amber)]/20 focus:outline-none transition-all shadow-xs"
                    />
                  </div>
                </div>

                {/* 2-Column Inputs Grid on Mobile & Tablet: Email + Phone */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] sm:text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg sm:rounded-2xl border border-[var(--color-line)] bg-[var(--color-bone)] px-3 py-2 sm:px-5 sm:py-3.5 text-xs sm:text-sm text-[var(--color-ink)] placeholder-[var(--color-mute)] focus:border-[var(--color-amber)] focus:ring-2 focus:ring-[var(--color-amber)]/20 focus:outline-none transition-all shadow-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] sm:text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg sm:rounded-2xl border border-[var(--color-line)] bg-[var(--color-bone)] px-3 py-2 sm:px-5 sm:py-3.5 text-xs sm:text-sm text-[var(--color-ink)] placeholder-[var(--color-mute)] focus:border-[var(--color-amber)] focus:ring-2 focus:ring-[var(--color-amber)]/20 focus:outline-none transition-all shadow-xs"
                    />
                  </div>
                </div>

                {/* Category & Product Select */}
                <div className="space-y-1">
                  <label className="text-[10px] sm:text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider">
                    Product Interest & Specification <span className="text-red-500">*</span>
                  </label>

                  {/* Category Pills */}
                  <div className="flex overflow-x-auto gap-1.5 sm:gap-2 pb-0.5 scrollbar-none mb-1">
                    {mainCategoryGroups.map((group) => {
                      const isActive = activeCategoryId === group.id;
                      return (
                        <button
                          type="button"
                          key={group.id}
                          onClick={() => {
                            setActiveCategoryId(group.id);
                            setFormData((prev) => ({ ...prev, productInterest: group.items[0] }));
                          }}
                          className={`flex-none px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all border cursor-pointer ${isActive
                              ? "bg-[var(--color-blue-deep)] text-white border-[var(--color-blue-deep)] shadow-sm"
                              : "bg-[var(--color-bone)] text-[var(--color-ink)] border-[var(--color-line)] hover:bg-white"
                            }`}
                        >
                          {group.name}
                        </button>
                      );
                    })}
                  </div>

                  <div className="relative">
                    <select
                      value={formData.productInterest}
                      onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                      className="w-full rounded-lg sm:rounded-2xl border border-[var(--color-line)] bg-[var(--color-bone)] px-3 py-2 sm:px-5 sm:py-3.5 text-xs sm:text-sm text-[var(--color-ink)] focus:border-[var(--color-amber)] focus:ring-2 focus:ring-[var(--color-amber)]/20 focus:outline-none transition-all appearance-none cursor-pointer pr-8 sm:pr-10 shadow-xs"
                    >
                      {activeGroup.items.map((item) => (
                        <option key={item} value={item} className="bg-white text-slate-900 py-1">
                          {item}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 sm:px-5 text-[var(--color-mute)]">
                      <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                  </div>
                </div>

                {/* Monthly Volume */}
                <div className="space-y-1">
                  <label className="text-[10px] sm:text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider">
                    Monthly Volume Requirement <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 500 kg, 2 Tons/month..."
                    value={formData.monthlyVolume}
                    onChange={(e) => setFormData({ ...formData, monthlyVolume: e.target.value })}
                    className="w-full rounded-lg sm:rounded-2xl border border-[var(--color-line)] bg-[var(--color-bone)] px-3 py-2 sm:px-5 sm:py-3.5 text-xs sm:text-sm text-[var(--color-ink)] placeholder-[var(--color-mute)] focus:border-[var(--color-amber)] focus:ring-2 focus:ring-[var(--color-amber)]/20 focus:outline-none transition-all shadow-xs"
                  />
                </div>

                {/* Additional Message / Requirements */}
                <div className="space-y-1">
                  <label className="text-[10px] sm:text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider">
                    Message / Specific Requirements
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Enter any specific roll widths, micron specs, core size..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full rounded-lg sm:rounded-2xl border border-[var(--color-line)] bg-[var(--color-bone)] px-3 py-2 sm:px-5 sm:py-3.5 text-xs sm:text-sm text-[var(--color-ink)] placeholder-[var(--color-mute)] focus:border-[var(--color-amber)] focus:ring-2 focus:ring-[var(--color-amber)]/20 focus:outline-none transition-all shadow-xs resize-none"
                  />
                </div>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 sm:py-4 px-5 sm:px-8 rounded-full bg-[var(--color-amber)] hover:bg-[var(--color-amber-dark)] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-md sm:shadow-lg shadow-[var(--color-amber)]/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-2.5 sm:mt-4 hover:scale-[1.02]"
                >
                  {loading ? (
                    <span>Generating Spec Request...</span>
                  ) : (
                    <>
                      <span>Request Spec Sheet & Quote</span>
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
