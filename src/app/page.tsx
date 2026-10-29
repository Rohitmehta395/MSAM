import {
  PageHero,
  MissionSection,
  ImpactSection,
  FoodJourneySection,
  WaysToHelp,
  OperationalFootprint,
} from '@/components/sections';

export default function Home() {
  return (
    <>
      <PageHero />
      <MissionSection />
      <ImpactSection />
      <FoodJourneySection />
      <WaysToHelp />
      <OperationalFootprint />
    </>
  );
}
