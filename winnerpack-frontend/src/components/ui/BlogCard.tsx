import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import OptimizedImage from '@/components/OptimizedImage';

export interface BlogPostType {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  featured?: boolean;
  content?: Array<{ type: string; text?: string; items?: string[] }>;
  body?: string;
}

export function BlogCard({ post }: { post: BlogPostType }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white transition-all duration-300 hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-bone)]">
        <OptimizedImage
  src={post.image}
  alt={post.title}
  className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
/>
        <span className="absolute left-4 top-4 rounded-full bg-[var(--color-amber)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-blue-deep)]">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 font-mono text-[10px] text-[var(--color-mute)]/60">
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-blue)]">
          {post.title}
        </h3>
        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-[var(--color-mute)] flex-1">
          {post.excerpt}
        </p>
        <div className="mt-5 border-t border-[var(--color-line)] pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-blue-deep)] group-hover:text-[var(--color-blue)] transition-colors">
            Read article
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
