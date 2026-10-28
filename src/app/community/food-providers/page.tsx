import type { Metadata } from 'next';
import { Container, Section, Heading, Lead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Food Providers',
};

export default function FoodProvidersPage() {
  return (
    <Section className="py-16 md:py-24">
      <Container className="space-y-4">
        <Heading as="h1">Food Providers</Heading>
        <Lead>
          Page under construction. Guidance for supermarkets, grocers, and commercial food donors.
        </Lead>
      </Container>
    </Section>
  );
}
