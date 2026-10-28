import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

export type PlaceholderRounded = 'none' | 'panel' | 'card';

export interface PlaceholderBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accessible alternative text describing the expected image */
  alt: string;
  /** Aspect ratio formatted as width/height (e.g. '4/5', '4/3') */
  aspect?: string;
  /** Corner radius preset using MSAM design tokens */
  rounded?: PlaceholderRounded;
  /** Optional custom class name */
  className?: string;
}

const roundedStyles: Record<PlaceholderRounded, string> = {
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
 * Accessible lavender-toned placeholder block displayed when image assets are pending or unconfigured.
 */
export function PlaceholderBlock({
  alt,
  aspect = '4/3',
  rounded = 'none',
  className,
  style,
  ...props
}: PlaceholderBlockProps) {
  const aspectClass = aspectStyles[aspect];
  const customAspectStyle = aspectClass ? undefined : { aspectRatio: aspect };

  return (
    <div
      role="img"
      aria-label={alt}
      style={{ ...customAspectStyle, ...style }}
      className={cn(
        'border-border/60 relative flex w-full items-center justify-center overflow-hidden border select-none',
        'from-lavender via-lavender/60 to-lavender-deep/25 bg-gradient-to-br',
        aspectClass,
        roundedStyles[rounded],
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
        <ImageIcon className="text-navy/20 h-8 w-8 shrink-0" aria-hidden="true" />
      </div>
    </div>
  );
}
