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
 *   - msam/home/mission-primary
 *   - msam/home/mission-secondary
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
  'home.mission.primary': {
    publicId: undefined,
    src: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&w=800&q=80',
    alt: 'Volunteers preparing fresh grocery packages and food provisions at community distribution center',
    aspect: '3/4',
  },
  'home.mission.secondary': {
    publicId: undefined,
    src: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?auto=format&fit=crop&w=600&q=80',
    alt: 'Crates of wholesome produce being handed to families during Saturday grocery appointment',
    aspect: '3/4',
  },
  'home.journey.step1': {
    publicId: undefined,
    src: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=800&q=80',
    alt: 'Volunteers organizing fresh produce crates during Saturday distribution appointment',
    aspect: '4/3',
  },
  'home.journey.step2': {
    publicId: undefined,
    src: 'https://images.unsplash.com/photo-1593113616828-6f22bca04804?auto=format&fit=crop&w=800&q=80',
    alt: 'Volunteers packing and sorting wholesome grocery provisions into bags and boxes',
    aspect: '4/3',
  },
  'home.journey.step3': {
    publicId: undefined,
    src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    alt: 'Paper grocery bags loaded with fresh vegetables, greens, and fruits ready for pickup',
    aspect: '4/3',
  },
  'home.journey.step4': {
    publicId: undefined,
    src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
    alt: 'Family gathered together preparing and enjoying a nourishing meal in their kitchen',
    aspect: '4/3',
  },
  'home.manyHands.main': {
    publicId: undefined,
    src: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80',
    alt: 'Community members gathering around an abundant table of fresh produce and groceries',
    aspect: '16/9',
  },
  'home.manyHands.hands': {
    publicId: undefined,
    src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    alt: 'Diverse hands of community volunteers and partners joined together in solidarity',
    aspect: '4/3',
  },
  'home.manyHands.community': {
    publicId: undefined,
    src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
    alt: 'Neighbors and community members enjoying a shared meal and meaningful connection',
    aspect: '4/3',
  },
} as const satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
