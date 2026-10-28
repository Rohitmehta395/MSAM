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
  /** When true, stretches image to fill container height without aspect constraint */
  fillContainer?: boolean;
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
 * Server Component rendering Cloudinary-backed or verified direct URL images
 * with automated responsive sizing, or an accessible aspect-stable placeholder block when unconfigured.
 */
export function MediaImage({
  assetKey,
  sizes,
  priority = false,
  className,
  rounded = 'none',
  fit = 'cover',
  fillContainer = false,
}: MediaImageProps) {
  const asset: ImageAsset | undefined = images[assetKey];
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const isCloudinary = Boolean(cloudName && asset?.publicId);
  const isDirectUrl = Boolean(asset?.src);

  if (!asset) {
    console.warn(`[MediaImage] Asset key not found in registry: "${assetKey}"`);
    return null;
  }

  if (!isCloudinary && !isDirectUrl) {
    return (
      <PlaceholderBlock
        alt={asset.alt}
        aspect={asset.aspect}
        rounded={rounded}
        className={className}
      />
    );
  }

  const aspectClass = fillContainer ? undefined : aspectStyles[asset.aspect];
  const customAspectStyle =
    fillContainer || aspectClass ? undefined : { aspectRatio: asset.aspect };

  const imageSrc = isCloudinary && asset.publicId ? asset.publicId : asset.src!;
  const unoptimized = !isCloudinary;

  return (
    <div
      style={customAspectStyle}
      className={cn(
        'relative w-full overflow-hidden',
        fillContainer && 'h-full',
        aspectClass,
        roundedStyles[rounded],
        className,
      )}
    >
      <Image
        src={imageSrc}
        alt={asset.alt}
        fill
        unoptimized={unoptimized}
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
