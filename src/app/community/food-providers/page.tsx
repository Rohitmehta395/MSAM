import type { Metadata } from 'next';
import { FoodProviderHero } from '@/components/sections';

export const metadata: Metadata = {
  title: 'Become a Food Provider',
  description:
    'Manna Share A Meal partners with food providers to source nutritious food, build community through meals, and serve every person with dignity.',
};

export default function FoodProvidersPage() {
  return (
    <>
      <FoodProviderHero />
    </>
  );
}
