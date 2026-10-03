'use client';

import React, { useEffect } from 'react';
import HeroSlider from '@/components/HeroSlider';
import AboutStrip from '@/components/AboutStrip';
import ProductCategories from '@/components/ProductCategories';
import Industries from '@/components/Industries';
import WhyChooseUs from '@/components/WhyChooseUs';
import ProductApplicationsSlider from '@/components/ProductApplicationsSlider';
import ClientLogoStrip from '@/components/ClientLogoStrip';
import Journey from '@/components/Journey';
import Certifications from '@/components/Certifications';
import ProductInquiryForm from '@/components/ProductInquiryForm';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';
import Navbar from '@/components/Navbar';
import { AboutUsContent } from '@/components/pages/AboutUsContent';
import { ContactPageContent } from '@/components/pages/ContactPageContent';
import GalleryClient from '@/app/gallery/GalleryClient';
import OptimizedImage from '@/components/OptimizedImage';
import { PageHeader } from '@/components/ui/PageHeader';
import {
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  Lock,
  RotateCw,
  Signal,
  Battery,
} from 'lucide-react';
import type { ViewportMode } from '@/lib/admin/studio-registry';

interface PreviewProps {
  pageId: string;
  activeSectionId: string;
  pageData: Record<string, any>;
  viewport: ViewportMode;
  previewMode: 'focus' | 'full';
  zoom: number;
  onSelectSection: (sectionId: string) => void;
}

interface InteractiveSectionProps {
  id: string;
  title: string;
  isActive: boolean;
  isFocusMode: boolean;
  onSelect: (id: string) => void;
  children: React.ReactNode;
}

function InteractiveSection({
  id,
  title,
  isActive,
  isFocusMode,
  onSelect,
  children,
}: InteractiveSectionProps) {
  return (
    <div
      id={`preview-sec-${id}`}
      onClick={(e) => {
        // Preview interactions select components; links must never navigate
        // the administrator away from the editor workspace.
        e.preventDefault();
        e.stopPropagation();
        onSelect(id);
      }}
      className={`studio-interactive-section ${isActive ? 'is-active' : ''} ${
        isFocusMode && !isActive ? 'is-dimmed' : ''
      }`}
    >
      {/* Active Editor Floating Badge */}
      {isActive && (
        <div className="studio-section-active-badge">
          <Sparkles className="w-3.5 h-3.5 text-[#fe8220] animate-spin-slow" />
          <span className="studio-badge-title">Editing: {title}</span>
          <span className="studio-badge-sub hidden sm:inline">Open in inspector</span>
        </div>
      )}

      {/* Hover prompt (when not active) */}
      {!isActive && (
        <div className="studio-section-hover-badge">
          <span>Click to edit {title}</span>
        </div>
      )}

      <div className="studio-section-inner">{children}</div>
    </div>
  );
}

