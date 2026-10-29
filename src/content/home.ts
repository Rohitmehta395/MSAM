import { Calendar, Heart, MapPin, type LucideIcon } from 'lucide-react';

export interface HeroAction {
  /** Button label */
  label: string;
  /** Internal or external destination URL */
  href: string;
  /** Visual button variant */
  variant?: 'primary' | 'secondary' | 'dark' | 'light';
  /** Trailing icon */
  icon?: 'arrow' | 'heart' | 'none';
}

export interface HeroFloatingCard {
  /** Card primary bold title */
  title: string;
  /** Card secondary descriptive subtitle */
  subtitle: string;
}

export interface HomeHeroContent {
  /** Eyebrow pill text */
  eyebrow: string;
  /** Display H1 headline */
  headline: string;
  /** Editorial lead paragraph */
  lead: string;
  /** Primary call-to-action */
  primaryAction: HeroAction;
  /** Secondary call-to-action */
  secondaryAction: HeroAction;
  /** Below-CTA reassurance guarantee text */
  reassurance: string;
  /** Floating badge card overlaid on the hero mosaic */
  floatingCard: HeroFloatingCard;
}

export interface TrustStripItem {
  /** Unique key for React rendering */
  id: string;
  /** Bold title */
  title: string;
  /** Supporting description */
  description: string;
  /** Lucide icon component */
  icon: LucideIcon;
}

export interface HomeMissionContent {
  /** Section eyebrow label */
  eyebrow: string;
  /** Main section headline */
  headline: string;
  /** Body paragraphs describing the mission */
  paragraphs: string[];
  /** Pathway action link */
  action: {
    label: string;
    href: string;
  };
  /** Lavender origin tile embedded in the collage */
  originTile: {
    eyebrow: string;
    statement: string;
  };
}

export interface HomeImpactStat {
  /** Unique identifier for rendering key */
  id: string;
  /** Large metric value */
  value: string;
  /** Primary bold description */
  label: string;
  /** Secondary contextual explanation */
  caption: string;
}

export interface HomeImpactContent {
  /** Section eyebrow label */
  eyebrow: string;
  /** Main section headline */
  headline: string;
  /** Contextual lead description */
  description: string;
  /** Four metric cards */
  stats: HomeImpactStat[];
}

/**
 * Hero content grounded in the approved design reference:
 * `design-reference/Home Page/1-Hero.png`
 */
export const homeHeroContent: HomeHeroContent = {
  eyebrow: 'Fed by Faith. Driven by Love.',
  headline: '35 Years Feeding Our Neighbors.',
  lead: 'We provide groceries and support by appointment every Saturday, with no income verification, paperwork, or judgment.',
  primaryAction: {
    label: 'Help deliver meals',
    href: '/community/volunteers',
    variant: 'primary',
  },
  secondaryAction: {
    label: 'Become a food partner',
    href: '/community/food-providers',
    variant: 'secondary',
  },
  reassurance: 'No income verification, paperwork, or judgment.',
  floatingCard: {
    title: 'Support by appointment',
    subtitle: 'Families receive groceries with dignity and care.',
  },
};

/**
 * Trust strip items positioned directly below the hero mosaic,
 * emphasizing accessibility, dignity, and longevity in Broward County.
 */
export const homeTrustStripItems: TrustStripItem[] = [
  {
    id: 'appointment',
    title: 'Support by appointment',
    description: 'No income verification, paperwork, or judgment.',
    icon: Calendar,
  },
  {
    id: 'community',
    title: 'Community support',
    description: 'Groceries and care for families in need.',
    icon: Heart,
  },
  {
    id: 'roots',
    title: 'Broward County roots',
    description: 'Serving Broward County for over 35 years.',
    icon: MapPin,
  },
];

/**
 * Mission & Origin section content grounded in:
 * `design-reference/Home Page/2-Mission and origin.png`
 */
export const homeMissionContent: HomeMissionContent = {
  eyebrow: 'OUR MISSION',
  headline: 'Our mission is spiritual and nutritional nourishment for those who need it most.',
  paragraphs: [
    'We provide groceries and support by appointment every Saturday, with no income verification, paperwork, or judgment.',
    'We serve Broward County and are supported entirely by private giving, with no government funding.',
  ],
  action: {
    label: 'Learn more about our mission',
    href: '/mission',
  },
  originTile: {
    eyebrow: 'OUR ORIGIN',
    statement: 'How a shared meal became a wider promise to the neighborhood.',
  },
};

/**
 * Navy Impact Panel content grounded in:
 * `design-reference/Home Page/2-Mission and origin.png`
 */
export const homeImpactContent: HomeImpactContent = {
  eyebrow: 'OUR IMPACT',
  headline: 'Serving Broward County for over 35 years.',
  description: 'We currently serve 40–60 families every Saturday.',
  stats: [
    {
      id: 'families-weekly',
      value: '40–60',
      label: 'families served every Saturday',
      caption: 'Current weekly support',
    },
    {
      id: 'annual-groceries',
      value: '$390,000+',
      label: 'in groceries distributed annually',
      caption: 'Current annual distribution',
    },
    {
      id: 'family-visit-value',
      value: '$150',
      label: 'in groceries per family visit',
      caption: 'Current average support',
    },
    {
      id: 'weekly-goal',
      value: '100',
      label: 'families weekly goal',
      caption: 'Future weekly service goal',
    },
  ],
};
