"use client";
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Button } from "@/components/ui/Button";
import { BlogCard, type BlogPostType } from "@/components/ui/BlogCard";
import CtaBanner from "@/components/CTABanner";

// Layout components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageWrapper from "../../../components/PageWrapper";
import { useRevealOnScroll } from "@/hooks";
import { markdownToHtml } from "@/utils/markdown";
import { initialArticles } from "@/lib/fallback-data";
import OptimizedImage from '@/components/OptimizedImage';

export default function BlogPost() {
  useRevealOnScroll();
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const [post, setPost] = useState<BlogPostType | null>(null);
  const [related, setRelated] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
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

          const found = mapped.find((p) => p.slug === slug);
          if (found) {
            setPost(found);
            const others = mapped.filter((p) => p.category === found.category && p.slug !== found.slug);
            setRelated(others);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Failed to fetch blog post details from API, using client fallback:", err);
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

        const found = mapped.find((p) => p.slug === slug);
        if (found) {
          setPost(found as any);
          const others = mapped.filter((p) => p.category === found.category && p.slug !== found.slug);
          setRelated(others as any);
        } else {
          setPost(null);
        }
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-blue-deep)] text-white">
        <Cursor />
        <ScrollProgress />
        <Navbar />
        <PageWrapper>
          <section className="grid min-h-[70vh] place-items-center bg-[var(--color-blue-deep)] px-6 pt-20 text-center">
            <span className="animate-pulse font-mono text-sm uppercase tracking-widest text-white/50">
              Retrieving article details...
            </span>
          </section>
        </PageWrapper>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[var(--color-blue-deep)] text-white">
        <Cursor />
        <ScrollProgress />
        <Navbar />

        <PageWrapper>
          <section className="grid min-h-[70vh] place-items-center bg-[var(--color-blue-deep)] px-6 pt-20 text-center">
            <div>
              <p className="eyebrow text-[var(--color-amber-2)]">404</p>
              <h1 className="mt-4 text-3xl font-semibold text-white font-display">Article not found</h1>
              <div className="mt-8">
                <Button to="/blog" variant="outlineLight" iconRight>
                  Back to blog
                </Button>
              </div>
            </div>
          </section>
        </PageWrapper>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bone)] text-[var(--color-text)]">
      <Cursor />
      <ScrollProgress />
      <Navbar />

      <PageWrapper className="relative">
        {/* Header */}
        <section className="relative overflow-hidden bg-[var(--color-blue-deep)] pb-14 pt-12 md:pt-14">
          <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
          <div
            className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-[var(--color-amber)]/12 blur-[130px]"
            aria-hidden
          />
          <Container className="relative">
            <Eyebrow tone="light">{post.category}</Eyebrow>
            <h1 className="mt-3 md:mt-5 text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight text-white font-display text-balance">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-white/55">
              <span>{post.author}</span>
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </span>
            </div>
          </Container>
        </section>

        {/* Background textures */}
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

        {/* Featured image */}
        <Section className="pb-0 pt-12 bg-transparent relative z-10">
          <Container>
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-[var(--color-line)] shadow-lift">
                <OptimizedImage
  src={post.image}
  alt={post.title}
  className="aspect-[16/9] w-full object-cover"
/>
              </div>
            </Reveal>
          </Container>
        </Section>

        {/* Body */}
        <Section className="pt-12 bg-transparent relative z-10">
          <Container>
            <Reveal>
              <div className="rounded-3xl border border-[var(--color-line)] bg-white p-8 md:p-12 shadow-sm">
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: markdownToHtml(post.body || "") }} />
                </div>
              </div>
            </Reveal>

            <div className="mt-12 border-t border-[var(--color-line)] pt-8">
              <Link
                href="/blog"
                className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-blue-deep)]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all articles
              </Link>
            </div>
          </Container>
        </Section>

        {/* Related */}
        {related.length > 0 && (
          <Section className="bg-transparent border-t border-[var(--color-line)] py-16 relative z-10">
            <Container>
              <Eyebrow>Keep reading</Eyebrow>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl font-display">
                Related articles
              </h2>
              <Stagger className="mt-9 grid gap-6 md:grid-cols-3">
                {related.map((p) => (
                  <StaggerItem key={p.slug} className="h-full">
                    <BlogCard post={p} />
                  </StaggerItem>
                ))}
              </Stagger>
            </Container>
          </Section>
        )}

        <CtaBanner />
      </PageWrapper>

      <Footer />
    </div>
  );
}
