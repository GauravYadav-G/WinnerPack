"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, CheckCircle2, ShieldCheck, Clock } from "lucide-react";

export default function CTABanner() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    productInterest: "PP Strapping Rolls",
    monthlyVolume: "500 kg - 2 Tons",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send inquiry to backend endpoint
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
    <section id="contact" className="relative overflow-hidden bg-[var(--color-bone)] py-16 sm:py-24 md:py-28 border-t border-b border-[var(--color-line)]">
      {/* Background accents */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-96 w-[900px] rounded-full bg-[var(--color-blue)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading, Subtext & Plant Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-blue-soft)] border border-[var(--color-blue)]/15 text-[var(--color-blue)] text-xs font-semibold uppercase tracking-widest mb-4">
                DETAILED PRODUCT INQUIRY
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] leading-[1.12] text-balance">
                Tell us your specification. <br />
                We&apos;ll quote the exact gauge & grade.
              </h2>

              <p className="mt-4 text-sm sm:text-base md:text-lg text-[var(--color-mute)] leading-relaxed font-normal">
                Share your SKU, payload profile, and monthly requirement. Our technical packaging engineers respond with tailored spec sheets, cost-per-pack optimization, and samples within 1 business day.
              </p>
            </div>

            {/* Quick Plant Trust Highlights */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-[var(--color-line)] py-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white border border-[var(--color-line)] flex items-center justify-center text-[var(--color-blue)] shadow-xs">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[var(--color-ink)]">24h Response</div>
                  <div className="text-[11px] text-[var(--color-mute)]">Fast Quotation</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white border border-[var(--color-line)] flex items-center justify-center text-[var(--color-blue)] shadow-xs">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[var(--color-ink)]">Free Samples</div>
                  <div className="text-[11px] text-[var(--color-mute)]">Tested Quality</div>
                </div>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="space-y-3">
              {/* Phone Lines */}
              <a
                href="tel:+918595072187"
                className="group flex items-center justify-between gap-3 rounded-2xl bg-white border border-[var(--color-line)] p-4 text-[var(--color-ink)] shadow-xs transition hover:shadow-md hover:border-[var(--color-blue)]/40"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-blue-soft)] text-[var(--color-blue)] group-hover:bg-[var(--color-blue)] group-hover:text-white transition-colors">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-mute)]">
                      Call Engineering
                    </div>
                    <div className="font-display text-sm sm:text-base font-bold">+91 85950 72187 / +91 74287 70999</div>
                  </div>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:sales@winnerpack.in"
                className="group flex items-center justify-between gap-3 rounded-2xl bg-white border border-[var(--color-line)] p-4 text-[var(--color-ink)] shadow-xs transition hover:shadow-md hover:border-[var(--color-blue)]/40"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-blue-soft)] text-[var(--color-blue)] group-hover:bg-[var(--color-blue)] group-hover:text-white transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-mute)]">
                      Email Sales Desk
                    </div>
                    <div className="font-display text-sm sm:text-base font-bold">sales@winnerpack.in</div>
                  </div>
                </div>
              </a>

              {/* Visit Plant Block */}
              <div className="flex items-start gap-3 rounded-2xl bg-white border border-[var(--color-line)] p-4 text-[var(--color-ink)] shadow-xs">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[var(--color-blue)]" />
                <div className="text-xs sm:text-sm">
                  <div className="font-bold text-[var(--color-ink)]">Manufacturing Plant</div>
                  <div className="text-[var(--color-mute)] mt-0.5 leading-relaxed">
                    Plot No. 8, B.S.T. Industrial Park, Village Dasna, Ghaziabad, Uttar Pradesh, 201015
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Detailed Product Inquiry Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 w-full"
          >
            <div className="bg-white border border-[var(--color-line)] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
              
              <div className="mb-8">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--color-ink)]">
                  Submit Detailed Product Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-mute)] mt-1">
                  Fill in your details below to receive a custom quote and material sample.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h4 className="font-display text-2xl font-bold text-[var(--color-ink)]">Inquiry Received!</h4>
                  <p className="max-w-md mx-auto text-sm text-[var(--color-mute)] leading-relaxed">
                    Thank you for submitting your specifications. Our technical engineering team is reviewing your requirements and will reach out within 1 business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[var(--color-blue)] text-white text-xs font-bold hover:bg-[var(--color-blue-deep)] transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full rounded-xl border border-[var(--color-line)] bg-slate-50/50 px-4 py-3 text-sm text-[var(--color-ink)] placeholder-slate-400 focus:bg-white focus:border-[var(--color-blue)] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] mb-1.5">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Winner Enterprises Pvt Ltd"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full rounded-xl border border-[var(--color-line)] bg-slate-50/50 px-4 py-3 text-sm text-[var(--color-ink)] placeholder-slate-400 focus:bg-white focus:border-[var(--color-blue)] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-[var(--color-line)] bg-slate-50/50 px-4 py-3 text-sm text-[var(--color-ink)] placeholder-slate-400 focus:bg-white focus:border-[var(--color-blue)] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] mb-1.5">
                        Phone / WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-[var(--color-line)] bg-slate-50/50 px-4 py-3 text-sm text-[var(--color-ink)] placeholder-slate-400 focus:bg-white focus:border-[var(--color-blue)] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Product Interest & Monthly Requirement */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] mb-1.5">
                        Product Interest <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.productInterest}
                        onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                        className="w-full rounded-xl border border-[var(--color-line)] bg-slate-50/50 px-4 py-3 text-sm text-[var(--color-ink)] focus:bg-white focus:border-[var(--color-blue)] focus:outline-none transition-colors"
                      >
                        <option value="PP Strapping Rolls">PP Strapping Rolls</option>
                        <option value="PET Strapping Rolls">PET Strapping Rolls</option>
                        <option value="POF Shrink Film">POF Shrink Film</option>
                        <option value="PVC Shrink Rolls">PVC Shrink Rolls</option>
                        <option value="BOPP Packaging Tapes">BOPP Packaging Tapes</option>
                        <option value="Bubble Roll & EPE Foam">Bubble Roll & EPE Foam</option>
                        <option value="Courier Bags & Poly Bags">Courier Bags & Poly Bags</option>
                        <option value="Machine & Manual Stretch Film">Machine & Manual Stretch Film</option>
                        <option value="Edge Protectors & Pallet Covers">Edge Protectors & Pallet Covers</option>
                        <option value="Custom Industrial Machinery">Custom Industrial Machinery</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] mb-1.5">
                        Monthly Requirement <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.monthlyVolume}
                        onChange={(e) => setFormData({ ...formData, monthlyVolume: e.target.value })}
                        className="w-full rounded-xl border border-[var(--color-line)] bg-slate-50/50 px-4 py-3 text-sm text-[var(--color-ink)] focus:bg-white focus:border-[var(--color-blue)] focus:outline-none transition-colors"
                      >
                        <option value="Under 500 kg / Sample Request">Under 500 kg / Sample Request</option>
                        <option value="500 kg - 2 Tons">500 kg - 2 Tons</option>
                        <option value="2 Tons - 5 Tons">2 Tons - 5 Tons</option>
                        <option value="5+ Tons / Container Load">5+ Tons / Container Load</option>
                      </select>
                    </div>
                  </div>

                  {/* Specifications & Notes */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] mb-1.5">
                      Specification Notes / Remarks
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify required width (mm), gauge/microns, core size, color, or special handling..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full rounded-xl border border-[var(--color-line)] bg-slate-50/50 px-4 py-3 text-sm text-[var(--color-ink)] placeholder-slate-400 focus:bg-white focus:border-[var(--color-blue)] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-xl bg-[var(--color-blue)] text-white text-sm font-extrabold uppercase tracking-wider shadow-xl shadow-[var(--color-blue)]/20 hover:bg-[var(--color-blue-deep)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <span>Submitting Inquiry...</span>
                    ) : (
                      <>
                        <span>Request Instant Spec Sheet & Quote</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
