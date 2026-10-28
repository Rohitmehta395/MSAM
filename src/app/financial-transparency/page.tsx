import type { Metadata } from 'next';
import { Container, Section, Heading, Lead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Financial Transparency',
  robots: {
    index: false,
  },
};

export default function FinancialTransparencyPage() {
  return (
    <Section className="py-16 md:py-24">
      <Container className="space-y-4">
        <Heading as="h1">Financial Transparency</Heading>
        <Lead>
          Page under construction. Form 990 filings, financial summaries, and governance reports
          will be available here.
        </Lead>
      </Container>
    </Section>
  );
}
