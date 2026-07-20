"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Clock, ArrowLeft } from "lucide-react";
import { getBlogPostBySlug, getRelatedPosts } from "@/lib/mock-data";
import { Container, Section, Eyebrow } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Button } from "@/components/ui/Button";
import { BlogCard } from "@/components/ui/BlogCard";
import CtaBanner from "@/components/CTABanner";

// Layout components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageWrapper from "../../../components/PageWrapper";
import { useRevealOnScroll } from "@/hooks";

export default function BlogPost() {
  useRevealOnScroll();
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const post = getBlogPostBySlug(slug);

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

  const related = getRelatedPosts(post.slug, post.category);

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
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-white/45">
                <li><Link href="/" className="hover:text-[var(--color-amber)]">Home</Link></li>
                <li><ChevronRight className="h-3 w-3 text-white/25" /></li>
                <li><Link href="/blog" className="hover:text-[var(--color-amber)]">Blog</Link></li>
                <li><ChevronRight className="h-3 w-3 text-white/25" /></li>
                <li className="text-white/75">{post.category}</li>
              </ol>
            </nav>
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
                <img
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
                  {post.content.map((block, i) => {
                    if (block.type === "paragraph") {
                      return (
                        <p key={i} className="text-base leading-relaxed text-[var(--color-text)]">
                          {block.text}
                        </p>
                      );
                    }
                    if (block.type === "heading") {
                      return (
                        <h2 key={i} className="font-display mt-8 text-xl font-bold text-[var(--color-ink)] sm:text-2xl">
                          {block.text}
                        </h2>
                      );
                    }
                    if (block.type === "list") {
                      return (
                        <ul key={i} className="mt-5 space-y-3">
                          {block.items?.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-[var(--color-text)]">
                              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--color-blue-soft)] text-[var(--color-blue)]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-blue)]" />
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (block.type === "quote") {
                      return (
                        <blockquote
                          key={i}
                          className="mt-8 rounded-2xl border-l-4 border-[var(--color-blue)] bg-[var(--color-mist)] p-6 italic text-[var(--color-ink)]"
                        >
                          <p className="text-base font-medium leading-relaxed">
                            "{block.text}"
                          </p>
                        </blockquote>
                      );
                    }
                    return (
                      <p key={i} className="mt-5 text-lg leading-relaxed text-[var(--color-ink)]/85">
                        {block.text}
                      </p>
                    );
                  })}
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
