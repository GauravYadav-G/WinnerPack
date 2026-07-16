"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, ArrowRight, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Invalid password");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F1117] text-white px-5">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#161923] p-8 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative z-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
            WPT Administration
          </h2>
          <h1 className="mt-2 font-sans text-2xl font-bold tracking-tight text-white">
            Operations Portal
          </h1>
          <p className="mt-2 text-xs text-white/50">
            Enter administrative password to access control panel
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-lg border border-white/10 bg-[#0F1117] px-4 py-3 text-center text-sm font-semibold tracking-widest text-white placeholder-white/20 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-left text-xs font-semibold text-red-400">
                <ShieldAlert className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-500 py-3 text-sm font-bold text-black transition hover:bg-cyan-400 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Unlock Portal"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
