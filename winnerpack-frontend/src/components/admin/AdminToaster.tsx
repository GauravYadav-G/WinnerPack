'use client';

/**
 * Lightweight, dependency-free toast bus for the admin panel.
 *
 * Usage from any client component:
 *   import { notify } from '@/components/admin/AdminToaster';
 *   notify('Lead deleted', 'success');
 *
 * <AdminToaster /> is mounted once inside the admin layout.
 * Replaces the previous silent `console.error` + `alert()` handling.
 */

import { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastTone = 'success' | 'error' | 'info';
export type ToastPayload = { id: number; message: string; tone: ToastTone; description?: string };

type Listener = (payload: ToastPayload) => void;

const listeners = new Set<Listener>();
let counter = 0;

export function notify(message: string, tone: ToastTone = 'info', description?: string): void {
  const payload: ToastPayload = { id: ++counter, message, tone, description };
  if (listeners.size === 0) {
    // No toaster mounted (e.g. studio full-screen) — still surface something.
    if (tone === 'error') console.warn(`[admin] ${message}`);
    return;
  }
  listeners.forEach((listener) => listener(payload));
}

const TONE_STYLES: Record<ToastTone, { icon: typeof CheckCircle2; ring: string; chip: string }> = {
  success: { icon: CheckCircle2, ring: 'admin-toast-success', chip: 'text-emerald-600' },
  error: { icon: AlertCircle, ring: 'admin-toast-error', chip: 'text-rose-600' },
  info: { icon: Info, ring: 'admin-toast-info', chip: 'text-slate-600' },
};

export function AdminToaster() {
  const [toasts, setToasts] = useState<ToastPayload[]>([]);

  useEffect(() => {
    const listener: Listener = (payload) => {
      setToasts((prev) => [...prev.slice(-3), payload]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== payload.id));
      }, payload.tone === 'error' ? 6500 : 4200);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="admin-toaster" role="region" aria-label="Notifications">
      {toasts.map((toast) => {
        const { icon: Icon, ring, chip } = TONE_STYLES[toast.tone];
        return (
          <div key={toast.id} className={`admin-toast ${ring}`} role="status" aria-live="polite">
            <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${chip}`} />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900">{toast.message}</p>
              {toast.description && (
                <p className="mt-0.5 text-[11px] font-medium text-slate-500">{toast.description}</p>
              )}
            </div>
            <button
              type="button"
              aria-label="Dismiss notification"
              className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              onClick={() => setToasts((prev) => prev.filter((item) => item.id !== toast.id))}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
