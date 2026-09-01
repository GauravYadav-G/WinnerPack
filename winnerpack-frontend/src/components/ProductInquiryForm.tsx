"use client";

import { useState, useRef, useEffect } from "react";
import { CheckCircle2, ChevronDown, Check } from "lucide-react";
import { submitInquiryForm } from "@/lib/api";
import { productHierarchy } from "@/components/Navbar";

const volumeOptions = [
  "Under 1 Ton / Month (Sample / Trial)",
  "1 - 5 Tons / Month (Standard Factory Supply)",
  "5 - 20 Tons / Month (High-Speed Automated Lines)",
  "20+ Tons / Month (Multi-Plant Enterprise Contract)",
  "Custom Project / One-Time Consignment"
];

export default function ProductInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState<string>("film-products");

  // Dropdown open states
  const [openDropdown, setOpenDropdown] = useState<"category" | "product" | "quantity" | null>(null);

  const categoryRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const quantityRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    category: "Film Products",
    productInterest: "LDPE Shrink Film",
    monthlyVolume: "",
    notes: "",
  });

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      if (
        categoryRef.current && !categoryRef.current.contains(target) &&
        productRef.current && !productRef.current.contains(target) &&
        quantityRef.current && !quantityRef.current.contains(target)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Get active category structure from navbar product hierarchy
  const activeCatObject = productHierarchy.find((c) => c.id === selectedCategory) || productHierarchy[0];

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    const catObj = productHierarchy.find((c) => c.id === catId);
    const firstSub = catObj?.subcategories[0];
    const defaultProduct = firstSub?.items?.[0]?.name || firstSub?.title || "";
    setFormData((prev) => ({
      ...prev,
      category: catObj?.title || "",
      productInterest: defaultProduct,
    }));
    setOpenDropdown(null);
  };

  const handleProductSelect = (productName: string) => {
    setFormData((prev) => ({ ...prev, productInterest: productName }));
    setOpenDropdown(null);
  };

  const handleVolumeSelect = (volume: string) => {
    setFormData((prev) => ({ ...prev, monthlyVolume: volume }));
    setOpenDropdown(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const success = await submitInquiryForm({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.companyName,
        skuProfile: `${formData.category ? `[${formData.category}] ` : ""}${formData.productInterest || "General Inquiry"}`,
        lineSpeed: formData.monthlyVolume || "Not Specified",
        message: formData.notes,
      });

      if (!success) {
        throw new Error("Submission failed");
      }
      setSubmitted(true);
    } catch (err) {
      console.warn("Form submission notice:", err);
      setError("We couldn't send your inquiry. Please check your network or contact info@winnerpack.in directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="inquiry-form"
      className="relative bg-[var(--color-bone)] pt-10 pb-36 sm:py-24 lg:py-32 border-t border-b border-[var(--color-line)] z-20"
    >
      {/* Background Lighting & Blueprint Atmosphere (Isolated Overflow) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-stripes opacity-20" />
        <div className="absolute inset-0 bg-grid-fine opacity-20" />
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[var(--color-amber)]/10 blur-3xl" />
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[var(--color-blue)]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 lg:gap-24 items-start">

          {/* LEFT COLUMN: Editorial Headline, Brand Narrative & Trust Pillars */}
          <div className="lg:col-span-5 flex flex-col justify-between lg:pt-6 xl:pt-10">
            <div>
              {/* Massive Brand Display Title */}
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-[var(--color-ink)] tracking-tight leading-[1.02] mb-4 sm:mb-6">
                The <br className="hidden sm:inline" />
                inquiry<span className="text-[var(--color-amber)]">.</span>
              </h2>

              {/* Narrative Subtext */}
              <p className="text-sm sm:text-base md:text-lg text-[var(--color-mute)] font-normal leading-relaxed max-w-md">
                Tell us where you are now and where you want the work to go. Share your packaging specifications, payload requirements, or custom consignment volume.
              </p>
            </div>

            {/* Direct Contact Footer */}
            <div className="mt-8 sm:mt-12 pt-6 border-t border-[var(--color-line)]">
              <span className="block text-[9.5px] sm:text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-mute)] mb-2">
                DIRECT TECHNICAL DESK
              </span>
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono text-[var(--color-ink)] font-semibold">
                <a
                  href="mailto:info@winnerpack.in"
                  className="hover:text-[var(--color-amber-dark)] transition-colors underline underline-offset-4 decoration-[var(--color-line-2)] hover:decoration-[var(--color-amber)]"
                >
                  info@winnerpack.in
                </a>
                <span className="text-[var(--color-line-2)]">/</span>
                <a
                  href="tel:+918595072187"
                  className="hover:text-[var(--color-amber-dark)] transition-colors underline underline-offset-4 decoration-[var(--color-line-2)] hover:decoration-[var(--color-amber)]"
                >
                  +91 85950 72187
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Form Section with Elegant Orange Card Border */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="py-8 sm:py-16 text-left space-y-4 sm:space-y-5 bg-white/95 backdrop-blur-xl border border-[var(--color-line)] rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-lift">
                <div className="h-12 w-12 sm:h-14 sm:w-14 bg-[var(--color-blue-deep)] text-[var(--color-amber)] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md">
                  <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <span className="text-[10.5px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-amber-dark)]">
                    CONFIRMATION
                  </span>
                  <h3 className="font-display text-xl sm:text-3xl font-extrabold text-[var(--color-ink)]">
                    Inquiry Received.
                  </h3>
                  <p className="text-xs sm:text-base text-[var(--color-mute)] leading-relaxed max-w-lg">
                    Thank you. Our technical application engineering team will review your specifications and dispatch an indicative spec sheet within one business day.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 sm:mt-4 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-[var(--color-blue-deep)] text-white text-xs font-mono font-bold uppercase tracking-widest hover:bg-[var(--color-amber-dark)] transition-all cursor-pointer shadow-md text-center"
                >
                  SEND ANOTHER INQUIRY →
                </button>
              </div>
            ) : (
              <div className="bg-white/40 backdrop-blur-md border border-[var(--color-amber)] sm:border-2 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {error && (
                    <p role="alert" className="border-l-2 border-red-500 bg-red-50 px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-mono text-red-700 rounded-r-lg">
                      {error}
                    </p>
                  )}

                  {/* ROW 1: NAME */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-0.5 sm:gap-4 items-baseline">
                    <label className="sm:col-span-3 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-mute)]">
                      NAME
                    </label>
                    <div className="sm:col-span-9">
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        suppressHydrationWarning
                        className="w-full bg-transparent border-b border-[var(--color-line)] focus:border-[var(--color-amber)] pb-2 text-sm sm:text-base md:text-lg text-[var(--color-ink)] placeholder-[var(--color-mute)]/60 font-medium focus:outline-none transition-colors rounded-none"
                      />
                    </div>
                  </div>

                  {/* ROW 2: EMAIL */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-0.5 sm:gap-4 items-baseline">
                    <label className="sm:col-span-3 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-mute)]">
                      EMAIL
                    </label>
                    <div className="sm:col-span-9">
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        suppressHydrationWarning
                        className="w-full bg-transparent border-b border-[var(--color-line)] focus:border-[var(--color-amber)] pb-2 text-sm sm:text-base md:text-lg text-[var(--color-ink)] placeholder-[var(--color-mute)]/60 font-medium focus:outline-none transition-colors rounded-none"
                      />
                    </div>
                  </div>

                  {/* ROW 3: PHONE */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-0.5 sm:gap-4 items-baseline">
                    <label className="sm:col-span-3 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-mute)]">
                      PHONE
                    </label>
                    <div className="sm:col-span-9">
                      <input
                        type="tel"
                        placeholder="+91 Mobile or direct contact"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        suppressHydrationWarning
                        className="w-full bg-transparent border-b border-[var(--color-line)] focus:border-[var(--color-amber)] pb-2 text-sm sm:text-base md:text-lg text-[var(--color-ink)] placeholder-[var(--color-mute)]/60 font-medium focus:outline-none transition-colors rounded-none"
                      />
                    </div>
                  </div>

                  {/* ROW 4: COMPANY */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-0.5 sm:gap-4 items-baseline">
                    <label className="sm:col-span-3 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-mute)]">
                      COMPANY
                    </label>
                    <div className="sm:col-span-9">
                      <input
                        type="text"
                        placeholder="Studio, company, or venture"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        suppressHydrationWarning
                        className="w-full bg-transparent border-b border-[var(--color-line)] focus:border-[var(--color-amber)] pb-2 text-sm sm:text-base md:text-lg text-[var(--color-ink)] placeholder-[var(--color-mute)]/60 font-medium focus:outline-none transition-colors rounded-none"
                      />
                    </div>
                  </div>

                  {/* ROW 5: CATEGORY (Custom Clean Dropdown) */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-center sm:items-baseline">
                    <label className="sm:col-span-3 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-mute)]">
                      CATEGORY
                    </label>
                    <div ref={categoryRef} className={`sm:col-span-9 relative ${openDropdown === "category" ? "z-50" : "z-20"}`}>
                      <button
                        type="button"
                        onClick={() => setOpenDropdown(openDropdown === "category" ? null : "category")}
                        className="w-full flex items-center justify-between bg-transparent border-b border-[var(--color-line)] focus:border-[var(--color-amber)] py-2 text-left text-sm sm:text-base md:text-lg text-[var(--color-ink)] font-medium transition-colors cursor-pointer min-h-[40px]"
                      >
                        <span className="truncate">{formData.category || "Select Category"}</span>
                        <ChevronDown
                          className={`h-4 w-4 sm:h-5 sm:w-5 text-[var(--color-mute)] transition-transform duration-200 shrink-0 ml-2 ${
                            openDropdown === "category" ? "rotate-180 text-[var(--color-amber-dark)]" : ""
                          }`}
                        />
                      </button>

                      {/* Category Dropdown Menu */}
                      {openDropdown === "category" && (
                        <div className="absolute left-0 top-full mt-2 w-full bg-white/98 backdrop-blur-2xl border border-[var(--color-line)] shadow-[0_20px_50px_rgba(0,0,0,0.18)] rounded-2xl p-1.5 z-[100] animate-in fade-in zoom-in-95 duration-150 max-h-64 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                          {productHierarchy.map((cat) => {
                            const isSelected = selectedCategory === cat.id;
                            return (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => handleCategorySelect(cat.id)}
                                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-medium transition-all ${
                                  isSelected
                                    ? "bg-amber-500/10 text-[var(--color-amber-dark)] font-bold"
                                    : "text-[var(--color-ink)] hover:bg-slate-50 active:bg-slate-100"
                                }`}
                              >
                                <span>{cat.title}</span>
                                {isSelected && <Check className="h-4 w-4 text-[var(--color-amber-dark)] shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ROW 6: PRODUCT (Custom Clean Dropdown with Subcategories) */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-center sm:items-baseline">
                    <label className="sm:col-span-3 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-mute)]">
                      PRODUCT
                    </label>
                    <div ref={productRef} className={`sm:col-span-9 relative ${openDropdown === "product" ? "z-50" : "z-10"}`}>
                      <button
                        type="button"
                        onClick={() => setOpenDropdown(openDropdown === "product" ? null : "product")}
                        className="w-full flex items-center justify-between bg-transparent border-b border-[var(--color-line)] focus:border-[var(--color-amber)] py-2 text-left text-sm sm:text-base md:text-lg text-[var(--color-ink)] font-medium transition-colors cursor-pointer min-h-[40px]"
                      >
                        <span className="truncate">{formData.productInterest || "Select specific product"}</span>
                        <ChevronDown
                          className={`h-4 w-4 sm:h-5 sm:w-5 text-[var(--color-mute)] transition-transform duration-200 shrink-0 ml-2 ${
                            openDropdown === "product" ? "rotate-180 text-[var(--color-amber-dark)]" : ""
                          }`}
                        />
                      </button>

                      {/* Product Dropdown Menu */}
                      {openDropdown === "product" && (
                        <div className="absolute left-0 top-full mt-2 w-full bg-white/98 backdrop-blur-2xl border border-[var(--color-line)] shadow-[0_20px_50px_rgba(0,0,0,0.18)] rounded-2xl p-2 z-[100] animate-in fade-in zoom-in-95 duration-150 max-h-72 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden divide-y divide-slate-100">
                          {activeCatObject.subcategories.map((sub: any) => {
                            if (sub.items && sub.items.length > 0) {
                              return (
                                <div key={sub.id} className="py-2 first:pt-1 last:pb-1">
                                  <span className="block px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-amber-dark)] bg-amber-500/10 rounded-lg mb-1">
                                    {sub.title}
                                  </span>
                                  <div className="space-y-0.5 mt-1">
                                    {sub.items.map((item: any) => {
                                      const isSelected = formData.productInterest === item.name;
                                      return (
                                        <button
                                          key={item.slug}
                                          type="button"
                                          onClick={() => handleProductSelect(item.name)}
                                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs sm:text-sm font-medium transition-all ${
                                            isSelected
                                              ? "bg-[var(--color-blue-deep)] text-white font-semibold shadow-xs"
                                              : "text-[var(--color-ink)] hover:bg-slate-50 active:bg-slate-100"
                                          }`}
                                        >
                                          <span className="truncate">{item.name}</span>
                                          {isSelected && <Check className="h-3.5 w-3.5 text-[var(--color-amber)] shrink-0 ml-2" />}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            }
                            const isSelected = formData.productInterest === sub.title;
                            return (
                              <div key={sub.id} className="py-1">
                                <button
                                  type="button"
                                  onClick={() => handleProductSelect(sub.title)}
                                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs sm:text-sm font-medium transition-all ${
                                    isSelected
                                      ? "bg-[var(--color-blue-deep)] text-white font-semibold shadow-xs"
                                      : "text-[var(--color-ink)] hover:bg-slate-50 active:bg-slate-100"
                                  }`}
                                >
                                  <span className="truncate">{sub.title}</span>
                                  {isSelected && <Check className="h-3.5 w-3.5 text-[var(--color-amber)] shrink-0 ml-2" />}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ROW 7: QUANTITY (Custom Clean Dropdown) */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-center sm:items-baseline">
                    <label className="sm:col-span-3 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-mute)]">
                      QUANTITY
                    </label>
                    <div ref={quantityRef} className={`sm:col-span-9 relative ${openDropdown === "quantity" ? "z-50" : "z-0"}`}>
                      <button
                        type="button"
                        onClick={() => setOpenDropdown(openDropdown === "quantity" ? null : "quantity")}
                        className="w-full flex items-center justify-between bg-transparent border-b border-[var(--color-line)] focus:border-[var(--color-amber)] py-2 text-left text-sm sm:text-base md:text-lg text-[var(--color-ink)] font-medium transition-colors cursor-pointer min-h-[40px]"
                      >
                        <span className={formData.monthlyVolume ? "text-[var(--color-ink)]" : "text-[var(--color-mute)]/70 truncate"}>
                          {formData.monthlyVolume || "Select Quantity / Monthly Volume"}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 sm:h-5 sm:w-5 text-[var(--color-mute)] transition-transform duration-200 shrink-0 ml-2 ${
                            openDropdown === "quantity" ? "rotate-180 text-[var(--color-amber-dark)]" : ""
                          }`}
                        />
                      </button>

                      {/* Quantity Dropdown Menu */}
                      {openDropdown === "quantity" && (
                        <div className="absolute left-0 top-full mt-2 w-full bg-white/98 backdrop-blur-2xl border border-[var(--color-line)] shadow-[0_20px_50px_rgba(0,0,0,0.18)] rounded-2xl p-1.5 z-[100] animate-in fade-in zoom-in-95 duration-150 max-h-64 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                          {volumeOptions.map((vol, i) => {
                            const isSelected = formData.monthlyVolume === vol;
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() => handleVolumeSelect(vol)}
                                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-medium transition-all ${
                                  isSelected
                                    ? "bg-amber-500/10 text-[var(--color-amber-dark)] font-bold"
                                    : "text-[var(--color-ink)] hover:bg-slate-50 active:bg-slate-100"
                                }`}
                              >
                                <span>{vol}</span>
                                {isSelected && <Check className="h-4 w-4 text-[var(--color-amber-dark)] shrink-0 ml-2" />}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ROW 8: MESSAGE */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-0.5 sm:gap-4 items-baseline">
                    <label className="sm:col-span-3 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-mute)]">
                      MESSAGE
                    </label>
                    <div className="sm:col-span-9">
                      <textarea
                        rows={2}
                        placeholder="What are you building, and what should it become?"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        suppressHydrationWarning
                        className="w-full bg-transparent border-b border-[var(--color-line)] focus:border-[var(--color-amber)] pb-2 text-sm sm:text-base md:text-lg text-[var(--color-ink)] placeholder-[var(--color-mute)]/60 font-medium focus:outline-none transition-colors resize-none rounded-none"
                      />
                    </div>
                  </div>

                  {/* ROW 9: SUBMIT */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-center pt-2 sm:pt-4">
                    <label className="sm:col-span-3 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-mute)] hidden sm:block">
                      SUBMIT
                    </label>
                    <div className="sm:col-span-9">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-[var(--color-blue-deep)] text-white px-7 sm:px-10 py-3 sm:py-3.5 text-xs sm:text-xs font-mono font-bold uppercase tracking-[0.16em] transition-all duration-300 hover:bg-[var(--color-amber-dark)] hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.98] disabled:opacity-50 cursor-pointer text-center"
                      >
                        {loading ? "SENDING..." : "SEND INQUIRY"}
                      </button>
                    </div>
                  </div>

                </form>
              </div>
            )}
          </div>

      </div>
    </div>
  </section>
  );
}
