'use client';

/**
 * ⌘K / Ctrl+K command palette for the admin panel.
 *
 * Searches every destination declared in lib/admin/nav plus a set of quick
 * actions, supports full keyboard navigation, and remembers the last few
 * pages you opened. Modelled on the "quiet chrome, fast actions" pattern
 * used by modern operational dashboards.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  Plus,
  PanelsTopLeft,
  PenLine,
  ExternalLink,
  LogOut,
  History,
  Command as CommandIcon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { adminNavGroups } from '@/lib/admin/nav';
import { matchesQuery } from '@/lib/admin/utils';

type PaletteEntry = {
  id: string;
  kind: 'page' | 'action';
  group: string;
  label: string;
  description: string;
  icon: LucideIcon;
  keywords?: string[];
  run: () => void;
};

const RECENTS_KEY = 'winnerpack.admin.recents';

function readRecents(): string[] {
  try {
    const raw = window.localStorage.getItem(RECENTS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string').slice(0, 4) : [];
  } catch {
    return [];
  }
}

export function pushRecent(href: string) {
  try {
    const next = [href, ...readRecents().filter((item) => item !== href)].slice(0, 4);
    window.localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable — recents are a nicety, never a requirement */
  }
}

export default function CommandPalette({
  open,
  onClose,
  onSignOut,
  pendingInquiries = 0,
}: {
  open: boolean;
  onClose: () => void;
  onSignOut: () => void;
  pendingInquiries?: number;
}) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const [recents, setRecents] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = () => {
    onClose();
    setQuery('');
    setCursor(0);
  };

  const go = (href: string) => {
    pushRecent(href);
    router.push(href);
    close();
  };

  useEffect(() => {
    if (open) {
      setRecents(readRecents());
      setQuery('');
      setCursor(0);
      window.setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const entries = useMemo<PaletteEntry[]>(() => {
    const pages: PaletteEntry[] = adminNavGroups.flatMap((group) =>
      group.items.map((item) => ({
        id: `page:${item.href}`,
        kind: 'page' as const,
        group: group.label,
        label: item.label,
        description: item.description,
        icon: item.icon,
        keywords: item.keywords,
        run: () => go(item.href),
      })),
    );

    const actions: PaletteEntry[] = [
      {
        id: 'action:new-product',
        kind: 'action',
        group: 'Quick actions',
        label: 'Create new product SKU',
        description: 'Open a blank catalog record with specs and media',
        icon: Plus,
        keywords: ['add', 'catalog', 'sku'],
        run: () => go('/admin/products/new'),
      },
      {
        id: 'action:new-article',
        kind: 'action',
        group: 'Quick actions',
        label: 'Write a new article',
        description: 'Open the full-screen blog composer',
        icon: PenLine,
        keywords: ['blog', 'post', 'news'],
        run: () => go('/admin/blogs/new'),
      },
      {
        id: 'action:studio',
        kind: 'action',
        group: 'Quick actions',
        label: 'Open page editor',
        description: 'Edit website pages and their sections',
        icon: PanelsTopLeft,
        keywords: ['cms', 'canvas', 'editor'],
        run: () => go('/admin/studio'),
      },
      {
        id: 'action:live-site',
        kind: 'action',
        group: 'Quick actions',
        label: 'Open winnerpack.in',
        description: 'View the live website in a new tab',
        icon: ExternalLink,
        keywords: ['website', 'public', 'preview'],
        run: () => {
          window.open('/', '_blank', 'noopener');
          close();
        },
      },
      {
        id: 'action:signout',
        kind: 'action',
        group: 'Session',
        label: 'Sign out of admin',
        description: 'End this admin session on the current device',
        icon: LogOut,
        keywords: ['logout', 'exit'],
        run: () => {
          onSignOut();
          close();
        },
      },
    ];

    if (pendingInquiries > 0) {
      actions.unshift({
        id: 'action:leads',
        kind: 'action',
        group: 'Quick actions',
        label: `Review ${pendingInquiries} pending ${pendingInquiries === 1 ? 'lead' : 'leads'}`,
        description: 'Jump straight into the inquiry pipeline queue',
        icon: History,
        keywords: ['quotes', 'rfq', 'todo'],
        run: () => go('/admin/inquiries'),
      });
    }

    return [...actions, ...pages];
  }, [pendingInquiries]);

  const results = useMemo(() => {
    const term = query.trim();
    const filtered = term
      ? entries.filter(
          (entry) =>
            matchesQuery(entry.label, term) ||
            matchesQuery(entry.description, term) ||
            (entry.keywords || []).some((keyword) => matchesQuery(keyword, term)),
        )
      : entries;

    if (term) return filtered;

    // No query: surface recents first, then everything else.
    const recentEntries = recents
      .map((href) => filtered.find((entry) => entry.id === `page:${href}`))
      .filter((entry): entry is PaletteEntry => Boolean(entry));
    const rest = filtered.filter((entry) => !recentEntries.includes(entry));
    return [...recentEntries.map((entry) => ({ ...entry, group: 'Recent' })), ...rest];
  }, [entries, query, recents]);

  useEffect(() => {
    setCursor(0);
  }, [query, open]);

  // Keep the highlighted row in view.
  useEffect(() => {
    const node = listRef.current?.querySelector<HTMLElement>(`[data-index="${cursor}"]`);
    node?.scrollIntoView({ block: 'nearest' });
  }, [cursor, results]);

  if (!open) return null;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setCursor((prev) => (prev + 1) % Math.max(results.length, 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setCursor((prev) => (prev - 1 + results.length) % Math.max(results.length, 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      results[cursor]?.run();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      close();
    } else if (event.key === 'Tab') {
      // Trap focus inside the dialog while it is open.
      event.preventDefault();
      inputRef.current?.focus();
    }
  };

  return (
    <div className="admin-palette-backdrop" onMouseDown={close}>
      <div
        className="admin-palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="admin-palette-input">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search pages, products, actions…"
            aria-label="Search admin"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="admin-kbd">ESC</kbd>
        </div>

        <div className="admin-palette-list" ref={listRef} role="listbox" aria-label="Results">
          {results.length === 0 && (
            <div className="admin-palette-empty">
              <CommandIcon className="h-5 w-5 text-slate-300" />
              <p>No matches for “{query}”.</p>
              <span>Try “inquiries”, “media” or “new”.</span>
            </div>
          )}

          {results.map((entry, index) => {
            const previous = results[index - 1];
            const showGroup = !previous || previous.group !== entry.group;
            const Icon = entry.icon;
            return (
              <div key={entry.id}>
                {showGroup && <div className="admin-palette-group">{entry.group}</div>}
                <button
                  type="button"
                  data-index={index}
                  role="option"
                  aria-selected={cursor === index}
                  className={`admin-palette-item ${cursor === index ? 'is-active' : ''}`}
                  onMouseEnter={() => setCursor(index)}
                  onClick={() => entry.run()}
                >
                  <span className={`admin-palette-icon ${entry.kind === 'action' ? 'is-action' : ''}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block truncate text-xs font-bold text-slate-900">{entry.label}</span>
                    <span className="block truncate text-[11px] font-medium text-slate-500">{entry.description}</span>
                  </span>
                  {cursor === index && <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-slate-400" />}
                </button>
              </div>
            );
          })}
        </div>

        <div className="admin-palette-footer">
          <span className="flex items-center gap-1.5">
            <kbd className="admin-kbd">
              <ArrowUp className="h-2.5 w-2.5" />
            </kbd>
            <kbd className="admin-kbd">
              <ArrowDown className="h-2.5 w-2.5" />
            </kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="admin-kbd">
              <CornerDownLeft className="h-2.5 w-2.5" />
            </kbd>
            Open
          </span>
          <span className="ml-auto hidden sm:flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
            {results.length} result{results.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>
    </div>
  );
}
