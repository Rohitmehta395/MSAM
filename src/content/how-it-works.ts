import type { ImageKey } from './images';

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

export const howItWorksHeroContent: HowItWorksHeroContent = {
  eyebrow: 'GET HELP',
  headline: 'A helping hand starts here.',
  lead: 'Job loss, illness, or rising costs can make food hard to afford. You are not alone. Call (954) 406-7580 for a Saturday appointment, or start a brief registration below.',
  primaryAction: {
    label: 'Call for an Appointment',
    href: 'tel:9544067580',
    variant: 'primary',
  },
  secondaryAction: {
    label: 'Need Prayer',
    href: 'tel:9544067580',
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
  headline: 'How to Register',
  steps: [
    {
      id: 'step-01',
      stepNumber: '01',
      title: 'Complete a Brief Registration',
      description:
        'Complete a brief registration online or in person. We’ll use the information to prepare support for your household and make your visit as smooth as possible.',
      imageKey: 'howItWorks.steps.step1',
    },
    {
      id: 'step-02',
      stepNumber: '02',
      title: 'Plan Your Saturday Visit',
      description:
        'Call (954) 406-7580 to arrange your appointment. We serve every Saturday and treat each guest with the same respect we ask of our volunteers.',
      imageKey: 'howItWorks.steps.step2',
    },
    {
      id: 'step-03',
      stepNumber: '03',
      title: 'What You’ll Receive',
      description:
        'Receive nutritious groceries for your household—about $150 in fresh and non-perishable food per family visit—along with a warm welcome, prayer, and encouragement if you wish.',
      imageKey: 'howItWorks.steps.step3',
    },
  ],
};
