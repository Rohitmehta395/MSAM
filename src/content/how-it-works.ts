import type { ImageKey } from './images';
import { siteConfig } from '@/config/site';

export interface HowItWorksHeroAction {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

export interface HowItWorksHeroContent {
  eyebrow: string;
  headline: string;
  lead: string;
  primaryAction: HowItWorksHeroAction;
  secondaryAction: HowItWorksHeroAction;
  reassurance: string;
  images: {
    main: ImageKey;
    top: ImageKey;
    bottom: ImageKey;
  };
}

export interface HowItWorksStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  imageKey: ImageKey;
}

export interface HowItWorksTimelineContent {
  eyebrow: string;
  headline: string;
  steps: HowItWorksStep[];
}

export interface HowItWorksWhoWeServeContent {
  eyebrow: string;
  headline: string;
  paragraphs: string[];
  callout: {
    text: string;
  };
  imageKey: ImageKey;
}

export interface HowItWorksPrayerContent {
  eyebrow: string;
  headline: string;
  phoneLabel: string;
  phoneNumber: string;
  phoneHref: string;
}

export interface HowItWorksIntakeFieldConfig {
  label: string;
  placeholder: string;
}

export interface HowItWorksIntakeContent {
  sectionEyebrow: string;
  sectionHeadline: string;
  sectionAction: {
    label: string;
    href: string;
  };
  cardTitle: string;
  cardSubtitle: string;
  cardDescription: string;
  fields: {
    householdName: HowItWorksIntakeFieldConfig;
    peopleCount: HowItWorksIntakeFieldConfig;
    firstName: HowItWorksIntakeFieldConfig;
    lastName: HowItWorksIntakeFieldConfig;
    phone: HowItWorksIntakeFieldConfig;
    email: HowItWorksIntakeFieldConfig;
  };
  dietaryPreferences: {
    title: string;
    description: string;
    fieldLabel: string;
    options: Array<{ id: string; label: string }>;
  };
  submitLabel: string;
}

export const howItWorksHeroContent: HowItWorksHeroContent = {
  eyebrow: 'GET HELP',
  headline: 'Getting Food Is Simple',
  lead: 'Reach us at (954) 406-7580 to schedule your visit. We serve by appointment every Saturday to make sure every family gets the time and attention they deserve.',
  primaryAction: {
    label: 'Call for an Appointment',
    href: 'tel:9544067580',
    variant: 'primary',
  },
  secondaryAction: {
    label: 'Need Prayer',
    href: '#prayer',
    variant: 'secondary',
  },
  reassurance: 'No income verification. No paperwork. No judgment.',
  images: {
    main: 'howItWorks.hero.main',
    top: 'howItWorks.hero.top',
    bottom: 'howItWorks.hero.bottom',
  },
};

export const howItWorksTimelineContent: HowItWorksTimelineContent = {
  eyebrow: 'WHAT WE OFFER',
  headline: 'Getting Food Is Simple',
  steps: [
    {
      id: 'step-01',
      stepNumber: '01',
      title: 'Call for an Appointment',
      description:
        'Reach us at (954) 406-7580 to schedule your visit. We serve by appointment every Saturday to make sure every family gets the time and attention they deserve.',
      imageKey: 'howItWorks.steps.step1',
    },
    {
      id: 'step-02',
      stepNumber: '02',
      title: 'Come As You Are',
      description:
        'No income verification. No paperwork. No judgment. Bring yourself and your family.',
      imageKey: 'howItWorks.steps.step2',
    },
    {
      id: 'step-03',
      stepNumber: '03',
      title: 'Leave with More Than Food',
      description:
        'We distribute approximately $150 worth of fresh and non-perishable groceries per family. We also offer prayer, encouragement, and connection. You are not alone.',
      imageKey: 'howItWorks.steps.step3',
    },
  ],
};

export const howItWorksWhoWeServeContent: HowItWorksWhoWeServeContent = {
  eyebrow: 'WHO WE SERVE',
  headline: 'Who We Serve',
  paragraphs: [
    'We serve anyone experiencing food insecurity in our community, including working families facing financial hardship, seniors on fixed incomes, individuals in transition or crisis, and families with children. There are no income requirements. We trust you. If you need help, we are here every Saturday.',
  ],
  callout: {
    text: 'No income verification. No paperwork. No judgment. Bring yourself and your family.',
  },
  imageKey: 'howItWorks.whoWeServe.primary',
};

export const howItWorksPrayerContent: HowItWorksPrayerContent = {
  eyebrow: 'NEED PRAYER',
  headline: 'Need Prayer',
  phoneLabel: 'Call for Prayer',
  phoneNumber: '(954) 406-7580',
  phoneHref: 'tel:9544067580',
};

export const howItWorksIntakeContent: HowItWorksIntakeContent = {
  sectionEyebrow: 'REGISTRATION & SUPPORT',
  sectionHeadline: 'Request Support',
  sectionAction: {
    label: 'Call for an Appointment',
    href: siteConfig.phoneHref,
  },
  cardTitle: 'Household Registration Request',
  cardSubtitle: 'Tell us about your household.',
  cardDescription:
    'This brief intake helps us prepare support for your household. We’ll use the information to coordinate your visit and connect you with the right resources.',
  fields: {
    householdName: {
      label: 'Household Name',
      placeholder: 'Household name',
    },
    peopleCount: {
      label: 'Number of people in household',
      placeholder: '1',
    },
    firstName: {
      label: 'First Name',
      placeholder: 'First Name',
    },
    lastName: {
      label: 'Last Name',
      placeholder: 'Last Name',
    },
    phone: {
      label: 'Phone Number',
      placeholder: 'Phone Number',
    },
    email: {
      label: 'Email',
      placeholder: 'Email',
    },
  },
  dietaryPreferences: {
    title: 'Household Dietary Preferences',
    description:
      'Choose any preferences that apply. Availability varies; share allergies or access needs during registration.',
    fieldLabel: 'Dietary preferences (optional)',
    options: [
      { id: 'Dairy-free', label: 'Dairy-free' },
      { id: 'Gluten-free', label: 'Gluten-free' },
      { id: 'No preference', label: 'No preference' },
      { id: 'Vegetarian', label: 'Vegetarian' },
      { id: 'Vegan', label: 'Vegan' },
    ],
  },
  submitLabel: 'Continue registration',
};
