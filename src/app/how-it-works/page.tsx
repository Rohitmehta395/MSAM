import type { Metadata } from 'next';
import { Container, Section, Heading, Lead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'How It Works',
};

export default function HowItWorksPage() {
  return (
    <Section className="py-16 md:py-24">
      <Container className="space-y-4">
        <Heading as="h1">How It Works</Heading>
        <Lead>
          Page under construction. Information about our food recovery and logistics model will be
          available soon.
        </Lead>
      </Container>
    </Section>
  );
}
