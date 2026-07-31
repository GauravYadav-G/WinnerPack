"use client";

import { IMAGES } from "@/lib/mock-data";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Gauge, ShieldCheck, Truck } from "lucide-react";
import CtaBanner from "@/components/CTABanner";
import DiscoverCompany from "@/components/DiscoverCompany";

// Layout components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import { useRevealOnScroll } from "@/hooks";
import PageWrapper from "@/components/PageWrapper";

const VALUES = [
  {
    icon: Gauge,
    title: "Precision over compromise",
    text: "We specify to the exact gauge, width and grade your line needs — not the nearest catalogue match.",
  },
  {
    icon: ShieldCheck,
    title: "Partnership, not transactions",
    text: "We sit on the same side of the table as your operations team — and we stay engaged long after the purchase order is signed.",
  },
  {
    icon: Truck,
    title: "Reliability that ships",
    text: "Consistent stock and a Ghaziabad dispatch base mean your dock date is a commitment we plan around, not a best guess.",
  },
];

export default function AboutUs() {
  useRevealOnScroll();

  return (
    <div className="min-h-screen bg-[var(--color-bone)] text-[var(--color-text)]">
      <Cursor />
      <ScrollProgress />
      <Navbar />


      <PageWrapper className="relative">
        <PageHeader
          eyebrow="About us"
          title={
            <>
              Built to hold <br />
              industry together.
            </>
          }
          intro="Since 2018 we have supplied and manufactured the packaging materials that keep Indian industry moving — strapping rolls, films, tapes, and protective packaging solutions."
          crumbs={[{ label: "Home", to: "/" }, { label: "About us" }]}
        />

        {/* Background textures */}
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

        {/* Story */}
        <Section className="bg-transparent relative z-10 pt-8 pb-8 md:pt-16 md:pb-16">
          <Container>
            <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <Eyebrow>Our story</Eyebrow>
                <h2 className="mt-3 md:mt-4 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--color-ink)] font-display text-balance">
                  From a strapping distributor to a full-line packaging supplier
                </h2>
                <div className="mt-4 space-y-3.5 text-xs md:text-base leading-relaxed text-[var(--color-mute)] text-pretty font-normal">
                  <p>
                    Winner Pack Technologies Pvt. Ltd. started in 2018 as a distributor and
                    trader of strapping and stretch films, serving businesses in the
                    Ghaziabad region. Within two years we formally incorporated as a
                    Private Limited company.
                  </p>
                  <p>
                    Today we supply and manufacture strapping, shrink and stretch
                    films, tapes, corrugated packaging, courier bags and labels across India.
                    We&apos;re registered under GSTIN 09AACCW6640F1Z8 and CIN U51909UP2020PTC129759,
                    and we still answer the phone ourselves.
                  </p>
                </div>
              </Reveal>
              <Reveal className="relative mt-2 md:mt-0">
                <div className="overflow-hidden rounded-3xl border border-[var(--color-line)] shadow-lift">
                  {/* TODO: swap in an actual Winner Pack site/product photo — 
                      confirm this isn't a stock/placeholder image before shipping */}
                  <img
                    src={IMAGES.aboutFactory}
                    alt="Winner Pack Technologies Pvt. Ltd., Ghaziabad"
                    loading="lazy"
                    className="aspect-[16/10] sm:aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-2 rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 shadow-lift sm:left-5">
                  <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-mute)]">
                    Operating since
                  </p>
                  <p className="font-display text-xl font-bold text-[var(--color-ink)] mt-0.5">
                    2018 <span className="text-[var(--color-amber)] text-sm">Ghaziabad, UP</span>
                  </p>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* Values */}
        <Section className="bg-transparent pt-0 pb-8 md:pb-16 relative z-10">
          <Container>
            <Eyebrow>What we stand for</Eyebrow>
            <h2 className="mt-3 md:mt-4 max-w-2xl text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--color-ink)] font-display text-balance">
              Three principles behind every roll, coil and case we ship
            </h2>
            <Stagger className="mt-6 md:mt-10 grid gap-4 md:gap-5 md:grid-cols-3">
              {VALUES.map((v) => {
                const ValueIcon = v.icon;
                return (
                  <StaggerItem key={v.title} className="h-full">
                    <div className="flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-white/70 backdrop-blur-sm p-5 md:p-7">
                      <span className="grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-xl bg-[var(--color-blue-deep)] text-[var(--color-amber)]">
                        <ValueIcon className="h-5 w-5 md:h-6 md:w-6" />
                      </span>
                      <h3 className="mt-4 md:mt-5 text-base md:text-lg font-semibold text-[var(--color-ink)] font-display">{v.title}</h3>
                      <p className="mt-1.5 md:mt-2 text-xs md:text-sm leading-relaxed text-[var(--color-mute)]">{v.text}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </Container>
        </Section>


        <DiscoverCompany />

        <CtaBanner />
      </PageWrapper>

      <Footer />
    </div>
  );
}