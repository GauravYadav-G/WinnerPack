"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  FileText,
  LogOut,
  Package,
  Image as ImageIcon,
  Info,
  CheckCircle,
  Users,
  Route,
  ExternalLink,
  Sliders,
  Compass,
  MapPin,
  Plus,
  RefreshCw,
  Clapperboard
} from "lucide-react";
import Link from "next/link";
import AdminBackgroundVanta from "@/components/AdminBackgroundVanta";
import OptimizedImage from '@/components/OptimizedImage';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    // Check auth status
    apiFetch("/api/admin/auth")
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

  // Inactivity Auto-Logout (15 minutes)
  useEffect(() => {
    if (isLoginPage) return;

    const INACTIVITY_TIMEOUT = 15 * 60 * 1000;
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT);
    };

    const logoutDueToInactivity = async () => {
      console.warn("Auto-logging out due to inactivity");
      try {
        await apiFetch("/api/admin/auth", { method: "DELETE" });
        router.push("/admin/login");
        alert("You have been logged out due to inactivity.");
      } catch (err) {
        console.error("Auto-logout failed:", err);
      }
    };

    const activityEvents = ["mousemove", "keydown", "click", "scroll"];
    resetTimer();

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    return () => {
      clearTimeout(timeoutId);
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await apiFetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSyncDB = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      window.location.reload();
    }, 600);
  };

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f7f4] text-slate-900 font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-14 w-14 flex items-center justify-center rounded-2xl bg-[#120a3b] shadow-xl p-2">
            <OptimizedImage
  src={"/logo.png"}
  alt="Winner Pack Logo"
  className="h-full w-auto object-contain animate-pulse"
/>
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-extrabold tracking-wide text-[#120a3b] font-display">Winner Pack Operations Portal</p>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#fe8220]">Authenticating Session...</p>
          </div>
        </div>
      </div>
    );
  }

  // Login page should not render sidebar layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  const iconNavItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Product Catalog", href: "/admin/products", icon: Package },
    { label: "Quote Inquiries", href: "/admin/inquiries", icon: Inbox },
    { label: "Hero Banners", href: "/admin/hero", icon: ImageIcon },
    { label: "Gallery Showcase", href: "/admin/gallery", icon: Sliders },
    { label: "Industry Verticals", href: "/admin/industries", icon: Compass },
    { label: "Engineered Solutions", href: "/admin/journey", icon: Route },
    { label: "Industrial Action", href: "/admin/industrial-action", icon: Clapperboard },
    { label: "Blog & News", href: "/admin/blogs", icon: FileText },
    { label: "Plant & Footer Info", href: "/admin/footer", icon: MapPin },
    { label: "About & Stats", href: "/admin/about", icon: Info },
    { label: "Partners & Logos", href: "/admin/partners", icon: Users },
    { label: "Six Reasons (USP)", href: "/admin/reasons", icon: CheckCircle },
  ];

  const pillTabs = [
    { label: "Overview", href: "/admin" },
    { label: "Product Catalog", href: "/admin/products" },
    { label: "Quote Inquiries", href: "/admin/inquiries" },
    { label: "Hero Banners", href: "/admin/hero" },
    { label: "Gallery Showcase", href: "/admin/gallery" },
    { label: "Industry Verticals", href: "/admin/industries" },
    { label: "Engineered Solutions", href: "/admin/journey" },
    { label: "Industrial Action", href: "/admin/industrial-action" },
    { label: "Blog & News", href: "/admin/blogs" },
    { label: "Footer & Plant Info", href: "/admin/footer" },
    { label: "About & Stats", href: "/admin/about" },
    { label: "Partners & Logos", href: "/admin/partners" },
    { label: "Six Reasons", href: "/admin/reasons" },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#ffebeb] font-sans text-[#0F1721] selection:bg-[#fe8220] selection:text-white relative">

      {/* ── FIXED INTERACTIVE VANTA GLOBE BACKGROUND ── */}
      <AdminBackgroundVanta />

      {/* Left Official Brand Royal Ink Sidebar (Floating with curves) */}
      <aside className="w-20 my-4 ml-4 bg-[#120a3b]/95 backdrop-blur-xs flex flex-col items-center justify-between py-6 px-3 shrink-0 rounded-3xl border border-indigo-900/40 text-white z-40 no-scrollbar shadow-2xl">

        {/* Top Brand Logo Badge */}
        <div className="flex flex-col items-center gap-6">
          <Link
            href="/admin"
            className="h-13 w-13 rounded-2xl bg-white p-2 shadow-lg flex items-center justify-center hover:scale-105 transition-transform group"
            title="Winner Pack Operations Dashboard"
          >
            <OptimizedImage
  src={"/logo.png"}
  alt="Winner Pack Logo"
  className="h-full w-auto object-contain"
/>
          </Link>

          {/* Vertical Stack of Icon Navigation Buttons */}
          <nav className="flex flex-col items-center gap-2 overflow-y-auto no-scrollbar max-h-[calc(100vh-220px)]">
            {iconNavItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  title={item.label}
                  className={`relative p-3 rounded-2xl transition duration-200 group ${isActive
                      ? "bg-[#fe8220] text-white shadow-lg shadow-orange-500/30 font-bold scale-105"
                      : "text-indigo-200/80 hover:bg-white/10 hover:text-white"
                    }`}
                >
                  <Icon className="h-5 w-5" />

                  {/* Tooltip on hover */}
                  <span className="absolute left-16 top-1/2 -translate-y-1/2 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-[#120a3b] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-2xl border border-indigo-700">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Logout */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleLogout}
            className="p-3 rounded-2xl text-red-400 hover:bg-red-950/50 hover:text-red-300 transition cursor-pointer"
            title="Logout Session"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </aside>

      {/* Main Content Workspace Panel (Floating with rounded-3xl curves) */}
      <div className="admin-workspace-content flex-1 flex flex-col min-w-0 h-[calc(100vh-32px)] my-4 mx-4 bg-[#f8f7f4]/95 backdrop-blur-xs rounded-3xl border border-[#e5dfd2]/80 overflow-hidden relative shadow-2xl z-10 no-scrollbar">

        {/* MERGED SINGLE TOP EXECUTIVE HEADER */}
        <header className="px-8 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shrink-0 border-b border-[#e5dfd2]/80 bg-white/95 backdrop-blur-xs shadow-xs relative z-10">
          <div className="flex items-center gap-4">
            <OptimizedImage
  src={"/logo.png"}
  alt="Winner Pack Logo"
  className="h-11 w-auto object-contain shrink-0"
/>
            <div>
              <h1 className="text-2xl font-black tracking-tight font-display text-[#120a3b]">
                Winner Pack
              </h1>
              <p className="text-xs text-[#5A6473] font-medium mt-0.5">
                Real-time Management for Industrial Packaging SKUs & RFQ Customer Leads
              </p>
            </div>
          </div>

          {/* Header Right Action Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleSyncDB}
              disabled={syncing}
              className="flex items-center gap-2 rounded-2xl border border-[#e5dfd2] bg-[#f8f7f4] px-4 py-2.5 text-xs font-extrabold text-[#120a3b] hover:bg-[#fff5eb] hover:border-[#fe8220] transition cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 text-[#fe8220] ${syncing ? "animate-spin" : ""}`} />
              <span>Sync Live DB</span>
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-2xl bg-white border border-[#e5dfd2] flex items-center justify-center text-[#120a3b] hover:bg-[#fff5eb] hover:text-[#fe8220] transition shadow-2xs"
              title="Open Public Site"
            >
              <ExternalLink className="h-4.5 w-4.5" />
            </a>

            <Link
              href="/admin/products"
              className="flex items-center gap-2 rounded-2xl bg-[#fe8220] px-5 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-orange-500/25 hover:bg-[#d4630a] transition cursor-pointer"
            >
              <Plus className="h-4 w-4 text-white" />
              <span>Add Product SKU</span>
            </Link>
          </div>
        </header>

        {/* Horizontal Capsule Tab Filter Bar */}
        <div className="px-8 py-3 overflow-x-auto no-scrollbar shrink-0 bg-white/30 backdrop-blur-xl border-b border-[#e5dfd2]/60 relative z-10">
          <div className="flex items-center gap-2">
            {pillTabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.label}
                  href={tab.href}
                  className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition shrink-0 ${isActive
                      ? "bg-[#120a3b] text-white shadow-md"
                      : "bg-white text-[#5A6473] border border-[#e5dfd2] hover:bg-[#fff5eb] hover:text-[#fe8220]"
                    }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Scrollable Children Body Page Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar overflow-x-hidden p-6 sm:p-8 relative">
          <div className="max-w-[1700px] mx-auto w-full relative z-10">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}
