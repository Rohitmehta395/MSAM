import type { Metadata } from 'next';
import { VolunteerHero, VolunteerAppreciation, VolunteerFormSection } from '@/components/sections';

export const metadata: Metadata = {
  title: 'Volunteers | Manna Share A Meal',
  description:
    'Join our community of volunteers serving neighbors across Atlanta with dignity, compassion, and nutritious food.',
};

/**
 * Community Page — Phase 7.3: Volunteers.
 *
 * Visual source of truth references:
 * - Section 1: `design-reference/Community Page/2-Volunteers/1-Volunteer hero - updated.png`
 * - Section 2: `design-reference/Community Page/2-Volunteers/2-Appreciation - updated.png`
 * - Section 3: `design-reference/Community Page/2-Volunteers/3-Volunteer Form - updated.png`
 */
export default function VolunteersPage() {
  return (
    <>
      <VolunteerHero />
      <VolunteerAppreciation />
      <VolunteerFormSection />
    </>
  );
}
