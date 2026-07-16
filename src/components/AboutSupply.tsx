"use client";



/**
 * VERIFICATION NOTE (audited against winnerpack.in, 15 Jul 2026):
 * - "600+ enterprise clients" — TODO: UNVERIFIED, same unsourced figure
 *   flagged in the stats blocks elsewhere. Removed rather than restated.
 * - "across six industries" — TODO: UNVERIFIED. The real "6" that's
 *   confirmed is Winner Pack's 6 product categories (Labels, Films/Bags/
 *   Tubes, Strapping, Protective Packaging, Tapes, Pallet Wrapping), not
 *   6 confirmed industries served — swapped to the verified framing.
 * - "manufacture" / "own manufacturing capabilities" / "manufacturing
 *   facility" (alt text) — MIXED EVIDENCE. winnerpack.in's own About page
 *   describes the company as "supplying" packaging materials, not
 *   manufacturing them in-house. IndiaMART's business-type field does list
 *   "Manufacturer" for a couple of product lines, so this isn't clearly
 *   false — but it's stronger than the company's own site claims about
 *   itself. Softened to "supply" to match verified language; confirm with
 *   the company if "manufacture" should be restored.
 */
export default function AboutSupply() {
  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-16">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[var(--color-amber)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center" data-reveal>
          {/* Left: Text */}
          <div>
            <span className="inline-block rounded-full bg-[var(--color-blue-soft)] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-blue)]">
              Source of Supply
            </span>
            <h2 className="font-display mt-5 text-3xl font-bold leading-tight text-[var(--color-ink)] md:text-4xl">
              From a strapping distributor to a full packaging supplier
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--color-mute)]">
              <p>
                Winner Pack Technologies started in 2018, supplying strapping
                and stretch film to manufacturers in the Ghaziabad region. It
                was formally incorporated as a private limited company in
                June 2020.
              </p>
              <p>
                Today the catalog spans strapping, shrink and stretch films,
                tapes, protective packaging, courier bags and labels — plus
                the machinery to apply them — across six core product
                categories, and we still answer the phone ourselves.
              </p>
            </div>
          </div>

          {/* Right: Factory Image */}
          <div className="overflow-hidden rounded-2xl border border-[var(--color-line)] shadow-lg">
            <img
              src="/images/desktop/about/about_factory_production.png"
              alt="Inside a Winner Pack facility"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}