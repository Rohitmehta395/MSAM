import type { Metadata } from 'next';
import { MissionHero } from '@/components/sections';

export const metadata: Metadata = {
  title: 'Our Mission',
  description:
    'Manna Share A Meal is sustained by individuals, businesses, and churches. Join us with fresh healthy food, volunteer time, and steady support.',
};

export default function MissionPage() {
  return (
    <>
      <MissionHero />
    </>
  );
}
