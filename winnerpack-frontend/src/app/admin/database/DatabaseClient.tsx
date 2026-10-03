'use client';

import { useEffect, useState, useMemo } from 'react';
import {
  Database,
  Search,
  RefreshCw,
  Plus,
  Trash2,
  Edit,
  Download,
  Copy,
  Check,
  Code,
  Table as TableIcon,
  ChevronLeft,
  ChevronRight,
  Package,
  Inbox,
  FileText,
  Layers,
  Sparkles,
  Factory,
  ShieldCheck,
  Cpu,
  Handshake,
  Award,
  Building,
  AlertCircle,
  X,
} from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { notify } from '@/components/admin/AdminToaster';
import { copyToClipboard, downloadCsv } from '@/lib/admin/utils';

interface CollectionMeta {
  key: string;
  label: string;
  icon: string;
  description: string;
  count: number;
  lastUpdated: string | null;
}

interface OverviewData {
  status: string;
  dbName: string;
  host: string;
  readyState: string;
  totalCollections: number;
  totalDocuments: number;
  collections: CollectionMeta[];
}

const ICON_MAP: Record<string, any> = {
  Package,
  Inbox,
  FileText,
  Layers,
  Sparkles,
  Factory,
  ShieldCheck,
  Cpu,
  Handshake,
  Award,
  Building,
  Database,
};

