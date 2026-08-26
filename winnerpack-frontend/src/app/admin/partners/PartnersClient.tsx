"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { Users, Save, Check, RefreshCw, Plus, Trash2, Globe, ShieldCheck, Award, Image as ImageIcon } from "lucide-react";
import OptimizedImage from '@/components/OptimizedImage';

interface PartnerBrand {
  id?: string;
  name: string;
  category?: string;
  logo: string;
  website?: string;
}

const DEFAULT_BRANDS: PartnerBrand[] = [
  { id: "p_lava", name: "LAVA International", category: "Consumer Electronics & Mobile", logo: "/Brand_logo/lava.png", website: "https://lavamobiles.com" },
  { id: "p_vivo", name: "Vivo Electronics", category: "Smartphones & Mobile Devices", logo: "/Brand_logo/vivo.png", website: "https://vivo.com" },
  { id: "p_noise", name: "NOISE Wearables", category: "Smart Wearables & Audio", logo: "/Brand_logo/noise.png", website: "https://gonoise.com" },
  { id: "p_boat", name: "boAt Lifestyle", category: "Audio & Smart Wearables", logo: "/Brand_logo/boat.png", website: "https://boat-lifestyle.com" },
  { id: "p_firebolt", name: "FIRE-BOLTT", category: "Smartwatches & Wearable Tech", logo: "/Brand_logo/firebolt.png", website: "https://fireboltt.com" },
  { id: "p_milton", name: "MILTON Houseware", category: "Consumer Products & Homeware", logo: "/Brand_logo/milton.png", website: "https://milton.in" },
  { id: "p_luxor", name: "Luxor Writing Instruments", category: "Stationery & Writing Products", logo: "/Brand_logo/luxor.png", website: "https://luxorpen.com" },
  { id: "p_aiplus", name: "Ai+ Smartphone", category: "Mobile & Smart Accessories", logo: "/Brand_logo/aiplus.png", website: "https://aiplus.com" },
  { id: "p_bosch", name: "BOSCH Global Engineering", category: "Automotive & Industrial Tech", logo: "/Brand_logo/bosch.svg", website: "https://bosch.com" },
  { id: "p_ikio", name: "IKIO Technologies Limited", category: "LED Lighting & Electronics ODM", logo: "/Brand_logo/ikio.png", website: "https://ikiotech.com" },
  { id: "p_lripl", name: "LRIPL (Laxmi Remote India)", category: "Remote Controls & Electronics OEM", logo: "/Brand_logo/lripl.png", website: "https://lripl.com" },
  { id: "p_anmol", name: "Anmol Industries", category: "Packaged Foods & Bakery", logo: "/Brand_logo/anmol.png", website: "https://anmolindustries.com" },
  { id: "p_ci", name: "CI Automotive", category: "Automotive Solutions & Engineering", logo: "/Brand_logo/ci-automotive.png", website: "https://ciautomotive.com" },
  { id: "p_bhagwati", name: "Bhagwati Products Limited", category: "Electronics & Manufacturing", logo: "/Brand_logo/bhagwati-products.png", website: "https://bhagwatiproducts.com" },
];

