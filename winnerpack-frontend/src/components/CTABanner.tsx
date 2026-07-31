import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

export default function CTABanner() {
  return (
    <section id="contact" className="hidden md:block relative overflow-hidden bg-[var(--color-bone)] py-10 md:py-16 border-y border-[var(--color-line)]">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          
          {/* Left Column: Heading & Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7"
          >
            <h2 className="font-display mt-4 text-2xl font-bold leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-3xl md:text-5xl text-balance">
              Tell us your line speed. <br />
              We&apos;ll spec the right roll, film and machine.
            </h2>
            <p className="mt-5 max-w-xl text-base text-[var(--color-mute)] md:text-lg">
              Share your SKU, payload profile and monthly volume. Our application team
              responds with a tailored spec sheet and indicative pricing within one
              business day.
            </p>
          </motion.div>

          {/* Right Column: Contact Cards */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="flex flex-col gap-3 lg:col-span-5"
          >
            {/* Email Sales Card */}
            <a
              href="mailto:sales@winnerpack.in"
              className="group flex items-center justify-between gap-3 rounded-xl bg-white border border-[var(--color-line)] px-4 py-4 sm:px-6 sm:py-5 text-[var(--color-ink)] shadow-sm transition hover:shadow-md hover:border-[var(--color-blue)]"
              data-hover
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[var(--color-blue-soft)] text-[var(--color-blue)] group-hover:bg-[var(--color-blue)] group-hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-mute)] group-hover:text-[var(--color-blue)] transition-colors">
                    Email sales
                  </div>
                  <div className="font-display text-sm font-bold sm:text-lg">sales@winnerpack.in</div>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="tel:+918595072187"
              className="group flex items-center justify-between gap-3 rounded-xl bg-white border border-[var(--color-line)] px-4 py-4 sm:px-6 sm:py-5 text-[var(--color-ink)] shadow-sm transition hover:shadow-md hover:border-[var(--color-blue)]"
              data-hover
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[var(--color-blue-soft)] text-[var(--color-blue)] group-hover:bg-[var(--color-blue)] group-hover:text-white transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-mute)] group-hover:text-[var(--color-blue)] transition-colors">
                    Call engineering
                  </div>
                  <div className="font-display text-xs font-bold sm:text-base">+91 85950 72187 / +91 74287 70999</div>
                </div>
              </div>
              <Phone className="h-5 w-5 text-[var(--color-mute)] group-hover:text-[var(--color-blue)] transition-transform group-hover:rotate-12" />
            </a>

            {/* Visit Plant Block */}
            <div className="mt-3 flex items-start gap-3 rounded-xl bg-white border border-[var(--color-line)] p-4 text-[var(--color-ink)] shadow-sm">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-blue)]" />
              <div className="text-sm">
                <div className="font-semibold text-[var(--color-ink)]">Visit the plant</div>
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
