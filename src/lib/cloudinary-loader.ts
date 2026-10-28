import type { ImageLoaderProps } from 'next/image';
import { buildCloudinaryTransformations } from './cloudinary';

/**
 * Custom Next.js Image Loader for Cloudinary.
 *
 * Transforms public IDs into responsive, format-optimized Cloudinary delivery URLs.
 * Formats:
 *   https://res.cloudinary.com/<cloud-name>/image/upload/f_auto,q_<quality-or-auto>,c_limit,w_<width>/<public-id>
 */
export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    throw new Error(
      'Cloudinary custom image loader failed: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not configured in your environment.',
    );
  }

  const cleanSrc = src.replace(/^\/+/, '');
  const transformations = buildCloudinaryTransformations({
    width,
    quality: quality || 'auto',
    crop: 'limit',
    format: 'auto',
  });

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${cleanSrc}`;
}
