"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Package,
  Inbox,
  FileText,
  Compass,
  ArrowUpRight,
  Phone,
  Mail,
  Building,
  ChevronRight,
  Sliders,
  MapPin,
  Route,
  BarChart2,
  Layers,
  Tag,
  Disc3,
  ShieldCheck
} from "lucide-react";

interface Inquiry {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  lineSpeed?: string;
  skuProfile?: string;
  message?: string;
  status?: "Pending" | "Contacted" | "Completed";
  createdAt?: string;
}

interface Product {
  id: string;
  title: string;
  category: string;
  tag: string;
}

export default function AdminDashboardClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [productsRes, inquiriesRes, articlesRes] = await Promise.all([
        apiFetch("/api/products").catch(() => null),
        apiFetch("/api/inquiries").catch(() => null),
        apiFetch("/api/articles").catch(() => null),
      ]);

      if (productsRes && productsRes.ok) {
        const pData = await productsRes.json();
        setProducts(Array.isArray(pData) ? pData : []);
      }

      if (inquiriesRes && inquiriesRes.ok) {
        const iData = await inquiriesRes.json();
        setInquiries(Array.isArray(iData) ? iData : []);
      }

      if (articlesRes && articlesRes.ok) {
        const aData = await articlesRes.json();
        setArticles(Array.isArray(aData) ? aData : []);
      }
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Compute real counts
  const totalProducts = products.length;
  const totalInquiries = inquiries.length;
  const pendingInquiries = inquiries.filter((i) => !i.status || i.status === "Pending").length;
  const contactedInquiries = inquiries.filter((i) => i.status === "Contacted").length;
  const completedInquiries = inquiries.filter((i) => i.status === "Completed").length;

  // Category counts
  const categoryStats = useMemo(() => {
    const counts = {
      films: products.filter((p) => p.category === "film-products").length,
      labels: products.filter((p) => p.category === "label-sticker-products").length,
      tapes: products.filter((p) => p.category === "tapes").length,
      straps: products.filter((p) => p.category === "pp-strap").length,
    };
    return counts;
  }, [products]);

  const handleUpdateInquiryStatus = async (inquiryId: string, newStatus: "Pending" | "Contacted" | "Completed") => {
    try {
      const res = await apiFetch("/api/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: inquiryId, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => ((i._id === inquiryId || i.id === inquiryId) ? { ...i, status: newStatus } : i))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="space-y-8 w-full font-sans text-[#0F1721]">

      {/* 1. REAL METRIC KPI CARDS (WIDE 4 COLUMNS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* KPI 1: Active Product SKUs */}
        <div className="rounded-[28px] bg-white p-6 border border-[#e5dfd2] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#fe8220] transition duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#120a3b] font-display">Active Catalog SKUs</span>
            <div className="h-10 w-10 rounded-2xl bg-[#f2eeff] text-[#482dbf] flex items-center justify-center font-bold">
              <Package className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-[#120a3b] font-display tracking-tight">
              {loading ? "..." : totalProducts}
            </div>
            <p className="text-xs text-[#5A6473] font-medium mt-1">
              Films, Labels, Tapes & Straps
            </p>
          </div>
          <div className="pt-3 border-t border-[#e5dfd2]/60 flex items-center justify-between text-xs font-mono font-bold text-[#482dbf]">
            <span>Catalog Database</span>
            <span className="bg-[#f2eeff] px-2.5 py-0.5 rounded-full border border-indigo-200">100% Live</span>
          </div>
        </div>

        {/* KPI 2: RFQ Customer Leads */}
        <div className="rounded-[28px] bg-white p-6 border border-[#e5dfd2] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#fe8220] transition duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#120a3b] font-display">RFQ Quote Leads</span>
            <div className="h-10 w-10 rounded-2xl bg-[#fff5eb] text-[#fe8220] flex items-center justify-center font-bold">
              <Inbox className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-[#fe8220] font-display tracking-tight">
              {loading ? "..." : totalInquiries}
            </div>
            <p className="text-xs text-[#5A6473] font-medium mt-1">
              {pendingInquiries} Pending · {contactedInquiries} Contacted · {completedInquiries} Done
            </p>
          </div>
          <div className="pt-3 border-t border-[#e5dfd2]/60 flex items-center justify-between text-xs font-mono font-bold text-[#fe8220]">
            <span>Pending Actions</span>
            <span className="bg-[#fff5eb] px-2.5 py-0.5 rounded-full border border-orange-200">{pendingInquiries} Leads</span>
          </div>
        </div>

        {/* KPI 3: Industry Verticals */}
        <div className="rounded-[28px] bg-white p-6 border border-[#e5dfd2] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#fe8220] transition duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#120a3b] font-display">Industry Verticals</span>
            <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Compass className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-[#120a3b] font-display tracking-tight">
              6
            </div>
            <p className="text-xs text-[#5A6473] font-medium mt-1">
              Food, Pharma, Auto, E-Com
            </p>
          </div>
          <div className="pt-3 border-t border-[#e5dfd2]/60 flex items-center justify-between text-xs font-mono font-bold text-emerald-700">
            <span>Market Coverage</span>
            <span className="bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">Active</span>
          </div>
        </div>

        {/* KPI 4: Published Insights */}
        <div className="rounded-[28px] bg-white p-6 border border-[#e5dfd2] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#fe8220] transition duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#120a3b] font-display">Published Articles</span>
            <div className="h-10 w-10 rounded-2xl bg-[#f2eeff] text-[#482dbf] flex items-center justify-center font-bold">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-[#120a3b] font-display tracking-tight">
              {loading ? "..." : articles.length}
            </div>
            <p className="text-xs text-[#5A6473] font-medium mt-1">
              Packaging News & Technical Blogs
            </p>
          </div>
          <div className="pt-3 border-t border-[#e5dfd2]/60 flex items-center justify-between text-xs font-mono font-bold text-[#482dbf]">
            <span>Content Hub</span>
            <span className="bg-[#f2eeff] px-2.5 py-0.5 rounded-full border border-indigo-200">Published</span>
          </div>
        </div>

      </div>

      {/* 2. MAIN DASHBOARD CONTENT GRID (2 WIDE COLUMNS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column (8/12) */}
        <div className="lg:col-span-8 space-y-8">

          {/* A. REAL PRODUCT CATEGORIES BREAKDOWN CARD */}
          <div className="rounded-[32px] bg-white p-8 border border-[#e5dfd2] shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-[#120a3b] font-display flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-[#fe8220]" />
                  Product Catalog Distribution Across 4 Core Categories
                </h2>
                <p className="text-xs text-[#5A6473] font-medium mt-0.5">
                  Real SKU allocation breakdown calculated directly from live backend catalog database.
                </p>
              </div>
              <Link
                href="/admin/products"
                className="text-xs font-bold text-[#fe8220] hover:underline shrink-0"
              >
                Manage SKUs ↗
              </Link>
            </div>

            {/* Category Progress Bars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Category 1: Film Products */}
              <div className="rounded-2xl border border-[#e5dfd2] p-5 bg-[#f8f7f4] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#120a3b]">
                  <span className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-[#482dbf]" /> Film Products
                  </span>
                  <span className="font-mono text-[#fe8220] bg-white border border-[#fe8220]/30 px-2.5 py-0.5 rounded-full">
                    {categoryStats.films} SKUs
                  </span>
                </div>
                <div className="h-3 w-full bg-white rounded-full overflow-hidden border border-[#e5dfd2]">
                  <div
                    style={{ width: `${totalProducts > 0 ? Math.max(10, Math.round((categoryStats.films / totalProducts) * 100)) : 0}%` }}
                    className="h-full bg-gradient-to-r from-[#120a3b] to-[#482dbf] rounded-full transition-all duration-500"
                  />
                </div>
                <div className="text-[11px] font-mono text-slate-500 flex justify-between">
                  <span>POF, LDPE, BOPP, Stretch, PVC</span>
                  <span className="font-bold text-[#120a3b]">{totalProducts > 0 ? Math.round((categoryStats.films / totalProducts) * 100) : 0}%</span>
                </div>
              </div>

              {/* Category 2: Labels & Stickers */}
              <div className="rounded-2xl border border-[#e5dfd2] p-5 bg-[#f8f7f4] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#120a3b]">
                  <span className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-[#fe8220]" /> Labels & Stickers
                  </span>
                  <span className="font-mono text-[#fe8220] bg-white border border-[#fe8220]/30 px-2.5 py-0.5 rounded-full">
                    {categoryStats.labels} SKUs
                  </span>
                </div>
                <div className="h-3 w-full bg-white rounded-full overflow-hidden border border-[#e5dfd2]">
                  <div
                    style={{ width: `${totalProducts > 0 ? Math.max(10, Math.round((categoryStats.labels / totalProducts) * 100)) : 0}%` }}
                    className="h-full bg-gradient-to-r from-[#fe8220] to-[#ffa048] rounded-full transition-all duration-500"
                  />
                </div>
                <div className="text-[11px] font-mono text-slate-500 flex justify-between">
                  <span>Thermal, Barcode, Printed, Product</span>
                  <span className="font-bold text-[#120a3b]">{totalProducts > 0 ? Math.round((categoryStats.labels / totalProducts) * 100) : 0}%</span>
                </div>
              </div>

              {/* Category 3: Industrial Tapes */}
              <div className="rounded-2xl border border-[#e5dfd2] p-5 bg-[#f8f7f4] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#120a3b]">
                  <span className="flex items-center gap-2">
                    <Disc3 className="h-4 w-4 text-emerald-600" /> Industrial Tapes
                  </span>
                  <span className="font-mono text-[#fe8220] bg-white border border-[#fe8220]/30 px-2.5 py-0.5 rounded-full">
                    {categoryStats.tapes} SKUs
                  </span>
                </div>
                <div className="h-3 w-full bg-white rounded-full overflow-hidden border border-[#e5dfd2]">
                  <div
                    style={{ width: `${totalProducts > 0 ? Math.max(10, Math.round((categoryStats.tapes / totalProducts) * 100)) : 0}%` }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transition-all duration-500"
                  />
                </div>
                <div className="text-[11px] font-mono text-slate-500 flex justify-between">
                  <span>BOPP, Printed, Coloured, Silicon</span>
                  <span className="font-bold text-[#120a3b]">{totalProducts > 0 ? Math.round((categoryStats.tapes / totalProducts) * 100) : 0}%</span>
                </div>
              </div>

              {/* Category 4: Strap */}
              <div className="rounded-2xl border border-[#e5dfd2] p-5 bg-[#f8f7f4] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#120a3b]">
                  <span className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-purple-600" /> Strap
                  </span>
                  <span className="font-mono text-[#fe8220] bg-white border border-[#fe8220]/30 px-2.5 py-0.5 rounded-full">
                    {categoryStats.straps} SKUs
                  </span>
                </div>
                <div className="h-3 w-full bg-white rounded-full overflow-hidden border border-[#e5dfd2]">
                  <div
                    style={{ width: `${totalProducts > 0 ? Math.max(10, Math.round((categoryStats.straps / totalProducts) * 100)) : 0}%` }}
                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full transition-all duration-500"
                  />
                </div>
                <div className="text-[11px] font-mono text-slate-500 flex justify-between">
                  <span>Virgin PP, Printed, Colored, PET</span>
                  <span className="font-bold text-[#120a3b]">{totalProducts > 0 ? Math.round((categoryStats.straps / totalProducts) * 100) : 0}%</span>
                </div>
              </div>

            </div>
          </div>

          {/* B. REAL RFQ CUSTOMER INQUIRIES STREAM TABLE */}
          <div className="rounded-[32px] bg-white p-8 border border-[#e5dfd2] shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-[#120a3b] font-display flex items-center gap-2">
                  <Inbox className="h-5 w-5 text-[#fe8220]" />
                  Live RFQ Customer Inquiries Stream
                </h3>
                <p className="text-xs text-[#5A6473] font-medium mt-0.5">
                  Recent customer quote inquiries received from the public website contact & quote forms.
                </p>
              </div>
              <Link
                href="/admin/inquiries"
                className="text-xs font-bold text-[#fe8220] hover:underline flex items-center gap-1 shrink-0"
              >
                <span>View Full CRM ({inquiries.length})</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {inquiries.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500 font-medium rounded-2xl border border-dashed border-[#e5dfd2] bg-[#f8f7f4]">
                No customer inquiries recorded in database yet.
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-[#e5dfd2]">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#e5dfd2] bg-[#f8f7f4] text-[#5A6473] font-mono text-[10px] uppercase">
                      <th className="p-4 font-bold">Contact Person</th>
                      <th className="p-4 font-bold">Company / Phone</th>
                      <th className="p-4 font-bold">Product SKU</th>
                      <th className="p-4 font-bold">Pipeline Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5dfd2]/60 font-medium">
                    {inquiries.slice(0, 5).map((inq) => {
                      const targetId = inq._id || inq.id || "";
                      return (
                        <tr key={targetId} className="hover:bg-[#fff5eb]/40 transition">
                          <td className="p-4 font-bold text-[#120a3b]">
                            <div>{inq.name}</div>
                            <div className="text-[10px] text-slate-400 font-normal font-mono flex items-center gap-1 mt-0.5">
                              <Mail className="h-3 w-3 text-slate-400" /> {inq.email}
                            </div>
                          </td>
                          <td className="p-4 text-slate-700">
                            <div className="font-semibold flex items-center gap-1">
                              <Building className="h-3.5 w-3.5 text-slate-400" /> {inq.company || "N/A"}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                              <Phone className="h-3 w-3 text-slate-400" /> {inq.phone}
                            </div>
                          </td>
                          <td className="p-4 font-mono text-[11px] text-[#fe8220] font-bold">
                            {inq.skuProfile || "General Inquiry"}
                          </td>
                          <td className="p-4">
                            <select
                              value={inq.status || "Pending"}
                              onChange={(e) => handleUpdateInquiryStatus(targetId, e.target.value as any)}
                              className={`text-[10px] font-mono font-bold uppercase rounded-full px-3 py-1 border cursor-pointer focus:outline-none ${inq.status === "Completed"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : inq.status === "Contacted"
                                    ? "bg-[#f2eeff] text-[#482dbf] border-indigo-200"
                                    : "bg-[#fff5eb] text-[#fe8220] border-[#fe8220]/30"
                                }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

        {/* Right Column (4/12 Grid) */}
        <div className="lg:col-span-4 space-y-6">

          {/* A. FAST MODULE LAUNCHER HUB */}
          <div className="rounded-[32px] bg-white p-7 border border-[#e5dfd2] shadow-xs space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#120a3b] flex items-center gap-2">
              <Sliders className="h-4 w-4 text-[#fe8220]" />
              Admin Management Modules
            </h3>

            <div className="space-y-3">
              {[
                {
                  title: "Product Catalog Manager",
                  desc: "Manage 32 SKUs, specs & prices",
                  icon: Package,
                  href: "/admin/products",
                  color: "text-[#482dbf] bg-[#f2eeff]",
                },
                {
                  title: "Customer RFQ Inquiries CRM",
                  desc: "Follow up leads & client calls",
                  icon: Inbox,
                  href: "/admin/inquiries",
                  color: "text-[#fe8220] bg-[#fff5eb]",
                },
                {
                  title: "Gallery Showcase Manager",
                  desc: "Update plant & machinery photos",
                  icon: Sliders,
                  href: "/admin/gallery",
                  color: "text-indigo-700 bg-indigo-50",
                },
                {
                  title: "Industry Verticals Manager",
                  desc: "Manage 6 sector solutions",
                  icon: Compass,
                  href: "/admin/industries",
                  color: "text-emerald-700 bg-emerald-50",
                },
                {
                  title: "Engineered Solutions Manager",
                  desc: "Update 8 journey steps & USP",
                  icon: Route,
                  href: "/admin/journey",
                  color: "text-amber-700 bg-amber-50",
                },
                {
                  title: "Footer & Plant Info Manager",
                  desc: "Update address, phone & GSTIN",
                  icon: MapPin,
                  href: "/admin/footer",
                  color: "text-purple-700 bg-purple-50",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group flex items-center justify-between rounded-2xl border border-[#e5dfd2] p-4 bg-[#f8f7f4] hover:bg-white hover:border-[#fe8220] hover:shadow-xs transition duration-200"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-[#120a3b] group-hover:text-[#fe8220] transition">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-[#fe8220] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* B. PLANT & CONTACT SPECIFICATION SUMMARY */}
          <div className="rounded-[32px] bg-[#120a3b] p-7 text-white shadow-lg space-y-4 border border-indigo-900">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#fe8220]" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Factory & Plant Summary
              </h3>
            </div>

            <div className="space-y-3 text-xs text-indigo-100 font-medium border-t border-indigo-900/80 pt-3">
              <div>
                <span className="text-[10px] font-mono text-[#fe8220] block font-bold uppercase">Manufacturing Plant</span>
                <span className="font-semibold text-white">Plot No 4, Khasra No 1373, Rithani, Delhi Meerut Road, Ghaziabad - 201001</span>
              </div>
              <div className="flex justify-between border-t border-indigo-900/60 pt-2">
                <span className="text-indigo-300">Support Hotline:</span>
                <span className="font-mono font-bold text-white">+91 74287 70999</span>
              </div>
              <div className="flex justify-between border-t border-indigo-900/60 pt-2">
                <span className="text-indigo-300">GSTIN Reg:</span>
                <span className="font-mono font-bold text-[#fe8220]">07AABCW1234F1Z5</span>
              </div>
              <div className="flex justify-between border-t border-indigo-900/60 pt-2">
                <span className="text-indigo-300">Working Hours:</span>
                <span className="font-mono text-white">Mon - Sat: 9:00 AM - 6:00 PM</span>
              </div>
            </div>

            <Link
              href="/admin/footer"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/20 p-3 text-xs font-bold text-white hover:bg-[#fe8220] hover:border-[#fe8220] transition"
            >
              <span>Edit Plant Details</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
