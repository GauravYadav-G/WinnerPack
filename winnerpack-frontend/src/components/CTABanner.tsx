"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

export default function CTABanner() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--color-bone)] py-14 md:py-20 border-t border-b border-[var(--color-line)]">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          
          {/* Left Column: Heading & Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7 space-y-4"
          >


            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight text-[var(--color-ink)] text-balance">
              Tell us your line speed. <br />
              We&apos;ll spec the right roll, film, and strapping roll.
            </h2>
            
            <p className="max-w-xl text-sm sm:text-base md:text-lg text-[var(--color-mute)] font-normal leading-relaxed">
              Share your SKU, payload profile and monthly volume. Our application team
              responds with a tailored spec sheet and indicative pricing within one
              business day.
            </p>
          </motion.div>

          {/* Right Column: Contact Action Cards */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="flex flex-col gap-3.5 lg:col-span-5"
          >
            {/* Email Sales Card */}
            <a
              href="mailto:info@winnerpack.in"
              className="group flex items-center justify-between gap-3 rounded-2xl bg-white border border-[var(--color-line)] px-5 py-4 sm:px-6 sm:py-5 text-[var(--color-ink)] shadow-xs transition hover:shadow-xl hover:border-[var(--color-amber)]/40 hover:-translate-y-0.5 duration-300"
              data-hover
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-amber-soft)] text-[var(--color-amber-dark)] group-hover:bg-[var(--color-amber)] group-hover:text-white transition-all duration-300">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-mute)] group-hover:text-[var(--color-amber-dark)] transition-colors">
                    Email sales desk
                  </div>
                  <div className="font-display text-sm sm:text-base font-bold">info@winnerpack.in</div>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-[var(--color-amber-dark)] transition-transform group-hover:translate-x-1" />
            </a>

            {/* Call Engineering Card */}
            <a
              href="tel:+918595072187"
              className="group flex items-center justify-between gap-3 rounded-2xl bg-white border border-[var(--color-line)] px-5 py-4 sm:px-6 sm:py-5 text-[var(--color-ink)] shadow-xs transition hover:shadow-xl hover:border-[var(--color-amber)]/40 hover:-translate-y-0.5 duration-300"
              data-hover
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-amber-soft)] text-[var(--color-amber-dark)] group-hover:bg-[var(--color-amber)] group-hover:text-white transition-all duration-300">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-mute)] group-hover:text-[var(--color-amber-dark)] transition-colors">
                    Call engineering
                  </div>
                  <div className="font-display text-xs sm:text-sm font-bold">+91 85950 72187 / +91 74287 70999</div>
                </div>
              </div>
              <Phone className="h-5 w-5 text-[var(--color-mute)] group-hover:text-[var(--color-amber)] transition-transform group-hover:rotate-12" />
            </a>

            {/* Visit Plant Block */}
            <div className="flex items-start gap-3.5 rounded-2xl bg-white border border-[var(--color-line)] p-4 text-[var(--color-ink)] shadow-xs">
              <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--color-amber)]" />
              <div className="text-xs sm:text-sm">
                <div className="font-bold text-[var(--color-ink)] font-display">Manufacturing Plant</div>
                <div className="text-[var(--color-mute)] mt-0.5 leading-relaxed">
                  Plot No. 8, B.S.T. Industrial Park, Village Dasna, Ghaziabad, Uttar Pradesh, 201015
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