export default function PartnersClient() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [headerData, setHeaderData] = useState({
    tag: "TRUSTED PARTNERS",
    title: "Brands from all over the world love us!",
    description: "From renowned brands across the globe, our client portfolio showcases the trust and satisfaction of industry leaders, reflecting our commitment to excellence and customer satisfaction.",
    badge1: "Global Brands",
    badge2: "100% Quality QC",
    badge3: "ISO Certified",
  });

  const [partners, setPartners] = useState<PartnerBrand[]>(DEFAULT_BRANDS);
  const [fullDoc, setFullDoc] = useState<any>({});

  // Fetch partners_materials_certs content key
  useEffect(() => {
    async function loadPartners() {
      setLoading(true);
      try {
        const res = await apiFetch("/api/content?key=partners_materials_certs");
        if (res.ok) {
          const doc = await res.json();
          setFullDoc(doc || {});
          if (doc.partnerHeader) {
            setHeaderData(doc.partnerHeader);
          }
          if (Array.isArray(doc.partners) && doc.partners.length > 0) {
            setPartners(doc.partners);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadPartners();
  }, []);

  const handleAddPartner = () => {
    const newBrand: PartnerBrand = {
      id: `p_${Date.now()}`,
      name: "New Partner Brand",
      category: "Industrial Packaging",
      logo: "/Brand_logo/lava.png",
      website: "https://example.com"
    };
    setPartners((prev) => [...prev, newBrand]);
  };

  const handleDeletePartner = (index: number) => {
    if (!confirm("Are you sure you want to remove this brand logo?")) return;
    setPartners((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...fullDoc,
        partnerHeader: headerData,
        partners: partners
      };

      const res = await apiFetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "partners_materials_certs",
          value: payload
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Failed to save partner logos.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving partner logos.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xs font-mono uppercase tracking-widest text-slate-400">
        Loading Partner & Client Brands Data...
      </div>
    );
  }

  return (
    <div className="space-y-5 w-full font-sans pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-200">
              <Users className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display tracking-tight">
              Partners & Client Logos Manager
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Manage corporate client logos, brand banners, and homepage trust badges (Lava, Vivo, Noise, Bosch, etc.).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddPartner}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <Plus className="h-4 w-4 text-[#fe8220]" />
            <span>Add New Brand Logo</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#fe8220] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#d4630a] transition cursor-pointer"
          >
            {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : success ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            <span>{saving ? "Saving Changes..." : success ? "Saved Successfully!" : "Save Partner Logos"}</span>
          </button>
        </div>
      </div>

      {/* 1. Header & Text Content Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-900 border-b border-slate-100 pb-2">
          Homepage Section Header & Badges Text
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
              Section Subtitle Tag
            </label>
            <input
              type="text"
              value={headerData.tag}
              onChange={(e) => setHeaderData({ ...headerData, tag: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
              Main Section Headline
            </label>
            <input
              type="text"
              value={headerData.title}
              onChange={(e) => setHeaderData({ ...headerData, title: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-900 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
            Section Intro Paragraph
          </label>
          <textarea
            rows={2}
            value={headerData.description}
            onChange={(e) => setHeaderData({ ...headerData, description: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-900 focus:border-amber-500 focus:outline-none"
          />
        </div>

        {/* 3 Proof Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase text-slate-600 mb-1 flex items-center gap-1">
              <Globe className="h-3 w-3 text-amber-500" /> Proof Badge 1
            </label>
            <input
              type="text"
              value={headerData.badge1}
              onChange={(e) => setHeaderData({ ...headerData, badge1: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono font-bold uppercase text-slate-600 mb-1 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-amber-500" /> Proof Badge 2
            </label>
            <input
              type="text"
              value={headerData.badge2}
              onChange={(e) => setHeaderData({ ...headerData, badge2: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono font-bold uppercase text-slate-600 mb-1 flex items-center gap-1">
              <Award className="h-3 w-3 text-amber-500" /> Proof Badge 3
            </label>
            <input
              type="text"
              value={headerData.badge3}
              onChange={(e) => setHeaderData({ ...headerData, badge3: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-900"
            />
          </div>
        </div>
      </div>

      {/* 2. Client Brand Logos Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-700">
            Active Client Brand Logos ({partners.length})
          </h2>
          <span className="text-[11px] font-mono text-slate-400">
            Rendered live in homepage brand marquee
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {partners.map((p, idx) => (
            <div key={p.id || idx} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3 relative group">
              {/* Delete Button */}
              <button
                onClick={() => handleDeletePartner(idx)}
                className="absolute top-3 right-3 p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-red-600 hover:bg-red-50 hover:border-red-300 transition cursor-pointer"
                title="Remove Brand Logo"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>

              {/* Logo Preview Container */}
              <div className="aspect-[16/9] bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center overflow-hidden p-4 relative">
                {p.logo ? (
                  <OptimizedImage
  src={p.logo}
  alt={p.name}
  className="max-h-16 max-w-full object-contain drop-shadow-xs"
/>
                ) : (
                  <ImageIcon className="h-6 w-6 text-slate-300" />
                )}
              </div>

              {/* Brand Name Input */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-600 mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={p.name}
                  onChange={(e) => {
                    const updated = [...partners];
                    updated[idx].name = e.target.value;
                    setPartners(updated);
                  }}
                  placeholder="Brand Name..."
                  className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-900 focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Logo Path Input */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-600 mb-1">
                  Logo Asset Path
                </label>
                <input
                  type="text"
                  value={p.logo}
                  onChange={(e) => {
                    const updated = [...partners];
                    updated[idx].logo = e.target.value;
                    setPartners(updated);
                  }}
                  placeholder="/Brand_logo/logo.png"
                  className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-mono text-slate-800 focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Category / Website Input */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-600 mb-1">
                  Industry / Category Tag
                </label>
                <input
                  type="text"
                  value={p.category || ""}
                  onChange={(e) => {
                    const updated = [...partners];
                    updated[idx].category = e.target.value;
                    setPartners(updated);
                  }}
                  placeholder="e.g. Consumer Electronics"
                  className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-800 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
