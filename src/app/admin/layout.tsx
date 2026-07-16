"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Inbox, FileText, LogOut, ChevronRight, Package, Wrench } from "lucide-react";
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
      <div className="flex min-h-screen items-center justify-center bg-[#0F1117] text-xs font-mono uppercase tracking-[0.2em] text-cyan-400">
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
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Machines", href: "/admin/machines", icon: Wrench },
    { label: "Inquiries", href: "/admin/inquiries", icon: Inbox },
    { label: "Articles", href: "/admin/articles", icon: FileText },
  ];

  return (
    <div className="flex min-h-screen bg-[#0F1117] text-white">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#161923] flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-cyan-500 text-black shadow-sm font-bold">
            WP
          </div>
          <div>
            <div className="font-sans text-sm font-bold tracking-tight text-white">
              Operations Control
            </div>
            <div className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-cyan-400">
              Admin Shield
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className={`h-3 w-3 transition-transform ${isActive ? "opacity-100" : "opacity-0"}`} />
              </Link>
            );
          })}
        </nav>

        {/* User Footer / Logout */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
          >
            <LogOut className="h-4 w-4" />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 border-b border-white/5 bg-[#161923]/50 backdrop-blur px-8 flex items-center justify-between">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-500">
            System Live status: <span className="text-emerald-500">Online</span>
          </div>
          <a
            href="/"
            target="_blank"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition"
          >
            Open Live Site →
          </a>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
