import type { Metadata } from 'next';
import { Container, Section, Heading, Lead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Volunteers',
};

export default function VolunteersPage() {
  return (
    <Section className="py-16 md:py-24">
      <Container className="space-y-4">
        <Heading as="h1">Volunteers</Heading>
        <Lead>
          Page under construction. Volunteer onboarding and scheduling details will be available
          here.
        </Lead>
      </Container>
    </Section>
  );
}
