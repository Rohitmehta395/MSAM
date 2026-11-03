export interface MissionHeroStat {
  id: string;
  label: string;
  value: string;
  supportingText: string;
}

export interface MissionImpactCardContent {
  heading: string;
  description: string;
  badge: string;
  stats: MissionHeroStat[];
}

export interface MissionHeroContent {
  eyebrow: string;
  headline: string;
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  benefits: string[];
  impactCard: MissionImpactCardContent;
}

export const missionHeroContent: MissionHeroContent = {
  eyebrow: 'WHY YOUR GIFT MATTERS',
  headline: 'Your gift puts hope on the table.',
  headlineLine1: 'Your gift puts hope',
  headlineLine2: 'on the table.',
  description:
    'Manna Share A Meal is 100% donor-funded, with no government funding. Your generosity supports nutritious food, practical outreach, and year-round care for neighbors.',
  benefits: [
    'Supports fresh healthy food for families visiting every Saturday.',
    'Helps collection, organization, and distribution stay reliable.',
    'Sustains year-round service and care for neighbors in need.',
  ],
  impactCard: {
    heading: 'Your impact in action',
    description:
      'Food shared with dignity. Families welcomed with care. Volunteers equipped to serve.',
    badge: 'LOCAL SERVICE',
    stats: [
      {
        id: 'families-served',
        label: 'FAMILIES SERVED',
        value: '40–60',
        supportingText: 'Every Saturday',
      },
      {
        id: 'annual-groceries',
        label: 'ANNUAL GROCERIES',
        value: '$390k+',
        supportingText: 'Supported annually',
      },
      {
        id: 'goal',
        label: 'GOAL',
        value: '100',
        supportingText: 'Families weekly',
      },
    ],
  },
};

export type MissionGratitudeIcon = 'Heart' | 'HandHeart' | 'CircleDollarSign';

export interface MissionGratitudeCard {
  id: string;
  icon: MissionGratitudeIcon;
  title: string;
  description: string;
}

export interface MissionGratitudeContent {
  eyebrow: string;
  heading: string;
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  badgeLabel: string;
  cards: MissionGratitudeCard[];
}

export const missionGratitudeContent: MissionGratitudeContent = {
  eyebrow: 'THANK YOU FOR MAKING THE DIFFERENCE',
  heading: 'Every meal shared is more than nourishment.',
  headlineLine1: 'Every meal shared is more than',
  headlineLine2: 'nourishment.',
  description:
    'Because of your generosity, we serve with hope and compassion, and gifts strengthen families and community.',
  badgeLabel: 'A HEARTFELT THANKS',
  cards: [
    {
      id: 'someone-cares',
      icon: 'Heart',
      title: 'A message someone cares',
      description: 'Every meal shared reminds families that hope is alive and God’s love is real.',
    },
    {
      id: 'strengthen-families',
      icon: 'HandHeart',
      title: 'Gifts strengthen families',
      description:
        'Together, one meal and one act of kindness at a time, we build a more compassionate community.',
    },
    {
      id: 'grateful',
      icon: 'CircleDollarSign',
      title: 'We are grateful',
      description:
        'We value transparency, faithful stewardship, and maximizing every dollar for impact.',
    },
  ],
};
