/**
 * Small, dependency-free helpers shared by admin screens.
 *
 * Centralising these fixes three recurring defects:
 *  - clipboard writes that silently failed on insecure origins but still
 *    showed a "Copied!" state,
 *  - CSV exports that Excel mangled (missing BOM, unescaped newlines),
 *  - unsafe `.toLowerCase()` calls on records where a field was absent.
 */

/** Coerce any value to a lowercase string without throwing. */
export function safeLower(value: unknown): string {
  return typeof value === 'string' ? value.toLowerCase() : String(value ?? '').toLowerCase();
}

/** True when `haystack` contains `needle`, tolerating missing fields. */
export function matchesQuery(haystack: unknown, needle: string): boolean {
  if (!needle) return true;
  return safeLower(haystack).includes(needle.toLowerCase());
}

/**
 * Copy text to the clipboard and report whether it actually succeeded.
 * Falls back to a hidden textarea + execCommand for non-HTTPS / older
 * browser contexts where navigator.clipboard is unavailable or rejected.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy path */
  }

  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.top = '-9999px';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

/** RFC-4180-ish cell escaping + always quote so commas/newlines survive. */
export function csvCell(value: unknown): string {
  if (value === null || value === undefined) return '""';
  const raw = typeof value === 'object' ? JSON.stringify(value) : String(value);
  return `"${raw.replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`;
}

/** Build a CSV string with a UTF-8 BOM so Excel renders unicode correctly. */
export function buildCsv(headers: string[], rows: unknown[][]): string {
  const lines = [headers.map(csvCell).join(','), ...rows.map((row) => row.map(csvCell).join(','))];
  return `\uFEFF${lines.join('\r\n')}`;
}

/** Trigger a client-side file download from a string payload. */
export function downloadFile(filename: string, content: string, mime = 'text/plain;charset=utf-8'): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function downloadCsv(filename: string, headers: string[], rows: unknown[][]): void {
  downloadFile(filename, buildCsv(headers, rows), 'text/csv;charset=utf-8');
}

/** "3 min ago", "Yesterday", "12 Aug 2025" — compact and locale-stable. */
export function formatRelative(value?: string | number | Date | null): string {
  if (!value) return '—';
  const date = value instanceof Date ? value : new Date(value);
  const time = date.getTime();
  if (Number.isNaN(time)) return '—';

  const diff = Date.now() - time;
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < 0) return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  if (diff < minute) return 'Just now';
  if (diff < hour) return `${Math.floor(diff / minute)} min ago`;
  if (diff < day) return `${Math.floor(diff / hour)} h ago`;
  if (diff < 2 * day) return 'Yesterday';
  if (diff < 7 * day) return `${Math.floor(diff / day)} d ago`;
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatDateTime(value?: string | number | Date | null): string {
  if (!value) return '—';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Bucket timestamps into the last `days` calendar days (oldest → newest). */
export function dailyCounts(values: Array<string | number | Date | undefined>, days = 14): number[] {
  const buckets = new Array(days).fill(0) as number[];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const value of values) {
    if (!value) continue;
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) continue;
    date.setHours(0, 0, 0, 0);
    const offset = Math.round((today.getTime() - date.getTime()) / 86_400_000);
    if (offset >= 0 && offset < days) buckets[days - 1 - offset] += 1;
  }
  return buckets;
}
