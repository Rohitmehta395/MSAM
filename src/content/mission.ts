export interface MissionHeroContent {
  /** Eyebrow badge text */
  eyebrow: string;
  /** Main display headline */
  headline: string;
  /** First line of headline for desktop wrapping */
  headlineLine1: string;
  /** Second line of headline for desktop wrapping */
  headlineLine2: string;
  /** Supporting editorial paragraph */
  description: string;
}

export const missionHeroContent: MissionHeroContent = {
  eyebrow: '100% donor-funded and volunteer-powered.',
  headline: 'Give, Serve, Share',
  headlineLine1: 'Give, Serve,',
  headlineLine2: 'Share',
  description:
    'Manna Share A Meal is sustained by individuals, businesses, and churches. Join us with fresh healthy food, volunteer time, and steady support.',
};

export type ParticipationCardTone = 'lavender' | 'warm' | 'sage';
export type ParticipationCardIcon = 'HandHeart' | 'Handshake' | 'CircleDollarSign';

export interface MissionParticipationCard {
  id: string;
  tone: ParticipationCardTone;
  icon: ParticipationCardIcon;
  audience: string;
  title: string;
  description: string;
  features: string[];
  action: {
    label: string;
    href: string;
  };
}

export interface MissionWaysToHelpContent {
  eyebrow: string;
  headline: string;
  contactPrompt: string;
  cards: MissionParticipationCard[];
}

export const missionWaysToHelpContent: MissionWaysToHelpContent = {
  eyebrow: 'EXPLORE WAYS TO HELP',
  headline: 'Explore ways to give, serve, and share.',
  contactPrompt: 'Questions about giving or serving?',
  cards: [
    {
      id: 'give-food',
      tone: 'lavender',
      icon: 'HandHeart',
      audience: 'FOR FOOD DONORS',
      title: 'Give Food',
      description:
        'Share fresh, healthy groceries and support families year-round through collection, distribution, and steady food drives.',
      features: [
        'Share fresh, healthy groceries',
        'Organize a food drive',
        'Support year-round distribution',
      ],
      action: {
        label: 'Learn more about giving food',
        href: '/community/food-providers',
      },
    },
    {
      id: 'serve',
      tone: 'warm',
      icon: 'Handshake',
      audience: 'FOR VOLUNTEERS',
      title: 'Serve',
      description:
        'Join us in packing, distribution, food drives, and hospitality so every guest feels seen and cared for.',
      features: [
        'Help with packing and distribution',
        'Lead a food drive',
        'Offer hospitality and care',
      ],
      action: {
        label: 'Learn more about serving',
        href: '/community/volunteers',
      },
    },
    {
      id: 'give-funds',
      tone: 'sage',
      icon: 'CircleDollarSign',
      audience: 'FOR DONORS',
      title: 'Give Funds',
      description:
        'Monthly giving provides steady support. Corporate partnerships and in-kind gifts are also welcome.',
      features: [
        'Support monthly giving',
        'Explore corporate partnerships',
        'Give in-kind gifts and food drives',
      ],
      action: {
        label: 'Learn more about giving funds',
        href: '/donate',
      },
    },
  ],
};
