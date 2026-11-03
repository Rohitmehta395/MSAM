import type { ImageKey } from './images';

export interface FoodProviderHeroContent {
  eyebrow: string;
  heading: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  imageKey: ImageKey;
}

export const foodProviderHeroContent: FoodProviderHeroContent = {
  eyebrow: 'BECOME A FOOD PROVIDER',
  heading: 'Become a Food Provider',
  description:
    'Manna Share A Meal is 100% donor-funded and volunteer-powered. We partner with food providers to source nutritious food, build community through meals, and serve every person with dignity.',
  cta: {
    label: 'Start a Food Provider Conversation',
    href: '#food-provider-inquiry',
  },
  imageKey: 'community.foodProviders.hero',
};