export default function DatabaseClient() {
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [selectedCol, setSelectedCol] = useState<string>('products');
  const [documents, setDocuments] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loadingOverview, setLoadingOverview] = useState(true);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [viewMode, setViewMode] = useState<'table' | 'json'>('table');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState('');

  // Document Editor Modal State
  const [activeDoc, setActiveDoc] = useState<any | null>(null);
  const [isNewDoc, setIsNewDoc] = useState(false);
  const [editorTab, setEditorTab] = useState<'form' | 'json'>('form');
  const [rawJsonText, setRawJsonText] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [saving, setSaving] = useState(false);

  // 1. Fetch Overview & Metrics
  const fetchOverview = async () => {
    setLoadingOverview(true);
    setError('');
    try {
      const res = await apiFetch('/api/database/overview');
      if (!res.ok) throw new Error('Could not connect to database overview API.');
      const data: OverviewData = await res.json();
      setOverview(data);
    } catch (err: any) {
      setError(err.message || 'Database connection error.');
    } finally {
      setLoadingOverview(false);
    }
  };

  // 2. Fetch Documents for Selected Collection
  const fetchDocuments = async () => {
    setLoadingDocs(true);
    setError('');
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(pageSize),
        search: searchQuery,
      });
      const res = await apiFetch(`/api/database/${selectedCol}?${params.toString()}`);
      if (!res.ok) throw new Error(`Could not load collection '${selectedCol}'.`);
      const data = await res.json();
      setDocuments(data.documents || []);
      setTotalCount(data.totalCount || 0);
    } catch (err: any) {
      setError(err.message || `Failed to fetch documents for ${selectedCol}`);
      setDocuments([]);
      setTotalCount(0);
    } finally {
      setLoadingDocs(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [selectedCol, searchQuery]);

  useEffect(() => {
    fetchDocuments();
  }, [selectedCol, page, pageSize, searchQuery]);

  // Active Collection Definition
  const currentCollectionMeta = useMemo(() => {
    return overview?.collections.find((c) => c.key === selectedCol) || null;
  }, [overview, selectedCol]);

  // Derived visible columns for table view
  const visibleColumns = useMemo(() => {
    if (!documents.length) return ['_id', 'id', 'title', 'createdAt'];
    const keys = new Set<string>();
    documents.slice(0, 10).forEach((doc) => {
      Object.keys(doc).forEach((k) => {
        if (!['__v'].includes(k)) keys.add(k);
      });
    });
    // Priority order: title/name, id, status, category, other keys, timestamps
    const priority = ['title', 'name', 'id', 'category', 'status', 'email', 'phone', 'slug', 'key'];
    const sorted = Array.from(keys).sort((a, b) => {
      const ia = priority.indexOf(a);
      const ib = priority.indexOf(b);
      if (ia !== -1 && ib !== -1) return ia - ib;
      if (ia !== -1) return -1;
      if (ib !== -1) return 1;
      return a.localeCompare(b);
    });
    return sorted.slice(0, 8); // show up to 8 key columns in table view
  }, [documents]);

  // Copy helper
  const handleCopy = async (text: string, id: string) => {
    // Bug fix: an unhandled promise rejection meant a failed copy still lit up
    // the "copied" state. Report the true outcome instead.
    const ok = await copyToClipboard(text);
    if (!ok) {
      notify('Could not copy to clipboard', 'error', 'Your browser blocked clipboard access.');
      return;
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Open Document Modal (Edit)
  const handleOpenEdit = (doc: any) => {
    setActiveDoc(JSON.parse(JSON.stringify(doc)));
    setRawJsonText(JSON.stringify(doc, null, 2));
    setJsonError('');
    setIsNewDoc(false);
    setEditorTab('form');
  };

  // Open Document Modal (Create New)
  const handleOpenCreate = () => {
    const template: Record<string, any> = {
      id: `${selectedCol.slice(0, 4)}-${Date.now()}`,
      title: 'New Record',
    };
    if (selectedCol === 'products') {
      template.category = 'film-products';
      template.tag = 'Industrial Grade';
      template.blurb = 'Product description copy.';
      template.status = 'draft';
    }
    setActiveDoc(template);
    setRawJsonText(JSON.stringify(template, null, 2));
    setJsonError('');
    setIsNewDoc(true);
    setEditorTab('form');
  };

  // Save Document
  const handleSaveDocument = async () => {
    setSaving(true);
    setJsonError('');
    try {
      let payloadToSave = activeDoc;
      if (editorTab === 'json') {
        try {
          payloadToSave = JSON.parse(rawJsonText);
        } catch (e: any) {
          setJsonError(`JSON Syntax Error: ${e.message}`);
          setSaving(false);
          return;
        }
      }

      if (isNewDoc) {
        const res = await apiFetch(`/api/database/${selectedCol}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payloadToSave),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Failed to create document.');
        }
      } else {
        const docId = payloadToSave._id || payloadToSave.id;
        const res = await apiFetch(`/api/database/${selectedCol}/${docId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payloadToSave),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Failed to update document.');
        }
      }

      setActiveDoc(null);
      await fetchDocuments();
      await fetchOverview();
    } catch (err: any) {
      setJsonError(err.message || 'Save operation failed.');
    } finally {
      setSaving(false);
    }
  };

  // Delete Document
  const handleDeleteDocument = async (docId: string, title?: string) => {
    if (!confirm(`Are you sure you want to permanently delete document "${title || docId}" from ${selectedCol}?`)) {
      return;
    }
    try {
      const res = await apiFetch(`/api/database/${selectedCol}/${docId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to delete document.');
      }
      if (activeDoc && (activeDoc._id === docId || activeDoc.id === docId)) {
        setActiveDoc(null);
      }
      await fetchDocuments();
      await fetchOverview();
      notify('Document deleted', 'success', `${selectedCol} · ${title || docId}`.slice(0, 120));
    } catch (err: any) {
      notify('Delete failed', 'error', err.message || 'Delete operation failed.');
    }
  };

  // Export to JSON
  const handleExportJSON = () => {
    if (!documents.length) {
      notify('Nothing to export', 'info', 'This collection page has no documents loaded.');
      return;
    }
    const blob = new Blob([JSON.stringify(documents, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `winnerpack_${selectedCol}_export_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    notify('JSON exported', 'success', `${documents.length} documents downloaded.`);
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (!documents.length) {
      notify('Nothing to export', 'info', 'This collection page has no documents loaded.');
      return;
    }
    const rows = documents.map((row) =>
      visibleColumns.map((column) => row[column]),
    );
    downloadCsv(
      `winnerpack_${selectedCol}_export_${new Date().toISOString().slice(0, 10)}.csv`,
      visibleColumns,
      rows,
    );
    notify('CSV exported', 'success', `${rows.length} documents downloaded.`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
      {/* ─── 1. TOP HEADER & METRIC BANNER ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 ring-1 ring-indigo-200 font-mono">
              <Database className="h-3 w-3 text-indigo-600" />
              <span>MongoDB Enterprise Suite</span>
            </span>
            <span className="text-xs text-slate-500 font-medium font-mono">
              {overview?.readyState || 'Checking Connection…'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
            Database Management & Schema Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Real-time data inspector, document editor, JSON schema validator, and live CRUD operations across all 12 WinnerPack MongoDB collections.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              fetchOverview();
              fetchDocuments();
            }}
            disabled={loadingOverview || loadingDocs}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-slate-500 ${loadingOverview ? 'animate-spin' : ''}`} />
            <span>Sync DB</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#fe8220] px-4 py-2 text-xs font-bold text-slate-950 shadow-xs hover:bg-[#ffa048] active:scale-98 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Insert Record</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center justify-between rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-xs font-semibold text-rose-800">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
          <button onClick={() => { fetchOverview(); fetchDocuments(); }} className="underline hover:text-rose-950">
            Retry
          </button>
        </div>
      )}

      {/* ─── 2. DATABASE SYSTEM STATS CARDS ────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Connected Database
          </span>
          <div className="mt-1.5 text-lg font-bold text-slate-900 font-mono truncate">
            {overview?.dbName || 'winnerpack'}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Host: {overview?.host || 'localhost'}
          </span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Total Collections
          </span>
          <div className="mt-1.5 text-lg font-bold text-slate-900">
            {overview?.totalCollections || 12} Schemas
          </div>
          <span className="text-[11px] text-slate-500">Mongoose strict models active</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Total Records
          </span>
          <div className="mt-1.5 text-lg font-bold text-slate-900 font-mono">
            {overview?.totalDocuments || 0} Documents
          </div>
          <span className="text-[11px] text-slate-500">Indexed & query optimized</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Active Collection
          </span>
          <div className="mt-1.5 text-lg font-bold text-[#fe8220] truncate">
            {currentCollectionMeta?.label || selectedCol}
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            {totalCount} matching records
          </span>
        </div>
      </div>

      {/* ─── 3. HORIZONTAL COLLECTION SELECTOR TABS ─────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono px-2 mb-2">
          Select Collection
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {overview?.collections.map((col) => {
            const Icon = ICON_MAP[col.icon] || Database;
            const active = selectedCol === col.key;
            return (
              <button
                key={col.key}
                type="button"
                onClick={() => setSelectedCol(col.key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  active
                    ? 'bg-[#120a3b] text-white border-[#120a3b] shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/70'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${active ? 'text-[#fe8220]' : 'text-slate-500'}`} />
                <span>{col.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                    active ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-600'
                  }`}
                >
                  {col.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── 4. TOOLBAR & SEARCH BAR ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder={`Search ${currentCollectionMeta?.label || selectedCol} by name, title, id, email…`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fe8220]/40 focus:border-[#fe8220] transition"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/70">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <TableIcon className="h-3.5 w-3.5" />
              <span>Table</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('json')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                viewMode === 'json' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Code className="h-3.5 w-3.5" />
              <span>JSON</span>
            </button>
          </div>

          {/* Export Buttons */}
          <button
            type="button"
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition"
            title="Download JSON file"
          >
            <Download className="h-3 w-3 text-slate-500" />
            <span>JSON</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition"
            title="Download CSV file"
          >
            <Download className="h-3 w-3 text-slate-500" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* ─── 5. DATA GRID VIEW (TABLE OR RAW JSON) ─────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {/* Loading Indicator */}
        {loadingDocs ? (
          <div className="py-24 text-center">
            <RefreshCw className="h-6 w-6 animate-spin text-[#fe8220] mx-auto mb-2" />
            <p className="text-xs text-slate-500 font-medium">Querying MongoDB documents…</p>
          </div>
        ) : !documents.length ? (
          <div className="py-24 text-center">
            <Database className="h-8 w-8 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No documents found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No records in `{selectedCol}` matched your search criteria or the collection is currently empty.
            </p>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#fe8220] text-xs font-bold text-slate-950"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Insert First Record</span>
            </button>
          </div>
        ) : viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  {visibleColumns.map((col) => (
                    <th key={col} className="py-3 px-4">
                      {col}
                    </th>
                  ))}
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((doc, idx) => {
                  const docId = doc._id || doc.id || String(idx);
                  return (
                    <tr key={docId} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 text-center text-slate-400 font-mono text-[11px]">
                        {(page - 1) * pageSize + idx + 1}
                      </td>

                      {visibleColumns.map((col) => {
                        const val = doc[col];
                        return (
                          <td key={col} className="py-3 px-4 max-w-xs truncate">
                            {/* Formatter for Images */}
                            {typeof val === 'string' && /\.(jpg|jpeg|png|webp|avif|svg)/i.test(val) ? (
                              <div className="flex items-center gap-2">
                                <img
                                  src={val}
                                  alt="preview"
                                  className="h-6 w-6 rounded object-cover border border-slate-200 bg-slate-100"
                                />
                                <span className="font-mono text-[10px] text-slate-500 truncate">{val}</span>
                              </div>
                            ) : typeof val === 'object' && val !== null ? (
                              <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-mono text-slate-600">
                                {Array.isArray(val) ? `[${val.length} items]` : `{Object}`}
                              </span>
                            ) : col === 'status' ? (
                              <span
                                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                  val === 'published' || val === 'Completed'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : val === 'Contacted' || val === 'draft'
                                    ? 'bg-sky-50 text-sky-700 border border-sky-200'
                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${
                                    val === 'published' || val === 'Completed'
                                      ? 'bg-emerald-500'
                                      : val === 'Contacted' || val === 'draft'
                                      ? 'bg-sky-500'
                                      : 'bg-amber-500'
                                  }`}
                                />
                                {String(val)}
                              </span>
                            ) : col === 'id' || col === '_id' ? (
                              <span className="font-mono text-[11px] text-indigo-700 font-semibold">
                                {String(val)}
                              </span>
                            ) : (
                              <span className="text-slate-800 font-medium">
                                {String(val === undefined || val === null ? '—' : val)}
                              </span>
                            )}
                          </td>
                        );
                      })}

                      {/* Row Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(doc)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                            title="Edit Document"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCopy(JSON.stringify(doc, null, 2), docId)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                            title="Copy JSON"
                          >
                            {copiedId === docId ? (
                              <Check className="h-3.5 w-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteDocument(doc._id || doc.id, doc.title || doc.name)}
                            className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition"
                            title="Delete Document"
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
        ) : (
          /* JSON Grid View */
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900">
            {documents.map((doc, idx) => {
              const docId = doc._id || doc.id || String(idx);
              return (
                <div key={docId} className="bg-slate-950/80 rounded-xl p-4 border border-white/10 font-mono text-[11px] text-slate-300 relative group">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                    <span className="text-[#fe8220] font-bold">#{doc.id || doc._id}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(doc)}
                        className="text-xs text-sky-400 hover:text-white"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopy(JSON.stringify(doc, null, 2), docId)}
                        className="text-xs text-gray-400 hover:text-white"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  <pre className="overflow-x-auto max-h-56 scrollbar-none text-[10px] text-slate-400">
                    {JSON.stringify(doc, null, 2)}
                  </pre>
                </div>
              );
            })}
          </div>
        )}

        {/* ─── 6. PAGINATION CONTROLS ────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-3.5">
          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-900">{documents.length ? (page - 1) * pageSize + 1 : 0}</span> to{' '}
            <span className="font-bold text-slate-900">{Math.min(page * pageSize, totalCount)}</span> of{' '}
            <span className="font-bold text-slate-900">{totalCount}</span> records in{' '}
            <code className="text-indigo-600 font-bold font-mono">{selectedCol}</code>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="border border-slate-200 rounded-lg px-2 py-1 text-xs bg-white text-slate-700"
            >
              <option value={10}>10 / page</option>
              <option value={25}>25 / page</option>
              <option value={50}>50 / page</option>
              <option value={100}>100 / page</option>
            </select>

            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>

            <span className="text-xs font-mono font-bold text-slate-700 px-1">
              Page {page} of {Math.ceil(totalCount / pageSize) || 1}
            </span>

            <button
              type="button"
              disabled={page * pageSize >= totalCount}
              onClick={() => setPage((p) => p + 1)}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ─── 7. DOCUMENT EDITOR MODAL / DRAWER ──────────────────────────────── */}
      {activeDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50/70">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#fe8220] font-mono">
                  {isNewDoc ? 'Create Document' : 'Document Editor'} · {selectedCol}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {activeDoc.title || activeDoc.name || activeDoc.id || 'Untitled Record'}
                </h3>
              </div>

              {/* View Selector Tab */}
              <div className="flex items-center gap-2">
                <div className="flex bg-slate-200/80 p-0.5 rounded-lg text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => {
                      setEditorTab('form');
                      try {
                        setActiveDoc(JSON.parse(rawJsonText));
                      } catch {}
                    }}
                    className={`px-3 py-1 rounded-md transition ${
                      editorTab === 'form' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Form View
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditorTab('json');
                      setRawJsonText(JSON.stringify(activeDoc, null, 2));
                    }}
                    className={`px-3 py-1 rounded-md transition ${
                      editorTab === 'json' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Raw JSON
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveDoc(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {jsonError && (
              <div className="bg-rose-50 border-b border-rose-200 px-6 py-2.5 text-xs font-semibold text-rose-800 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{jsonError}</span>
              </div>
            )}

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {editorTab === 'form' ? (
                <div className="space-y-4">
                  {Object.entries(activeDoc)
                    .filter(([key]) => !['_id', '__v', 'createdAt', 'updatedAt'].includes(key))
                    .map(([key, val]) => {
                      const isLong = typeof val === 'string' && val.length > 80;
                      const isObj = typeof val === 'object' && val !== null;
                      return (
                        <div key={key} className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 capitalize flex items-center justify-between">
                            <span>{key}</span>
                            <span className="text-[10px] font-mono text-slate-400 font-normal">
                              {Array.isArray(val) ? 'Array' : typeof val}
                            </span>
                          </label>

                          {isObj ? (
                            <textarea
                              rows={4}
                              value={JSON.stringify(val, null, 2)}
                              onChange={(e) => {
                                try {
                                  const parsed = JSON.parse(e.target.value);
                                  setActiveDoc({ ...activeDoc, [key]: parsed });
                                } catch {}
                              }}
                              className="w-full text-xs font-mono p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fe8220]/40"
                            />
                          ) : isLong ? (
                            <textarea
                              rows={3}
                              value={String(val || '')}
                              onChange={(e) => setActiveDoc({ ...activeDoc, [key]: e.target.value })}
                              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fe8220]/40"
                            />
                          ) : (
                            <input
                              type={typeof val === 'number' ? 'number' : 'text'}
                              value={val === null || val === undefined ? '' : String(val)}
                              onChange={(e) =>
                                setActiveDoc({
                                  ...activeDoc,
                                  [key]: typeof val === 'number' ? Number(e.target.value) : e.target.value,
                                })
                              }
                              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fe8220]/40"
                            />
                          )}
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>Direct JSON Schema Editor:</span>
                    <button
                      type="button"
                      onClick={() => {
                        try {
                          const parsed = JSON.parse(rawJsonText);
                          setRawJsonText(JSON.stringify(parsed, null, 2));
                          setJsonError('');
                        } catch (e: any) {
                          setJsonError(`Cannot format: ${e.message}`);
                        }
                      }}
                      className="text-[#fe8220] hover:underline"
                    >
                      Format / Beautify
                    </button>
                  </div>
                  <textarea
                    rows={18}
                    value={rawJsonText}
                    onChange={(e) => setRawJsonText(e.target.value)}
                    className="w-full p-4 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#fe8220]"
                    spellCheck={false}
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-200 px-6 py-3.5 bg-slate-50 flex items-center justify-between">
              <div>
                {!isNewDoc && (
                  <button
                    type="button"
                    onClick={() => handleDeleteDocument(activeDoc._id || activeDoc.id, activeDoc.title)}
                    className="text-xs font-bold text-rose-600 hover:text-rose-800"
                  >
                    Delete Record
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveDoc(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={handleSaveDocument}
                  className="px-5 py-2 rounded-xl bg-[#fe8220] text-xs font-bold text-slate-950 hover:bg-[#ffa048] disabled:opacity-50"
                >
                  {saving ? 'Saving to MongoDB…' : isNewDoc ? 'Insert Document' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
