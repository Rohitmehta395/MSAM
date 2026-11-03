import type { Metadata } from 'next';
import {
  PartnerHero,
  PartnerRoster,
  PartnerAppreciation,
  PartnerFormSection,
} from '@/components/sections';

export const metadata: Metadata = {
  title: 'Community Partners | Manna Share A Meal',
  description:
    'We partner with local churches, organizations, and businesses to extend ministry, strengthen neighborhood ties, and build community through meals.',
};

/**
 * Community Page — Phase 7.4: Partners.
 *
 * Visual source of truth references:
 * - Section A: `design-reference/Community Page/3-Partners/1-Partner hero - updated.png`
 * - Section B: `design-reference/Community Page/3-Partners/2-Partner roster - updated.png`
 * - Section C: `design-reference/Community Page/3-Partners/3-Appreciation - updated.png`
 * - Section D: `design-reference/Community Page/3-Partners/4-Partner form section - updated.png`
 */
export default function PartnersPage() {
  return (
    <>
      <PartnerHero />
      <PartnerRoster />
      <PartnerAppreciation />
      <PartnerFormSection />
    </>
  );
}
