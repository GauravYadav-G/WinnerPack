'use client';
/**
 * OptimizedImage
 * Drop-in <img> wrapper. Since all product images have been bulk-converted to
 * WebP (via scripts/bulk-convert-products.mjs), this component swaps local
 * .png/.jpg paths to their .webp siblings for smaller payloads.
 * External URLs and paths already ending in .webp are passed through unchanged.
 */

import { useState } from 'react';

/** Swap a local image extension to .webp; leave external URLs and .webp alone */
function toWebP(src: string): string {
  if (!src) return src;
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return src.replace(/\.(png|jpe?g)$/i, '.webp');
}

type Props = {
  src?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
};

export default function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  fetchPriority,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (!src) return null;

  return (
    <img
      src={failed ? src : toWebP(src)}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      width={width}
      height={height}
      fetchPriority={fetchPriority}
      onError={() => setFailed(true)}
    />
  );
}
