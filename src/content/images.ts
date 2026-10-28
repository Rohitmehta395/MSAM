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
  /** Direct or temporary image URL (e.g. verified Unsplash image) */
  src?: string;
  /** Descriptive alternative text for accessibility */
  alt: string;
  /** Aspect ratio formatted as width/height (e.g. '4/5', '4/3') */
  aspect: AspectRatio;
}

export const images = {
  'home.hero.main': {
    publicId: undefined,
    src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
    alt: 'Volunteers and community members gathering food supplies and fresh goods for weekly distribution',
    aspect: '4/5',
  },
  'home.hero.top': {
    publicId: undefined,
    src: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80',
    alt: 'Crates of fresh, colorful vegetables and crisp produce prepared for distribution',
    aspect: '4/3',
  },
  'home.hero.bottom': {
    publicId: undefined,
    src: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=800&q=80',
    alt: 'Brown paper grocery bags filled with nutritious pantry staples and essentials',
    aspect: '4/3',
  },
} as const satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
