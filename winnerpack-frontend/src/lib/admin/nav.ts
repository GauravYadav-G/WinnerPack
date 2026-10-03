/**
 * Single source of truth for admin navigation.
 *
 * Both the sidebar (layout.tsx) and the ⌘K command palette consume this
 * module, so a route is added or renamed in exactly one place.
 */

import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  Inbox,
  Database,
  Package,
  Layers,
  FileText,
  Images,
  PanelsTopLeft,
  SlidersHorizontal,
} from 'lucide-react';

export type AdminNavItem = {
  /** Visible label in sidebar + palette. */
  label: string;
  href: string;
  icon: LucideIcon;
  /** One-line description used by the command palette. */
  description: string;
  /** Optional badge sourced from live data (e.g. pending inquiries). */
  badgeKey?: 'inquiries';
  /** Extra search terms for the palette. */
  keywords?: string[];
  /** Match pathname exactly instead of prefix matching. */
  exact?: boolean;
};

export type AdminNavGroup = {
  id: string;
  label: string;
  items: AdminNavItem[];
};

export const adminNavGroups: AdminNavGroup[] = [
  {
    id: 'workspace',
    label: 'Workspace',
    items: [
      {
        label: 'Overview',
        href: '/admin',
        icon: LayoutDashboard,
        description: 'Business summary and work requiring attention',
        keywords: ['dashboard', 'home', 'stats', 'kpi'],
        exact: true,
      },
      {
        label: 'Inquiries',
        href: '/admin/inquiries',
        icon: Inbox,
        badgeKey: 'inquiries',
        description: 'Quote requests and customer follow-up',
        keywords: ['leads', 'crm', 'quotes', 'rfq', 'customers'],
      },
    ],
  },
  {
    id: 'catalog',
    label: 'Content',
    items: [
      {
        label: 'Products',
        href: '/admin/products',
        icon: Package,
        description: 'Product catalog, specifications and media',
        keywords: ['sku', 'films', 'labels', 'tapes', 'straps'],
      },
      {
        label: 'Categories',
        href: '/admin/categories',
        icon: Layers,
        description: 'Product categories and subcategories',
        keywords: ['collections', 'taxonomy', 'hierarchy'],
      },
      {
        label: 'Articles',
        href: '/admin/blogs',
        icon: FileText,
        description: 'News, technical guides and SEO content',
        keywords: ['posts', 'news', 'seo', 'composer'],
      },
    ],
  },
  {
    id: 'website',
    label: 'Website',
    items: [
      {
        label: 'Page Editor',
        href: '/admin/studio',
        icon: PanelsTopLeft,
        description: 'Edit website pages and their sections',
        keywords: ['cms', 'pages', 'editor', 'canvas'],
      },
      {
        label: 'Media Library',
        href: '/admin/gallery',
        icon: Images,
        description: 'Website photography and visual assets',
        keywords: ['images', 'photos', 'uploads', 'gallery'],
      },
      {
        label: 'Site Settings',
        href: '/admin/website',
        icon: SlidersHorizontal,
        description: 'Section visibility and global website settings',
        keywords: ['sections', 'visibility', 'layout', 'toggle'],
        exact: true,
      },
    ],
  },
  {
    id: 'system',
    label: 'System',
    items: [
      {
        label: 'Database',
        href: '/admin/database',
        icon: Database,
        description: 'Advanced record inspection and maintenance',
        keywords: ['mongo', 'collections', 'records', 'schema'],
      },
    ],
  },
];

/** Flat list used by the command palette. */
export const adminNavFlat: AdminNavItem[] = adminNavGroups.flatMap((group) => group.items);

export function isNavItemActive(pathname: string, item: AdminNavItem): boolean {
  if (item.exact || item.href === '/admin') return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export type RouteMeta = { group: string; label: string; description?: string };

/**
 * Resolve breadcrumb metadata for the topbar. Falls back to a readable,
 * title-cased slug so subroutes like /admin/website/hero never show
 * "Workspace" as their title.
 */
export function resolveRouteMeta(pathname: string): RouteMeta {
  for (const group of adminNavGroups) {
    for (const item of group.items) {
      if (isNavItemActive(pathname, item)) {
        return { group: group.label, label: item.label, description: item.description };
      }
    }
  }

  const clean = pathname.replace(/^\/admin\/?/, '').split('/').filter(Boolean);
  const segment = clean[clean.length - 1] || 'Overview';
  const label = segment
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  if (clean[0] === 'website') return { group: 'Website', label: `Settings · ${label}` };
  if (clean[0] === 'studio') return { group: 'Website', label };
  if (clean[0] === 'blogs' && clean[1] === 'edit') {
    return { group: 'Blog & Articles', label: 'Compose Article' };
  }
  if (clean[0] === 'products' && clean[1]) {
    return { group: 'Catalog & Media', label: clean[1] === 'new' ? 'New Product SKU' : label };
  }
  return { group: 'Workspace', label };
}
