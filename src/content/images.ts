/**
 * MSAM Image Asset Registry
 *
 * Cloudinary public-ID naming convention:
 *   msam/{page}/{section}-{slug}
 *
 * Examples:
 *   - msam/home/hero-main
 *   - msam/home/hero-top
 *   - msam/home/hero-bottom
 *   - msam/mission/origin-team
 */

export type AspectRatio = '1/1' | '4/3' | '3/2' | '16/9' | '4/5' | '3/4' | '2/3' | (string & {});

export interface ImageAsset {
  /** Cloudinary public ID (omitted or undefined for placeholder state) */
  publicId?: string;
  /** Descriptive alternative text for accessibility */
  alt: string;
  /** Aspect ratio formatted as width/height (e.g. '4/5', '4/3') */
  aspect: AspectRatio;
}

export const images = {
  'home.hero.main': {
    publicId: undefined,
    alt: 'Manna distribution center welcome mat with boots reading Come As You Are',
    aspect: '4/5',
  },
  'home.hero.top': {
    publicId: undefined,
    alt: 'Fresh produce and vine-ripened tomatoes prepared for Saturday food distribution',
    aspect: '4/3',
  },
  'home.hero.bottom': {
    publicId: undefined,
    alt: 'Brown paper bags filled with nutritious groceries packed for local families',
    aspect: '4/3',
  },
} as const satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
