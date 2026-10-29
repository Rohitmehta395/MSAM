import { siteConfig } from '@/config/site';

export interface NavItem {
  /** Navigation label displayed in UI */
  label: string;
  /** Navigation destination path */
  href: string;
  /** Optional badge text or highlight */
  badge?: string;
  /** Whether link is hidden from standard rendering */
  hidden?: boolean;
  /** Optional nested child navigation links (e.g. for mobile menu expansion) */
  children?: readonly NavItem[];
}

export interface UrgentMessageData {
  /** Display headline text containing prayer notice and phone */
  text: string;
  /** Formatted phone display string sourced from siteConfig */
  phoneDisplay: string;
  /** Telephone URI destination for clickable direct-dial */
  phoneHref: string;
  /** Action button or link accompanying the urgent message */
  action: {
    label: string;
    href: string;
  };
}

export interface FooterColumn {
  /** Section heading title for footer navigation group */
  title: string;
  /** Links belonging to the column */
  links: NavItem[];
}

/**
 * Primary header navigation links.
 * Note: 'Community' is treated as active for any '/community/*' subroute.
 */
export const primaryNav: readonly NavItem[] = [
  { label: 'Our mission', href: '/mission' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Ways to help', href: '/donate' },
  {
    label: 'Community',
    href: '/community/food-providers',
    children: [
      { label: 'Food Providers', href: '/community/food-providers' },
      { label: 'Volunteers', href: '/community/volunteers' },
      { label: 'Partners', href: '/community/partners' },
    ],
  },
] as const;

/**
 * Top header call-to-action buttons.
 */
export const headerCtas: readonly NavItem[] = [
  { label: 'Get Food Support', href: '/get-help' },
  { label: 'Donate Now', href: '/donate' },
] as const;

/**
 * Top-bar urgent prayer message and recurring donation pathway.
 * Phone details are dynamically sourced from siteConfig.
 */
export const urgentMessage: UrgentMessageData = {
  text: 'Need Prayer? Call us: 954-406-7580',
  phoneDisplay: siteConfig.phoneDisplay,
  phoneHref: siteConfig.phoneHref,
  action: {
    label: 'Give monthly',
    href: '/donate',
  },
} as const;

/**
 * Global footer columns and navigational pathways.
 */
export const footerColumns: readonly FooterColumn[] = [
  {
    title: 'Ways to help',
    links: [
      { label: 'Request groceries and support', href: '/get-help' },
      { label: 'Donate food', href: '/community/food-providers' },
      { label: 'Host a distribution', href: '/community/partners' },
      { label: 'Volunteer', href: '/community/volunteers' },
      { label: 'Fund the mission', href: '/donate' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our mission', href: '/mission' },
      { label: 'How food moves', href: '/how-it-works' },
      { label: 'Community members', href: '/community/food-providers' },
      { label: 'Impact and stewardship', href: '/mission#regional-growth' },
      { label: 'News and stories', href: '/news', hidden: true },
    ],
  },
] as const;

/**
 * Legal, privacy, and compliance links displayed in the footer bottom bar.
 */
export const legalLinks: readonly NavItem[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Financial transparency', href: '/financial-transparency' },
] as const;
