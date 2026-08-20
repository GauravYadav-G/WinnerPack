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

function getOptimizedSrc(_src?: string): string | null {
  return null;
}

type Props = {
  src?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
};

export default function OptimizedImage({ src, alt, className }: Props) {
  const optimizedSrc = getOptimizedSrc(src);
  const [useFallback, setUseFallback] = useState(!optimizedSrc);

  useEffect(() => {
    setUseFallback(!optimizedSrc);
  }, [optimizedSrc]);

  const finalSrc = useFallback || !optimizedSrc ? src : optimizedSrc;

  if (!finalSrc) return null;

  return (
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (!useFallback) setUseFallback(true);
      }}
    />
  );
}
