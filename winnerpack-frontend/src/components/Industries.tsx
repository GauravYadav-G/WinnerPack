
"use client";

import { useState, useEffect } from "react";
import { fetchContent } from "@/lib/content-cache";

const defaultIndustriesList = [
  { name: "Electronics", image: "/images/desktop/industries/electronics_industry.png" },
  { name: "Cosmetics", image: "/images/desktop/industries/cosmetics_industry.png" },
  { name: "Food & FMCG", image: "/images/desktop/industries/food_fmcg_industry.png" },
  { name: "Automobile", image: "/images/desktop/industries/automobile_industry.png" },
  { name: "Stationery", image: "/images/desktop/industries/stationery_industry.png" },
  { name: "E-commerce & Logistics", image: "/images/desktop/industries/ecommerce_logistics_industry.png" },
];

export default function Industries() {
  const [industriesList, setIndustriesList] = useState<any[]>(defaultIndustriesList);

  useEffect(() => {
    fetchContent("homepage")
      .then((data) => {
        if (data.industries && data.industries.length > 0) {
          setUpdatedList(data.industries);
        }
      })
      .catch((err) => console.error("Failed to load industries:", err));
  }, []);

  function setUpdatedList(list: any[]) {
    const hasAutomobile = list.some((item) => item.name?.toLowerCase().includes("automobile"));
    if (!hasAutomobile) {
      const newList = [...list];
      newList.splice(3, 0, { name: "Automobile", image: "/images/desktop/industries/automobile_industry.png" });
      setIndustriesList(newList);
    } else {
      setIndustriesList(list);
    }
  }

  return (
    <section id="industries" className="relative overflow-hidden bg-[var(--color-bone)] py-16 md:py-24 border-b border-[var(--color-line)]">
      {/* Background Atmosphere */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[var(--color-amber)]/5 blur-3xl pointer-events-none" />
      
      <div className="mx-auto max-w-[1536px] px-5 md:px-8">
        <div className="mb-12 max-w-7xl mx-auto pl-2 sm:pl-6 md:pl-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--color-amber-soft)] border border-[var(--color-amber)]/20 text-[var(--color-amber-dark)] text-xs font-bold uppercase tracking-widest mb-3">
            SECTOR CAPABILITIES
          </div>
          <h2 className="font-display text-2xl font-extrabold leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-3xl md:text-5xl text-balance">
            Industries We Serve
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-6" data-reveal>
          {industriesList.map((ind) => {
            return (
              <div
                key={ind.name}
                className="group relative overflow-hidden rounded-2xl border border-[var(--color-line)] bg-slate-900 aspect-[16/11] md:aspect-[4/5] shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                data-hover
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url('${ind.image}')` }}
                />
                
                {/* Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-95" />

                {/* Card Content */}
                <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-end z-10 text-white">
                  <div>
                    <h3 className="font-display text-sm md:text-lg leading-tight font-bold tracking-tight text-white group-hover:text-[var(--color-amber)] transition-colors duration-300">
                      {ind.name}
                    </h3>
                    <div className="h-1 w-6 bg-white/30 mt-2.5 transition-all duration-500 group-hover:w-12 group-hover:bg-[var(--color-amber)] rounded-full" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
