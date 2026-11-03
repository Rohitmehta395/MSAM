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

export interface PartnerHeroContent {
  eyebrow: string;
  heading: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  imageKey: ImageKey;
}

export const partnerHeroContent: PartnerHeroContent = {
  eyebrow: 'BECOME A PARTNER',
  heading: 'Community Partners',
  description:
    'We partner with local churches, organizations, and businesses to extend ministry, strengthen neighborhood ties, and build community through meals.',
  primaryCta: {
    label: 'Give Food',
    href: '/community/food-providers',
  },
  secondaryCta: {
    label: 'Give Time',
    href: '/community/volunteers',
  },
  imageKey: 'community.partners.hero',
};

export interface PartnerRosterSlot {
  id: string;
  name?: string;
}

export interface PartnerRosterContent {
  eyebrow: string;
  heading: string;
  slots: PartnerRosterSlot[];
}

export const partnerRosterContent: PartnerRosterContent = {
  eyebrow: 'SERVING TOGETHER',
  heading: 'Our community partners',
  slots: [
    { id: 'partner-slot-1' },
    { id: 'partner-slot-2' },
    { id: 'partner-slot-3' },
    { id: 'partner-slot-4' },
    { id: 'partner-slot-5' },
  ],
};

export interface PartnerAppreciationContent {
  eyebrow: string;
  heading: string;
  description: string;
  floatingCard: {
    text: string;
  };
  imageKey: ImageKey;
}

export const partnerAppreciationContent: PartnerAppreciationContent = {
  eyebrow: 'WITH GRATITUDE',
  heading: 'Many gifts. One shared purpose.',
  description:
    'Individuals, businesses, and churches sustain this 100% donor-funded, volunteer-powered ministry. We receive no government funding. Your generosity helps us feed neighbors, strengthen relationships, and reflect Christ’s love.',
  floatingCard: {
    text: 'Volunteers are the heartbeat of our ministry.',
  },
  imageKey: 'community.partners.appreciation',
};

export interface PartnerFormContent {
  cardLabel: string;
  cardTitle: string;
  cardDescription: string;
  fields: {
    organization: {
      label: string;
      placeholder: string;
    };
    partnershipType: {
      label: string;
      placeholder: string;
    };
    capacity: {
      label: string;
      placeholder: string;
    };
    primaryContact: {
      label: string;
      placeholder: string;
    };
  };
  consentText: string;
  submitLabel: string;
  reassuranceText: string;
  eyebrow: string;
  heading: string;
  description: string;
  imageKey: ImageKey;
}

export const partnerFormContent: PartnerFormContent = {
  cardLabel: 'COMMUNITY PARTNERS',
  cardTitle: 'Explore Community Partnership',
  cardDescription:
    'Share your interest in in-kind food drives, volunteer teams, church collaboration, or corporate and sponsorship partnerships.',
  fields: {
    organization: {
      label: 'Organization',
      placeholder: 'Organization or business name',
    },
    partnershipType: {
      label: 'What kind of partnership are you exploring?',
      placeholder: 'Food drive, volunteer team, church partnership, or sponsorship',
    },
    capacity: {
      label: 'Tell us about your capacity',
      placeholder: 'Share any details about volume, frequency, timing, or location',
    },
    primaryContact: {
      label: 'Primary contact',
      placeholder: 'Name, role, email, and phone',
    },
  },
  consentText:
    'I agree to be contacted about this request. My information will be handled respectfully.',
  submitLabel: 'Explore Partnership',
  reassuranceText: 'We’ll follow up to discuss how your organization can support the mission.',
  eyebrow: 'PARTNER WITH US',
  heading: 'Put compassion into action.',
  description:
    'Bring your church, business, or community organization into the mission through food drives, volunteer teams, in-kind gifts, or sponsorship. Tell us what you have in mind.',
  imageKey: 'community.partners.form',
};
