"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import {
  Inbox,
  Search,
  Phone,
  Mail,
  Building,
  Tag,
  ChevronRight,
  X,
  Trash2,
  Download
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function InquiriesClient() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/api/inquiries");
      if (res.ok) {
        const data = await res.json();
        setInquiries(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (inquiryId: string, newStatus: "Pending" | "Contacted" | "Completed") => {
    try {
      const res = await apiFetch(`/api/inquiries/${inquiryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => ((i._id === inquiryId || i.id === inquiryId) ? { ...i, status: newStatus } : i))
        );
        if (selectedInquiry && (selectedInquiry._id === inquiryId || selectedInquiry.id === inquiryId)) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (inquiryId: string, name: string) => {
    if (!confirm(`Delete inquiry from "${name}" permanently?`)) return;
    try {
      const res = await apiFetch(`/api/inquiries/${inquiryId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i._id !== inquiryId && i.id !== inquiryId));
        if (selectedInquiry && (selectedInquiry._id === inquiryId || selectedInquiry.id === inquiryId)) {
          setSelectedInquiry(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    }
  };

  // Export leads to CSV
  const handleExportCSV = () => {
    if (inquiries.length === 0) return alert("No inquiries to export.");
    const headers = ["Date", "Name", "Company", "Email", "Phone", "Target SKU", "Line Speed", "Status", "Message"];
    const rows = inquiries.map((i) => [
      i.createdAt ? new Date(i.createdAt).toLocaleDateString() : "",
      `"${i.name || ""}"`,
      `"${i.company || ""}"`,
      `"${i.email || ""}"`,
      `"${i.phone || ""}"`,
      `"${i.skuProfile || ""}"`,
      `"${i.lineSpeed || ""}"`,
      `"${i.status || "Pending"}"`,
      `"${(i.message || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `winnerpack_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone?.includes(searchQuery) ||
      inq.skuProfile?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "Pending" && (!inq.status || inq.status === "Pending")) ||
      inq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const pendingCount = inquiries.filter((i) => !i.status || i.status === "Pending").length;
  const contactedCount = inquiries.filter((i) => i.status === "Contacted").length;
  const completedCount = inquiries.filter((i) => i.status === "Completed").length;

  return (
    <div className="space-y-5 w-full font-sans">

      {/* Top Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[28px] border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-[#120a3b] text-amber-400">
              <Inbox className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-black text-[#120a3b] font-display tracking-tight">
              Customer Quote Inquiries CRM
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Live stream of incoming buyer quotations, custom specs, and dispatch inquiries.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center justify-center gap-2 rounded-2xl bg-[#fe8220] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#d4630a] transition cursor-pointer shrink-0"
        >
          <Download className="h-4 w-4" />
          <span>Export Leads CSV</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-6 rounded-[28px] border border-slate-200/80 shadow-xs">

        {/* Status Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 custom-scrollbar">
          <button
            onClick={() => setStatusFilter("all")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${statusFilter === "all"
                ? "bg-[#120a3b] text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
          >
            <span>All Submissions</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-800">
              {inquiries.length}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter("Pending")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${statusFilter === "Pending"
                ? "bg-[#fe8220] text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
          >
            <span>Pending Review</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white text-[#fe8220] font-bold">
              {pendingCount}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter("Contacted")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${statusFilter === "Contacted"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
          >
            <span>Contacted</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white text-blue-900 font-bold">
              {contactedCount}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter("Completed")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${statusFilter === "Completed"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
          >
            <span>Completed</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white text-emerald-900 font-bold">
              {completedCount}
            </span>
          </button>
        </div>

        {/* Search */}
        <div className="relative sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, company..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-xs font-medium text-slate-900 placeholder-slate-400 focus:border-[#fe8220] focus:bg-white focus:outline-none"
          />
        </div>

      </div>

      {/* Inquiries Table */}
      {loading ? (
        <div className="py-20 text-center text-xs font-mono uppercase tracking-widest text-slate-400">
          Loading Inquiries CRM Data...
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="py-16 text-center rounded-[28px] border border-slate-200 bg-white p-8 space-y-3">
          <Inbox className="h-10 w-10 text-slate-300 mx-auto" />
          <p className="text-sm font-bold text-slate-800">No Inquiries Found</p>
        </div>
      ) : (
        <div className="rounded-[28px] border border-slate-200/90 bg-white overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 font-mono uppercase tracking-wider text-slate-500 text-[10px]">
                <th className="p-4 font-bold">Contact Person</th>
                <th className="p-4 font-bold">Company / Phone</th>
                <th className="p-4 font-bold">Product Quote SKU</th>
                <th className="p-4 font-bold">Pipeline Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredInquiries.map((inq) => {
                const targetId = inq._id || inq.id || "";
                return (
                  <tr key={targetId} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 font-bold text-slate-900">
                      <div>{inq.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono font-normal flex items-center gap-1 mt-0.5">
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
                    <td className="p-4">
                      {inq.skuProfile ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-[#fff5eb] text-[#fe8220] px-2.5 py-0.5 rounded-full border border-[#fe8220]/30">
                          <Tag className="h-3 w-3" /> {inq.skuProfile}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">General Inquiry</span>
                      )}
                    </td>
                    <td className="p-4">
                      <select
                        value={inq.status || "Pending"}
                        onChange={(e) => handleUpdateStatus(targetId, e.target.value as any)}
                        className={`text-[10px] font-mono font-bold uppercase rounded-full px-3 py-1 border cursor-pointer focus:outline-none ${inq.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : inq.status === "Contacted"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-[#fff5eb] text-[#fe8220] border-[#fe8220]/30"
                          }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:border-slate-300 hover:bg-slate-100 transition shadow-2xs"
                        >
                          <span>Inspect</span>
                          <ChevronRight className="h-3 w-3" />
                        </button>

                        <button
                          onClick={() => handleDelete(targetId, inq.name)}
                          className="p-2 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer"
                          title="Delete Lead"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Lead Detail Drawer / Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-end p-4 sm:p-6 text-slate-900">
            {/* Sibling Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInquiry(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs z-0 cursor-pointer"
            />
            {/* Sibling Drawer Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-white border border-slate-200 rounded-[32px] h-full max-h-[92vh] shadow-2xl flex flex-col overflow-hidden z-10"
            >
              <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#fe8220]">
                    Lead Detail Inspection
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 font-display mt-0.5">
                    {selectedInquiry.name}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-2 rounded-full border border-slate-200 bg-white text-slate-500 hover:text-slate-900"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call {selectedInquiry.phone}</span>
                  </a>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-blue-50 border border-blue-200 p-3 text-xs font-bold text-blue-700 hover:bg-blue-100 transition"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email Lead</span>
                  </a>
                </div>

                {/* Details Breakdown */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-3 text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 font-semibold">Company Name</span>
                    <span className="font-bold text-slate-900">{selectedInquiry.company || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 font-semibold">Target Product SKU</span>
                    <span className="font-mono font-bold text-[#fe8220]">{selectedInquiry.skuProfile || "General Inquiry"}</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-500 font-semibold">Line Speed / Monthly Vol</span>
                    <span className="font-mono text-slate-900">{selectedInquiry.lineSpeed || "Standard"}</span>
                  </div>
                </div>

                {/* Message Body */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Customer Message & Specifications
                  </h4>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs font-medium text-slate-700 leading-relaxed min-h-[100px]">
                    {selectedInquiry.message || "No custom notes submitted with inquiry."}
                  </div>
                </div>

                {/* Pipeline Switcher */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Update Pipeline Status
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Pending", "Contacted", "Completed"] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateStatus(selectedInquiry._id || selectedInquiry.id || "", st)}
                        className={`py-2.5 rounded-full text-xs font-bold transition border ${selectedInquiry.status === st || (!selectedInquiry.status && st === "Pending")
                            ? "bg-[#120a3b] text-white border-[#120a3b] font-extrabold shadow-xs"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                          }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
