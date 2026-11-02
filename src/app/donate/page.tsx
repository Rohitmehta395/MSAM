import type { Metadata } from 'next';
import {
  WaysToHelpHero,
  WaysToHelpExplore,
  WaysToHelpContactPathways,
} from '@/components/sections';

export const metadata: Metadata = {
  title: 'Ways to Help',
  description:
    'Manna Share A Meal is sustained by individuals, businesses, and churches. Join us with fresh healthy food, volunteer time, and steady support.',
};

export default function DonatePage() {
  return (
    <>
      <WaysToHelpHero />
      <WaysToHelpExplore />
      <WaysToHelpContactPathways />
    </>
  );
}
