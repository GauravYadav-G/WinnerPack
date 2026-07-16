"use client";

import { useEffect, useState } from "react";
import { Trash2, CheckSquare, Search, AlertCircle, RefreshCw } from "lucide-react";

type Inquiry = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  lineSpeed?: string;
  skuProfile?: string;
  message?: string;
  status: "Pending" | "Contacted" | "Completed";
  createdAt: string;
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchInquiries = () => {
    setLoading(true);
    fetch("/api/inquiries")
      .then((res) => res.json())
      .then((data) => {
        setInquiries(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (id: string, currentStatus: string) => {
    let nextStatus = "Pending";
    if (currentStatus === "Pending") nextStatus = "Contacted";
    else if (currentStatus === "Contacted") nextStatus = "Completed";
    else nextStatus = "Pending";

    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        fetchInquiries();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;

    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchInquiries();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const term = search.toLowerCase();
    return (
      inq.name.toLowerCase().includes(term) ||
      inq.company.toLowerCase().includes(term) ||
      inq.email.toLowerCase().includes(term) ||
      inq.phone.toLowerCase().includes(term) ||
      (inq.message && inq.message.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Client Inquiries</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage incoming quote requests and production specs</p>
        </div>
        <button
          onClick={fetchInquiries}
          disabled={loading}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#161923] hover:bg-white/5 transition"
        >
          <RefreshCw className={`h-4 w-4 text-slate-400 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-slate-500" />
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by client, company, phone, SKU or message details..."
          className="w-full rounded-lg border border-white/10 bg-[#161923] pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
        />
      </div>

      {/* Grid of Inquiries */}
      {loading ? (
        <div className="py-24 text-center text-xs font-mono uppercase tracking-widest text-slate-500">
          Loading requests...
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="py-24 text-center text-xs font-mono uppercase tracking-widest text-slate-500 flex flex-col items-center justify-center gap-2">
          <AlertCircle className="h-6 w-6 text-slate-600" />
          <span>No inquiries found</span>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {filteredInquiries.map((inq) => (
            <div
              key={inq._id}
              className="rounded-xl border border-white/5 bg-[#161923] p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-sans text-base font-bold text-white leading-tight">
                      {inq.name}
                    </h3>
                    <div className="text-xs text-cyan-400 font-medium mt-1 font-mono">
                      {inq.company}
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider ${
                      inq.status === "Pending"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : inq.status === "Contacted"
                        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    }`}
                  >
                    {inq.status}
                  </span>
                </div>

                {/* Specs Info Block */}
                <div className="grid gap-3 text-xs font-medium text-slate-300 sm:grid-cols-2 bg-[#0F1117]/50 rounded-lg p-4 border border-white/5">
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-500">
                      Contact Details
                    </span>
                    <div className="mt-1 font-mono break-all">{inq.email}</div>
                    <div className="font-mono mt-0.5">{inq.phone}</div>
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-500">
                      SKU / Spec Profile
                    </span>
                    <div className="mt-1 font-sans">{inq.skuProfile || "—"}</div>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-500">
                      Line Speed / Volume
                    </span>
                    <div className="mt-1 font-sans">{inq.lineSpeed || "—"}</div>
                  </div>
                </div>

                {inq.message && (
                  <div className="rounded border border-white/5 bg-[#0F1117] p-3 text-xs leading-relaxed text-slate-400">
                    <strong className="text-slate-300 font-mono text-[9px] block uppercase tracking-wider mb-1">
                      Requirements:
                    </strong>
                    {inq.message}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4 text-[10px] font-mono text-slate-500 mt-4">
                <span>
                  Logged: {new Date(inq.createdAt).toLocaleString()}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateStatus(inq._id, inq.status)}
                    className="inline-flex items-center gap-1 rounded bg-white/5 border border-white/10 px-3 py-1.5 text-white hover:bg-cyan-500 hover:text-black transition"
                  >
                    <CheckSquare className="h-3.5 w-3.5" />
                    Cycle Status
                  </button>
                  <button
                    onClick={() => handleDeleteInquiry(inq._id)}
                    className="inline-flex items-center gap-1 rounded bg-red-500/10 border border-red-500/20 px-3 py-1.5 text-red-400 hover:bg-red-500 hover:text-white transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
