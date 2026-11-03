import type { Metadata } from 'next';
import { MissionHero, MissionGratitude } from '@/components/sections';

export const metadata: Metadata = {
  title: 'Our Mission',
  description:
    'Manna Share A Meal is 100% donor-funded, with no government funding. Your generosity supports nutritious food, practical outreach, and year-round care for neighbors.',
};

export default function MissionPage() {
  return (
    <>
      <MissionHero />
      <MissionGratitude />
    </>
  );
}
