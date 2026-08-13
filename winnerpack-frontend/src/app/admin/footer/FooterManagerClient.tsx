"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock, Save, Check, RefreshCw, Share2, Building as BuildingIcon, Globe } from "lucide-react";
import { COMPANY } from "@/lib/mock-data";

export default function FooterManagerClient() {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const [companyInfo, setCompanyInfo] = useState({
    name: "Winner Pack Technologies",
    legalName: "Winner Pack Technologies Pvt. Ltd.",
    phone: COMPANY.phone || "+91 85950 72187",
    email: COMPANY.email || "sales@winnerpack.in",
    address: COMPANY.address || "Plot No - 8, Khasra No 2667, MIN BST Industrial Park, Bhurgharhi, Dasna, Ghaziabad, UP, 201015",
    hours: COMPANY.hours || "Mon - Sat: 9:00 AM - 7:00 PM IST",
    gstin: "09AACCW6640F1Z8",
    cin: "U51909UP2020PTC129759",
    mapsEmbedUrl: "https://maps.google.com/maps?q=Plot%20No.%208,%20B.S.T.%20Industrial%20Park,%20Dasna,%20Ghaziabad&t=&z=13&ie=UTF8&iwloc=&output=embed",
    linkedin: "https://linkedin.com/company/winnerpack",
    twitter: "https://twitter.com/winnerpack",
    facebook: "https://facebook.com/winnerpack",
    whatsapp: "918595072187"
  });

  useEffect(() => {
    async function loadFooterInfo() {
      try {
        const res = await apiFetch("/api/content?key=footer");
        if (res.ok) {
          const data = await res.json();
          const content = data?.data ?? data;
          if (content) {
            setCompanyInfo((prev) => ({ ...prev, ...content }));
          }
        }
      } catch (err) {
        console.error("Failed to load footer info:", err);
      } finally {
        setLoading(false);
      }
    }
    loadFooterInfo();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await apiFetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "footer", data: companyInfo })
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Failed to save contact info.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving contact details.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xs font-mono uppercase tracking-widest text-slate-400">
        Loading Corporate & Plant Info...
      </div>
    );
  }

  return (
    <div className="space-y-5 w-full font-sans">

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[28px] border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-[#120a3b] text-amber-400">
              <MapPin className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-black text-[#120a3b] font-display tracking-tight">
              Footer & Manufacturing Plant Details Manager
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Manage company phone, sales email accounts, plant address, working hours, GSTIN, CIN, and Google Maps location.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 rounded-2xl bg-[#fe8220] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#d4630a] transition cursor-pointer shrink-0"
        >
          {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : success ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          <span>{saving ? "Saving Changes..." : success ? "Saved Successfully!" : "Save Contact Info"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Form: Contact Details (8 cols) */}
        <div className="lg:col-span-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-xs space-y-6">
          <h2 className="text-sm font-mono uppercase tracking-wider font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <BuildingIcon className="h-4 w-4 text-[#fe8220]" /> Corporate Legal & Contact Info
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                Display Brand Name
              </label>
              <input
                type="text"
                value={companyInfo.name}
                onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:border-[#fe8220] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                Full Registered Legal Name
              </label>
              <input
                type="text"
                value={companyInfo.legalName}
                onChange={(e) => setCompanyInfo({ ...companyInfo, legalName: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#fe8220] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1 flex items-center gap-1">
                <Phone className="h-3.5 w-3.5 text-slate-400" /> Primary Support Phone
              </label>
              <input
                type="text"
                value={companyInfo.phone}
                onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 px-3.5 py-2.5 text-xs font-mono font-bold text-slate-900 focus:border-[#fe8220] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1 flex items-center gap-1">
                <Mail className="h-3.5 w-3.5 text-slate-400" /> Primary Sales Email
              </label>
              <input
                type="email"
                value={companyInfo.email}
                onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 px-3.5 py-2.5 text-xs font-mono font-bold text-slate-900 focus:border-[#fe8220] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1 flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-slate-400" /> Manufacturing Plant & HQ Address
            </label>
            <textarea
              rows={3}
              value={companyInfo.address}
              onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-[#fe8220] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-slate-400" /> Working Hours
              </label>
              <input
                type="text"
                value={companyInfo.hours}
                onChange={(e) => setCompanyInfo({ ...companyInfo, hours: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                GSTIN Registration
              </label>
              <input
                type="text"
                value={companyInfo.gstin}
                onChange={(e) => setCompanyInfo({ ...companyInfo, gstin: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs font-mono text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                CIN Registration
              </label>
              <input
                type="text"
                value={companyInfo.cin}
                onChange={(e) => setCompanyInfo({ ...companyInfo, cin: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs font-mono text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1 flex items-center gap-1">
              <Globe className="h-3.5 w-3.5 text-slate-400" /> Google Maps Embed iFrame URL
            </label>
            <input
              type="text"
              value={companyInfo.mapsEmbedUrl || ""}
              onChange={(e) => setCompanyInfo({ ...companyInfo, mapsEmbedUrl: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs font-mono text-slate-800"
            />
          </div>
        </div>

        {/* Right Form: Social & Quick Actions (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-wider font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
              <Share2 className="h-4 w-4 text-[#fe8220]" /> Social Channels & Links
            </h2>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1">
                LinkedIn Company Page
              </label>
              <input
                type="text"
                value={companyInfo.linkedin}
                onChange={(e) => setCompanyInfo({ ...companyInfo, linkedin: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs font-mono text-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1">
                WhatsApp Business Number
              </label>
              <input
                type="text"
                value={companyInfo.whatsapp || "918595072187"}
                onChange={(e) => setCompanyInfo({ ...companyInfo, whatsapp: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs font-mono text-slate-900"
              />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
