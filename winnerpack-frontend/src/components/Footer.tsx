"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import OptimizedImage from '@/components/OptimizedImage';

const defaultFooterData = {
  name: "Winner Pack Technologies",
  legalName: "Winner Pack Technologies Pvt. Ltd.",
  phone: "+91 85950 72187",
  phone2: "+91 74287 70999",
  email: "sales@winnerpack.in",
  address: "Winner Pack Technologies Pvt. Ltd. Plot No. 8, B.S.T. Industrial Park, Village Dasna, Ghaziabad, Uttar Pradesh, 201015",
  description: "Winner Pack Technologies Pvt. Ltd. is a manufacturer and supplier of environment-friendly secondary and tertiary packaging materials. Guided by our motto \"We Serve To Deserve\", we supply quality stretch films, strapping rolls, shrink films, and protective packaging solutions to industrial businesses across diverse sectors.",
  linkedin: "https://linkedin.com",
  youtube: "https://youtube.com",
  instagram: "https://instagram.com",
};

export default function Footer() {
  const [footerData, setFooterData] = useState(defaultFooterData);

  useEffect(() => {
    async function loadFooterData() {
      try {
        const res = await fetch("/api/content?key=footer");
        if (res.ok) {
          const result = await res.json();
          if (result?.data) {
            setFooterData((prev) => ({ ...prev, ...result.data }));
          }
        }
      } catch (err) {
        console.warn("Could not load footer from DB, using defaults:", err);
      }
    }
    loadFooterData();
  }, []);

  return (
    <footer className="relative overflow-hidden bg-[var(--color-ink)] text-white pt-16 pb-8 border-t border-[var(--color-line)]/10">
      {/* Noise and Grid Overlays */}
      <div className="bg-noise absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-dark opacity-35 pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* Main Columns Container */}
        <div className="grid gap-10 lg:grid-cols-12">
          
          {/* Column 1: Logo & Company Description */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-3">
              <OptimizedImage
  src={"/logo.png"}
  alt="Winner Pack Logo"
  className="h-12 w-auto object-contain"
/>
              <div className="leading-tight flex flex-col">
                <div className="font-display text-lg sm:text-xl font-black tracking-tight text-white leading-none">
                  Winner Pack
                </div>
                <div className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-amber)] mt-1 text-right">
                  Technologies Pvt Ltd
                </div>
              </div>
            </div>
            
            <p className="mt-5 text-xs sm:text-sm leading-relaxed text-white/60 text-justify">
              {footerData.description}
            </p>
            
            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-2">
              {[
                {
                  label: "LinkedIn",
                  href: footerData.linkedin || "https://linkedin.com",
                  svg: (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  )
                },
                {
                  label: "YouTube",
                  href: footerData.youtube || "https://youtube.com",
                  svg: (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.528 3.545 12 3.545 12 3.545s-7.528 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.022 0 12 0 12s0 3.978.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.86.508 9.388.508 9.388.508s7.528 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.978 24 12 24 12s0-3.978-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  )
                },
                {
                  label: "Instagram",
                  href: footerData.instagram || "https://instagram.com",
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

          {/* Quick Navigation + Products */}
          <div className="grid grid-cols-2 gap-5 sm:gap-10 lg:col-span-5 lg:grid-cols-5 md:col-span-8">
            {/* Quick Navigation */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2 mb-4">
                Quick Navigation
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/60">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/about-us" },
                  { label: "Products", href: "/products" },
                  { label: "Gallery", href: "/gallery" },
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

            {/* Our Products */}
            <div className="lg:col-span-3">
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2 mb-4">
                Our Products
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/60">
                {[
                  { label: "Film Products", href: "/product-category/film-products" },
                  { label: "Labels & Stickers", href: "/product-category/label-sticker-products" },
                  { label: "Tapes Catalog", href: "/product-category/tapes" },
                  { label: "PP & PET Straps", href: "/product-category/pp-strap" }
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

          {/* Contact Column */}
          <div className="lg:col-span-3 md:col-span-4">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2 mb-4">
              Contact
            </h2>
            <ul className="space-y-4 text-xs sm:text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 text-[var(--color-blue-3)] mt-0.5" />
                <span className="leading-relaxed">
                  {footerData.address}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4.5 w-4.5 flex-shrink-0 text-[var(--color-blue-3)] mt-0.5" />
                <div className="flex flex-col gap-1">
                  {footerData.phone && (
                    <a href={`tel:${footerData.phone.replace(/\s+/g, "")}`} className="hover:text-white transition-colors" data-hover>
                      {footerData.phone}
                    </a>
                  )}
                  {footerData.phone2 && (
                    <a href={`tel:${footerData.phone2.replace(/\s+/g, "")}`} className="hover:text-white transition-colors" data-hover>
                      {footerData.phone2}
                    </a>
                  )}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 flex-shrink-0 text-[var(--color-blue-3)]" />
                <a href={`mailto:${footerData.email}`} className="hover:text-white transition-colors" data-hover>
                  {footerData.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer End */}
        <div className="relative mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-white/40 tracking-wider">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} All Rights Reserved · {footerData.legalName}
          </div>
          <div className="flex items-center gap-1.5 text-center md:text-right">
            <span>Designed &amp; Developed By</span>
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
