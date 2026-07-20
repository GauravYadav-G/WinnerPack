"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  FileText,
  LogOut,
  ChevronRight,
  Package,
  Wrench,
  Image as ImageIcon,
  Info,
  CheckCircle,
  Users,
  Route
} from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    // Check auth status
    fetch("/api/admin/auth")
      .then((res) => {
        if (res.ok) {
          if (isLoginPage) {
            router.push("/admin");
          }
        } else {
          if (!isLoginPage) {
            router.push("/admin/login");
          }
        }
        setCheckingAuth(false);
      })
      .catch((err) => {
        console.error(err);
        setCheckingAuth(false);
        if (!isLoginPage) {
          router.push("/admin/login");
        }
      });
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
    } catch (err) {
      console.error(err);
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-xs font-mono uppercase tracking-[0.2em] text-indigo-600">
        <span className="animate-pulse">Authorizing operations...</span>
      </div>
    );
  }

  // Login page should not render sidebar layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Hero & Slides", href: "/admin/hero", icon: ImageIcon },
    { label: "About & Stats", href: "/admin/about", icon: Info },
    { label: "Six Reasons", href: "/admin/reasons", icon: CheckCircle },
    { label: "Partners & Industries", href: "/admin/partners", icon: Users },
    { label: "Buyer Journey", href: "/admin/journey", icon: Route },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Machines", href: "/admin/machines", icon: Wrench },
    { label: "Inquiries", href: "/admin/inquiries", icon: Inbox },
    { label: "Blogs", href: "/admin/blogs", icon: FileText },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bone)] text-[var(--color-text)]">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-[var(--color-ink-2)] flex flex-col flex-shrink-0 text-slate-300">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <img src="/logo.png" alt="Winner Pack Logo" className="h-8 w-auto object-contain" />
          <div>
            <div className="font-display text-base font-bold tracking-tight text-white">
              Admin Control
            </div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-amber)]">
              Operations Center
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-white/5 text-[var(--color-amber)] border-l-2 border-[var(--color-amber)]"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className={`h-4 w-4 transition-transform ${isActive ? "opacity-100" : "opacity-0"}`} />
              </Link>
            );
          })}
        </nav>

        {/* User Footer / Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-bold text-red-400 hover:bg-red-950/20 hover:text-red-300 transition"
          >
            <LogOut className="h-4 w-4" />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 border-b border-slate-200 bg-white/70 backdrop-blur px-8 flex items-center justify-between">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
            System Live status: <span className="text-emerald-600 font-bold">Online</span>
          </div>
          <a
            href="/"
            target="_blank"
            className="text-sm font-semibold text-[var(--color-amber)] hover:text-[var(--color-amber-dark)] transition"
          >
            Open Live Site &rarr;
          </a>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
