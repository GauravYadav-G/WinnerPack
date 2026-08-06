"use client";

import { apiFetch } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, ArrowRight, Lock, Eye, EyeOff, Sparkles, KeyRound } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await apiFetch("/api/admin/auth", {
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
    <div className="flex min-h-screen items-center justify-center bg-[#f8f7f4] text-[#0F1721] px-4 relative overflow-hidden font-sans">
      
      {/* Ambient Light Orange Mesh Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#fe8220]/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-[#482dbf]/15 blur-[100px] pointer-events-none" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md rounded-3xl border border-[#e5dfd2] bg-white p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative z-10"
      >
        <div className="text-center">
          
          {/* Official Website Logo */}
          <div className="mx-auto flex h-20 w-auto items-center justify-center p-2 mb-2">
            <img src="/logo.png" alt="Winner Pack Official Logo" className="h-16 w-auto object-contain" />
          </div>

          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff5eb] text-[#fe8220] border border-[#fe8220]/30 text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
              <Sparkles className="h-3 w-3" /> Security Gateway
            </span>
            <h1 className="text-2xl font-black tracking-tight text-[#120a3b] font-display pt-2">
              Operations Control Portal
            </h1>
            <p className="text-xs text-[#5A6473] font-medium">
              Enter administrative credentials to access management suite
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-5 text-left">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider font-bold text-[#120a3b] mb-2">
                Administrative Key
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full rounded-xl border border-[#e5dfd2] bg-[#f8f7f4] pl-10 pr-11 py-3 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:border-[#fe8220] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#fe8220]/50 transition duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-700 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-semibold text-red-700"
              >
                <ShieldAlert className="h-4 w-4 flex-shrink-0 text-red-600" />
                <span>{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#fe8220] py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-500/25 hover:bg-[#d4630a] transition duration-200 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span>Authenticating Session...</span>
              ) : (
                <>
                  <span>Unlock Control Panel</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Credential Hint */}
          <div className="mt-6 pt-5 border-t border-[#e5dfd2]/60 flex items-center justify-center gap-2 text-[11px] text-[#5A6473] font-mono">
            <KeyRound className="h-3.5 w-3.5 text-[#fe8220]" />
            <span>Default Access Key: <code className="text-[#fe8220] bg-[#fff5eb] border border-[#fe8220]/30 px-1.5 py-0.5 rounded font-bold">admin123</code></span>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
