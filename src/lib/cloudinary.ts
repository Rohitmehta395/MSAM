/**
 * Cloudinary URL Generation & Media Helpers
 *
 * Provides utilities for generating transformed Cloudinary asset URLs
 * for Open Graph cards, direct media links, and custom loaders.
 */

export const CLOUDINARY_ROOT_FOLDER = 'msam';

export interface CloudinaryTransformOptions {
  /** Target image width in pixels */
  width?: number;
  /** Target image height in pixels */
  height?: number;
  /** Crop mode: 'limit' (default for resizing), 'fill', 'fit', 'thumb' */
  crop?: string;
  /** Quality compression: number (1-100) or 'auto' (default: 'auto') */
  quality?: number | 'auto';
  /** Image format: 'auto' (default), 'webp', 'avif', 'jpg', 'png' */
  format?: string;
}

/**
 * Builds standard comma-delimited Cloudinary transformation parameter strings.
 */
export function buildCloudinaryTransformations(options: CloudinaryTransformOptions = {}): string {
  const parts: string[] = [];

  const format = options.format || 'auto';
  parts.push(`f_${format}`);

  const quality = options.quality !== undefined ? options.quality : 'auto';
  parts.push(`q_${quality}`);

  const crop = options.crop || (options.height ? 'fill' : 'limit');
  parts.push(`c_${crop}`);

  if (options.width) {
    parts.push(`w_${options.width}`);
  }

  if (options.height) {
    parts.push(`h_${options.height}`);
  }

  return parts.join(',');
}

/**
 * Generates an absolute Cloudinary delivery URL for non-next/image contexts (e.g. Open Graph, metadata).
 *
 * @throws {Error} if NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not configured in the environment.
 */
export function cloudinaryUrl(publicId: string, options: CloudinaryTransformOptions = {}): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    throw new Error(
      'Cloudinary cloud name is not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in your environment.',
    );
  }

  const cleanPublicId = publicId.replace(/^\/+/, '');
  const transformations = buildCloudinaryTransformations(options);

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${cleanPublicId}`;
}

/**
 * Helper to construct standardized public IDs following the project naming convention:
 * msam/{page}/{section}-{slug}
 */
export function createPublicId(page: string, section: string, slug: string): string {
  return `${CLOUDINARY_ROOT_FOLDER}/${page}/${section}-${slug}`;
}
