import type { Metadata } from 'next';
import { Container, Section, Heading, Lead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  robots: {
    index: false,
  },
};

export default function PrivacyPage() {
  return (
    <Section className="py-16 md:py-24">
      <Container className="space-y-4">
        <Heading as="h1">Privacy Policy</Heading>
        <Lead>
          Page under construction. Our full privacy and donor information protection policy will be
          posted here.
        </Lead>
      </Container>
    </Section>
  );
}
