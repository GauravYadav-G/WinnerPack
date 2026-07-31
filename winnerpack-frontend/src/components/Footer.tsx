import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--color-ink)] text-white pt-16 pb-8 border-t border-[var(--color-line)]/10">
      {/* Noise and Grid Overlays */}
      <div className="bg-noise absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-dark opacity-35 pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* Main Columns Container */}
        <div className="grid gap-10 lg:grid-cols-12">
          
          {/* Column 1: Logo & Company Description (col-md-4 -> lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Winner Pack Logo" className="h-10 w-auto object-contain" />
              <div className="leading-tight">
                <div className="font-display text-base font-bold tracking-tight">Winner Pack</div>
                <div className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/50">
                  WPT · Technologies
                </div>
              </div>
            </div>
            
            <p className="mt-5 text-xs sm:text-sm leading-relaxed text-white/60 text-justify">
              Winner Pack Technologies Pvt. Ltd. is one of the leading manufacturers and suppliers of environment-friendly secondary and tertiary packaging materials and machinery. Guided by our motto "We Serve To Deserve", we supply high-quality stretch films, strapping rolls, shrink films, and packaging machinery from our Ghaziabad, UP base, dispatched across India and to global export markets.
            </p>
            
            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-2">
              {[
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com",
                  svg: (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  )
                },
                {
                  label: "YouTube",
                  href: "https://youtube.com",
                  svg: (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.528 3.545 12 3.545 12 3.545s-7.528 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.022 0 12 0 12s0 3.978.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.86.508 9.388.508 9.388.508s7.528 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.978 24 12 24 12s0-3.978-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  )
                },
                {
                  label: "Instagram",
                  href: "https://instagram.com",
                  svg: (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  )
                }
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white/60 transition hover:border-[var(--color-blue-3)] hover:text-[var(--color-blue-3)] hover:bg-white/5"
                  data-hover
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Group wrapper for Quick Navigation and Our Products to display side-by-side on mobile */}
          <div className="grid grid-cols-2 gap-5 sm:gap-10 lg:col-span-5 lg:grid-cols-5 md:col-span-8">
            {/* Column 2: Quick Navigation */}
            <div className="lg:col-span-2">
              <h5 className="font-display text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2 mb-4">
                Quick Navigation
              </h5>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/60">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/about-us" },
                  { label: "Products", href: "/products" },
                  { label: "Machinery", href: "/machinery" },
                  { label: "Contact Us", href: "/contact" }
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors duration-200 block py-0.5" data-hover>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Our Products */}
            <div className="lg:col-span-3">
              <h5 className="font-display text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2 mb-4">
                Our Products
              </h5>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/60">
                {[
                  { label: "Plain & Barcode Labels", href: "/products?cat=labels" },
                  { label: "POF Shrink Film", href: "/products/pof-shrink-rolls" },
                  { label: "LDPE Shrink Film", href: "/products/ldpe-shrink-rolls" },
                  { label: "PP & PET Straps", href: "/products?cat=strapping" },
                  { label: "Manual & Machine Stretch Film", href: "/products?cat=pallet-wrapping" },
                  { label: "Bubble Rolls & Pouches", href: "/products/bubble-wrap-rolls" },
                  { label: "Silicon Tapes", href: "/products/silicon-tapes" }
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors duration-200 block py-0.5" data-hover>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Contact (col-md-3 -> lg:col-span-3) */}
          <div className="lg:col-span-3 md:col-span-4">
            <h5 className="font-display text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2 mb-4">
              Contact
            </h5>
            <ul className="space-y-4 text-xs sm:text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 text-[var(--color-blue-3)] mt-0.5" />
                <span className="leading-relaxed">
                  Winner Pack Technologies Pvt. Ltd. Plot No. 8, B.S.T. Industrial Park, Village Dasna, Ghaziabad, Uttar Pradesh, 201015
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4.5 w-4.5 flex-shrink-0 text-[var(--color-blue-3)] mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+918595072187" className="hover:text-white transition-colors" data-hover>
                    +91 85950 72187
                  </a>
                  <a href="tel:+917428770999" className="hover:text-white transition-colors" data-hover>
                    +91 74287 70999
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 flex-shrink-0 text-[var(--color-blue-3)]" />
                <a href="mailto:sales@winnerpack.in" className="hover:text-white transition-colors" data-hover>
                  sales@winnerpack.in
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer End (Copyright and Developer info) */}
        <div className="relative mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-white/40 tracking-wider">
          <div className="text-center md:text-left">
            © 2026 All Rights Reserved · Winner Pack Technologies Pvt. Ltd.
          </div>
          <div className="flex items-center gap-1.5 text-center md:text-right">
            <span>Designed & Developed By</span>
            <a
              href="https://www.jaikviktechnology.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-white transition-colors font-medium text-white/60"
              data-hover
            >
              Jaikvik Technology India Pvt. Ltd.
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
