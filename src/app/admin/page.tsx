"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Inbox, ArrowRight, Clock, AlertTriangle, CheckCircle, RefreshCw, Package, Wrench, FileText } from "lucide-react";

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
  const [machinesCount, setMachinesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [inqRes, artRes, prodRes, machRes] = await Promise.all([
        fetch("/api/inquiries"),
        fetch("/api/articles"),
        fetch("/api/products"),
        fetch("/api/machines"),
      ]);
      const [inqData, artData, prodData, machData] = await Promise.all([
        inqRes.json(),
        artRes.json(),
        prodRes.json(),
        machRes.json(),
      ]);
      setInquiries(inqData || []);
      setArticles(artData || []);
      setProductsCount(prodData ? prodData.length : 0);
      setMachinesCount(machData ? machData.length : 0);
    } catch (err) {
      console.error(err);
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
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard Overview</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time leads and publishing status from Dasna Hub</p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#161923] hover:bg-white/5 transition"
        >
          <RefreshCw className={`h-4 w-4 text-slate-400 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/5 bg-[#161923] p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Total Leads</span>
            <Inbox className="h-5 w-5 text-cyan-400" />
          </div>
          <div className="mt-4 text-3xl font-bold">{inquiries.length}</div>
        </div>

        <div className="rounded-xl border border-white/5 bg-[#161923] p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Pending</span>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
          <div className="mt-4 text-3xl font-bold text-amber-500">{pendingCount}</div>
        </div>

        <div className="rounded-xl border border-white/5 bg-[#161923] p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Contacted</span>
            <Clock className="h-5 w-5 text-cyan-400" />
          </div>
          <div className="mt-4 text-3xl font-bold text-cyan-400">{contactedCount}</div>
        </div>

        <div className="rounded-xl border border-white/5 bg-[#161923] p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Completed</span>
            <CheckCircle className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="mt-4 text-3xl font-bold text-emerald-500">{completedCount}</div>
        </div>
      </div>

      {/* Catalog Metrics Row */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-white/5 bg-[#161923] p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Catalog Products</span>
            <Package className="h-5 w-5 text-cyan-400" />
          </div>
          <div className="mt-4 text-3xl font-bold">{productsCount}</div>
        </div>

        <div className="rounded-xl border border-white/5 bg-[#161923] p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Catalog Machines</span>
            <Wrench className="h-5 w-5 text-cyan-400" />
          </div>
          <div className="mt-4 text-3xl font-bold">{machinesCount}</div>
        </div>

        <div className="rounded-xl border border-white/5 bg-[#161923] p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Published Articles</span>
            <FileText className="h-5 w-5 text-cyan-400" />
          </div>
          <div className="mt-4 text-3xl font-bold">{articles.length}</div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Recent Inquiries List */}
        <div className="lg:col-span-8 rounded-xl border border-white/5 bg-[#161923] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-mono uppercase tracking-wider text-white">Recent Quote Requests</h3>
            <Link
              href="/admin/inquiries"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
            >
              Manage all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs font-mono uppercase tracking-widest text-slate-500">
              Retrieving...
            </div>
          ) : recentInquiries.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono uppercase tracking-widest text-slate-500">
              No recent requests
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/5 text-slate-500 uppercase font-mono tracking-wider">
                    <th className="pb-3 font-semibold">Client Name</th>
                    <th className="pb-3 font-semibold">Company</th>
                    <th className="pb-3 font-semibold">SKU Profile</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentInquiries.map((inq, idx) => (
                    <tr key={inq._id || idx} className="group hover:bg-white/[0.01]">
                      <td className="py-3.5 font-bold text-white">{inq.name}</td>
                      <td className="py-3.5 text-slate-400">{inq.company}</td>
                      <td className="py-3.5 text-slate-400">{inq.skuProfile || "—"}</td>
                      <td className="py-3.5">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${
                            inq.status === "Pending"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : inq.status === "Contacted"
                              ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          }`}
                        >
                          {inq.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-slate-400 text-right">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Articles */}
        <div className="lg:col-span-4 rounded-xl border border-white/5 bg-[#161923] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-mono uppercase tracking-wider text-white">Recent Articles</h3>
            <Link
              href="/admin/articles"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
            >
              Add New <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center text-xs font-mono uppercase tracking-widest text-slate-500">
              Retrieving...
            </div>
          ) : recentArticles.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono uppercase tracking-widest text-slate-500">
              No articles published
            </div>
          ) : (
            <div className="space-y-4">
              {recentArticles.map((art, idx) => (
                <div key={art._id || idx} className="rounded-lg border border-white/5 bg-[#0F1117]/50 p-4">
                  <div className="flex justify-between items-start">
                    <span className="rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider">
                      {art.tag}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{art.date}</span>
                  </div>
                  <h4 className="font-semibold text-xs text-white mt-2 leading-snug">{art.title}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
