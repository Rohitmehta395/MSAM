import type { Metadata } from 'next';
import {
  HowItWorksHero,
  HowItWorksTimeline,
  WhoWeServe,
  PrayerCallout,
} from '@/components/sections';

export const metadata: Metadata = {
  title: 'How It Works | Manna Share A Meal',
  description:
    'Getting food support from Manna is simple, dignified, and Christ-centered. Learn how to schedule your Saturday appointment in Broward County.',
};

export default function HowItWorksPage() {
  return (
    <>
      {/* 6.1: How It Works Hero */}
      <HowItWorksHero />

      {/* 6.1: Three-Step Process Timeline */}
      <HowItWorksTimeline />

      {/* 6.2: Who We Serve */}
      <WhoWeServe />

      {/* 6.2: Prayer Callout Band */}
      <PrayerCallout />
    </>
  );
}
