"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import OptimizedImage from '@/components/OptimizedImage';
import { apiFetch } from "@/lib/api";

const defaultFooterData = {
  name: "Winner Pack Technologies",
  legalName: "Winner Pack Technologies Pvt. Ltd.",
  phone: "+91 85950 72187",
  phone2: "+91 74287 70999",
  email: "info@winnerpack.in",
  address: "Winner Pack Technologies Pvt. Ltd. Plot No. 8, B.S.T. Industrial Park, Village Dasna, Ghaziabad, Uttar Pradesh, 201015",
  description: "Winner Pack Technologies Pvt. Ltd. is a manufacturer and supplier of environment-friendly secondary and tertiary packaging materials. Guided by our motto \"We Serve To Deserve\", we supply quality stretch films, strapping rolls, shrink films, and protective packaging solutions to industrial businesses across diverse sectors.",
  linkedin: "https://www.linkedin.com/company/winnerpacktechnologies/",
  whatsapp: "918595072187",
  instagram: "https://www.instagram.com/winnerpacktechnologiespvtltd/",
  facebook: "https://www.facebook.com/winnerpackindia",
};

export default function Footer() {
  const [footerData, setFooterData] = useState(defaultFooterData);

  useEffect(() => {
    async function loadFooterData() {
      try {
        const res = await apiFetch("/api/content?key=footer");
        if (res.ok) {
          const result = await res.json();
          const content = result?.data ?? result;
          if (content) {
            setFooterData((prev) => ({ ...prev, ...content }));
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
                  label: "Facebook",
                  href: footerData.facebook || "https://www.facebook.com/winnerpackindia",
                  svg: (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )
                },
                {
                  label: "Instagram",
                  href: footerData.instagram || "https://www.instagram.com/winnerpacktechnologiespvtltd/",
                  svg: (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  )
                },
                {
                  label: "LinkedIn",
                  href: footerData.linkedin || "https://www.linkedin.com/company/winnerpacktechnologies/",
                  svg: (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  )
                },
                {
                  label: "WhatsApp",
                  href: footerData.whatsapp ? (footerData.whatsapp.startsWith("http") ? footerData.whatsapp : `https://wa.me/${footerData.whatsapp.replace(/[^0-9]/g, "")}`) : "https://wa.me/918595072187",
                  svg: (
                    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
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
                  { label: "Others", href: "/product-category/pp-strap" }
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
