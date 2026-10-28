'use client';

import React from 'react';
import { Utensils, Users, HandHeart } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent, Badge, CheckList } from '@/components/ui';

export function TabsDemo() {
  return (
    <Tabs defaultValue="food" variant="underline">
      <TabsList aria-label="MSAM Program Pathways">
        <TabsTrigger value="food" icon={Utensils}>
          Food Support Program
        </TabsTrigger>
        <TabsTrigger value="volunteer" icon={Users}>
          Volunteer Opportunities
        </TabsTrigger>
        <TabsTrigger value="partner" icon={HandHeart}>
          Community Partners
        </TabsTrigger>
      </TabsList>

      <TabsContent value="food" className="space-y-4 pt-6">
        <div className="flex items-center gap-2">
          <Badge tone="lavender" dot>
            Every Saturday
          </Badge>
          <span className="text-muted text-xs">Fort Lauderdale Distribution Center</span>
        </div>
        <h4 className="text-card-title text-navy">Fresh Groceries &amp; Prepared Meals</h4>
        <p className="text-lead text-navy/80">
          Every Saturday morning, our team packages and delivers nutrient-dense pantry staples,
          produce, and baked goods to local households in need.
        </p>
        <CheckList
          items={[
            'Nutritious fresh fruits, vegetables, and whole-grain breads',
            'High-protein shelf-stable pantry items and shelf milk',
            'Dignified walk-up or drive-through distribution options',
          ]}
        />
      </TabsContent>

      <TabsContent value="volunteer" className="space-y-4 pt-6">
        <div className="flex items-center gap-2">
          <Badge tone="warm" dot>
            Volunteer Roster Open
          </Badge>
          <span className="text-muted text-xs">Individual &amp; Corporate Teams</span>
        </div>
        <h4 className="text-card-title text-navy">Serve Alongside Compassionate Neighbors</h4>
        <p className="text-lead text-navy/80">
          Join hundreds of South Florida volunteers who sort, pack, and distribute groceries every
          weekend with care and hospitality.
        </p>
        <CheckList
          items={[
            'Flexible Saturday morning shifts (8:00 AM – 12:00 PM)',
            'Family-friendly opportunities for youth and seniors',
            'Corporate and faith group packaging sponsorship days',
          ]}
        />
      </TabsContent>

      <TabsContent value="partner" className="space-y-4 pt-6">
        <div className="flex items-center gap-2">
          <Badge tone="gold" dot>
            Collaborative Network
          </Badge>
          <span className="text-muted text-xs">Food Banks &amp; Grocers</span>
        </div>
        <h4 className="text-card-title text-navy">Partnering for Regional Food Security</h4>
        <p className="text-lead text-navy/80">
          We rescue surplus quality foods from regional distributors and grocers, eliminating food
          waste and multiplying meal access.
        </p>
        <CheckList
          items={[
            'Refrigerated logistical transit for perishable goods',
            'Transparent quarterly reporting on meals and pounds distributed',
            'Full donor liability protection and tax receipt documentation',
          ]}
        />
      </TabsContent>
    </Tabs>
  );
}
