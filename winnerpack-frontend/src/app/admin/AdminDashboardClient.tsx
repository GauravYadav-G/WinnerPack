"use client";
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Inbox,
  ArrowRight,
  Clock,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Package,
  FileText
} from "lucide-react";

type Inquiry = {
  _id: string;
  name: string;
  email: string;
  company: string;
  skuProfile?: string;
  status: "Pending" | "Contacted" | "Completed";
  createdAt: string;
};

type Article = {
  _id: string;
  tag: string;
  title: string;
  date: string;
};

export default function AdminDashboardPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [productsCount, setProductsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [inqRes, artRes, prodRes] = await Promise.all([
        apiFetch("/api/inquiries"),
        apiFetch("/api/articles"),
        apiFetch("/api/products"),
      ]);

      const [inqData, artData, prodData] = await Promise.all([
        inqRes.json(),
        artRes.json(),
        prodRes.json(),
      ]);

      setInquiries(inqData || []);
      setArticles(artData || []);
      setProductsCount(prodData ? prodData.length : 0);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const pendingCount = inquiries.filter((i) => i.status === "Pending").length;
  const contactedCount = inquiries.filter((i) => i.status === "Contacted").length;
  const completedCount = inquiries.filter((i) => i.status === "Completed").length;

  const recentInquiries = inquiries.slice(0, 5);
  const recentArticles = articles.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Control Center</h1>
          <p className="text-xs text-slate-500 mt-1">Configure homepage modules, verify metrics, and monitor leads</p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition shadow-sm"
          title="Refresh statistics"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="space-y-6">
        {/* Quick metrics */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Inquiry Leads</span>
              <Inbox className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="mt-3 text-3xl font-extrabold text-slate-900">{inquiries.length}</div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Pending Actions</span>
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
            <div className="mt-3 text-3xl font-extrabold text-amber-500">{pendingCount}</div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">In Contact</span>
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
            <div className="mt-3 text-3xl font-extrabold text-blue-500">{contactedCount}</div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Completed Leads</span>
              <CheckCircle className="h-5 w-5 text-emerald-500" />
            </div>
            <div className="mt-3 text-3xl font-extrabold text-emerald-500">{completedCount}</div>
          </div>
        </div>

        {/* Catalog Info */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs font-bold text-slate-500">Catalog Products</span>
              <div className="mt-1 text-2xl font-extrabold text-slate-900">{productsCount}</div>
            </div>
            <Package className="h-8 w-8 text-indigo-500 opacity-60" />
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs font-bold text-slate-500">Blog Articles</span>
              <div className="mt-1 text-2xl font-extrabold text-slate-900">{articles.length}</div>
            </div>
            <FileText className="h-8 w-8 text-indigo-500 opacity-60" />
          </div>
        </div>

        {/* Tables grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 rounded-xl border border-slate-200 p-5 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Recent Customer Inquiries</h3>
              <Link
                href="/admin/inquiries"
                className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            {loading ? (
              <div className="py-8 text-center text-xs text-slate-400">Loading inquiries...</div>
            ) : recentInquiries.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">No active inquiries.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-mono tracking-wider">
                      <th className="pb-2">Name</th>
                      <th className="pb-2">Company</th>
                      <th className="pb-2">SKU Profile</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentInquiries.map((inq, idx) => (
                      <tr key={inq._id || idx} className="hover:bg-slate-50">
                        <td className="py-2.5 font-bold text-slate-950">{inq.name}</td>
                        <td className="py-2.5 text-slate-600">{inq.company}</td>
                        <td className="py-2.5 text-slate-600">{inq.skuProfile || "—"}</td>
                        <td className="py-2.5">
                          <span
                            className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                              inq.status === "Pending"
                                ? "bg-amber-100 text-amber-700 border border-amber-200"
                                : inq.status === "Contacted"
                                ? "bg-blue-100 text-blue-700 border border-blue-200"
                                : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                            }`}
                          >
                            {inq.status}
                          </span>
                        </td>
                        <td className="py-2.5 text-slate-500 text-right">
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 rounded-xl border border-slate-200 p-5 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Recent Blog Posts</h3>
              <Link
                href="/admin/blogs"
                className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
              >
                Compose <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            {loading ? (
              <div className="py-8 text-center text-xs text-slate-400">Loading articles...</div>
            ) : recentArticles.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">No blog posts found.</div>
            ) : (
              <div className="space-y-3">
                {recentArticles.map((art, idx) => (
                  <div key={art._id || idx} className="rounded-lg border border-slate-100 p-3 bg-slate-50/50">
                    <div className="flex justify-between items-center text-[10px] text-slate-400">
                      <span className="font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded px-1.5">
                        {art.tag}
                      </span>
                      <span>{art.date}</span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-800 mt-1.5 leading-snug line-clamp-2">
                      {art.title}
                    </h4>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
