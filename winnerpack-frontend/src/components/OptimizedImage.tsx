'use client';
/**
 * OptimizedImage
 * ---------------------------------------
 * Drop-in replacement for <img> when the image path comes from a
 * database/API at runtime (product.image, item.image, post.image, etc.)
 * — the cases optimize-images.js and find-img-tags.js couldn't handle
 * automatically because the path isn't known until the page renders.
 *
 * What it does:
 *   - Computes the matching /optimized/... WebP path for any given
 *     local image path (mirrors exactly what optimize-images.js writes)
 *   - If that optimized file 404s (e.g. a newer upload that hasn't been
 *     run through the optimizer yet), it automatically falls back to
 *     the original image instead of showing a broken image icon
 *   - Leaves external URLs (http://, https://) untouched
 *
 * USAGE — replace this:
 *   <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
 *
 * With this:
 *   <OptimizedImage src={item.image} alt={item.title} className="h-full w-full object-cover" />
 *
 * Then add this import once at the top of the file:
 *   import OptimizedImage from '@/components/OptimizedImage';
 *   (adjust the import path to wherever you save this file)
 */

import { useEffect, useState } from 'react';
import Image from 'next/image';

function getOptimizedSrc(src?: string): string | null {
  if (!src) return null;
  if (src.startsWith('http://') || src.startsWith('https://')) return null; // external, can't optimize locally
  // Admin uploads are stored as WebP already, so requesting a second
  // `/optimized/...` variant would add a needless 404 before rendering.
  if (/\.(webp|avif)(?:$|[?#])/i.test(src)) return null;
  const lastSlash = src.lastIndexOf('/');
  const dir = lastSlash >= 0 ? src.slice(0, lastSlash) : '';
  const filename = lastSlash >= 0 ? src.slice(lastSlash + 1) : src;
  const dot = filename.lastIndexOf('.');
  const nameNoExt = dot >= 0 ? filename.slice(0, dot) : filename;
  return `/optimized${dir}/${nameNoExt}.webp`;
}

type Props = {
  src?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
};

export default function OptimizedImage({ src, alt, className, width = 1200, height = 1200 }: Props) {
  const optimizedSrc = getOptimizedSrc(src);
  const [useFallback, setUseFallback] = useState(!optimizedSrc);

  // Carousels and CMS-driven components can replace `src` without unmounting.
  // Reset the fallback choice so the next image can use its optimized asset.
  useEffect(() => {
    setUseFallback(!optimizedSrc);
  }, [optimizedSrc]);

  const finalSrc = useFallback || !optimizedSrc ? src : optimizedSrc;

  if (!finalSrc) return null;

  return (
    <Image
      src={finalSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      unoptimized
      onError={() => {
        // The optimized WebP doesn't exist yet (new upload not yet
        // processed) — fall back to the original so nothing breaks.
        if (!useFallback) setUseFallback(true);
      }}
    />
  );
}
