'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronDown,
  ExternalLink,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  X,
} from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { adminNavGroups, isNavItemActive, resolveRouteMeta } from '@/lib/admin/nav';
import { AdminToaster } from '@/components/admin/AdminToaster';
import CommandPalette, { pushRecent } from '@/components/admin/CommandPalette';
import './admin.css';

const SIDEBAR_KEY = 'winnerpack.admin.sidebar';
const INQUIRY_POLL_MS = 60_000;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const authCheckedRef = useRef(false);

  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [pendingInquiries, setPendingInquiries] = useState(0);
  const [error, setError] = useState('');

  const isLogin = pathname === '/admin/login';
  const routeMeta = useMemo(() => resolveRouteMeta(pathname), [pathname]);

  useEffect(() => {
    if (isLogin) {
      authCheckedRef.current = false;
      setAuthorized(false);
      setChecking(false);
      return;
    }
    if (authCheckedRef.current) return;
    authCheckedRef.current = true;
    setChecking(true);

    let active = true;
    apiFetch('/api/admin/auth', { cache: 'no-store' })
      .then((response) => {
        if (!active) return;
        setAuthorized(response.ok);
        setChecking(false);
        if (!response.ok) router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
      })
      .catch(() => {
        if (!active) return;
        setAuthorized(false);
        setChecking(false);
        router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
      });
    return () => {
      active = false;
    };
    // The shell persists between admin routes; authentication only needs to run on entry.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  useEffect(() => {
    try {
      setCollapsed(window.localStorage.getItem(SIDEBAR_KEY) === 'rail');
    } catch {
      /* local preferences are optional */
    }
  }, []);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((current) => {
      const next = !current;
      try {
        window.localStorage.setItem(SIDEBAR_KEY, next ? 'rail' : 'full');
      } catch {
        /* local preferences are optional */
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (!authorized || isLogin) return;
    let timeout: ReturnType<typeof setTimeout>;
    const reset = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setAuthorized(false);
        void apiFetch('/api/admin/auth', { method: 'DELETE' });
        router.replace('/admin/login?reason=timeout');
      }, 30 * 60 * 1000);
    };
    const events = ['pointerdown', 'keydown', 'scroll'];
    reset();
    events.forEach((event) => window.addEventListener(event, reset));
    return () => {
      clearTimeout(timeout);
      events.forEach((event) => window.removeEventListener(event, reset));
    };
  }, [authorized, isLogin, router]);

  const loadPending = useCallback(async () => {
    try {
      const response = await apiFetch('/api/inquiries', { cache: 'no-store' });
      if (response.status === 401) {
        setAuthorized(false);
        router.replace('/admin/login?reason=expired');
        return;
      }
      if (!response.ok) return;
      const records = await response.json();
      if (Array.isArray(records)) {
        setPendingInquiries(records.filter((item) => !item.status || item.status === 'Pending').length);
      }
    } catch {
      /* preserve the last known count during a temporary network error */
    }
  }, [router]);

  useEffect(() => {
    if (!authorized || isLogin) return;
    const refresh = () => {
      if (document.visibilityState === 'visible') void loadPending();
    };
    refresh();
    const interval = window.setInterval(refresh, INQUIRY_POLL_MS);
    window.addEventListener('focus', refresh);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('focus', refresh);
    };
  }, [authorized, isLogin, loadPending]);

  useEffect(() => {
    if (authorized && !isLogin) pushRecent(pathname);
    setMobileMenuOpen(false);
    setAccountOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.querySelector<HTMLElement>('.admin-sidebar')?.scrollTo({ top: 0, behavior: 'auto' });
  }, [authorized, isLogin, pathname]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((current) => !current);
      }
      if (event.key === 'Escape') {
        setAccountOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (!accountOpen) return;
    const close = (event: MouseEvent) => {
      if (!accountRef.current?.contains(event.target as Node)) setAccountOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [accountOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileMenuOpen]);

  async function logout() {
    try {
      const response = await apiFetch('/api/admin/auth', { method: 'DELETE' });
      if (!response.ok) throw new Error('Could not sign out');
      setAuthorized(false);
      router.replace('/admin/login');
    } catch {
      setError('Could not sign out. Please try again.');
    }
  }

  if (isLogin) {
    return (
      <div className="admin-shell">
        {children}
        <AdminToaster />
      </div>
    );
  }

  if (checking || !authorized) {
    return (
      <div className="admin-shell flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="admin-spinner" />
          <p role="status" className="admin-muted text-xs">Checking your session…</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`admin-shell admin-v3-shell ${collapsed ? 'admin-shell-rail' : ''}`}>
      <a href="#admin-content" className="sr-only focus:not-sr-only">Skip to content</a>

      {mobileMenuOpen && (
        <button className="admin-overlay" aria-label="Close navigation" onClick={() => setMobileMenuOpen(false)} />
      )}

      <aside className={`admin-sidebar admin-v3-sidebar ${mobileMenuOpen ? 'open' : ''}`} aria-label="Admin navigation">
        <button
          className="admin-mobile-close"
          aria-label="Close navigation"
          onClick={() => {
            setMobileMenuOpen(false);
            menuButtonRef.current?.focus();
          }}
        >
          <X size={18} />
        </button>

        <div className="admin-brand-row admin-v3-brand-row">
          <Link href="/admin" className="admin-brand" title="Winner Pack admin">
            <img src="/logo.webp" alt="" />
            <div>
              <span>Winner Pack</span>
              <small>Admin Console</small>
            </div>
          </Link>
          <button
            type="button"
            className="admin-rail-toggle"
            onClick={toggleCollapsed}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-pressed={collapsed}
          >
            {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>
        </div>

        <nav className="admin-nav-body admin-v3-nav">
          {adminNavGroups.map((group) => (
            <div className="admin-nav-group" key={group.id}>
              <div className="admin-nav-heading"><span>{group.label}</span></div>
              {group.items.map((item) => {
                const active = isNavItemActive(pathname, item);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="admin-nav-link"
                    aria-current={active ? 'page' : undefined}
                    title={collapsed ? item.label : item.description}
                  >
                    <span className="admin-nav-link-main">
                      <item.icon size={17} />
                      <span>{item.label}</span>
                    </span>
                    {item.badgeKey === 'inquiries' && pendingInquiries > 0 && (
                      <span className="admin-nav-badge warning" aria-label={`${pendingInquiries} pending inquiries`}>
                        {pendingInquiries > 99 ? '99+' : pendingInquiries}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="admin-sidebar-footer admin-v3-sidebar-footer">
          <a href="/" target="_blank" rel="noreferrer" className="admin-nav-link" title="Open live website">
            <span className="admin-nav-link-main">
              <ExternalLink size={16} />
              <span>View website</span>
            </span>
          </a>
          <div className="admin-v3-environment">
            <span className="admin-status-dot-green" />
            <span>Website connected</span>
          </div>
        </div>
      </aside>

      <div className="admin-main admin-v3-main">
        <header className="admin-topbar admin-v3-topbar">
          <div className="admin-topbar-left admin-v3-page-heading">
            <button
              ref={menuButtonRef}
              className="admin-menu-button"
              aria-label="Open navigation"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div>
              <div className="admin-v3-eyebrow">{routeMeta.group}</div>
              <h1>{routeMeta.label}</h1>
            </div>
          </div>

          <div className="admin-topbar-right">
            <button type="button" className="admin-search-trigger" onClick={() => setPaletteOpen(true)}>
              <Search size={15} />
              <span className="admin-search-label">Search admin</span>
              <kbd className="admin-kbd admin-kbd-desktop">⌘K</kbd>
            </button>

            <a href="/" target="_blank" rel="noreferrer" className="admin-v3-view-site">
              <ExternalLink size={14} />
              <span>View site</span>
            </a>

            <div className="admin-menu-anchor" ref={accountRef}>
              <button
                type="button"
                className="admin-account-button admin-v3-account"
                aria-expanded={accountOpen}
                aria-label="Account menu"
                onClick={() => setAccountOpen((current) => !current)}
              >
                <span className="admin-avatar">WP</span>
                <span className="admin-account-copy admin-hide-mobile">
                  <strong>Administrator</strong>
                  <span>Content manager</span>
                </span>
                <ChevronDown size={12} className="admin-hide-mobile" />
              </button>

              {accountOpen && (
                <div className="admin-dropdown w-64 admin-dropdown-right" role="menu">
                  <div className="admin-dropdown-head">
                    <div>
                      <strong>Winner Pack</strong>
                      <span className="admin-dropdown-sub">Administrator account</span>
                    </div>
                  </div>
                  <button type="button" className="admin-dropdown-foot danger" onClick={() => void logout()}>
                    <LogOut size={14} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main id="admin-content" className="admin-content admin-v3-content">
          {error && <p role="alert" className="admin-notice error">{error}</p>}
          {children}
        </main>
      </div>

      <nav className="admin-bottom-bar" aria-label="Quick navigation">
        <Link href="/admin" className={pathname === '/admin' ? 'is-active' : ''}>
          <LayoutDashboard size={18} /><span>Overview</span>
        </Link>
        <Link href="/admin/inquiries" className={pathname.startsWith('/admin/inquiries') ? 'is-active' : ''}>
          <span className="admin-bottom-icon"><Inbox size={18} />{pendingInquiries > 0 && <span className="admin-bottom-dot" />}</span>
          <span>Inquiries</span>
        </Link>
        <Link href="/admin/products" className={pathname.startsWith('/admin/products') ? 'is-active' : ''}>
          <Package size={18} /><span>Products</span>
        </Link>
        <button type="button" onClick={() => setPaletteOpen(true)} aria-label="Search admin">
          <Search size={18} /><span>Search</span>
        </button>
      </nav>

      <AdminToaster />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSignOut={() => void logout()}
        pendingInquiries={pendingInquiries}
      />
    </div>
  );
}
