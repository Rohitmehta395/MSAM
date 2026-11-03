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

export interface FoodProviderPartnersContent {
  eyebrow: string;
  heading: string;
  slotCount: number;
}

export const foodProviderPartnersContent: FoodProviderPartnersContent = {
  eyebrow: 'OUR COMMUNITY PARTNERS',
  heading: 'Food Provider Partners',
  slotCount: 5,
};

export interface FoodProviderInquiryContent {
  eyebrow: string;
  heading: string;
  description: string;
  imageKey: ImageKey;
  cardTitle: string;
  cardPrompt: string;
  fields: {
    nameAndOrg: {
      label: string;
      placeholder: string;
    };
    foodType: {
      label: string;
      placeholder: string;
    };
    quantityAndFrequency: {
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

export const foodProviderInquiryContent: FoodProviderInquiryContent = {
  eyebrow: 'BECOME A PARTNER',
  heading: 'We Pick Up The Food',
  description:
    'We partner with food providers to source nutritious food, build community through meals, and serve every person with dignity.',
  imageKey: 'community.foodProviders.inquiry',
  cardTitle: 'Food Provider Inquiry',
  cardPrompt:
    'Tell us about the food you’d like to share and we’ll discuss a respectful next step for pickup, timing, and distribution.',
  fields: {
    nameAndOrg: {
      label: 'Name and organization',
      placeholder: 'Your name, title, and organization',
    },
    foodType: {
      label: 'Food type',
      placeholder: 'Fresh produce, prepared meals, shelf-stable items, or other',
    },
    quantityAndFrequency: {
      label: 'Quantity and frequency',
      placeholder:
        'Approximate volume, how often it is available, and any storage or handling notes',
    },
    contactDetails: {
      label: 'Availability and contact',
      placeholder: 'Email, phone, and best time to discuss',
    },
  },
  consentText:
    'I agree to be contacted about this request. My information will be handled respectfully.',
  submitLabel: 'Start a Conversation',
  reassuranceText: 'We’ll follow up to discuss details and next steps.',
};
