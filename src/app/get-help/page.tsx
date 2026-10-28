import type { Metadata } from 'next';
import { Container, Section, Heading, Lead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Get Help',
};

export default function GetHelpPage() {
  return (
    <Section className="py-16 md:py-24">
      <Container className="space-y-4">
        <Heading as="h1">Get Food Support</Heading>
        <Lead>
          Page under construction. Details on grocery distributions and assistance requests will
          appear here.
        </Lead>
      </Container>
    </Section>
  );
}
