"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight, Clock, MessageCircle, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { COMPANY, FAQS } from "../../lib/mock-data";
import { initialProducts } from "../../lib/fallback-data";
import { Container, Eyebrow } from "../../components/ui/primitives";
import { Reveal } from "../../components/ui/motion";
import { Button } from "../../components/ui/Button";
import { Accordion } from "../../components/ui/Accordion";
import { submitInquiryForm } from "../../lib/api";

// Layout components
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Cursor from "../../components/Cursor";
import ScrollProgress from "../../components/ScrollProgress";
import PageWrapper from "../../components/PageWrapper";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const sku = searchParams.get("sku");
  const titleParam = searchParams.get("title");
  const gradeParam = searchParams.get("grade");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    lineSpeed: "",
    skuProfile: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Automatically pre-fill product details when arriving via Custom Quote button
  useEffect(() => {
    if (sku || titleParam || gradeParam) {
      let matchedTitle = titleParam;
      
      if (!matchedTitle && sku) {
        const found = initialProducts.find((p) => p.id === sku);
        if (found) {
          matchedTitle = found.title;
        } else {
          matchedTitle = sku.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        }
      }

      let profileString = matchedTitle || (sku ? `WP-${sku.toUpperCase()}` : "Custom Product");
      if (gradeParam) {
        profileString += ` · Grade: ${gradeParam}`;
      }

      const messageTemplate = `Hello Winner Pack team,\n\nI would like to request an instant quotation, technical data sheet, and sample roll availability for ${matchedTitle || "product"}${gradeParam ? ` (${gradeParam})` : ""}.\n\nPlease review our requirements and respond with dispatch lead times.`;

      setFormData((prev) => ({
        ...prev,
        skuProfile: prev.skuProfile || profileString,
        message: prev.message || messageTemplate,
      }));
    }
  }, [sku, titleParam, gradeParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const success = await submitInquiryForm(formData);
      if (success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          lineSpeed: "",
          skuProfile: "",
          message: "",
        });
      } else {
        alert("Unable to submit inquiry. Please check your network or contact info@winnerpack.in directly.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const details = [
    {
      icon: MapPin,
      label: "Visit / Ship to",
      value: COMPANY.address,
      href: `https://www.google.com/maps?q=${encodeURIComponent(COMPANY.address)}`,
    },
    { icon: Phone, label: "Call us", value: COMPANY.phone, href: `tel:${COMPANY.phoneHref}` },
    { icon: Mail, label: "Email sales", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { icon: Clock, label: "Working hours", value: COMPANY.hours },
  ];

  // Derived selected product title for banner
  const displayBannerTitle = titleParam || (sku && initialProducts.find((p) => p.id === sku)?.title) || (sku && sku.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()));

  return (
    <div className="grid gap-6 sm:gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-12 mb-10 sm:mb-20 w-full min-w-0">
      {/* Form */}
      <Reveal className="min-w-0 overflow-hidden">
        <div className="rounded-2xl sm:rounded-3xl border border-[var(--color-line)] bg-white p-4 sm:p-8 shadow-sm overflow-hidden w-full min-w-0">
          <Eyebrow>Request a quote</Eyebrow>
          <h2 className="mt-1.5 sm:mt-3 text-lg sm:text-2xl font-semibold tracking-tight text-[var(--color-ink)] font-display">
            Tell us what you need
          </h2>
          <p className="mt-1 text-[11px] sm:text-xs text-[var(--color-mute)]">Fields marked * are required.</p>

          {/* Prominent Selected Product Info Badge Banner */}
          {(sku || titleParam || displayBannerTitle) && (
            <div className="mt-3.5 mb-2 rounded-xl border border-[var(--color-amber-dark)]/30 bg-[var(--color-amber-soft)] p-2.5 sm:p-3.5 flex items-center gap-2 overflow-hidden shadow-2xs">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-[var(--color-amber)] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                  <Tag className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-amber-dark)] truncate">
                    Selected Product Quote
                  </p>
                  <p className="text-xs sm:text-sm font-extrabold text-[var(--color-ink)] font-display truncate">
                    {displayBannerTitle} {gradeParam ? `— ${gradeParam}` : ""}
                  </p>
                </div>
              </div>
              <span className="shrink-0 text-[9px] font-mono font-bold bg-white px-1.5 py-0.5 rounded-md border border-[var(--color-line)] text-[var(--color-ink)] truncate max-w-[38%]">
                WP-{(sku || "CUSTOM").toUpperCase()}
              </span>
            </div>
          )}

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-line)] bg-white p-8 sm:p-12 text-center"
            >
              <CheckCircle2 className="h-12 w-12 sm:h-16 sm:w-16 text-emerald-500 mb-4 sm:mb-6" />
              <h3 className="font-display text-lg sm:text-2xl font-bold text-[var(--color-ink)]">
                Inquiry logged successfully.
              </h3>
              <p className="mt-2 sm:mt-3 max-w-md text-xs sm:text-sm text-[var(--color-mute)]">
                Our application engineer will call you to review line qualifications, SKU profiles, and dispatch routes within one business day.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 sm:mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-5 py-2.5 sm:px-6 sm:py-3 text-xs font-bold text-white transition hover:bg-[var(--color-blue)]"
              >
                Submit another inquiry
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 sm:mt-6 space-y-3 sm:space-y-6 w-full min-w-0">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-6">
                <div className="min-w-0">
                  <label className="block font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[var(--color-mute)] mb-1 sm:mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full min-w-0 rounded-lg border border-[var(--color-line)] bg-[var(--color-bone)] px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-blue)]"
                    placeholder="Rajesh Kumar"
                  />
                </div>
                <div className="min-w-0">
                  <label className="block font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[var(--color-mute)] mb-1 sm:mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full min-w-0 rounded-lg border border-[var(--color-line)] bg-[var(--color-bone)] px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-blue)]"
                    placeholder="Winner Pack Ltd."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-6">
                <div className="min-w-0">
                  <label className="block font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[var(--color-mute)] mb-1 sm:mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full min-w-0 rounded-lg border border-[var(--color-line)] bg-[var(--color-bone)] px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-blue)]"
                    placeholder="procurement@co.com"
                  />
                </div>
                <div className="min-w-0">
                  <label className="block font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[var(--color-mute)] mb-1 sm:mb-2">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full min-w-0 rounded-lg border border-[var(--color-line)] bg-[var(--color-bone)] px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-blue)]"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-6">
                <div className="min-w-0">
                  <label className="block font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[var(--color-mute)] mb-1 sm:mb-2">
                    SKU / Product Profile
                  </label>
                  <input
                    type="text"
                    value={formData.skuProfile}
                    onChange={(e) => setFormData({ ...formData, skuProfile: e.target.value })}
                    className="w-full min-w-0 rounded-lg border border-[var(--color-amber-dark)]/40 bg-[var(--color-amber-soft)]/50 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-bold text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-blue)]"
                    placeholder="PET Strap 12mm"
                  />
                </div>
                <div className="min-w-0">
                  <label className="block font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[var(--color-mute)] mb-1 sm:mb-2">
                    Line / Monthly Vol
                  </label>
                  <input
                    type="text"
                    value={formData.lineSpeed}
                    onChange={(e) => setFormData({ ...formData, lineSpeed: e.target.value })}
                    className="w-full min-w-0 rounded-lg border border-[var(--color-line)] bg-[var(--color-bone)] px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-blue)]"
                    placeholder="80 rolls/mo"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[var(--color-mute)] mb-1 sm:mb-2">
                  Message / Special Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-bone)] px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-blue)]"
                  placeholder="Specify core size, customized logo print colors..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--color-blue)] px-5 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[var(--color-blue)]/30 transition hover:bg-[var(--color-blue-deep)] disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Quote Request"}
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </div>
      </Reveal>

      {/* Details + map */}
      <div className="space-y-4 sm:space-y-6 min-w-0 w-full overflow-hidden">
        <Reveal delay={0.08} className="min-w-0 overflow-hidden">
          <div className="rounded-2xl sm:rounded-3xl border border-[var(--color-line)] bg-white p-4 sm:p-8 shadow-sm max-w-full overflow-hidden">
            <Eyebrow>Reach us directly</Eyebrow>
            <ul className="mt-3 sm:mt-5 space-y-3.5 sm:space-y-5">
              {details.map((d) => (
                <li key={d.label} className="flex gap-3 sm:gap-4">
                  <span className="grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-lg sm:rounded-xl bg-[var(--color-blue-soft)] text-[var(--color-blue)]">
                    <d.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <div>
                    <p className="font-mono text-[9px] sm:text-[0.62rem] uppercase tracking-wider text-[var(--color-mute)]">
                      {d.label}
                    </p>
                    {d.href ? (
                      <a
                        href={d.href}
                        target={d.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="text-xs sm:text-sm font-semibold text-[var(--color-ink)] transition-colors hover:text-[var(--color-blue)]"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="text-xs sm:text-sm font-semibold text-[var(--color-ink)]">{d.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
              <Button
                to={`https://wa.me/${COMPANY.whatsapp}`}
                variant="secondary"
                className="w-full py-2 text-xs"
              >
                <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                WhatsApp
              </Button>
              <Button to={`tel:${COMPANY.phoneHref}`} variant="secondary" className="w-full py-2 text-xs">
                <Phone className="h-3.5 w-3.5 mr-1.5" />
                Call now
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16} className="min-w-0 overflow-hidden">
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--color-line)] shadow-sm bg-white p-1">
            <iframe
              title="Winner Pack Technologies Pvt. Ltd. Ghaziabad location"
              src="https://maps.google.com/maps?q=Plot%20No.%208,%20B.S.T.%20Industrial%20Park,%20Dasna,%20Ghaziabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="h-48 sm:h-64 w-full rounded-xl sm:rounded-2xl grayscale-[0.2]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--color-text)] overflow-x-hidden">
      <Cursor />
      <ScrollProgress />
      <Navbar />

      <PageWrapper className="relative pt-4 sm:pt-12 pb-10 sm:pb-16 overflow-x-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8 overflow-hidden">

          {/* Header */}
          <div className="mb-6 sm:mb-10">
            <span className="inline-block rounded-full bg-[var(--color-blue)]/10 px-2.5 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-semibold uppercase tracking-wider text-[var(--color-blue)] mb-2 sm:mb-3">
              Contact
            </span>
            <h1 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold leading-snug sm:leading-[1.05] tracking-tight text-[var(--color-ink)] text-balance">
              Request specifications & <br />
              indicative pricing.
            </h1>
            <p className="mt-2 sm:mt-4 max-w-2xl text-xs sm:text-base text-[var(--color-mute)] md:text-lg leading-relaxed">
              Send us your load, line speed and deadline. Our engineers respond within one business day with a tailored quotation — no call centres, no scripts.
            </p>
          </div>

          {/* Form & Info Section inside Suspense */}
          <Suspense fallback={
            <div className="rounded-2xl border border-[var(--color-line)] p-8 text-center text-xs font-mono">
              Loading inquiry form parameters...
            </div>
          }>
            <ContactFormInner />
          </Suspense>
        </div>

        {/* FAQ Section */}
        <section className="pt-0 pb-8 sm:pb-16 relative z-10">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <Eyebrow>Good to know</Eyebrow>
                <h2 className="mt-2 sm:mt-4 text-xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--color-ink)] font-display text-balance">
                  Frequently asked questions
                </h2>
                <p className="mt-2 sm:mt-4 max-w-sm leading-relaxed text-xs sm:text-base text-[var(--color-mute)] text-pretty">
                  Quick answers on manufacturing, MOQs, lead times, sustainability
                  and quality standards. Don't see your question? Just ask us directly.
                </p>
                <div className="mt-4 sm:mt-7">
                  <Button to={`mailto:${COMPANY.email}`} variant="secondary" iconRight className="py-2 text-xs sm:text-sm">
                    Email the team
                  </Button>
                </div>
              </div>
              <Accordion items={FAQS} />
            </div>
          </Container>
        </section>
      </PageWrapper>

      <Footer />
    </div>
  );
}
