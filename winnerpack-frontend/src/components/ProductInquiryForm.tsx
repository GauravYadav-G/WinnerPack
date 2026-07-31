"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Clock, ShieldCheck } from "lucide-react";

export default function ProductInquiryForm() {
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
    <section id="inquiry-form" className="relative overflow-hidden bg-white py-16 sm:py-24 border-b border-[var(--color-line)]">
      {/* Subtle Background Accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[var(--color-blue)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] leading-[1.12]">
              Request Custom Technical Spec Sheet & Quote
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-[var(--color-mute)] leading-relaxed font-normal">
              Tell us your payload profile, line speed, and monthly volume. Our technical packaging engineers analyze your requirements and provide tailored spec sheets, cost-per-pack optimization, and samples within 24 hours.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-4 pt-4 border-t border-[var(--color-line)]">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--color-blue-soft)] text-[var(--color-blue)]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--color-ink)]">24-Hour Dispatch & Quote turn-around</h4>
                  <p className="text-xs text-[var(--color-mute)] mt-0.5">Guaranteed prompt response from our Ghaziabad plant desk.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--color-blue-soft)] text-[var(--color-blue)]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--color-ink)]">Free Sample Testing Kit</h4>
                  <p className="text-xs text-[var(--color-mute)] mt-0.5">Validate tensile strength, gauge tolerance, and adhesive cling on your line.</p>
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
            <div className="bg-[var(--color-bone)] border border-[var(--color-line)] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden">
              
              <div className="mb-6">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--color-ink)]">
                  Product Inquiry Form
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-mute)] mt-1">
                  Fill in your details below to receive a custom quote and material sample.
                </p>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-4">
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
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  
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
                        className="w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] placeholder-slate-400 focus:border-[var(--color-blue)] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] mb-1.5">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Winner Packaging Ltd"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] placeholder-slate-400 focus:border-[var(--color-blue)] focus:outline-none transition-colors"
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
                        className="w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] placeholder-slate-400 focus:border-[var(--color-blue)] focus:outline-none transition-colors"
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
                        className="w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] placeholder-slate-400 focus:border-[var(--color-blue)] focus:outline-none transition-colors"
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
                        className="w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] focus:border-[var(--color-blue)] focus:outline-none transition-colors"
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
                        className="w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] focus:border-[var(--color-blue)] focus:outline-none transition-colors"
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
                      className="w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] placeholder-slate-400 focus:border-[var(--color-blue)] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-xl bg-[var(--color-amber)] text-white text-sm font-extrabold uppercase tracking-wider shadow-xl shadow-[var(--color-amber)]/25 hover:bg-[var(--color-amber-dark)] transition-all flex items-center justify-center gap-2 cursor-pointer"
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
