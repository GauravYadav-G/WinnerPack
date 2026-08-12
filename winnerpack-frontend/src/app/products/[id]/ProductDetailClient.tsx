"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Loader2, Factory, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { productCategories } from "../../../data";
import { COMPANY } from "../../../lib/mock-data";
import { Container, Section, Eyebrow } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ProductCard";
import CTABanner from "@/components/CTABanner";

// Layout components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageWrapper from "@/components/PageWrapper";

import { apiFetch } from "@/lib/api";
import { marked } from "marked";
import { initialProducts } from "@/lib/fallback-data";
import OptimizedImage from '@/components/OptimizedImage';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState<string>("");

  const aliasMap: Record<string, string> = {
    "lamination-pe-film": "lamination-films-pouches",
    "pof-shrink-film": "pof-films-pouches",
    "packaging-films": "ldpe-films-pouches",
    "agricultural-films": "compostable-films-pouches",
    "biodegradable-films": "compostable-films-pouches",
    "flexible-laminate-rolls": "lamination-films-pouches",
    "printed-pe-films": "coloured-films-pouches",
    "ldpe-bags": "ldpe-films-pouches",
    "bopp-films": "bopp-films-pouches",
    "pvc-shrink-films": "pvc-shrink-rolls-pouches",
  };
  const targetId = aliasMap[id] || id;

  useEffect(() => {
    setLoading(true);
    apiFetch(`/api/products/${targetId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setImg(data.gallery?.[0] || data.image || "");

        apiFetch("/api/products")
          .then((res) => res.json())
          .then((allProds) => {
            if (Array.isArray(allProds)) {
              const matches = allProds.filter(
                (p: any) => p.category === data.category && p.id !== data.id
              ).slice(0, 3);
              setRelated(matches);
            }
          })
          .catch(() => {
            // Backend offline — fall back gracefully to local category related items
          });

        setLoading(false);
      })
      .catch((err) => {
        console.warn("Failed to load product detail from API, using client fallback:", err);
        const fallbackProduct = initialProducts.find((p) => p.id === targetId || p.id === id);
        if (fallbackProduct) {
          setProduct(fallbackProduct);
          setImg(fallbackProduct.gallery?.[0] || fallbackProduct.image || "");
          const matches = initialProducts.filter(
            (p: any) => p.category === fallbackProduct.category && p.id !== fallbackProduct.id
          ).slice(0, 3);
          setRelated(matches);
        } else {
          setProduct(null);
        }
        setLoading(false);
      });
  }, [id, targetId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-blue-deep)] text-white">
        <Cursor />
        <ScrollProgress />
        <Navbar />

        <PageWrapper>
          <section className="grid min-h-[70vh] place-items-center bg-[var(--color-blue-deep)] px-6 pt-20 text-center">
            <div className="flex flex-col items-center justify-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[var(--color-amber-2)]" />
              <span className="font-mono text-xs uppercase tracking-widest text-white/60">Loading product application data...</span>
            </div>
          </section>
        </PageWrapper>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--color-blue-deep)] text-white">
        <Cursor />
        <ScrollProgress />
        <Navbar />
        <PageWrapper>
          <section className="grid min-h-[70vh] place-items-center bg-[var(--color-blue-deep)] px-6 pt-20 text-center">
            <div>
              <h1 className="font-display text-2xl font-bold">Product Specification Not Found</h1>
              <Link href="/products" className="mt-4 inline-block text-xs font-mono uppercase tracking-widest text-[var(--color-amber)] hover:underline">
                Return to Product Line Catalog
              </Link>
            </div>
          </section>
        </PageWrapper>
        <Footer />
      </div>
    );
  }

  const categoryObj = productCategories.find((c) => c.id === product.category);
  const category = categoryObj?.title || product.category;

  const specs = product.specs ? Object.entries(product.specs).map(([label, value]: any) => ({
    label,
    value,
  })) : [];


  // 5-Photo Gallery Collage Setup: Slot 0 = Featured Hero Image; Slots 1-4 = Dedicated Product Application Folder Images
  const productAppDir = `/images/products/${product.id}/applications`;

  const appSlotImages = Array.isArray(product.applicationSlots) && product.applicationSlots.length > 0
    ? product.applicationSlots.map((s: any) => s.image).filter(Boolean)
    : [
        `${productAppDir}/app-1.png`,
        `${productAppDir}/app-2.png`,
        `${productAppDir}/app-3.png`,
        `${productAppDir}/app-4.png`,
      ];

  const displayGallery = [
    product.image || appSlotImages[0] || `${productAppDir}/app-1.png`,
    appSlotImages[0] || `${productAppDir}/app-1.png`,
    appSlotImages[1] || `${productAppDir}/app-2.png`,
    appSlotImages[2] || `${productAppDir}/app-3.png`,
    appSlotImages[3] || `${productAppDir}/app-4.png`,
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bone)] text-[var(--color-text)]">
      <Cursor />
      <ScrollProgress />
      <Navbar />

      <PageWrapper>
        {/* ── SPECIALIZED LAYOUT FOR LAMINATION PE FILM (WINNERPACK THEME & TYPOGRAPHY) ── */}
        {(product.id === "lamination-films-pouches" || product.id === "lamination-pe-film") ? (
          <>
            {/* 1. HERO BANNER WITH WINNERPACK INK NAVY & AMBER ACCENTS */}
            <div className="relative w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[380px] overflow-hidden bg-[var(--color-ink)] flex items-center justify-center border-b border-white/10">
              <div className="absolute inset-0">
                <OptimizedImage
                  src="/images/desktop/about/blown_film_tower.png"
                  alt="Lamination PE Film Manufacturing"
                  className="w-full h-full object-cover object-center opacity-25 mix-blend-luminosity scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ink)]/90 via-[var(--color-blue-deep)]/80 to-[var(--color-ink)]/95" />
              </div>

              <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-2 sm:space-y-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-amber)]/20 border border-[var(--color-amber)]/40 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-amber)]">
                  High-Barrier Polyethylene Films
                </span>
                
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-display drop-shadow-md">
                  Lamination PE Film
                </h1>

                <nav aria-label="Breadcrumb" className="pt-1">
                  <ol className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-white/70">
                    <li><Link href="/" className="hover:text-[var(--color-amber)] transition-colors">Home</Link></li>
                    <li><ChevronRight className="h-3 w-3 text-white/40" /></li>
                    <li><Link href="/products" className="hover:text-[var(--color-amber)] transition-colors">Products</Link></li>
                    <li><ChevronRight className="h-3 w-3 text-white/40" /></li>
                    <li className="font-bold text-[var(--color-amber)]">Lamination PE Film</li>
                  </ol>
                </nav>
              </div>
            </div>

            {/* 2. TWO PROMINENT SUBCATEGORY CARDS IN WINNERPACK THEME */}
            <section className="bg-[var(--color-mist)] py-10 sm:py-14 md:py-16 border-b border-[var(--color-line)]">
              <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
                  <Eyebrow>Product Classifications</Eyebrow>
                  <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[var(--color-ink)] font-display tracking-tight">
                    Engineered PE Lamination Grades
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
                  
                  {/* Card 1: Adhesive Lamination Film */}
                  <div className="bg-[var(--color-ink)] text-white rounded-2xl sm:rounded-3xl border border-white/10 shadow-xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between group hover:border-[var(--color-amber)]/40 transition-all duration-300">
                    <div className="space-y-4 sm:space-y-5">
                      {/* Inner Image Frame */}
                      <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 aspect-[16/10] overflow-hidden flex items-center justify-center">
                        <OptimizedImage
                          src="/images/products/specialty-pouches/image.png"
                          alt="Adhesive Lamination Film"
                          className="w-full h-full object-cover rounded-lg sm:rounded-xl transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Heading */}
                      <div>
                        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-amber)]">
                          Polyester Bonding Grade
                        </span>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display tracking-tight mt-0.5">
                          Adhesive Lamination Film
                        </h3>
                      </div>

                      {/* Bullet Points with Amber Accent Markers */}
                      <ul className="space-y-2.5 text-xs sm:text-sm text-white/90 leading-relaxed font-sans font-normal">
                        <li className="flex items-start gap-2.5">
                          <span className="h-2 w-2 rounded-full bg-[var(--color-amber)] shrink-0 mt-1.5" />
                          <span>Used for lamination to polyester</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="h-2 w-2 rounded-full bg-[var(--color-amber)] shrink-0 mt-1.5" />
                          <span>Available in widths upto 2.25 meters</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="h-2 w-2 rounded-full bg-[var(--color-amber)] shrink-0 mt-1.5" />
                          <span>Thickness Range from 18-300 microns</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="h-2 w-2 rounded-full bg-[var(--color-amber)] shrink-0 mt-1.5" />
                          <span>Colours: Natural, White opaque. Other colours available on request.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="h-2 w-2 rounded-full bg-[var(--color-amber)] shrink-0 mt-1.5" />
                          <span>Applications: Seeds Packaging, Pesticide Packaging, Dairy Products, Vacuum Pouches, Condom Packaging etc.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-6 sm:pt-7">
                      <Button
                        to={`/contact?sku=lamination-pe-film&grade=${encodeURIComponent("Adhesive Lamination Film")}`}
                        className="w-full justify-center bg-[var(--color-amber)] text-[var(--color-blue-deep)] hover:bg-[var(--color-amber-dark)] font-bold py-3 sm:py-3.5 text-xs sm:text-sm rounded-xl shadow-md font-sans transition-all"
                      >
                        Request Quote for Adhesive Film
                      </Button>
                    </div>
                  </div>

                  {/* Card 2: Pharma Grade Poly */}
                  <div className="bg-[var(--color-ink)] text-white rounded-2xl sm:rounded-3xl border border-white/10 shadow-xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between group hover:border-[var(--color-amber)]/40 transition-all duration-300">
                    <div className="space-y-4 sm:space-y-5">
                      {/* Inner Image Frame */}
                      <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 aspect-[16/10] overflow-hidden flex items-center justify-center">
                        <OptimizedImage
                          src="/images/products/lamination-films-pouches/applications/app-3.png"
                          alt="Pharma Grade Poly"
                          className="w-full h-full object-cover rounded-lg sm:rounded-xl transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Heading */}
                      <div>
                        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-amber)]">
                          Pharma Strip Foil Grade
                        </span>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display tracking-tight mt-0.5">
                          Pharma Grade Poly
                        </h3>
                      </div>

                      {/* Bullet Points with Amber Accent Markers */}
                      <ul className="space-y-2.5 text-xs sm:text-sm text-white/90 leading-relaxed font-sans font-normal">
                        <li className="flex items-start gap-2.5">
                          <span className="h-2 w-2 rounded-full bg-[var(--color-amber)] shrink-0 mt-1.5" />
                          <span>Pharma Grade Poly is Used for Heat and Press Lamination to Aluminum Foil for further packing of strip tablets in pharmaceutical industry</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="h-2 w-2 rounded-full bg-[var(--color-amber)] shrink-0 mt-1.5" />
                          <span>Other Applications Include for Lidding Application, Cable Wrap, Extrusion Lamination</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="h-2 w-2 rounded-full bg-[var(--color-amber)] shrink-0 mt-1.5" />
                          <span>Standard Thicknesses are 20, 37.5 Micron, 40 Micron, 50 Micron.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-6 sm:pt-7">
                      <Button
                        to={`/contact?sku=lamination-pe-film&grade=${encodeURIComponent("Pharma Grade Poly")}`}
                        className="w-full justify-center bg-[var(--color-amber)] text-[var(--color-blue-deep)] hover:bg-[var(--color-amber-dark)] font-bold py-3 sm:py-3.5 text-xs sm:text-sm rounded-xl shadow-md font-sans transition-all"
                      >
                        Request Quote for Pharma Poly
                      </Button>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* 3. STRUCTURED ARTICLE CONTENT (WINNERPACK TYPOGRAPHY & THEMING) */}
            <section className="bg-white py-10 sm:py-16 md:py-20 border-b border-[var(--color-line)] font-sans">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 text-[var(--color-mute)] text-sm sm:text-base leading-relaxed space-y-6 sm:space-y-8 font-normal font-sans">
                
                <div className="space-y-4">
                  <Eyebrow>Material Overview</Eyebrow>
                  <p className="text-sm sm:text-base text-[var(--color-ink)] font-medium leading-relaxed">
                    Lamination PE film is a versatile and indispensable component in the realm of packaging solutions. This high-quality film, made from polyethylene, exhibits exceptional clarity, strength, and flexibility. Lamination PE film is available as laminated and stretch film options, and is widely used as a packaging film and plastic film in various industries. It is commonly utilized as a protective layer, enhancing the durability and visual appeal of various products.
                  </p>
                </div>

                <p>
                  The lamination process involves bonding the film to surfaces such as paper, cardboard, or other materials to provide an added layer of protection against moisture, dirt, and wear. The process can involve combining polyethylene films with other materials such as biaxially oriented polypropylene, polypropylene, or sheets to enhance specific properties. Anti static properties are also important for packaging sensitive electronics and medical products. This enables businesses across industries to safeguard their goods during handling, storage, and transportation.
                </p>

                <p>
                  With its wide range of applications, including packaging for food, pharmaceuticals, textiles, and industrial products, lamination PE film also finds use in beverage packaging, containers, and labels, as well as being suitable for frequently thermoformed packaging and custom polyethylene film products. Its versatility, strength, and reliable barrier properties make it an indispensable choice for businesses seeking optimal packaging solutions in the B2B sector. Linear low density polyethylene and ultra high molecular weight options are available for specialized needs.
                </p>

                <p>
                  Our company’s capabilities include producing a wide range of polyethylene films and plastic films for various industries, establishing us as a leading company and distributor in the market.
                </p>

                {/* Section: Properties of PE Film */}
                <div className="pt-6 border-t border-[var(--color-line)] space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-1 rounded-full bg-[var(--color-amber)]" />
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--color-ink)] font-display tracking-tight">
                      Properties of PE Film
                    </h2>
                  </div>
                  <p>
                    The unique properties of PE film make it an indispensable material for a wide range of uses. Known for its excellent chemical resistance and electrical insulation, PE film is also oil-resistant and waterproof, providing robust protection for packaged goods. Its low density means it is nearly non-absorbent and can float on water, adding to its versatility in various applications.
                  </p>
                  <p>
                    PE film is available in different forms, primarily low density polyethylene (LDPE) and high density polyethylene (HDPE). LDPE is softer, more flexible, and highly transparent, making it suitable for applications where clarity and flexibility are important. In contrast, HDPE offers greater strength and higher heat resistance, making it ideal for more demanding packaging and industrial uses. The structure of PE film, composed of repeated methylene units, can be tailored during production to achieve specific mechanical properties and thicknesses, ensuring the right balance of durability and performance for each application. Whether used in transparent packaging, industrial sheeting, or protective covers, PE film’s adaptability and reliability make it a preferred choice in many industries.
                  </p>
                </div>

                {/* Section: Lamination PE Film Manufacturer */}
                <div className="pt-6 border-t border-[var(--color-line)] space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-1 rounded-full bg-[var(--color-amber)]" />
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--color-ink)] font-display tracking-tight">
                      Lamination PE Film Manufacturer
                    </h2>
                  </div>
                  <p>
                    A lamination PE film manufacturer plays a pivotal role in delivering high-quality PE films tailored for a variety of packaging applications. Utilizing advanced extrusion and lamination technologies, these manufacturers produce a diverse range of film products, including barrier films, stretch films, and protective films, each designed to meet the specific needs of industries such as food packaging, medical packaging, and industrial packaging.
                  </p>
                  <p>
                    Manufacturers of PE film products are committed to stringent quality control, ensuring that every roll provides superior moisture barrier, abrasion resistance, and high heat resistance. This attention to detail makes their films suitable for demanding environments in sectors like automotive, aerospace, electronics, and consumer markets. By offering custom plastic products and solutions, lamination PE film manufacturers enable companies to develop innovative packaging products that enhance product safety, extend shelf life, and improve overall performance. Their expertise supports a wide array of commercial applications, from pharmaceutical and medical packaging to industrial and retail packaging, making them essential partners for businesses seeking reliable and effective packaging solutions.
                  </p>
                  <p>
                    At WinnerPack, we take immense pride in being the leading manufacturer of PE lamination Film, catering to the diverse needs of businesses across industries. With our unwavering commitment to excellence, we have established ourselves as the best choice for all your lamination film requirements. Our capabilities extend to producing innovative flexible packaging films, and we are a trusted distributor for clients across various industries, ensuring reliable supply and service.
                  </p>
                  <p>
                    We offer a comprehensive range of PE lamination films, including high-quality film lamination options, to meet your specific packaging needs.
                  </p>
                </div>

                {/* Section: Benefits of PE Lamination Roll */}
                <div className="pt-6 border-t border-[var(--color-line)] space-y-5">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-1 rounded-full bg-[var(--color-amber)]" />
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--color-ink)] font-display tracking-tight">
                      Benefits of PE Lamination Roll
                    </h2>
                  </div>
                  <p className="font-semibold text-[var(--color-ink)] font-sans">
                    Here are key industrial benefits of using WinnerPack PE lamination roll:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {[
                      "Enhanced durability and protection for products.",
                      "Reliable barrier against moisture, oxygen, and contaminants.",
                      "Versatile and customizable for various packaging needs.",
                      "Improved product appearance and visual appeal.",
                      "Extended shelf life for perishable goods.",
                      "Compatibility with different lamination techniques.",
                      "Ease of use and efficient production workflows.",
                      "Wide range of thickness options for customization.",
                      "Cost-effective solution for packaging requirements.",
                      "Compliant with industry standards and regulations."
                    ].map((benefit) => (
                      <div
                        key={benefit}
                        className="flex items-start gap-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-mist)] p-3.5 sm:p-4 text-xs sm:text-sm font-semibold text-[var(--color-ink)] font-sans shadow-2xs hover:border-[var(--color-amber)]/50 transition-colors"
                      >
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--color-amber-dark)] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>
          </>
        ) : (
          <>
            {/* ── 1. BENTO GALLERY HERO COLLAGE (5-PHOTO GRID INSPIRED BY REFERENCE DESIGN) ── */}
            <section className="bg-[var(--color-bone)] pt-6 md:pt-10 pb-8 border-b border-[var(--color-line)]">
              <Container>
                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb" className="mb-5">
                  <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-[var(--color-mute)]">
                    <li><Link href="/" className="hover:text-[var(--color-amber-dark)] font-medium">Home</Link></li>
                    <li><ChevronRight className="h-3 w-3 text-slate-400" /></li>
                    <li><Link href="/products" className="hover:text-[var(--color-amber-dark)] font-medium">Products</Link></li>
                    <li><ChevronRight className="h-3 w-3 text-slate-400" /></li>
                    <li>
                      <Link href={`/product-category/${product.category}`} className="hover:text-[var(--color-amber-dark)] font-medium">
                        {category}
                      </Link>
                    </li>
                    <li><ChevronRight className="h-3 w-3 text-slate-400" /></li>
                    <li className="font-bold text-[var(--color-ink)]">{product.title}</li>
                  </ol>
                </nav>

                {/* 5-Photo Bento Grid Collage Header */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-stretch">
                  <div className="hidden md:flex md:col-span-3 flex-col gap-3 sm:gap-4">
                    <div
                      onClick={() => setImg(displayGallery[1])}
                      className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border transition-all duration-200 bg-slate-950 shadow-sm cursor-pointer group ${(img || displayGallery[0]) === displayGallery[1] ? "border-[var(--color-amber-dark)] ring-2 ring-[var(--color-amber)]/50" : "border-[var(--color-line)]"
                        }`}
                    >
                      <OptimizedImage
                        src={displayGallery[1]}
                        alt={`${product.title} view 1`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div
                      onClick={() => setImg(displayGallery[2])}
                      className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border transition-all duration-200 bg-slate-950 shadow-sm cursor-pointer group ${(img || displayGallery[0]) === displayGallery[2] ? "border-[var(--color-amber-dark)] ring-2 ring-[var(--color-amber)]/50" : "border-[var(--color-line)]"
                        }`}
                    >
                      <OptimizedImage
                        src={displayGallery[2]}
                        alt={`${product.title} view 2`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-6">
                    <div className="relative aspect-[16/10] sm:aspect-[16/10] md:aspect-[16/11] w-full h-full overflow-hidden rounded-xl sm:rounded-3xl border border-[var(--color-line)] bg-slate-950 shadow-md sm:shadow-lg group">
                      <OptimizedImage
                        src={img || displayGallery[0]}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <div className="hidden md:flex md:col-span-3 flex-col gap-3 sm:gap-4">
                    <div
                      onClick={() => setImg(displayGallery[3])}
                      className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border transition-all duration-200 bg-slate-950 shadow-sm cursor-pointer group ${(img || displayGallery[0]) === displayGallery[3] ? "border-[var(--color-amber-dark)] ring-2 ring-[var(--color-amber)]/50" : "border-[var(--color-line)]"
                        }`}
                    >
                      <OptimizedImage
                        src={displayGallery[3]}
                        alt={`${product.title} view 3`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div
                      onClick={() => setImg(displayGallery[4])}
                      className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border transition-all duration-200 bg-slate-950 shadow-sm cursor-pointer group ${(img || displayGallery[0]) === displayGallery[4] ? "border-[var(--color-amber-dark)] ring-2 ring-[var(--color-amber)]/50" : "border-[var(--color-line)]"
                        }`}
                    >
                      <OptimizedImage
                        src={displayGallery[4]}
                        alt={`${product.title} view 4`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex md:hidden items-center gap-2 overflow-x-auto pt-2.5 pb-0.5 scrollbar-none">
                  {displayGallery.slice(0, 5).map((photo: string, pIdx: number) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => setImg(photo)}
                      className={`relative shrink-0 h-12 w-16 overflow-hidden rounded-lg border-2 transition-all duration-200 bg-slate-950 ${(img || displayGallery[0]) === photo
                          ? "border-[var(--color-amber-dark)] ring-2 ring-[var(--color-amber)]/40 scale-95"
                          : "border-white/50 opacity-80"
                        }`}
                    >
                      <OptimizedImage
                        src={photo}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </Container>
            </section>

            {/* ── 2. HERO CONTENT & FLOATING SIDEBAR CARD ── */}
            <section className="bg-white py-4 sm:py-8 border-b border-[var(--color-line)] font-sans">
              <Container>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 items-start">
                  <div className="lg:col-span-7 space-y-3.5 sm:space-y-6">
                    <div className="space-y-1 sm:space-y-1.5">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-sm font-bold uppercase tracking-wider text-[var(--color-mute)]">
                        <span className="rounded-md bg-[var(--color-bone)] border border-[var(--color-line)] px-2 py-0.5 text-[10px] sm:text-xs">
                          {product.tag || category}
                        </span>
                        <span>•</span>
                        <span>SKU: WP-{product.id.toUpperCase()}</span>
                      </div>

                      <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--color-ink)] font-display leading-tight">
                        {product.title}
                      </h1>

                      <p className="text-xs sm:text-base text-[var(--color-mute)] leading-relaxed font-normal font-sans">
                        {product.blurb}
                      </p>
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-4 gap-1.5 sm:gap-2 pt-0.5">
                      <div className="rounded-lg sm:rounded-xl border border-[var(--color-line)] bg-[var(--color-mist)] p-1.5 sm:p-2.5 text-center space-y-0.5">
                        <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 mx-auto text-[var(--color-amber-dark)]" />
                        <div className="text-[9px] sm:text-xs font-mono font-bold uppercase text-[var(--color-mute)]">Dispatch</div>
                        <div className="text-[10px] sm:text-sm font-extrabold text-[var(--color-ink)] font-sans truncate">24-48 HR</div>
                      </div>

                      <div className="rounded-lg sm:rounded-xl border border-[var(--color-line)] bg-[var(--color-mist)] p-1.5 sm:p-2.5 text-center space-y-0.5">
                        <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 mx-auto text-[var(--color-blue-deep)]" />
                        <div className="text-[9px] sm:text-xs font-mono font-bold uppercase text-[var(--color-mute)]">QC</div>
                        <div className="text-[10px] sm:text-sm font-extrabold text-[var(--color-ink)] font-sans truncate">ISO 9001</div>
                      </div>

                      <div className="rounded-lg sm:rounded-xl border border-[var(--color-line)] bg-[var(--color-mist)] p-1.5 sm:p-2.5 text-center space-y-0.5">
                        <Factory className="h-3.5 w-3.5 sm:h-4 sm:w-4 mx-auto text-[var(--color-amber-dark)]" />
                        <div className="text-[9px] sm:text-xs font-mono font-bold uppercase text-[var(--color-mute)]">Plant</div>
                        <div className="text-[10px] sm:text-sm font-extrabold text-[var(--color-ink)] font-sans truncate">100% In-House</div>
                      </div>

                      <div className="rounded-lg sm:rounded-xl border border-[var(--color-line)] bg-[var(--color-mist)] p-1.5 sm:p-2.5 text-center space-y-0.5">
                        <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mx-auto text-[var(--color-blue-deep)]" />
                        <div className="text-[9px] sm:text-xs font-mono font-bold uppercase text-[var(--color-mute)]">Batch</div>
                        <div className="text-[10px] sm:text-sm font-extrabold text-[var(--color-ink)] font-sans truncate">COA Batch</div>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-[var(--color-line)]">
                      <h2 className="text-base sm:text-xl font-extrabold text-[var(--color-ink)] font-display">
                        Product Overview
                      </h2>
                      {product.longDesc && (
                        <div
                          className="text-xs sm:text-base text-[var(--color-mute)] leading-relaxed font-normal font-sans space-y-2 [&_p]:text-xs [&_p]:sm:text-base [&_p]:text-[var(--color-mute)] [&_p]:leading-relaxed [&_p]:font-sans [&_p]:font-normal [&_li]:text-xs [&_li]:sm:text-base [&_li]:text-[var(--color-mute)] [&_li]:font-sans [&_h1]:font-display [&_h1]:text-base [&_h1]:sm:text-lg [&_h1]:font-bold [&_h1]:text-[var(--color-ink)] [&_h2]:font-display [&_h2]:text-base [&_h2]:sm:text-lg [&_h2]:font-bold [&_h2]:text-[var(--color-ink)] [&_h3]:font-display [&_h3]:text-sm [&_h3]:sm:text-base [&_h3]:font-bold [&_h3]:text-[var(--color-ink)] max-w-none"
                          dangerouslySetInnerHTML={{ __html: marked.parse(product.longDesc) as string }}
                        />
                      )}
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[var(--color-line)]">
                      <div className="flex items-center justify-between">
                        <h2 className="text-base sm:text-xl font-extrabold text-[var(--color-ink)] font-display">
                          What's Included & Quality Guarantees
                        </h2>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-amber)]/20 border border-[var(--color-amber)]/40 px-2 py-0.5 text-[10px] sm:text-xs font-mono font-bold text-[var(--color-amber-dark)]">
                          ISO Verified
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-2 gap-1.5 sm:gap-2">
                        {(product.whatsIncluded && product.whatsIncluded.length > 0
                          ? product.whatsIncluded
                          : [
                              "FDA & WHO-GMP Compliant",
                              "Zero Downtime Tolerance",
                              "Full Traceability COA",
                              "High Tensile Guarantee",
                              "Custom Gauge Options",
                              "Engineering Support"
                            ]
                        ).map((title: string) => (
                          <div
                            key={title}
                            className="flex items-center gap-1.5 sm:gap-2.5 rounded-lg sm:rounded-xl border border-[var(--color-line)] bg-white px-2.5 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-sm font-bold text-[var(--color-ink)] font-sans shadow-2xs hover:border-[var(--color-amber-dark)]/40 transition-colors"
                          >
                            <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[var(--color-amber-dark)] shrink-0" />
                            <span className="truncate">{title}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  <div className="lg:col-span-5 lg:sticky lg:top-24 font-sans">
                    <div className="rounded-xl sm:rounded-3xl border border-[var(--color-line)] bg-white p-3.5 sm:p-6 lg:p-7 shadow-md sm:shadow-lg lg:shadow-xl space-y-2.5 md:space-y-5">
                      <div className="flex items-center justify-between border-b border-[var(--color-line)] pb-2 md:pb-4">
                        <div>
                          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-amber-dark)]">
                            Technical Specifications
                          </span>
                          <h3 className="text-sm sm:text-lg md:text-xl font-bold text-[var(--color-ink)] font-display mt-0.5">
                            {product.title}
                          </h3>
                        </div>
                        <span className="rounded-full bg-slate-900 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-mono font-bold uppercase text-amber-400 border border-amber-500/30">
                          ISO 9001
                        </span>
                      </div>

                      {specs.length > 0 ? (
                        <div className="overflow-x-auto scrollbar-none rounded-lg sm:rounded-2xl border border-[var(--color-line)] bg-[var(--color-mist)]">
                          <table className="w-full text-left border-collapse min-w-[240px] font-sans">
                            <thead>
                              <tr className="border-b border-[var(--color-line)] bg-[var(--color-bone-2)]">
                                <th className="px-2.5 md:px-3.5 py-1 md:py-2.5 font-display text-[11px] sm:text-sm font-extrabold uppercase text-[var(--color-ink)] w-1/2">
                                  Specification
                                </th>
                                <th className="px-2.5 md:px-3.5 py-1 md:py-2.5 font-display text-[11px] sm:text-sm font-extrabold uppercase text-[var(--color-ink)] w-1/2">
                                  Value
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {specs.map((s: any, idx: number) => (
                                <tr
                                  key={s.label}
                                  className={`border-b border-[var(--color-line)] last:border-b-0 transition-colors ${idx % 2 === 1 ? "bg-white/70" : "bg-transparent"
                                    }`}
                                >
                                  <td className="px-2.5 md:px-3.5 py-1 md:py-2.5 font-mono text-[11px] sm:text-xs font-bold uppercase text-[var(--color-mute)]">
                                    {s.label}
                                  </td>
                                  <td className="px-2.5 md:px-3.5 py-1 md:py-2.5 text-[11px] sm:text-sm font-semibold text-[var(--color-ink)] font-sans">
                                    {s.value}
                                  </td>
                                </tr>
                              ))}
                              {product.options?.widths && (
                                <tr className="border-b border-[var(--color-line)] bg-white/70">
                                  <td className="px-2.5 md:px-3.5 py-1 md:py-2.5 font-mono text-[11px] sm:text-xs font-bold uppercase text-[var(--color-mute)]">
                                    Widths
                                  </td>
                                  <td className="px-2.5 md:px-3.5 py-1 md:py-2.5 text-[11px] sm:text-sm font-semibold text-[var(--color-ink)] font-sans">
                                    {product.options.widths.join(" · ")}
                                  </td>
                                </tr>
                              )}
                              {product.options?.thicknesses && (
                                <tr className="border-b border-[var(--color-line)]">
                                  <td className="px-2.5 md:px-3.5 py-1 md:py-2.5 font-mono text-[11px] sm:text-xs font-bold uppercase text-[var(--color-mute)]">
                                    Thickness
                                  </td>
                                  <td className="px-2.5 md:px-3.5 py-1 md:py-2.5 text-[11px] sm:text-sm font-semibold text-[var(--color-ink)] font-sans">
                                    {product.options.thicknesses.join(" · ")}
                                  </td>
                                </tr>
                              )}
                              {product.options?.colors && (
                                <tr className="border-b-0 bg-white/70">
                                  <td className="px-2.5 md:px-3.5 py-1 md:py-2.5 font-mono text-[11px] sm:text-xs font-bold uppercase text-[var(--color-mute)]">
                                    Colors
                                  </td>
                                  <td className="px-2.5 md:px-3.5 py-1 md:py-2.5 text-[11px] sm:text-sm font-semibold text-[var(--color-ink)] font-sans">
                                    {product.options.colors.join(" · ")}
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      ) : null}

                      {product.thicknessLengthMatrix && (
                        <div className="space-y-1 md:space-y-2 pt-1 md:pt-2">
                          <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-ink)]">
                            <span>Standard Roll Yield Matrix</span>
                            <span className="text-[var(--color-amber-dark)] text-[10px] sm:text-xs">Micron → Length</span>
                          </div>
                          <div className="overflow-x-auto scrollbar-none rounded-lg sm:rounded-2xl border border-[var(--color-line)] bg-white shadow-2xs md:shadow-xs">
                            <table className="w-full text-center border-collapse text-[11px] sm:text-xs min-w-[220px]">
                              <thead>
                                <tr className="border-b border-[var(--color-line)] bg-[var(--color-bone-2)] font-mono text-[10px] sm:text-xs font-extrabold uppercase text-[var(--color-ink)]">
                                  <th colSpan={2} className="px-1.5 md:px-3 py-1 md:py-2 border-r border-[var(--color-line)] bg-[var(--color-amber)]/10 text-[var(--color-amber-dark)]">THICKNESS</th>
                                  <th colSpan={2} className="px-1.5 md:px-3 py-1 md:py-2 bg-[var(--color-blue-deep)]/10 text-[var(--color-blue-deep)]">LENGTH YIELD</th>
                                </tr>
                                <tr className="border-b border-[var(--color-line)] bg-[var(--color-mist)] font-mono text-[10px] sm:text-xs font-bold text-[var(--color-mute)]">
                                  <th className="px-1.5 md:px-2.5 py-0.5 sm:py-1 border-r border-[var(--color-line)]">µm</th>
                                  <th className="px-1.5 md:px-2.5 py-0.5 sm:py-1 border-r border-[var(--color-line)]">Gauge</th>
                                  <th className="px-1.5 md:px-2.5 py-0.5 sm:py-1 border-r border-[var(--color-line)]">Meters</th>
                                  <th className="px-1.5 md:px-2.5 py-0.5 sm:py-1">Feet</th>
                                </tr>
                              </thead>
                              <tbody>
                                {product.thicknessLengthMatrix.map((row: any, idx: number) => (
                                  <tr
                                    key={idx}
                                    className={`border-b border-[var(--color-line)] last:border-b-0 font-mono text-[11px] sm:text-xs ${idx % 2 === 1 ? "bg-[var(--color-mist)]/50" : "bg-white"
                                      }`}
                                  >
                                    <td className="px-1.5 md:px-3 py-0.5 md:py-2 font-extrabold text-[var(--color-amber-dark)] border-r border-[var(--color-line)]">{row.micron}</td>
                                    <td className="px-1.5 md:px-3 py-0.5 md:py-2 text-[var(--color-mute)] border-r border-[var(--color-line)]">{row.gauge}</td>
                                    <td className="px-1.5 md:px-3 py-0.5 md:py-2 font-extrabold text-[var(--color-blue-deep)] border-r border-[var(--color-line)]">{row.meters}</td>
                                    <td className="px-1.5 md:px-3 py-0.5 md:py-2 text-[var(--color-mute)]">{row.feet}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      <div className="pt-1 md:pt-2 space-y-1.5 md:space-y-3 font-sans">
                        <Button to={`/contact?sku=${product.id}&title=${encodeURIComponent(product.title)}`} className="w-full justify-center min-h-[36px] md:min-h-[48px] py-2 md:py-3.5 text-xs sm:text-sm font-bold shadow-xs md:shadow-md touch-manipulation font-sans">
                          Request Instant Custom Quote
                        </Button>
                        <Button to={`tel:${COMPANY.phoneHref}`} variant="outline" className="w-full justify-center min-h-[32px] md:min-h-[40px] py-1.5 md:py-2.5 text-xs font-bold touch-manipulation font-sans">
                          Call Sales: {COMPANY.phoneDisplay}
                        </Button>
                      </div>

                    </div>
                  </div>
                </div>
              </Container>
            </section>

            {/* ── SUB-CATEGORIES SECTION ── */}
            {product.subCategories && product.subCategories.length > 0 && (
              <Section className="bg-[var(--color-mist)] border-b border-[var(--color-line)] py-5 sm:py-10 lg:py-16 font-sans">
                <Container>
                  <div className="max-w-2xl mb-3 sm:mb-6 lg:mb-10">
                    <Eyebrow>Product Sub-Categories</Eyebrow>
                    <h2 className="mt-0.5 text-base sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[var(--color-ink)] font-display">
                      {product.title} Sub-Categories
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 lg:gap-8 xl:gap-10">
                    {product.subCategories.map((sub: any) => (
                      <div
                        key={sub.id}
                        className="rounded-xl sm:rounded-2xl lg:rounded-3xl border border-[var(--color-line)] bg-white p-3 sm:p-5 lg:p-7 xl:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-3 sm:space-y-4 lg:space-y-6 font-sans"
                      >
                        <div className="space-y-2.5 sm:space-y-4 lg:space-y-5">
                          <div className="relative aspect-[2/1] sm:aspect-[16/9] w-full overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl border border-[var(--color-line)] bg-slate-950 shadow-inner group">
                            <OptimizedImage
                              src={sub.image}
                              alt={sub.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          <div className="space-y-1 sm:space-y-1.5 lg:space-y-2">
                            <span className="text-[10px] sm:text-xs lg:text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-amber-dark)]">
                              {sub.subtitle}
                            </span>
                            <h3 className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-extrabold text-[var(--color-ink)] font-display mt-0.5 lg:mt-1">
                              {sub.title}
                            </h3>
                            <p className="text-xs sm:text-base lg:text-base text-[var(--color-mute)] leading-relaxed lg:leading-relaxed mt-0.5 sm:mt-1 lg:mt-2 line-clamp-2 lg:line-clamp-none font-sans font-normal">
                              {sub.blurb}
                            </p>
                          </div>

                          {sub.specs && (
                            <div className="overflow-hidden scrollbar-none rounded-lg lg:rounded-xl border border-[var(--color-line)] bg-[var(--color-mist)] my-1 lg:my-2">
                              <table className="w-full text-left border-collapse text-[11px] sm:text-xs lg:text-sm font-sans table-fixed">
                                <tbody>
                                  {Object.entries(sub.specs).slice(0, 4).map(([lbl, val]: any, sIdx: number) => (
                                    <tr
                                      key={lbl}
                                      className={`border-b border-[var(--color-line)] last:border-b-0 ${sIdx % 2 === 1 ? "bg-white/60" : "bg-transparent"
                                        }`}
                                    >
                                      <td className="px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2.5 font-mono font-bold uppercase text-[var(--color-mute)] w-2/5 text-[10px] sm:text-xs lg:text-xs align-top">
                                        {lbl}
                                      </td>
                                      <td className="px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2.5 font-semibold text-[var(--color-ink)] w-3/5 break-words whitespace-normal font-sans text-[11px] sm:text-xs lg:text-sm align-top">
                                        {val}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {sub.applications && (
                            <div className="flex flex-wrap gap-1 sm:gap-1.5 lg:gap-2 pt-0.5 lg:pt-1">
                              {sub.applications.slice(0, 3).map((app: string) => (
                                <span
                                  key={app}
                                  className="inline-flex items-center gap-1 rounded-md bg-[var(--color-bone)] border border-[var(--color-line)] px-1.5 py-0.5 sm:px-2 sm:py-1 lg:px-2.5 lg:py-1.5 text-[10px] sm:text-xs lg:text-xs font-bold text-[var(--color-ink)] font-sans"
                                >
                                  <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-3.5 lg:w-3.5 text-[var(--color-amber-dark)] shrink-0" />
                                  <span className="truncate">{app}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="pt-1.5 sm:pt-2 lg:pt-4">
                          <Button to={`/contact?sku=${product.id}&title=${encodeURIComponent(product.title)}&grade=${encodeURIComponent(sub.title)}`} className="w-full justify-center py-1.5 sm:py-2.5 lg:py-3.5 text-xs sm:text-sm font-bold font-sans">
                            Request Quote for {sub.title}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Container>
              </Section>
            )}
          </>
        )}

        <Section className="bg-[var(--color-mist)] py-8">
          <Container>
            <div>
              <Link
                href="/products"
                className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-blue-deep)]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to full product line catalog
              </Link>
            </div>
          </Container>
        </Section>

        {/* Related Products */}
        {related.length > 0 && (
          <Section className="bg-white pt-16 border-t border-[var(--color-line)]">
            <Container>
              <Eyebrow>Related Material Solutions</Eyebrow>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl font-display">
                Complementary Line Products
              </h2>
              <Stagger className="mt-9 grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p: any) => (
                  <StaggerItem key={p.id} className="h-full">
                    <ProductCard product={p} />
                  </StaggerItem>
                ))}
              </Stagger>
            </Container>
          </Section>
        )}

        <CTABanner />
      </PageWrapper>

      <Footer />
    </div>
  );
}
