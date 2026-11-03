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

export interface VolunteerHeroContent {
  eyebrow: string;
  heading: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  imageKey: ImageKey;
}

export const volunteerHeroContent: VolunteerHeroContent = {
  eyebrow: 'SERVE WITH US',
  heading: 'Be the hands and feet of Christ.',
  description:
    'Volunteers are the lifeblood of Manna Share A Meal: a community of faithful people who believe in compassion, respect, and practical help for neighbors.',
  cta: {
    label: 'Serve with Us',
    href: '#volunteer-form',
  },
  imageKey: 'community.volunteers.hero',
};

export interface VolunteerAppreciationContent {
  eyebrow: string;
  heading: string;
  description: string;
  floatingCard: {
    text: string;
  };
  imageKey: ImageKey;
}

export const volunteerAppreciationContent: VolunteerAppreciationContent = {
  eyebrow: 'WHY SERVE',
  heading: 'Make a difference. Find community.',
  description:
    'Help pack and distribute groceries, coordinate a food drive, welcome guests, or support a special project. You’ll meet people who share your heart for service and see God at work in small, everyday acts of care.',
  floatingCard: {
    text: 'Volunteers are the lifeblood of Manna Share A Meal.',
  },
  imageKey: 'community.volunteers.appreciation',
};

export interface VolunteerFormContent {
  eyebrow: string;
  heading: string;
  description: string;
  imageKey: ImageKey;
  cardTitle: string;
  interestOptions: string[];
  fields: {
    fullName: {
      label: string;
      placeholder: string;
    };
    phone: {
      label: string;
      placeholder: string;
    };
    email: {
      label: string;
      placeholder: string;
    };
    interests: {
      label: string;
    };
    availabilityAndNotes: {
      label: string;
      placeholder: string;
    };
  };
  submitLabel: string;
}

export const volunteerFormContent: VolunteerFormContent = {
  eyebrow: 'GET STARTED',
  heading: 'Bring your heart for service.',
  description:
    'Share your interests and availability. Our team will help you explore a role, learn what to expect, and take the next step toward serving together.',
  imageKey: 'community.volunteers.form',
  cardTitle: 'Volunteer Interest Form',
  interestOptions: ['Food Packing', 'Food Distribution', 'Food Drives', 'Other'],
  fields: {
    fullName: {
      label: 'Full Name',
      placeholder: 'Name',
    },
    phone: {
      label: 'Phone',
      placeholder: 'Phone Number',
    },
    email: {
      label: 'Email',
      placeholder: 'Email',
    },
    interests: {
      label: 'Areas of Interest',
    },
    availabilityAndNotes: {
      label: 'Availability and Notes',
      placeholder: 'Share your availability, preferred role, or any questions.',
    },
  },
  submitLabel: 'Submit Interest',
};
