"use client";
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { BlogCard, type BlogPostType } from "@/components/ui/BlogCard";
import CtaBanner from "@/components/CTABanner";
import { initialArticles } from "@/lib/fallback-data";

// Layout components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import { useRevealOnScroll } from "@/hooks";
import PageWrapper from "../../components/PageWrapper";

export default function Blog() {
  useRevealOnScroll();
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/articles")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const mapped = data.map((art: any) => ({
            slug: art.slug,
            title: art.title,
            excerpt: art.excerpt || "",
            category: art.tag || "Engineering",
            image: art.image || "/images/desktop/portfolio/quality_featured.png",
            date: art.date || "",
            readTime: art.read || "5 min read",
            author: "Winner Pack Team",
            featured: !!art.featured,
            body: art.body || "",
          }));
          setPosts(mapped);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Failed to fetch blog posts from API, using client fallback:", err);
        const mapped = initialArticles.map((art: any) => ({
          slug: art.slug,
          title: art.title,
          excerpt: art.excerpt || "",
          category: art.tag || "Engineering",
          image: art.image || "/images/desktop/portfolio/quality_featured.png",
          date: art.date || "",
          readTime: art.read || "5 min read",
          author: "Winner Pack Team",
          featured: !!art.featured,
          body: art.body || "",
        }));
        setPosts(mapped as any);
        setLoading(false);
      });
  }, []);

  const featured = posts.find((p) => p.featured);
  const rest = featured ? posts.filter((p) => p.slug !== featured.slug) : posts;

  return (
    <div className="min-h-screen bg-[var(--color-bone)] text-[var(--color-text)]">
      <Cursor />
      <ScrollProgress />
      <Navbar />

      <PageWrapper className="relative">
        <PageHeader
          eyebrow="Insights"
          title={
            <>
              Notes from the <br />
              packaging floor.
            </>
          }
          intro="Practical engineering notes on materials, machinery, sustainability and the economics of industrial packaging — written by the people who make it."
          crumbs={[{ label: "Home", to: "/" }, { label: "Blog" }]}
        />

        {/* Background textures */}
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

        <Section className="pt-12 sm:pt-14 lg:pt-16 bg-transparent relative z-10">
          <Container>
            {/* Featured Post Card */}
            {featured && (
              <div className="mb-14 overflow-hidden rounded-3xl border border-[var(--color-line)] bg-white shadow-sm transition-all duration-500 hover:shadow-md">
                <div className="grid lg:grid-cols-12">
                  <div className="relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 sm:p-10 lg:col-span-5 lg:p-12">
                    <div className="flex items-center gap-3 text-xs font-mono text-[var(--color-blue)]">
                      <span className="uppercase tracking-wider">{featured.category}</span>
                      <span className="h-1 w-1 rounded-full bg-[var(--color-line-2)]" aria-hidden />
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {featured.readTime}
                      </span>
                    </div>

                    <h2 className="font-display mt-4 text-2xl font-bold leading-tight text-[var(--color-ink)] sm:text-3xl text-balance">
                      {featured.title}
                    </h2>

                    <p className="mt-4 text-sm leading-relaxed text-[var(--color-mute)] text-pretty">
                      {featured.excerpt}
                    </p>

                    <div className="mt-8 flex items-center justify-between border-t border-[var(--color-line)] pt-6">
                      <div className="text-xs">
                        <p className="font-semibold text-[var(--color-ink)]">{featured.author}</p>
                        <p className="text-[var(--color-mute)] mt-0.5">{featured.date}</p>
                      </div>
                      <Link
                        href={`/blog/${featured.slug}`}
                        className="group flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-blue-deep)] text-white transition hover:bg-[var(--color-blue)]"
                        data-hover
                      >
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grid */}
            {loading ? (
              <div className="py-20 text-center text-[var(--color-mute)]">
                <span className="inline-block animate-pulse font-mono text-sm uppercase tracking-widest text-[var(--color-blue)]">
                  Loading insights...
                </span>
              </div>
            ) : rest.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[var(--color-line-2)] p-16 text-center text-[var(--color-mute)] bg-white/40">
                No articles in this category yet.
              </div>
            ) : (
              <Stagger key="blog" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <StaggerItem key={p.slug} className="h-full">
                    <BlogCard post={p} />
                  </StaggerItem>
                ))}
              </Stagger>
            )}
          </Container>
        </Section>

        <CtaBanner />
      </PageWrapper>

      <Footer />
    </div>
  );
}
