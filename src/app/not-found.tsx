import { Container, Section, Heading, Lead, Button } from '@/components/ui';
import { siteConfig } from '@/config/site';

export default function NotFound() {
  return (
    <Section className="py-20 md:py-32">
      <Container className="max-w-xl space-y-6 text-center">
        <Heading as="h1">Page Not Found</Heading>
        <Lead>
          We couldn&apos;t find the page you were looking for. It may have been moved or is
          currently under construction.
        </Lead>
        <div>
          <Button href="/" variant="primary">
            Back to home
          </Button>
        </div>
        <p className="text-muted pt-4 text-sm">
          Need immediate support or prayer? Call our community line at{' '}
          <a
            href={siteConfig.phoneHref}
            className="text-navy hover:text-gold font-semibold underline underline-offset-4"
          >
            {siteConfig.phoneDisplay}
          </a>
          .
        </p>
      </Container>
    </Section>
  );
}
