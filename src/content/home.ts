import {
  Calendar,
  Heart,
  MapPin,
  Building2,
  Share2,
  Truck,
  Users,
  HandHeart,
  Handshake,
  CircleDollarSign,
  Snowflake,
  Boxes,
  Lightbulb,
  type LucideIcon,
} from 'lucide-react';
import type { ImageKey } from './images';

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

export interface FoodJourneyStep {
  /** Unique identifier */
  id: string;
  /** Step number formatted with leading zero, e.g. '01' */
  stepNumber: string;
  /** Category badge text in uppercase */
  category: string;
  /** Lucide icon for category badge */
  categoryIcon: LucideIcon;
  /** Step main headline */
  heading: string;
  /** Step body description */
  description: string;
  /** Assurance check line text */
  checkText: string;
  /** Image registry asset key */
  imageKey: ImageKey;
}

export interface FoodJourneySummaryChip {
  /** Unique identifier */
  id: string;
  /** Large metric number or range */
  value: string;
  /** Descriptive label */
  label: string;
  /** Whether the chip is given a highlighted warm background */
  isHighlighted?: boolean;
}

export interface HomeFoodJourneyContent {
  /** Section eyebrow */
  eyebrow: string;
  /** Main section headline */
  headline: string;
  /** Descriptive lead paragraph */
  lead: string;
  /** Continuation cue in top right */
  pathCue: {
    label: string;
  };
  /** The 4 timeline steps */
  steps: FoodJourneyStep[];
  /** White summary card at bottom */
  summaryCard: {
    headline: string;
    lead: string;
    action: {
      label: string;
      href: string;
    };
    chips: FoodJourneySummaryChip[];
  };
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

/**
 * Food Journey section content grounded in:
 * `design-reference/Home Page/3-Food journey.png`
 */
export const homeFoodJourneyContent: HomeFoodJourneyContent = {
  eyebrow: 'HOW WE SERVE',
  headline: 'Support by appointment every Saturday.',
  lead: 'Families receive groceries and support with dignity, care, and no judgment.',
  pathCue: {
    label: 'THE PATH CONTINUES',
  },
  steps: [
    {
      id: 'step-01',
      stepNumber: '01',
      category: 'FAMILIES RECEIVE GROCERIES',
      categoryIcon: Building2,
      heading: 'Support is provided by appointment.',
      description: 'Families receive groceries and support with dignity, care, and no judgment.',
      checkText: 'No income verification, paperwork, or judgment.',
      imageKey: 'home.journey.step1',
    },
    {
      id: 'step-02',
      stepNumber: '02',
      category: 'SUPPORT IS SHARED',
      categoryIcon: Share2,
      heading: 'Families receive groceries and care.',
      description: 'Support is provided with dignity, care, and no judgment.',
      checkText: 'Support is provided every Saturday.',
      imageKey: 'home.journey.step2',
    },
    {
      id: 'step-03',
      stepNumber: '03',
      category: 'FAMILIES ARE SERVED',
      categoryIcon: Truck,
      heading: 'Families receive groceries and support.',
      description: 'Support is provided with dignity, care, and no judgment.',
      checkText: 'Support is provided every Saturday.',
      imageKey: 'home.journey.step3',
    },
    {
      id: 'step-04',
      stepNumber: '04',
      category: 'FAMILIES ARE SERVED',
      categoryIcon: Users,
      heading: 'Families receive groceries and support.',
      description: 'Support is provided with dignity, care, and no judgment.',
      checkText: 'Support is provided every Saturday.',
      imageKey: 'home.journey.step4',
    },
  ],
  summaryCard: {
    headline: 'Support by appointment every Saturday.',
    lead: 'Families receive groceries and support with dignity, care, and no judgment.',
    action: {
      label: 'See how we measure impact',
      href: '/mission',
    },
    chips: [
      {
        id: 'families-weekly',
        value: '40-60',
        label: 'families served every Saturday',
      },
      {
        id: 'annual-groceries',
        value: '$390,000+',
        label: 'in groceries distributed annually',
      },
      {
        id: 'per-visit',
        value: '$150',
        label: 'in groceries per family visit',
      },
      {
        id: 'weekly-goal',
        value: '100',
        label: 'families weekly goal',
        isHighlighted: true,
      },
    ],
  },
};

export interface PathwayCard {
  /** Unique identifier */
  id: string;
  /** Uppercase audience label */
  audience: string;
  /** Lucide icon for card badge */
  icon: LucideIcon;
  /** Background tone for the card */
  tone: 'lavender' | 'warm' | 'sage';
  /** Main card title */
  title: string;
  /** Supporting descriptive copy */
  description: string;
  /** Checklist items with green checkmarks */
  features: string[];
  /** Primary button action */
  action: {
    label: string;
    href: string;
  };
}

export interface ManyHandsMosaic {
  /** Section eyebrow label */
  eyebrow: string;
  /** Main statement headline */
  headline: string;
  /** Contextual description */
  description: string;
  /** List of tag chips */
  tags: string[];
  /** Pathway button action */
  action: {
    label: string;
    href: string;
  };
  /** Three mosaic images */
  images: {
    main: ImageKey;
    hands: ImageKey;
    community: ImageKey;
  };
}

export interface HomeWaysToHelpContent {
  /** Eyebrow label */
  eyebrow: string;
  /** Main section headline */
  headline: string;
  /** Contextual lead description */
  lead: string;
  /** The 3 pathway cards */
  pathways: PathwayCard[];
  /** The Many Hands mosaic banner */
  manyHands: ManyHandsMosaic;
}

/**
 * Ways to Help section content grounded in:
 * `design-reference/Home Page/4-Ways to take part.png`
 */
export const homeWaysToHelpContent: HomeWaysToHelpContent = {
  eyebrow: 'WAYS TO HELP',
  headline: 'Three ways to help.',
  lead: 'Whether you need food support, can share resources, or want to fund the mission, there is a clear next step.',
  pathways: [
    {
      id: 'neighbors',
      audience: 'FOR NEIGHBORS',
      icon: HandHeart,
      tone: 'lavender',
      title: 'Request Food Support',
      description: 'Request groceries and support by appointment every Saturday.',
      features: [
        'Locate the nearest distribution',
        'Share dietary or access needs',
        'Receive a private follow-up',
      ],
      action: {
        label: 'Request Food Assistance',
        href: '/get-help',
      },
    },
    {
      id: 'partners',
      audience: 'FOR FOOD AND SITE PARTNERS',
      icon: Handshake,
      tone: 'warm',
      title: 'Partner with Us',
      description: 'Partner with us to help collect, recover, and distribute groceries.',
      features: [
        'Offer food or logistics capacity',
        'Host a distribution point',
        'Plan safe, reliable handoffs',
      ],
      action: {
        label: 'Become A Partner',
        href: '/community/partners',
      },
    },
    {
      id: 'funders',
      audience: 'FOR FUNDERS AND SPONSORS',
      icon: CircleDollarSign,
      tone: 'sage',
      title: 'Fund the Mission',
      description: 'Help provide groceries and support for families in need.',
      features: [
        'Sponsor a route or center',
        'Support capacity-building grants',
        'Build an employee giving plan',
      ],
      action: {
        label: 'Learn More About Giving',
        href: '/donate',
      },
    },
  ],
  manyHands: {
    eyebrow: 'MADE OF MANY HANDS',
    headline:
      'Together, we collect, recover, and distribute food that might otherwise go to waste straight into the homes of families who need it most.',
    description: 'We are grateful for the community partners who help make this work possible.',
    tags: ['Neighbors', 'Food donors', 'Site hosts', 'Drivers', 'Volunteers', 'Funders'],
    action: {
      label: 'Learn more about partnership',
      href: '/community/partners',
    },
    images: {
      main: 'home.manyHands.main',
      hands: 'home.manyHands.hands',
      community: 'home.manyHands.community',
    },
  },
};

export interface SaturdaySupportStep {
  /** Unique identifier */
  id: string;
  /** Label describing the step */
  label: string;
  /** Dot tone: past uses lavender, current uses gold */
  isHighlighted?: boolean;
}

export interface OperationalFeatureCard {
  /** Unique identifier */
  id: string;
  /** Feature icon */
  icon: LucideIcon;
  /** Feature headline */
  title: string;
  /** Feature description */
  description: string;
}

export interface HomeOperationalFootprintContent {
  /** Eyebrow label */
  eyebrow: string;
  /** Section headline */
  headline: string;
  /** Descriptive lead */
  lead: string;
  /** Visual callout box */
  callout: {
    icon: LucideIcon;
    text: string;
  };
  /** Link action */
  action: {
    label: string;
    href: string;
  };
  /** Primary operational photograph asset key */
  imageKey: ImageKey;
  /** Floating Saturday support mini-timeline card */
  miniTimeline: {
    title: string;
    steps: SaturdaySupportStep[];
    note: string;
  };
  /** Three feature cards */
  features: OperationalFeatureCard[];
}

/**
 * Operational Footprint content grounded in:
 * `design-reference/Home Page/5-Operational footprint.png`
 */
export const homeOperationalFootprintContent: HomeOperationalFootprintContent = {
  eyebrow: 'BUILT FOR DEPENDABLE ACCESS',
  headline: 'Support is provided with dignity and care.',
  lead: 'Families receive groceries and support by appointment every Saturday.',
  callout: {
    icon: Lightbulb,
    text: 'Support is provided with dignity, care, and no judgment.',
  },
  action: {
    label: 'Learn more about our mission',
    href: '/mission',
  },
  imageKey: 'home.footprint.primary',
  miniTimeline: {
    title: 'SATURDAY SUPPORT',
    steps: [
      { id: 'pickup', label: 'Provider pickup', isHighlighted: false },
      { id: 'sort', label: 'Central sort', isHighlighted: false },
      { id: 'support', label: 'Family support', isHighlighted: true },
    ],
    note: 'Support is provided by appointment every Saturday.',
  },
  features: [
    {
      id: 'cold-safe',
      icon: Snowflake,
      title: 'Cold-safe receiving',
      description: 'Temperature-aware intake, labeling, and short-term storage protect quality.',
    },
    {
      id: 'flexible-staging',
      icon: Boxes,
      title: 'Flexible staging',
      description:
        'Modular zones adapt to produce, pantry staples, prepared meals, and household needs.',
    },
    {
      id: 'neighborhood-reach',
      icon: MapPin,
      title: 'Neighborhood reach',
      description: 'Centers anchor smaller pop-ups and delivery routes closer to residents.',
    },
  ],
};
