import type { Metadata } from 'next';
import { Container, Section, Heading, Lead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Our Mission',
};

export default function MissionPage() {
  return (
    <Section className="py-16 md:py-24">
      <Container className="space-y-4">
        <Heading as="h1">Our Mission</Heading>
        <Lead>
          Page under construction. Details on our faith-driven commitment to nourishing Broward
          County will be shared here.
        </Lead>
      </Container>
    </Section>
  );
}
