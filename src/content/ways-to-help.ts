export interface WaysToHelpHeroContent {
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

export const waysToHelpHeroContent: WaysToHelpHeroContent = {
  eyebrow: '100% donor-funded and volunteer-powered.',
  headline: 'Give, Serve, Share',
  headlineLine1: 'Give, Serve,',
  headlineLine2: 'Share',
  description:
    'Manna Share A Meal is sustained by individuals, businesses, and churches. Join us with fresh healthy food, volunteer time, and steady support.',
};

export type ParticipationCardTone = 'lavender' | 'warm' | 'sage';
export type ParticipationCardIcon = 'HandHeart' | 'Handshake' | 'CircleDollarSign';

export interface WaysToHelpParticipationCard {
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

export interface WaysToHelpExploreContent {
  eyebrow: string;
  headline: string;
  contactPrompt: string;
  cards: WaysToHelpParticipationCard[];
}

export const waysToHelpExploreContent: WaysToHelpExploreContent = {
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

export type PathwayTabId = 'give-food' | 'serve' | 'give-funds';

export interface PathwayTabItem {
  id: PathwayTabId;
  label: string;
  defaultAreaOfInterest: string;
}

export interface WaysToHelpContactPathwaysContent {
  eyebrow: string;
  headline: string;
  contactPrompt: {
    prefix: string;
    phoneText: string;
    phoneHref: string;
  };
  subheading: string;
  tabs: PathwayTabItem[];
  fields: {
    nameAndOrg: {
      label: string;
      placeholder: string;
    };
    areaOfInterest: {
      label: string;
      placeholder: string;
    };
    tellUsMore: {
      label: string;
      placeholder: string;
    };
    contactDetails: {
      label: string;
      placeholder: string;
    };
  };
  consentText: string;
  submitLabel: string;
  reassuranceText: string;
}

export const waysToHelpContactPathwaysContent: WaysToHelpContactPathwaysContent = {
  eyebrow: 'EXPLORE WAYS TO HELP',
  headline: 'Explore ways to give, serve, and share.',
  contactPrompt: {
    prefix: 'Questions about giving or serving? Call',
    phoneText: '(954) 406-7580.',
    phoneHref: 'tel:+19544067580',
  },
  subheading: 'Tell us how you’d like to help and we’ll follow up with the best next step.',
  tabs: [
    {
      id: 'give-food',
      label: 'Give Food',
      defaultAreaOfInterest: 'Food, serving, funds, or another way to help',
    },
    {
      id: 'serve',
      label: 'Serve',
      defaultAreaOfInterest: 'Volunteering, meal packing, or Saturday distribution',
    },
    {
      id: 'give-funds',
      label: 'Give Funds',
      defaultAreaOfInterest: 'Monthly giving, sponsor support, or general fund',
    },
  ],
  fields: {
    nameAndOrg: {
      label: 'Name and organization',
      placeholder: 'Your name, title, and organization',
    },
    areaOfInterest: {
      label: 'Area of interest',
      placeholder: 'Food, serving, funds, or another way to help',
    },
    tellUsMore: {
      label: 'Tell us more',
      placeholder: 'Share your idea, capacity, or questions',
    },
    contactDetails: {
      label: 'Contact details',
      placeholder: 'Email and phone',
    },
  },
  consentText:
    'I agree to be contacted about this request. My information will be handled respectfully.',
  submitLabel: 'Send inquiry',
  reassuranceText: 'We’ll follow up with the best next step for your interest.',
};

// Backwards-compatible aliases
export type MissionHeroContent = WaysToHelpHeroContent;
export const missionHeroContent = waysToHelpHeroContent;

export type MissionParticipationCard = WaysToHelpParticipationCard;
export type MissionWaysToHelpContent = WaysToHelpExploreContent;
export const missionWaysToHelpContent = waysToHelpExploreContent;

export type MissionContactPathwaysContent = WaysToHelpContactPathwaysContent;
export const missionContactPathwaysContent = waysToHelpContactPathwaysContent;
