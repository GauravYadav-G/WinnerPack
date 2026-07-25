"use client";
import { apiFetch } from "@/lib/api";
import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight, ChevronRight, Clock, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { COMPANY, FAQS } from "../../lib/mock-data";
import { Container, Eyebrow } from "../../components/ui/primitives";
import { Reveal } from "../../components/ui/motion";
import { Button } from "../../components/ui/Button";
import { Accordion } from "../../components/ui/Accordion";

// Layout components
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Cursor from "../../components/Cursor";
import ScrollProgress from "../../components/ScrollProgress";
import PageWrapper from "../../components/PageWrapper";

export default function ContactPage() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiFetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
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
        alert("Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please check your internet connection.");
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

  return (
    <div className="min-h-screen bg-white text-[var(--color-text)]">
      <Cursor />
      <ScrollProgress />
      <Navbar />


      <PageWrapper className="relative pt-12 pb-16">
        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-[var(--color-mute)]">
              <li>
                <Link href="/" className="hover:text-[var(--color-blue)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="h-3 w-3 text-slate-400" />
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--color-blue)] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <ChevronRight className="h-3 w-3 text-slate-400" />
              </li>
              <li className="font-semibold text-[var(--color-ink)]">
                Request a quote
              </li>
            </ol>
          </nav>

          {/* Header (Styling Untouched) */}
          <div className="mb-10">
            <span className="inline-block rounded-full bg-[var(--color-blue)]/10 px-2.5 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-semibold uppercase tracking-wider text-[var(--color-blue)] mb-3">
              Contact
            </span>
            <h1 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-[var(--color-ink)] md:text-6xl text-balance">
              Request specifications & <br />
              indicative pricing.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-[var(--color-mute)] md:text-lg">
              Send us your load, line speed and deadline. Our engineers respond within one business day with a tailored quotation — no call centres, no scripts.
            </p>
          </div>

          {/* Form & Info Section */}
          <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-12 mb-20">
            {/* Form */}
            <Reveal>
              <div className="rounded-3xl border border-[var(--color-line)] bg-white p-6 sm:p-8">
                <Eyebrow>Request a quote</Eyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-ink)] font-display">
                  Tell us what you need
                </h2>
                <p className="mt-2 text-xs text-[var(--color-mute)]">Fields marked * are required.</p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-line)] bg-white p-12 text-center"
                  >
                    <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-6" />
                    <h3 className="font-display text-2xl font-bold text-[var(--color-ink)]">
                      Inquiry logged successfully.
                    </h3>
                    <p className="mt-3 max-w-md text-sm text-[var(--color-mute)]">
                      Our application engineer will call you to review line qualifications, SKU profiles, and dispatch routes within one business day.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3 text-xs font-bold text-white transition hover:bg-[var(--color-blue)]"
                    >
                      Submit another inquiry
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-mute)] mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-bone)] px-4 py-3 text-sm font-semibold text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-blue)]"
                          placeholder="Rajesh Kumar"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-mute)] mb-2">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-bone)] px-4 py-3 text-sm font-semibold text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-blue)]"
                          placeholder="Winner Pack Ltd."
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-mute)] mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-bone)] px-4 py-3 text-sm font-semibold text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-blue)]"
                          placeholder="procurement@company.com"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-mute)] mb-2">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-bone)] px-4 py-3 text-sm font-semibold text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-blue)]"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-mute)] mb-2">
                          SKU / Payload Profile
                        </label>
                        <input
                          type="text"
                          value={formData.skuProfile}
                          onChange={(e) => setFormData({ ...formData, skuProfile: e.target.value })}
                          className="w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-bone)] px-4 py-3 text-sm font-semibold text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-blue)]"
                          placeholder="PET Strap · 12mm x 0.8mm"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-mute)] mb-2">
                          Line speed / Monthly Vol
                        </label>
                        <input
                          type="text"
                          value={formData.lineSpeed}
                          onChange={(e) => setFormData({ ...formData, lineSpeed: e.target.value })}
                          className="w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-bone)] px-4 py-3 text-sm font-semibold text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-blue)]"
                          placeholder="24 straps/min · 80 rolls/mo"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-mute)] mb-2">
                        Message / Special Requirements
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-bone)] px-4 py-3 text-sm font-semibold text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-blue)]"
                        placeholder="Specify core size, customized logo print colors, or special adhesive specifications..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--color-blue)] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[var(--color-blue)]/30 transition hover:bg-[var(--color-blue-deep)] disabled:opacity-50"
                    >
                      {loading ? "Submitting..." : "Submit Quote Request"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Details + map */}
            <div className="space-y-6">
              <Reveal delay={0.08}>
                <div className="rounded-3xl border border-[var(--color-line)] bg-white p-6 sm:p-8">
                  <Eyebrow>Reach us directly</Eyebrow>
                  <ul className="mt-5 space-y-5">
                    {details.map((d) => (
                      <li key={d.label} className="flex gap-4">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--color-blue-soft)] text-[var(--color-blue)]">
                          <d.icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-mono text-[0.62rem] uppercase tracking-wider text-[var(--color-mute)]">
                            {d.label}
                          </p>
                          {d.href ? (
                            <a
                              href={d.href}
                              target={d.href.startsWith("http") ? "_blank" : undefined}
                              rel="noreferrer"
                              className="text-sm font-semibold text-[var(--color-ink)] transition-colors hover:text-[var(--color-blue)]"
                            >
                              {d.value}
                            </a>
                          ) : (
                            <p className="text-sm font-semibold text-[var(--color-ink)]">{d.value}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button
                      to={`https://wa.me/${COMPANY.whatsapp}`}
                      variant="secondary"
                      className="w-full"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button to={`tel:${COMPANY.phoneHref}`} variant="secondary" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Call now
                    </Button>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="overflow-hidden rounded-3xl border border-[var(--color-line)] shadow-sm bg-white p-1">
                  <iframe
                    title="Winner Pack Technologies Pvt. Ltd. Ghaziabad location"
                    src="https://maps.google.com/maps?q=Plot%20No.%208,%20B.S.T.%20Industrial%20Park,%20Dasna,%20Ghaziabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    className="h-64 w-full rounded-2xl grayscale-[0.2]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="pt-0 pb-16 relative z-10">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <Eyebrow>Good to know</Eyebrow>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl lg:text-4xl font-display text-balance">
                  Frequently asked questions
                </h2>
                <p className="mt-4 max-w-sm leading-relaxed text-[var(--color-mute)] text-pretty">
                  Quick answers on manufacturing, MOQs, lead times, sustainability
                  and machinery. Don't see your question? Just ask us directly.
                </p>
                <div className="mt-7">
                  <Button to={`mailto:${COMPANY.email}`} variant="secondary" iconRight>
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
