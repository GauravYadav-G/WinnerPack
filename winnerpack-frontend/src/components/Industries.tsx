
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
    <section id="industries" className="relative overflow-hidden bg-white py-10 md:py-16">
      {/* Background accents */}
      <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" aria-hidden />
      
      <div className="mx-auto max-w-[1536px] px-5 md:px-8">
        <div className="mb-10 max-w-7xl mx-auto">
          <h2 className="font-display text-2xl font-bold leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-3xl md:text-5xl text-balance">
            Industries We Serve
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6" data-reveal>
          {industriesList.map((ind) => {
            return (
              <div
                key={ind.name}
                className="group relative overflow-hidden rounded-2xl border border-[var(--color-line)] bg-slate-900 aspect-[16/11] md:aspect-[4/5] shadow-sm hover:shadow-md transition-all duration-500"
                data-hover
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${ind.image}')` }}
                />
                
                {/* Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15 transition-opacity duration-500 group-hover:opacity-90" />

                {/* Card Content */}
                <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-end z-10 text-white">
                  <div>
                    <h3 className="font-display text-sm md:text-lg leading-tight font-bold tracking-tight text-white group-hover:text-[var(--color-amber)] transition-colors">
                      {ind.name}
                    </h3>
                    <div className="h-0.5 w-6 bg-white/30 mt-2 md:mt-3 transition-all duration-500 group-hover:w-12 group-hover:bg-[var(--color-amber)]" />
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
