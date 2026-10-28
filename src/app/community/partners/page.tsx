import type { Metadata } from 'next';
import { Container, Section, Heading, Lead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Community Partners',
};

export default function PartnersPage() {
  return (
    <Section className="py-16 md:py-24">
      <Container className="space-y-4">
        <Heading as="h1">Community Partners</Heading>
        <Lead>
          Page under construction. Information for faith communities, civic groups, and agency
          partners.
        </Lead>
      </Container>
    </Section>
  );
}
