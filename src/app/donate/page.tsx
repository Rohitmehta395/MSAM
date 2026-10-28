import type { Metadata } from 'next';
import { Container, Section, Heading, Lead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Donate',
};

export default function DonatePage() {
  return (
    <Section className="py-16 md:py-24">
      <Container className="space-y-4">
        <Heading as="h1">Donate Now</Heading>
        <Lead>
          Page under construction. Secure online giving options will be launched here shortly.
        </Lead>
      </Container>
    </Section>
  );
}
