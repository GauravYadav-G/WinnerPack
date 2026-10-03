'use client';

import { Lock, RotateCw, Signal, Battery } from 'lucide-react';
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
import OptimizedImage from '@/components/OptimizedImage';

export type PreviewViewport = 'desktop' | 'mobile';

interface SectionLivePreviewProps {
  sectionId: string;
  data: Record<string, any>;
  viewport: PreviewViewport;
}

export default function SectionLivePreview({ sectionId, data, viewport }: SectionLivePreviewProps) {
  const getSubPath = () => {
    switch (sectionId) {
      case 'about-us':
        return '/about-us';
      case 'contact':
        return '/contact';
      case 'gallery':
        return '/gallery';
      case 'global':
      case 'footer':
        return '';
      default:
        return `/#${sectionId}`;
    }
  };

  const renderContent = () => (
    <div className="w-full overflow-x-hidden min-h-[300px]">
      {sectionId === 'hero' && <HeroSlider previewData={data} />}
      {sectionId === 'about' && <AboutStrip previewData={data} />}
      {(sectionId === 'products' || sectionId === 'categories') && <ProductCategories previewData={data} />}
      {sectionId === 'industries' && <Industries previewData={data} />}
      {(sectionId === 'why' || sectionId === 'reasons') && <WhyChooseUs previewData={data} />}
      {(sectionId === 'applications' || sectionId === 'industrial-action') && <ProductApplicationsSlider previewData={data} />}
      {sectionId === 'partners' && <ClientLogoStrip previewData={data} />}
      {(sectionId === 'solutions' || sectionId === 'journey') && <Journey previewData={data} />}
      {sectionId === 'certifications' && <Certifications previewData={data} />}
      {sectionId === 'inquiry' && <ProductInquiryForm previewData={data} />}
      {sectionId === 'about-us' && (
        <div className="p-4 sm:p-6 bg-slate-50 min-h-[400px]">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-b pb-4">
              <span className="text-[10px] font-mono font-bold text-[#fe8220] uppercase tracking-widest block">
                {data.header?.eyebrow || 'Built to Hold Industry Together.'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {data.header?.title || 'About Us'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#fe8220] uppercase tracking-wider block">
                  {data.whoWeAre?.tag || 'Who We Are'}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {data.whoWeAre?.heading || 'Practical Packaging Solutions'}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {data.whoWeAre?.para1}
                </p>
              </div>
              {data.whoWeAre?.image && (
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-slate-900">
                  <OptimizedImage
                    src={data.whoWeAre.image}
                    alt="Factory floor"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t">
              {(data.metrics || []).map((m: any, i: number) => (
                <div key={i} className="p-3 bg-white rounded-lg border text-center">
                  <div className="text-lg font-bold text-[#fe8220]">{m.value}</div>
                  <div className="text-[10px] text-slate-500 font-medium">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {sectionId === 'contact' && (
        <div className="p-4 sm:p-6 bg-white min-h-[400px]">
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest block">
                {data.header?.tag || 'Contact'}
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1 whitespace-pre-line">
                {data.header?.title || 'Request specifications & indicative pricing.'}
              </h2>
              <p className="text-xs text-slate-600 mt-1">{data.header?.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div>
                <strong className="text-slate-800 block mb-1">Direct Hotlines</strong>
                <span className="text-slate-600 font-mono block">{data.details?.phone || '+91 85950 72187'}</span>
                <span className="text-slate-600 font-mono block">{data.details?.phone2}</span>
              </div>
              <div>
                <strong className="text-slate-800 block mb-1">Email Desk</strong>
                <span className="text-slate-600 font-mono block">{data.details?.salesEmail || 'sales@winnerpack.in'}</span>
                <span className="text-slate-600 font-mono block">{data.details?.email}</span>
              </div>
            </div>
            <div>
              <strong className="text-xs font-bold text-slate-800 block mb-2">Live FAQs ({data.faqs?.length || 0})</strong>
              <div className="space-y-1.5">
                {(data.faqs || []).slice(0, 3).map((f: any, i: number) => (
                  <div key={i} className="p-2.5 bg-slate-50 rounded-lg border text-xs">
                    <strong className="text-slate-800 block">{f.question}</strong>
                    <p className="text-slate-500 text-[11px] mt-0.5 line-clamp-2">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {(sectionId === 'global' || sectionId === 'footer') && (
        <div>
          {data.ticker?.enabled !== false && (
            <div className="bg-[#120a3b] text-white px-4 py-2 text-xs flex items-center justify-between font-mono">
              <span>{data.ticker?.text || data.ticker?.tickerText || 'ISO 9001:2015 Certified Manufacturer'}</span>
              <span>{data.ticker?.phone || '+91 85950 72187'}</span>
            </div>
          )}
          <div className="p-8 text-center text-xs text-gray-400 bg-gray-50 border-b font-mono">
            Page Layout Body (Footer & Floating Widgets rendered below)
          </div>
          <Footer />
          <FloatingWidgets />
        </div>
      )}
      {sectionId === 'gallery' && (
        <div className="p-6 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#a65b20] font-mono">
              Organization & Plant Gallery
            </span>
            <h3 className="text-xl font-bold text-gray-900 mt-1">Live Gallery Showcase</h3>
          </div>
          {data.mainHero?.image && (
            <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-sm relative bg-slate-900">
              <OptimizedImage
                src={data.mainHero.image}
                alt={data.mainHero.title || 'Gallery Hero'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white font-bold text-xs">
                {data.mainHero.title}
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[...(data.portraits || []), ...(data.landscapes || [])].slice(0, 6).map((item: any, i: number) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden border bg-slate-100 relative">
                <OptimizedImage src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute inset-x-0 bottom-0 p-1.5 text-[9px] bg-black/60 text-white font-medium truncate block">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (viewport === 'mobile') {
    return (
      <div className="w-full flex justify-center py-4 bg-gradient-to-b from-[#090619] via-[#0f0b26] to-[#150f33] rounded-2xl p-4 sm:p-8 border border-white/10 shadow-2xl">
        {/* Realistic iPhone 16 Pro Device Frame */}
        <div className="relative w-[393px] max-w-full">
          {/* Side Hardware Buttons (Left) */}
          <div className="absolute -left-[3.5px] top-24 w-[3.5px] h-7 bg-slate-600 rounded-l-xs shadow-xs" title="Action Button" />
          <div className="absolute -left-[3.5px] top-36 w-[3.5px] h-12 bg-slate-600 rounded-l-xs shadow-xs" title="Volume Up" />
          <div className="absolute -left-[3.5px] top-52 w-[3.5px] h-12 bg-slate-600 rounded-l-xs shadow-xs" title="Volume Down" />
          {/* Side Hardware Button (Right) */}
          <div className="absolute -right-[3.5px] top-40 w-[3.5px] h-16 bg-slate-600 rounded-r-xs shadow-xs" title="Power / Lock" />

          {/* Deep Matte Titanium Chassis */}
          <div className="rounded-[52px] bg-gradient-to-b from-[#2d283e] via-[#1a1629] to-[#110e1c] p-[10px] shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.18)] ring-1 ring-black">
            {/* Screen Bezel */}
            <div className="rounded-[44px] overflow-hidden bg-white text-[var(--color-text,#1c1917)] border border-black/40 relative shadow-inner flex flex-col">
              {/* iPhone Dynamic Island & Status Bar */}
              <div className="h-11 bg-white/95 backdrop-blur-md px-6 flex items-center justify-between select-none z-30 border-b border-black/5 shrink-0">
                <span className="text-[13px] font-bold text-slate-900 tracking-tight">9:41</span>
                {/* Dynamic Island Pill */}
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
              <div className="w-full overflow-y-auto overflow-x-hidden max-h-[720px] min-h-[420px] bg-white">
                {renderContent()}
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

  // Desktop View: Realistic macOS / Chrome Browser Window Frame
  return (
    <div className="w-full flex justify-center py-2">
      <div className="w-full max-w-[1360px] rounded-xl overflow-hidden shadow-2xl border border-slate-700/50 bg-[#16122c] transition-all">
        {/* macOS Browser Chrome Header */}
        <div className="bg-[#1c1736] border-b border-white/10 px-4 py-2.5 flex items-center justify-between gap-3 text-slate-300 select-none">
          {/* Traffic light dots */}
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
              <span className="text-slate-400 truncate">{getSubPath()}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-sans px-1.5 py-0.5 rounded bg-white/5 hidden md:inline shrink-0 ml-2">
              1440 × 900
            </span>
          </div>

          {/* Right badge */}
          <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Desktop Canvas
            </span>
          </div>
        </div>

        {/* Browser Content Area */}
        <div className="bg-white text-[var(--color-text,#1c1917)] overflow-x-hidden min-h-[360px]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
