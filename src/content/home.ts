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