export default function StudioPreviewCanvas({
  pageId,
  activeSectionId,
  pageData,
  viewport,
  previewMode,
  zoom,
  onSelectSection,
}: PreviewProps) {
  const isFocus = previewMode === 'focus';

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(`preview-sec-${activeSectionId}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeSectionId, viewport]);

  const renderPageContent = () => (
    <div className="w-full bg-white text-[var(--color-text,#1c1917)] overflow-x-hidden">
      {/* ─── 1. HOMEPAGE ────────────────────────────────────────── */}
      {pageId === 'home' && (
          <div className="w-full">
            <InteractiveSection
              id="hero"
              title="Hero Banner Slider"
              isActive={activeSectionId === 'hero'}
              isFocusMode={isFocus}
              onSelect={onSelectSection}
            >
              <HeroSlider previewData={pageData['hero']} />
            </InteractiveSection>

            <InteractiveSection
              id="about"
              title="About Winner Pack Strip"
              isActive={activeSectionId === 'about'}
              isFocusMode={isFocus}
              onSelect={onSelectSection}
            >
              <AboutStrip previewData={pageData['about']} />
            </InteractiveSection>

            <InteractiveSection
              id="categories"
              title="Product Categories Grid"
              isActive={activeSectionId === 'categories'}
              isFocusMode={isFocus}
              onSelect={onSelectSection}
            >
              <ProductCategories previewData={pageData['categories']} />
            </InteractiveSection>

            <InteractiveSection
              id="industries"
              title="Industries Served Showcase"
              isActive={activeSectionId === 'industries'}
              isFocusMode={isFocus}
              onSelect={onSelectSection}
            >
              <Industries previewData={pageData['industries']} />
            </InteractiveSection>

            <InteractiveSection
              id="why"
              title="Why Choose WinnerPack Strip"
              isActive={activeSectionId === 'why'}
              isFocusMode={isFocus}
              onSelect={onSelectSection}
            >
              <WhyChooseUs previewData={pageData['why']} />
            </InteractiveSection>

            <InteractiveSection
              id="applications"
              title="Product Applications Carousel"
              isActive={activeSectionId === 'applications'}
              isFocusMode={isFocus}
              onSelect={onSelectSection}
            >
              <ProductApplicationsSlider previewData={pageData['applications']} />
            </InteractiveSection>

            <InteractiveSection
              id="partners"
              title="Client & Partner Logo Strip"
              isActive={activeSectionId === 'partners'}
              isFocusMode={isFocus}
              onSelect={onSelectSection}
            >
              <ClientLogoStrip previewData={pageData['partners']} />
            </InteractiveSection>

            <InteractiveSection
              id="solutions"
              title="Packaging Solutions Journey"
              isActive={activeSectionId === 'solutions'}
              isFocusMode={isFocus}
              onSelect={onSelectSection}
            >
              <Journey previewData={pageData['solutions']} />
            </InteractiveSection>

            <InteractiveSection
              id="certifications"
              title="Certifications & Compliance Badges"
              isActive={activeSectionId === 'certifications'}
              isFocusMode={isFocus}
              onSelect={onSelectSection}
            >
              <Certifications previewData={pageData['certifications']} />
            </InteractiveSection>

            <InteractiveSection
              id="inquiry"
              title="Product RFQ & Inquiry Section"
              isActive={activeSectionId === 'inquiry'}
              isFocusMode={isFocus}
              onSelect={onSelectSection}
            >
              <ProductInquiryForm previewData={pageData['inquiry']} />
            </InteractiveSection>

            <Footer />
          </div>
        )}

        {pageId === 'about-us' && (
          <div className="pointer-events-none" aria-label="Official About Us page preview">
            <AboutUsContent
              embedded
              previewData={{
                header: pageData['about-header'],
                whoWeAre: pageData['about-who-we-are'],
                metrics: pageData['about-metrics']?.metrics,
                guides: pageData['about-guides'],
                capabilities: pageData['about-capabilities'],
              }}
            />
          </div>
        )}

        {pageId === 'contact' && (
          <div className="pointer-events-none" aria-label="Official Contact page preview">
            <ContactPageContent
              embedded
              previewData={{
                header: pageData['contact-header'],
                details: pageData['contact-channels'],
                faqs: pageData['contact-faqs']?.faqs,
              }}
            />
          </div>
        )}

        {pageId === 'gallery' && (
          <div className="pointer-events-none" aria-label="Official Gallery page preview">
            <GalleryClient
              embedded
              previewData={{
                mainHero: pageData['gallery-hero'],
                portraits: pageData['gallery-items']?.portraits,
                landscapes: pageData['gallery-items']?.landscapes,
              }}
            />
          </div>
        )}

        {/* ─── 2. ABOUT US PAGE ───────────────────────────────────── */}
        {pageId === '__legacy-about-us' && (
          <div className="w-full">
            <InteractiveSection
              id="about-header"
              title="Page Header & Eyebrow"
              isActive={activeSectionId === 'about-header'}
              isFocusMode={isFocus}
              onSelect={onSelectSection}
            >
              <PageHeader
                title={pageData['about-header']?.title || 'About Us'}
                eyebrow={pageData['about-header']?.eyebrow || 'Built to Hold Industry Together.'}
                crumbs={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
                align="left"
              />
            </InteractiveSection>

            {/* Who We Are */}
            <InteractiveSection
              id="about-who-we-are"
              title="Who We Are Strip"
              isActive={activeSectionId === 'about-who-we-are'}
              isFocusMode={isFocus}
              onSelect={onSelectSection}
            >
              <section className="py-12 px-6 border-b border-gray-200 bg-white">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 space-y-4">
                    <span className="text-xs font-bold tracking-widest text-[#a65b20] uppercase font-mono">
                      {pageData['about-who-we-are']?.tag || 'Who We Are'}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-[#120a3b] leading-tight">
                      {pageData['about-who-we-are']?.heading || 'Practical Packaging Solutions, Built Around Real Operations.'}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {pageData['about-who-we-are']?.para1}
                    </p>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {pageData['about-who-we-are']?.para2}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {(pageData['about-who-we-are']?.checkpoints || []).map((cp: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 border border-gray-200 text-xs sm:text-sm font-semibold text-gray-800">
                          <CheckCircle2 className="w-4 h-4 text-[#fe8220] shrink-0" />
                          {cp}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-6 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-gray-200 relative bg-slate-900">
                    <OptimizedImage
                      src={pageData['about-who-we-are']?.image || '/images/desktop/about/about_factory_floor_v2.webp'}
                      alt="About Us Floor"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </section>
            </InteractiveSection>

            {/* Metrics */}
            <InteractiveSection
              id="about-metrics"
              title="Company Scale Metrics"
              isActive={activeSectionId === 'about-metrics'}
              isFocusMode={isFocus}
              onSelect={onSelectSection}
            >
              <section className="py-10 bg-[#160d3b] text-white">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                  {(pageData['about-metrics']?.metrics || []).map((m: any, idx: number) => (
                    <div key={idx} className="p-4 border-r last:border-0 border-white/10">
                      <strong className="text-3xl sm:text-4xl font-extrabold text-[#fe8220] block font-mono">
                        {m.value}
                      </strong>
                      <span className="text-xs sm:text-sm text-gray-300 mt-1 block">{m.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            </InteractiveSection>

            {/* Infrastructure */}
            <InteractiveSection
              id="about-infrastructure"
              title="Plant & Machinery Infrastructure"
              isActive={activeSectionId === 'about-infrastructure'}
              isFocusMode={isFocus}
              onSelect={onSelectSection}
            >
              <section className="py-12 px-6 bg-gray-50 border-b border-gray-200">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center max-w-2xl mx-auto mb-10">
                    <span className="text-xs font-bold tracking-widest text-[#a65b20] uppercase font-mono">
                      {pageData['about-infrastructure']?.eyebrow || 'PLANT & MACHINERY'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#120a3b] mt-2">
                      {pageData['about-infrastructure']?.heading || 'Precision Extrusion Lines'}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {pageData['about-infrastructure']?.description}
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-6">
                    {(pageData['about-infrastructure']?.facilities || []).map((fac: any, i: number) => (
                      <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                        <div className="h-44 bg-slate-900 overflow-hidden">
                          <OptimizedImage src={fac.image} alt={fac.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-sm text-gray-900">{fac.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">{fac.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </InteractiveSection>

            {/* QA Tests */}
            <InteractiveSection
              id="about-qa"
              title="Quality Protocols & Lab Tests"
              isActive={activeSectionId === 'about-qa'}
              isFocusMode={isFocus}
              onSelect={onSelectSection}
            >
              <section className="py-12 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center max-w-2xl mx-auto mb-8">
                    <span className="text-xs font-bold tracking-widest text-[#a65b20] uppercase font-mono">
                      {pageData['about-qa']?.eyebrow || 'QUALITY PROTOCOLS'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#120a3b] mt-2">
                      {pageData['about-qa']?.heading}
                    </h3>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {(pageData['about-qa']?.tests || []).map((test: any, idx: number) => (
                      <div key={idx} className="p-5 rounded-xl border border-gray-200 bg-gray-50 flex gap-3">
                        <ShieldCheck className="w-6 h-6 text-[#fe8220] shrink-0" />
                        <div>
                          <h5 className="font-bold text-sm text-gray-900">{test.name}</h5>
                          <p className="text-xs text-gray-600 mt-1">{test.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </InteractiveSection>

            <Footer />
          </div>
        )}

        {/* ─── 3. CONTACT & QUOTE PAGE ────────────────────────────── */}
        {pageId === '__legacy-contact' && (
          <div className="w-full">
            <InteractiveSection
              id="contact-header"
              title="Page Header & Eyebrow"
              isActive={activeSectionId === 'contact-header'}
              isFocusMode={isFocus}
              onSelect={onSelectSection}
            >
              <PageHeader
                title={pageData['contact-header']?.title || 'Contact Our Packaging Specialists'}
                eyebrow={pageData['contact-header']?.eyebrow || 'Direct Technical Support & Fast Dispatch RFQ'}
                crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]}
                align="left"
              />
            </InteractiveSection>

            <section className="py-12 px-6 max-w-6xl mx-auto grid lg:grid-cols-12 gap-8">
              {/* Left Contact Channels */}
              <div className="lg:col-span-5 space-y-6">
                <InteractiveSection
                  id="contact-channels"
                  title="Direct Contact Channels & Address"
                  isActive={activeSectionId === 'contact-channels'}
                  isFocusMode={isFocus}
                  onSelect={onSelectSection}
                >
                  <div className="p-6 rounded-2xl bg-[#160d3b] text-white shadow-lg space-y-4">
                    <h3 className="text-lg font-bold text-[#fe8220]">Direct Inquiries</h3>
                    <div className="flex items-start gap-3 text-sm">
                      <MapPin className="w-5 h-5 text-[#fe8220] shrink-0 mt-0.5" />
                      <span>{pageData['contact-channels']?.officeAddress}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <Phone className="w-5 h-5 text-[#fe8220] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">{pageData['contact-channels']?.phone1}</p>
                        <p className="text-gray-300 text-xs">{pageData['contact-channels']?.phone2}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <Mail className="w-5 h-5 text-[#fe8220] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">{pageData['contact-channels']?.salesEmail}</p>
                        <p className="text-gray-300 text-xs">{pageData['contact-channels']?.supportEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <Clock className="w-5 h-5 text-[#fe8220] shrink-0 mt-0.5" />
                      <span>{pageData['contact-channels']?.hours}</span>
                    </div>
                  </div>
                </InteractiveSection>

                {/* FAQs */}
                <InteractiveSection
                  id="contact-faqs"
                  title="Contact Page FAQs"
                  isActive={activeSectionId === 'contact-faqs'}
                  isFocusMode={isFocus}
                  onSelect={onSelectSection}
                >
                  <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                    <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-[#fe8220]" />
                      Frequently Asked Questions
                    </h3>
                    <div className="space-y-3">
                      {(pageData['contact-faqs']?.faqs || []).map((faq: any, i: number) => (
                        <div key={i} className="p-3 bg-white rounded-lg border border-gray-200">
                          <strong className="text-xs font-semibold text-gray-900 block">{faq.question}</strong>
                          <p className="text-xs text-gray-600 mt-1 leading-relaxed">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </InteractiveSection>
              </div>

              {/* Right RFQ Form Simulator */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Request Technical Data & Instant Quote</h3>
                <p className="text-xs text-gray-500">Dispatch lead time guarantee: 24–48 hours for standard specs.</p>
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <input type="text" placeholder="Full Name *" className="border p-2.5 rounded-lg text-xs w-full" disabled />
                  <input type="text" placeholder="Company Name *" className="border p-2.5 rounded-lg text-xs w-full" disabled />
                  <input type="email" placeholder="Business Email *" className="border p-2.5 rounded-lg text-xs w-full" disabled />
                  <input type="tel" placeholder="Phone Number *" className="border p-2.5 rounded-lg text-xs w-full" disabled />
                </div>
                <textarea placeholder="Specific gauge, dimensions, volume requirement..." rows={4} className="border p-2.5 rounded-lg text-xs w-full" disabled />
                <button type="button" className="w-full py-3 bg-[#fe8220] text-[#120a3b] font-bold rounded-lg text-sm" disabled>
                  Submit Instant Quote Request →
                </button>
              </div>
            </section>

            <Footer />
          </div>
        )}

        {/* ─── 4. INDUSTRY SOLUTION PAGE ──────────────────────────── */}
        {pageId === 'industry-page' && (
          <div className="w-full">
            <InteractiveSection
              id="ind-hero"
              title="Industry Overview & Case Solution"
              isActive={activeSectionId === 'ind-hero'}
              isFocusMode={isFocus}
              onSelect={onSelectSection}
            >
              <PageHeader
                title={pageData['ind-hero']?.title || 'Pharmaceutical & Healthcare Packaging'}
                eyebrow={pageData['ind-hero']?.eyebrow || 'PHARMA PACKAGING EXCELLENCE'}
                crumbs={[{ label: 'Home', to: '/' }, { label: 'Industries', to: '/#industries' }, { label: 'Pharma' }]}
                align="left"
              />
              <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-extrabold text-[#120a3b] leading-tight">
                      {pageData['ind-hero']?.headline}
                    </h3>
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 leading-relaxed">
                      <strong>Industry Challenge: </strong>
                      {pageData['ind-hero']?.problem}
                    </div>
                    <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-xs text-green-900 leading-relaxed">
                      <strong>WinnerPack Engineered Solution: </strong>
                      {pageData['ind-hero']?.solution}
                    </div>
                  </div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border bg-slate-900">
                    <OptimizedImage
                      src={pageData['ind-hero']?.image || '/images/desktop/industries/pharma_industry.webp'}
                      alt="Industry"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </InteractiveSection>

            {/* Compliance Badges */}
            <InteractiveSection
              id="ind-compliance"
              title="Compliance Badges & Certifications"
              isActive={activeSectionId === 'ind-compliance'}
              isFocusMode={isFocus}
              onSelect={onSelectSection}
            >
              <div className="max-w-6xl mx-auto px-6 pb-12">
                <div className="flex flex-wrap gap-3 pt-4 border-t">
                  {(pageData['ind-compliance']?.badges || []).map((b: string, i: number) => (
                    <span key={i} className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-xs font-bold text-gray-800 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#fe8220]" />
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </InteractiveSection>

            <Footer />
          </div>
        )}

        {/* ─── 5. GALLERY PAGE ────────────────────────────────────── */}
        {pageId === '__legacy-gallery' && (
          <div className="w-full">
            <PageHeader
              title="Organization & Plant Gallery"
              eyebrow="MANUFACTURING INFRASTRUCTURE & TEAM CULTURE"
              crumbs={[{ label: 'Home', to: '/' }, { label: 'Gallery' }]}
              align="left"
            />
            <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
              {/* Featured Hero */}
              <InteractiveSection
                id="gallery-hero"
                title="Featured Gallery Hero Photo"
                isActive={activeSectionId === 'gallery-hero'}
                isFocusMode={isFocus}
                onSelect={onSelectSection}
              >
                <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-gray-200 shadow-md relative bg-slate-900">
                  <OptimizedImage
                    src={pageData['gallery-hero']?.image || '/images/gallery/team_office_celebration.webp'}
                    alt="Gallery Hero"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white font-bold text-sm">
                    {pageData['gallery-hero']?.title}
                  </div>
                </div>
              </InteractiveSection>

              {/* Grid */}
              <InteractiveSection
                id="gallery-items"
                title="Gallery Media Grid & Albums"
                isActive={activeSectionId === 'gallery-items'}
                isFocusMode={isFocus}
                onSelect={onSelectSection}
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  {[
                    ...(pageData['gallery-items']?.portraits || []),
                    ...(pageData['gallery-items']?.landscapes || []),
                  ].slice(0, 8).map((item: any, idx: number) => (
                    <div key={idx} className="aspect-square rounded-xl overflow-hidden border bg-slate-100 relative group">
                      <OptimizedImage src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <span className="absolute inset-x-0 bottom-0 p-2 text-[10px] bg-black/60 text-white font-medium truncate block">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </InteractiveSection>
            </div>

            <Footer />
          </div>
        )}

        {/* ─── 6. BLOG HUB & ARTICLE ──────────────────────────────── */}
        {pageId === 'blog' && (
          <div className="w-full">
            <InteractiveSection
              id="blog-hub"
              title="Blog Hub Header & Meta"
              isActive={activeSectionId === 'blog-hub'}
              isFocusMode={isFocus}
              onSelect={onSelectSection}
            >
              <PageHeader
                title={pageData['blog-hub']?.title || 'Packaging Engineering Insights'}
                eyebrow={pageData['blog-hub']?.eyebrow || 'WINNER PACK TECHNICAL JOURNAL'}
                crumbs={[{ label: 'Home', to: '/' }, { label: 'Blog' }]}
                align="left"
              />
            </InteractiveSection>

            <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
              <InteractiveSection
                id="blog-article-sample"
                title="Sample Article Template & Meta"
                isActive={activeSectionId === 'blog-article-sample'}
                isFocusMode={isFocus}
                onSelect={onSelectSection}
              >
                <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white p-6 sm:p-8 space-y-4">
                  <span className="text-xs uppercase font-bold text-[#fe8220] tracking-wider font-mono">
                    {pageData['blog-article-sample']?.tag} · {pageData['blog-article-sample']?.readTime}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#120a3b] leading-tight">
                    {pageData['blog-article-sample']?.title}
                  </h3>
                  <div className="text-xs text-gray-500">
                    By <strong>{pageData['blog-article-sample']?.author}</strong> · {pageData['blog-article-sample']?.date}
                  </div>
                  <div className="aspect-[16/9] rounded-xl overflow-hidden bg-slate-900">
                    <OptimizedImage
                      src={pageData['blog-article-sample']?.image || '/images/desktop/industries/ecommerce_logistics_industry.webp'}
                      alt="Blog Cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed font-serif">
                    {pageData['blog-article-sample']?.excerpt}
                  </p>
                </div>
              </InteractiveSection>
            </div>

            <Footer />
          </div>
        )}

        {/* ─── 7. GLOBAL HEADER & FOOTER ─────────────────────────── */}
        {pageId === 'global' && (
          <div className="w-full">
            {/* Top Ticker preview */}
            <InteractiveSection
              id="global-ticker"
              title="Global Notification Ticker"
              isActive={activeSectionId === 'global-ticker'}
              isFocusMode={isFocus}
              onSelect={onSelectSection}
            >
              <div className="pointer-events-none bg-white">
                <Navbar previewData={pageData['global-ticker']} />
              </div>
            </InteractiveSection>

            <div className="py-20 text-center bg-gray-50 border-b">
              <h4 className="text-base font-bold text-gray-700">Page Content Area (Header Above, Footer Below)</h4>
              <p className="text-xs text-gray-400 mt-1">Global elements surround every page across the website.</p>
            </div>

            <InteractiveSection
              id="global-footer"
              title="Global Footer & Navigation Links"
              isActive={activeSectionId === 'global-footer'}
              isFocusMode={isFocus}
              onSelect={onSelectSection}
            >
              <Footer previewData={pageData['global-footer']} />
            </InteractiveSection>

            <InteractiveSection
              id="global-floating"
              title="Global Floating Quick Actions"
              isActive={activeSectionId === 'global-floating'}
              isFocusMode={isFocus}
              onSelect={onSelectSection}
            >
              <FloatingWidgets previewData={{ ...pageData['global-footer'], ...pageData['global-floating'] }} />
            </InteractiveSection>
          </div>
        )}
      </div>
    );

  if (viewport === 'mobile') {
    return (
      <div
        className="studio-mobile-wrapper flex justify-center py-4"
        style={{
          transform: `scale(${zoom})`,
        }}
      >
        <div className="relative w-[393px] max-w-full">
          {/* Side Hardware Buttons */}
          <div className="absolute -left-[3.5px] top-24 w-[3.5px] h-7 bg-slate-600 rounded-l-xs shadow-xs" title="Action Button" />
          <div className="absolute -left-[3.5px] top-36 w-[3.5px] h-12 bg-slate-600 rounded-l-xs shadow-xs" title="Volume Up" />
          <div className="absolute -left-[3.5px] top-52 w-[3.5px] h-12 bg-slate-600 rounded-l-xs shadow-xs" title="Volume Down" />
          <div className="absolute -right-[3.5px] top-40 w-[3.5px] h-16 bg-slate-600 rounded-r-xs shadow-xs" title="Power / Lock" />

          {/* Deep Matte Titanium Chassis */}
          <div className="rounded-[52px] bg-gradient-to-b from-[#2d283e] via-[#1a1629] to-[#110e1c] p-[10px] shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.18)] ring-1 ring-black">
            {/* Screen Bezel */}
            <div className="rounded-[44px] overflow-hidden bg-white text-[var(--color-text,#1c1917)] border border-black/40 relative shadow-inner flex flex-col">
              {/* iPhone Dynamic Island & Status Bar */}
              <div className="h-11 bg-white/95 backdrop-blur-md px-6 flex items-center justify-between select-none z-30 border-b border-black/5 shrink-0">
                <span className="text-[13px] font-bold text-slate-900 tracking-tight">9:41</span>
                {/* Dynamic Island */}
                <div className="w-[112px] h-[28px] bg-black rounded-full flex items-center justify-between px-2.5 shadow-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a14] border border-slate-800 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-blue-900/60" />
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#18182b]" />
                </div>
                <div className="flex items-center gap-1.5 text-slate-900">
                  <Signal size={12} className="stroke-[2.5]" />
                  <span className="text-[10px] font-extrabold tracking-tighter">5G</span>
                  <Battery size={13} className="stroke-[2.5]" />
                </div>
              </div>

              {/* Scrollable Mobile Viewport */}
              <div className="w-full overflow-y-auto overflow-x-hidden max-h-[820px] min-h-[460px] bg-white">
                {renderPageContent()}
              </div>

              {/* iOS Home Swipe Bar */}
              <div className="py-2.5 bg-gradient-to-t from-white via-white/95 to-transparent flex justify-center shrink-0 select-none border-t border-slate-100">
                <div className="w-32 h-1 bg-slate-900/60 rounded-full" />
              </div>
            </div>
          </div>

          <div className="text-center mt-3 text-[11px] font-mono text-slate-400">
            iPhone 16 Pro · 393 × 852 px
          </div>
        </div>
      </div>
    );
  }

  // Desktop View: Realistic macOS Browser Window
  return (
    <div
      className="studio-device-frame desktop"
      style={{
        transform: `scale(${zoom})`,
      }}
    >
      {/* macOS Browser Chrome Header */}
      <div className="bg-[#1c1736] border-b border-white/10 px-4 py-2.5 flex items-center justify-between gap-3 text-slate-300 select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] inline-block shadow-xs" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] inline-block shadow-xs" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] inline-block shadow-xs" />
          <div className="hidden sm:flex items-center gap-1.5 ml-3 text-slate-400">
            <span className="px-1 py-0.5 rounded hover:bg-white/5 cursor-default text-xs font-mono">‹</span>
            <span className="px-1 py-0.5 rounded hover:bg-white/5 cursor-default text-xs font-mono">›</span>
            <RotateCw size={11} className="ml-1 opacity-70" />
          </div>
        </div>

        {/* URL Search Pill */}
        <div className="flex-1 max-w-lg bg-[#0e0a22]/80 border border-white/10 rounded-lg px-3 py-1 flex items-center justify-between text-xs font-mono text-slate-300 shadow-inner">
          <div className="flex items-center gap-1.5 truncate">
            <Lock size={11} className="text-emerald-400 shrink-0" />
            <span className="text-slate-400">https://</span>
            <span className="text-white font-semibold">winnerpack.in</span>
            <span className="text-slate-400 truncate">/{pageId === 'home' ? '' : pageId}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-sans px-1.5 py-0.5 rounded bg-white/5 hidden md:inline shrink-0 ml-2">
            1440 × 900
          </span>
        </div>

        {/* Right status badge */}
        <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Desktop Canvas
          </span>
        </div>
      </div>

      {renderPageContent()}
    </div>
  );
}
