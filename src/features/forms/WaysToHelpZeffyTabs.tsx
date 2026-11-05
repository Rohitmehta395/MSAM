'use client';

import React, { useState } from 'react';
import { BadgeDollarSign } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { ZeffyFormEmbed } from './ZeffyFormEmbed';
import { ZeffyDonationEmbed } from '@/features/donation/ZeffyDonationEmbed';
import {
  waysToHelpContactPathwaysContent,
  type WaysToHelpContactPathwaysContent,
  type PathwayTabId,
} from '@/content/ways-to-help';

export interface WaysToHelpZeffyTabsProps {
  /** Optional content override */
  content?: Partial<WaysToHelpContactPathwaysContent>;
  /** Optional custom class name */
  className?: string;
}

const tabPrompts: Record<PathwayTabId, string> = {
  'give-food':
    'Partner with us to donate groceries, bulk ingredients, or prepared items. We coordinate pickup and distribution with care.',
  'serve':
    'Bring your heart for service. Tell us about your interests, skills, and availability to help South Florida families.',
  'give-funds':
    'Your generosity keeps hope on the table. Every dollar helps provide fresh groceries and hot meals for our neighbors in need.',
};

/**
 * Interactive Ways to Help tabbed section integrating official Zeffy forms:
 * - Tab 1 (Give Food): Reusable Zeffy food provider inquiry form embed
 * - Tab 2 (Serve): Reusable Zeffy volunteer interest form embed
 * - Tab 3 (Give Funds): Existing Zeffy donation campaign embed with trust badges
 *
 * Performance optimization (Active-Tab-Only Mounting Strategy):
 * - Exactly one Zeffy embed iframe is mounted in this component at any given time.
 * - When switching tabs, the previously active form iframe is unmounted, immediately
 *   releasing its browser memory, background network polling, and DOM footprint.
 * - Inactive forms are never preloaded in the background.
 * - Single script loading deduplication via zeffyScriptLoader.
 * - Supports keyboard Tab button navigation (`tabIndex={0}`) as well as arrow keys.
 */
export function WaysToHelpZeffyTabs({
  content: contentOverride,
  className,
}: WaysToHelpZeffyTabsProps) {
  const content = {
    ...waysToHelpContactPathwaysContent,
    ...contentOverride,
  };

  const { tabs, subheading } = content;

  const [activeTab, setActiveTab] = useState<PathwayTabId>('give-food');

  const handleTabChange = (val: string) => {
    setActiveTab(val as PathwayTabId);
  };

  return (
    <div className={cn('w-full', className)}>
      {/* 1. Accessible Pathway Tabs Container */}
      <Tabs
        id="ways-to-help-tabs"
        value={activeTab}
        onValueChange={handleTabChange}
        aria-label="Ways to help pathways"
        className="w-full"
      >
        <TabsList aria-label="Select pathway" className="border-border/80 border-b pb-px">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              tabIndex={0}
              icon={BadgeDollarSign}
              className="px-4 py-3 text-base sm:text-lg"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* 2. Subheading Prompt directly below tabs */}
      <div className="pt-6 pb-4">
        <p className="text-sm text-slate-600 sm:text-base">
          {tabPrompts[activeTab] ?? subheading}
        </p>
      </div>

      <hr className="border-border/60 mb-6" />

      {/* 3. Tab Panels with Active-Tab-Only Mounting Strategy */}
      <div className="w-full">
        {/* Tab 1: Give Food */}
        {activeTab === 'give-food' && (
          <div
            role="tabpanel"
            id="ways-to-help-tabs-panel-give-food"
            aria-labelledby="ways-to-help-tabs-tab-give-food"
            tabIndex={0}
            className="focus-visible:outline-navy w-full focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <ZeffyFormEmbed
              key="give-food"
              formPath="/en-US/embed/newsletter-form/food-provider-inquiry"
              fallbackUrl="https://www.zeffy.com/en-US/embed/newsletter-form/food-provider-inquiry"
              title="Food provider inquiry form powered by Zeffy"
              minHeight="540px"
              lazy={false}
            />
          </div>
        )}

        {/* Tab 2: Serve */}
        {activeTab === 'serve' && (
          <div
            role="tabpanel"
            id="ways-to-help-tabs-panel-serve"
            aria-labelledby="ways-to-help-tabs-tab-serve"
            tabIndex={0}
            className="focus-visible:outline-navy w-full focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <ZeffyFormEmbed
              key="serve"
              formPath="/en-US/embed/newsletter-form/volunteer-interest-form-11"
              fallbackUrl="https://www.zeffy.com/en-US/embed/newsletter-form/volunteer-interest-form-11"
              title="Volunteer interest form powered by Zeffy"
              minHeight="540px"
              lazy={false}
            />
          </div>
        )}

        {/* Tab 3: Give Funds */}
        {activeTab === 'give-funds' && (
          <div
            role="tabpanel"
            id="ways-to-help-tabs-panel-give-funds"
            aria-labelledby="ways-to-help-tabs-tab-give-funds"
            tabIndex={0}
            className="focus-visible:outline-navy w-full focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <div className="mx-auto max-w-xl">
              <ZeffyDonationEmbed key="give-funds" lazy={false} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
