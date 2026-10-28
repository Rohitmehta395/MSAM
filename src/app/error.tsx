'use client';

import React, { useEffect } from 'react';
import { Container, Section, Heading, Lead, Button } from '@/components/ui';
import { siteConfig } from '@/config/site';

export interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log unexpected runtime error
    console.error('Unhandled runtime application error:', error);
  }, [error]);

  return (
    <Section className="py-20 md:py-32">
      <Container className="max-w-xl space-y-6 text-center">
        <Heading as="h1">Something Went Wrong</Heading>
        <Lead>We encountered an unexpected error while loading this page. Please try again.</Lead>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button onClick={reset} variant="primary">
            Try again
          </Button>
          <Button href="/" variant="secondary">
            Back to home
          </Button>
        </div>
        <p className="text-muted pt-4 text-sm">
          If this issue persists, please reach out to our community support at{' '}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-navy hover:text-gold font-semibold underline underline-offset-4"
          >
            {siteConfig.email}
          </a>{' '}
          or call{' '}
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
