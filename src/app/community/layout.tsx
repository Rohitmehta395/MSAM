import React from 'react';
import { CommunitySubNav } from '@/components/layout/CommunitySubNav';

export interface CommunityLayoutProps {
  children: React.ReactNode;
}

/**
 * Nested layout for all /community/* routes.
 * Automatically mounts the shared CommunitySubNav bar directly beneath the global Header
 * and renders children without duplicating landmarks or global chrome.
 */
export default function CommunityLayout({ children }: CommunityLayoutProps) {
  return (
    <>
      <CommunitySubNav />
      {children}
    </>
  );
}
