import type { Metadata } from 'next';
import { Container, Section, Heading, Lead, Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Get Help',
};

export default function GetHelpPage() {
  return (
    <Section className="py-16 md:py-24">
      <Container className="space-y-6">
        <div className="space-y-4">
          <Heading as="h1">Get Food Support</Heading>
          <Lead>
            To apply for grocery distributions and assistance, please complete our family intake application below.
          </Lead>
        </div>
        <div>
          <Button
            href="https://mannacrm.mannafromhim.workers.dev/intake"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            icon="arrow"
            size="lg"
          >
            Apply for Food Assistance
          </Button>
        </div>
      </Container>
    </Section>
  );
}
