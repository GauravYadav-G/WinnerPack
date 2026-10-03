'use client';
/** Responsive image wrapper for canonical asset URLs. */

type Props = {
  src?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  sizes?: string;
  quality?: number;
  mobileSrc?: string;
};

const RESPONSIVE_WIDTHS = [256, 320, 384, 420, 640, 768, 1024, 1280, 1536, 1920];

function optimizedUrl(src: string, width: number, quality: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

export default function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  fetchPriority,
  sizes = '(max-width: 640px) 100vw, 50vw',
  quality = 72,
  mobileSrc,
}: Props) {
  if (!src) return null;

  const resolvedSrc = src;
  const canOptimize =
    resolvedSrc.startsWith('/') &&
    /\.(?:avif|webp|png|jpe?g)(?:[?#]|$)/i.test(resolvedSrc);
  const desktopSrcSet = canOptimize
    ? RESPONSIVE_WIDTHS.map((candidate) => `${optimizedUrl(resolvedSrc, candidate, quality)} ${candidate}w`).join(', ')
    : undefined;

  const image = (
    <img
      src={resolvedSrc}
      srcSet={desktopSrcSet}
      sizes={canOptimize ? sizes : undefined}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      width={width}
      height={height}
      fetchPriority={fetchPriority}
    />
  );

  if (!mobileSrc) return image;

  return (
    <picture className="contents">
      <source media="(max-width: 639px)" srcSet={mobileSrc} />
      {image}
    </picture>
  );
}
