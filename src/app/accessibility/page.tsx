import type { Metadata } from 'next';
import { Container, Section, Heading, Lead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  robots: {
    index: false,
  },
};

export default function AccessibilityPage() {
  return (
    <Section className="py-16 md:py-24">
      <Container className="space-y-4">
        <Heading as="h1">Accessibility Statement</Heading>
        <Lead>
          Page under construction. We are committed to ensuring our digital experiences are
          accessible to all.
        </Lead>
      </Container>
    </Section>
  );
}
