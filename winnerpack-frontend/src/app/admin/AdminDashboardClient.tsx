'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Inbox,
  Layers,
  Package,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { formatRelative } from '@/lib/admin/utils';

interface ProductRecord {
  id?: string;
  title?: string;
  status?: 'published' | 'draft' | 'archived';
}

interface InquiryRecord {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  company?: string;
  skuProfile?: string;
  status?: 'Pending' | 'Contacted' | 'Completed';
  createdAt?: string;
}

interface ArticleRecord {
  _id?: string;
  title?: string;
  date?: string;
}

interface CategoryRecord {
  id?: string;
  title?: string;
  subcategories?: unknown[];
}

interface DashboardData {
  products: ProductRecord[];
  inquiries: InquiryRecord[];
  articles: ArticleRecord[];
  categories: CategoryRecord[];
}

const endpointMap = [
  ['/api/products', 'products'],
  ['/api/inquiries', 'inquiries'],
  ['/api/articles', 'articles'],
  ['/api/categories', 'categories'],
] as const;

export default function AdminDashboardClient() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [syncedAt, setSyncedAt] = useState<Date | null>(null);

  const loadData = useCallback(async (refresh = false) => {
    refresh ? setRefreshing(true) : setLoading(true);
    setError('');

    try {
      const result = {} as DashboardData;
      await Promise.all(
        endpointMap.map(async ([path, key]) => {
          const response = await apiFetch(path, { cache: 'no-store' });
          if (!response.ok) throw new Error(`Could not load ${key}`);
          const records = await response.json();
          result[key] = Array.isArray(records) ? records : [];
        }),
      );
      setData(result);
      setSyncedAt(new Date());
    } catch (requestError: any) {
      setError(requestError?.message || 'The dashboard could not be refreshed.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const summary = useMemo(() => {
    const inquiries = data?.inquiries || [];
    const products = data?.products || [];
    const articles = data?.articles || [];
    const categories = data?.categories || [];
    const pending = inquiries.filter((item) => !item.status || item.status === 'Pending');
    const contacted = inquiries.filter((item) => item.status === 'Contacted');
    const completed = inquiries.filter((item) => item.status === 'Completed');
    const sevenDaysAgo = Date.now() - 7 * 86_400_000;
    const thisWeek = inquiries.filter(
      (item) => item.createdAt && new Date(item.createdAt).getTime() >= sevenDaysAgo,
    ).length;

    return {
      pending,
      contacted,
      completed,
      thisWeek,
      products: products.length,
      published: products.filter((item) => (item.status || 'published') === 'published').length,
      drafts: products.filter((item) => item.status === 'draft').length,
      articles: articles.length,
      categories: categories.length,
      recent: [...inquiries]
        .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
        .slice(0, 6),
    };
  }, [data]);

  if (loading && !data) {
    return (
      <div className="admin-v3-dashboard" aria-label="Loading dashboard">
        <div className="admin-skeleton h-28 w-full" />
        <div className="admin-v3-metric-grid">
          {[0, 1, 2, 3].map((item) => <div key={item} className="admin-skeleton h-32" />)}
        </div>
        <div className="admin-v3-dashboard-grid">
          <div className="admin-skeleton h-80" />
          <div className="admin-skeleton h-80" />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-v3-dashboard">
      <section className="admin-v3-welcome">
        <div>
          <p className="admin-v3-kicker">Business overview</p>
          <h2>{summary.pending.length > 0 ? `${summary.pending.length} inquiries need attention` : 'Everything is up to date'}</h2>
          <p>
            {summary.thisWeek} new {summary.thisWeek === 1 ? 'inquiry' : 'inquiries'} this week
            {syncedAt ? ` · Updated ${formatRelative(syncedAt)}` : ''}
          </p>
        </div>
        <div className="admin-v3-welcome-actions">
          <button
            type="button"
            className="admin-button"
            onClick={() => void loadData(true)}
            disabled={refreshing}
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            {refreshing ? 'Refreshing' : 'Refresh'}
          </button>
          <Link href="/admin/inquiries" className="admin-primary-button">
            Review inquiries <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {error && (
        <div className="admin-v3-alert" role="alert">
          <AlertCircle size={16} />
          <span>{error}</span>
          <button type="button" onClick={() => void loadData(true)}>Try again</button>
        </div>
      )}

      <section className="admin-v3-metric-grid" aria-label="Key metrics">
        <Link href="/admin/inquiries" className="admin-v3-metric is-priority">
          <span className="admin-v3-metric-icon"><Inbox size={18} /></span>
          <span className="admin-v3-metric-label">Pending inquiries</span>
          <strong>{summary.pending.length}</strong>
          <small>{summary.contacted.length} currently contacted</small>
        </Link>
        <Link href="/admin/products" className="admin-v3-metric">
          <span className="admin-v3-metric-icon"><Package size={18} /></span>
          <span className="admin-v3-metric-label">Products</span>
          <strong>{summary.products}</strong>
          <small>{summary.published} published · {summary.drafts} drafts</small>
        </Link>
        <Link href="/admin/blogs" className="admin-v3-metric">
          <span className="admin-v3-metric-icon"><BookOpen size={18} /></span>
          <span className="admin-v3-metric-label">Articles</span>
          <strong>{summary.articles}</strong>
          <small>Published website content</small>
        </Link>
        <Link href="/admin/categories" className="admin-v3-metric">
          <span className="admin-v3-metric-icon"><Layers size={18} /></span>
          <span className="admin-v3-metric-label">Categories</span>
          <strong>{summary.categories}</strong>
          <small>Catalog organization</small>
        </Link>
      </section>

      <div className="admin-v3-dashboard-grid">
        <section className="admin-v3-card admin-v3-inquiries-card">
          <header className="admin-v3-card-head">
            <div>
              <h3>Recent inquiries</h3>
              <p>Newest customer requests and their current status</p>
            </div>
            <Link href="/admin/inquiries">View all <ArrowRight size={13} /></Link>
          </header>

          {summary.recent.length === 0 ? (
            <div className="admin-v3-empty">
              <Inbox size={22} />
              <strong>No inquiries yet</strong>
              <p>New quote requests will appear here.</p>
            </div>
          ) : (
            <div className="admin-v3-table-wrap">
              <table className="admin-v3-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Interest</th>
                    <th>Status</th>
                    <th>Received</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.recent.map((lead, index) => {
                    const status = lead.status || 'Pending';
                    return (
                      <tr key={lead._id || lead.id || index}>
                        <td>
                          <span className="admin-v3-customer">
                            <span>{(lead.name || '?').trim().charAt(0).toUpperCase()}</span>
                            <span><strong>{lead.name || 'Unnamed inquiry'}</strong><small>{lead.company || lead.email || 'Direct inquiry'}</small></span>
                          </span>
                        </td>
                        <td>{lead.skuProfile || 'General enquiry'}</td>
                        <td><span className={`admin-v3-status ${status.toLowerCase()}`}>{status}</span></td>
                        <td>{formatRelative(lead.createdAt)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <aside className="admin-v3-side-stack">
          <section className="admin-v3-card">
            <header className="admin-v3-card-head">
              <div>
                <h3>Inquiry pipeline</h3>
                <p>Current sales follow-up</p>
              </div>
            </header>
            <div className="admin-v3-pipeline">
              <div><span><Clock3 size={15} /> Pending</span><strong>{summary.pending.length}</strong></div>
              <div><span><Inbox size={15} /> Contacted</span><strong>{summary.contacted.length}</strong></div>
              <div><span><CheckCircle2 size={15} /> Completed</span><strong>{summary.completed.length}</strong></div>
            </div>
          </section>

          <section className="admin-v3-card">
            <header className="admin-v3-card-head">
              <div>
                <h3>Quick actions</h3>
                <p>Create or update website content</p>
              </div>
            </header>
            <div className="admin-v3-quick-actions">
              <Link href="/admin/products/new"><span><Plus size={15} /></span><span><strong>Add product</strong><small>Create a new catalog item</small></span><ArrowRight size={14} /></Link>
              <Link href="/admin/blogs/new"><span><Plus size={15} /></span><span><strong>Write article</strong><small>Publish news or a guide</small></span><ArrowRight size={14} /></Link>
              <Link href="/admin/studio"><span><ExternalLink size={15} /></span><span><strong>Edit website</strong><small>Update page sections</small></span><ArrowRight size={14} /></Link>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
