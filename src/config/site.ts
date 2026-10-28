export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  ein: string;
  missionStatement: string;
  socials: {
    instagram: string;
    facebook: string;
    linkedin: string;
  };
  serviceArea: string;
}

export const siteConfig: SiteConfig = {
  name: 'Manna — Share A Meal',
  shortName: 'Share A Meal',
  tagline: 'Fed by Faith. Driven by Love.',
  phoneDisplay: '(954) 406-7580',
  phoneHref: 'tel:+19544067580',
  email: 'hello@shareameal.org',
  ein: '65-0637594',
  missionStatement:
    'Our mission is to glorify God by providing nourishment, spiritual encouragement, emotional support, and practical assistance.',
  socials: {
    // TODO: Replace with official Instagram profile URL
    instagram: '#',
    // TODO: Replace with official Facebook page URL
    facebook: '#',
    // TODO: Replace with official LinkedIn company profile URL
    linkedin: '#',
  },
  serviceArea: 'Broward County',
} as const;
