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
    src: '/images/temporary/home/hero-main.webp',
    alt: 'Volunteers and community members gathering food supplies and fresh goods for weekly distribution',
    aspect: '4/5',
  },
  'home.hero.top': {
    publicId: undefined,
    src: '/images/temporary/home/hero-top.webp',
    alt: 'Crates of fresh, colorful vegetables and crisp produce prepared for distribution',
    aspect: '4/3',
  },
  'home.hero.bottom': {
    publicId: undefined,
    src: '/images/temporary/home/hero-bottom.webp',
    alt: 'Brown paper grocery bags filled with nutritious pantry staples and essentials',
    aspect: '4/3',
  },
  'home.mission.primary': {
    publicId: undefined,
    src: '/images/temporary/home/mission-hands.webp',
    alt: 'Hands of community members and volunteers joined together in unity and faith',
    aspect: '4/5',
  },
  'home.mission.secondary': {
    publicId: undefined,
    src: '/images/temporary/home/mission-community.webp',
    alt: 'Community members embraced together in support, prayer, and fellowship',
    aspect: '3/4',
  },
  'home.journey.step1': {
    publicId: undefined,
    src: '/images/temporary/home/journey-step1.webp',
    alt: 'Volunteers organizing fresh produce crates during Saturday distribution appointment',
    aspect: '4/3',
  },
  'home.journey.step2': {
    publicId: undefined,
    src: '/images/temporary/home/journey-step2.webp',
    alt: 'Volunteers packing and sorting wholesome grocery provisions into bags and boxes',
    aspect: '4/3',
  },
  'home.journey.step3': {
    publicId: undefined,
    src: '/images/temporary/home/journey-step3.webp',
    alt: 'Paper grocery bags loaded with fresh vegetables, greens, and fruits ready for pickup',
    aspect: '4/3',
  },
  'home.journey.step4': {
    publicId: undefined,
    src: '/images/temporary/home/journey-step4.webp',
    alt: 'Family gathered together preparing and enjoying a nourishing meal in their kitchen',
    aspect: '4/3',
  },
  'home.manyHands.main': {
    publicId: undefined,
    src: '/images/temporary/home/many-hands-main.webp',
    alt: 'Community members gathering around an abundant table of fresh produce and groceries',
    aspect: '16/9',
  },
  'home.manyHands.hands': {
    publicId: undefined,
    src: '/images/temporary/home/many-hands-joined.webp',
    alt: 'Diverse hands of community volunteers and partners joined together in solidarity',
    aspect: '4/3',
  },
  'home.manyHands.community': {
    publicId: undefined,
    src: '/images/temporary/home/many-hands-community.webp',
    alt: 'Neighbors and community members enjoying fellowship and meaningful connection',
    aspect: '4/3',
  },
  'home.footprint.primary': {
    publicId: undefined,
    src: '/images/temporary/home/footprint-warehouse.webp',
    alt: 'Volunteers preparing, sorting, and packing nutritious groceries along staging tables at the distribution center',
    aspect: '4/3',
  },
  'howItWorks.hero.main': {
    publicId: undefined,
    src: '/images/temporary/how-it-works/hero-main.webp',
    alt: 'Community food pantry distribution with volunteers and families selecting fresh produce outdoors',
    aspect: '4/5',
  },
  'howItWorks.hero.top': {
    publicId: undefined,
    src: '/images/temporary/how-it-works/hero-top.webp',
    alt: 'Volunteers carefully organizing fresh carrots, apples, and produce crates',
    aspect: '4/3',
  },
  'howItWorks.hero.bottom': {
    publicId: undefined,
    src: '/images/temporary/how-it-works/hero-bottom.webp',
    alt: 'Family happily cooking and preparing a nourishing meal together in their kitchen',
    aspect: '4/3',
  },
  'howItWorks.steps.step1': {
    publicId: undefined,
    src: '/images/temporary/how-it-works/step-1-registration.webp',
    alt: 'Food pantry coordinator reviewing distribution appointment checklist with a volunteer',
    aspect: '3/2',
  },
  'howItWorks.steps.step2': {
    publicId: undefined,
    src: '/images/temporary/how-it-works/step-2-saturday-visit.webp',
    alt: 'Friendly volunteers unloading crates of wholesome groceries from the distribution van',
    aspect: '3/2',
  },
  'howItWorks.steps.step3': {
    publicId: undefined,
    src: '/images/temporary/how-it-works/step-3-groceries-received.webp',
    alt: 'Community food distribution center staging tables filled with fresh produce and bread',
    aspect: '3/2',
  },
  'howItWorks.whoWeServe.primary': {
    publicId: undefined,
    src: '/images/temporary/how-it-works/who-we-serve.webp',
    alt: 'Families, seniors, and neighbors gathered happily around a warm table sharing a wholesome meal',
    aspect: '4/3',
  },
  'community.foodProviders.hero': {
    publicId: undefined,
    src: '/images/temporary/community/food-providers-hero.webp',
    alt: 'Volunteers and community food partners gathering outdoors around fresh produce and groceries',
    aspect: '4/3',
  },
  'community.foodProviders.inquiry': {
    publicId: undefined,
    src: '/images/temporary/community/food-providers-inquiry.webp',
    alt: 'Volunteers sorting and preparing nutritious food provisions in a community distribution warehouse',
    aspect: '4/3',
  },
} as const satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
