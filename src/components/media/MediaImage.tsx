import React from 'react';
import Image from 'next/image';
import { images, type ImageAsset, type ImageKey } from '@/content/images';
import { cn } from '@/lib/cn';
import { PlaceholderBlock, type PlaceholderRounded } from './PlaceholderBlock';

export type MediaImageRounded = PlaceholderRounded;
export type MediaImageFit = 'cover' | 'contain';

export interface MediaImageProps {
  /** Key identifying the asset in the central typed image registry */
  assetKey: ImageKey;
  /** Responsive image sizing hints for next/image srcset selection */
  sizes: string;
  /** High priority preload for Above-The-Fold / LCP imagery */
  priority?: boolean;
  /** Optional custom class name */
  className?: string;
  /** Corner radius preset using MSAM design tokens */
  rounded?: MediaImageRounded;
  /** Object-fit scaling strategy. Default: 'cover' */
  fit?: MediaImageFit;
}

const roundedStyles: Record<MediaImageRounded, string> = {
  none: 'rounded-none',
  panel: 'rounded-panel',
  card: 'rounded-card',
};

const aspectStyles: Record<string, string> = {
  '1/1': 'aspect-square',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '16/9': 'aspect-video',
  '4/5': 'aspect-[4/5]',
  '3/4': 'aspect-[3/4]',
  '2/3': 'aspect-[2/3]',
};

/**
 * Server Component rendering Cloudinary-backed images with automated responsive srcset,
 * or an accessible aspect-stable placeholder block when unconfigured.
 */
export function MediaImage({
  assetKey,
  sizes,
  priority = false,
  className,
  rounded = 'none',
  fit = 'cover',
}: MediaImageProps) {
  const asset: ImageAsset | undefined = images[assetKey];
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const isCloudinaryReady = Boolean(cloudName && asset?.publicId);

  if (!asset) {
    console.warn(`[MediaImage] Asset key not found in registry: "${assetKey}"`);
    return null;
  }

  if (!isCloudinaryReady || !asset.publicId) {
    return (
      <PlaceholderBlock
        alt={asset.alt}
        aspect={asset.aspect}
        rounded={rounded}
        className={className}
      />
    );
  }

  const aspectClass = aspectStyles[asset.aspect];
  const customAspectStyle = aspectClass ? undefined : { aspectRatio: asset.aspect };

  return (
    <div
      style={customAspectStyle}
      className={cn(
        'relative w-full overflow-hidden',
        aspectClass,
        roundedStyles[rounded],
        className,
      )}
    >
      <Image
        src={asset.publicId}
        alt={asset.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          'transition-opacity duration-300',
          fit === 'contain' ? 'object-contain' : 'object-cover',
        )}
      />
    </div>
  );
}
