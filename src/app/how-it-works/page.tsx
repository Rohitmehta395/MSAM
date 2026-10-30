import type { Metadata } from 'next';
import { HowItWorksHero, HowItWorksTimeline } from '@/components/sections';

export const metadata: Metadata = {
  title: 'How It Works | Manna Share A Meal',
  description:
    'Getting food support from Manna is simple, dignified, andChrist-centered. Learn how to schedule your Saturday appointment in Broward County.',
};

export default function HowItWorksPage() {
  return (
    <>
      {/* 6.1: How It Works Hero */}
      <HowItWorksHero />

      {/* 6.1: Three-Step Process Timeline */}
      <HowItWorksTimeline />
    </>
  );
}
