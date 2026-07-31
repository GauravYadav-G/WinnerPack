"use client";

import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import AboutStrip from "../components/AboutStrip";
import Industries from "../components/Industries";
import ProductCategories from "../components/ProductCategories";
import WhyChooseUs from "../components/WhyChooseUs";
import ClientLogoStrip from "../components/ClientLogoStrip";
import Certifications from "../components/Certifications";
import Journey from "../components/Journey";
import CTABanner from "../components/CTABanner";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import ScrollProgress from "../components/ScrollProgress";
import { useRevealOnScroll } from "../hooks";
import PageWrapper from "../components/PageWrapper";
import FloatingWidgets from "../components/FloatingWidgets";

export default function Page() {
  useRevealOnScroll();

  return (
    <div className="min-h-screen bg-white text-[var(--color-text)]">
      <Cursor />
      <ScrollProgress />
      
      {/* 1 & 2. Top utility bar + Main navigation */}
      <Navbar />
      

      
      <PageWrapper>
        {/* 3. Hero slider */}
        <HeroSlider />
        <AboutStrip />

        {/* 5. Product Gallery grid */}
        <ProductCategories />

        {/* 4. Industries We Serve strip */}
        <Industries />

        {/* 8. USP + stats row (+ Scroll Ticker) */}
        <WhyChooseUs />

        {/* 10. Trusted Partners / Clients logo strip */}
        <ClientLogoStrip />

        {/* Engineered Solutions Section */}
        <Journey />

        {/* Certifications Section */}
        <Certifications />

        {/* 13. Enquiry CTA band & Detailed Product Inquiry Form */}
        <CTABanner />
      </PageWrapper>

      {/* 20. Footer */}
      <Footer />

      {/* 21. Floating elements */}
      <FloatingWidgets />
    </div>
  );
}
