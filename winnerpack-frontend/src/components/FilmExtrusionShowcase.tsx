"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, CheckCircle } from "lucide-react";

interface FilmSpec {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  gaugeRange: string;
  shrinkRate: string;
  clarity: string;
  keyFeature: string;
  applications: string[];
}

const filmSpecData: FilmSpec[] = [
  {
    id: "pof-shrink",
    name: "5-Layer POF Shrink Film",
    subtitle: "Polyolefin High-Clarity Co-Extrusion",
    image: "/images/desktop/portfolio/sustainability_featured.png",
    gaugeRange: "12 - 25 Microns",
    shrinkRate: "65% Bi-Axial",
    clarity: "99.2% Gloss",
    keyFeature: "FDA Food-Contact Approved",
    applications: ["Pharma Multipacks", "Food & Beverage", "Cosmetic Bundling", "Box Wrap"]
  },
  {
    id: "ldpe-shrink",
    name: "Heavy-Duty LDPE Shrink Film",
    subtitle: "Low-Density Polyethylene Collation",
    image: "/images/desktop/journey/solution_pcr_eco_film.png",
    gaugeRange: "40 - 150 Microns",
    shrinkRate: "70% Longitudinal",
    clarity: "High-Opacity / Clear",
    keyFeature: "Puncture & Tear Resistance",
    applications: ["Beverage Cans & Bottles", "Industrial Pallets", "Building Materials", "Bulk Cases"]
  },
  {
    id: "stretch-wrap",
    name: "Power LLDPE Stretch Wrap",
    subtitle: "Linear Low-Density Pallet Film",
    image: "/images/desktop/journey/solution_pallet_wrapping.png",
    gaugeRange: "15 - 35 Microns",
    shrinkRate: "300% Pre-Stretch",
    clarity: "Crystal Clear",
    keyFeature: "Cast 5-Layer Co-Extrusion",
    applications: ["Pallet Load Unitization", "Warehouse Shipping", "Export Bundling", "Cold Storage"]
  }
];

export default function FilmExtrusionShowcase() {
  const [activeId, setActiveId] = useState("pof-shrink");
  const activeFilm = filmSpecData.find((f) => f.id === activeId) || filmSpecData[0];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900/90 backdrop-blur-xl shadow-2xl p-6 sm:p-8 text-white">
      {/* Background Ambient Glow */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--color-amber)]/10 blur-3xl pointer-events-none" />

      {/* Top Header & Extrusion Status */}
      <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-[var(--color-amber)]" />
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-amber)]">
            Extrusion Plant Specs
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active 5-Layer Extrusion</span>
        </div>
      </div>

      {/* Material Selector Tabs */}
      <div className="flex gap-2 my-5 overflow-x-auto scrollbar-none pb-1">
        {filmSpecData.map((film) => {
          const isActive = activeId === film.id;
          return (
            <button
              key={film.id}
              onClick={() => setActiveId(film.id)}
              className={`flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-[var(--color-amber)] text-white shadow-lg shadow-[var(--color-amber)]/20 scale-105"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5"
              }`}
            >
              {film.name}
            </button>
          );
        })}
      </div>

      {/* Active Film Media Card & Technical Specs */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilm.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35 }}
          className="space-y-6"
        >
          {/* Film Photo with Live Specs Overlay */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 group">
            <img
              src={activeFilm.image}
              alt={activeFilm.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
                  {activeFilm.subtitle}
                </span>
                <h4 className="font-display text-lg font-extrabold text-white leading-tight">
                  {activeFilm.name}
                </h4>
              </div>
              <span className="px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white">
                {activeFilm.keyFeature}
              </span>
            </div>
          </div>

          {/* 3 Technical Metric Cards */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[10px] font-mono font-bold text-white/50 uppercase">Gauge Thickness</div>
              <div className="font-display text-sm sm:text-base font-extrabold text-[var(--color-amber)] mt-0.5">
                {activeFilm.gaugeRange}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[10px] font-mono font-bold text-white/50 uppercase">Shrink Efficiency</div>
              <div className="font-display text-sm sm:text-base font-extrabold text-white mt-0.5">
                {activeFilm.shrinkRate}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[10px] font-mono font-bold text-white/50 uppercase">Optical Clarity</div>
              <div className="font-display text-sm sm:text-base font-extrabold text-emerald-400 mt-0.5">
                {activeFilm.clarity}
              </div>
            </div>
          </div>

          {/* Key Target Applications */}
          <div className="pt-3 border-t border-white/10">
            <div className="text-[11px] font-mono font-bold uppercase text-white/60 mb-2">
              Primary B2B Packaging Applications:
            </div>
            <div className="flex flex-wrap gap-2">
              {activeFilm.applications.map((app) => (
                <span
                  key={app}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/90 font-medium"
                >
                  <CheckCircle className="h-3 w-3 text-[var(--color-amber)]" />
                  <span>{app}</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
