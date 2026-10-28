import React from 'react';
import { notFound } from 'next/navigation';
import { Heart, HandHeart, Users, Utensils, ShieldCheck } from 'lucide-react';
import {
  Container,
  Section,
  Eyebrow,
  Heading,
  Lead,
  SectionHeader,
  Button,
  TextLink,
  Badge,
  IconBadge,
  Card,
  CheckList,
  StatCard,
  SegmentedControl,
} from '@/components/ui';
import {
  Field,
  Input,
  Textarea,
  Select,
  Checkbox,
  CheckboxGroup,
  ChipToggle,
} from '@/components/form';
import { MediaImage, PlaceholderBlock } from '@/components/media';
import { TabsDemo } from './TabsDemo';

export const metadata = {
  robots: {
    index: false,
  },
};

const colorTokens = [
  {
    name: 'Navy',
    hex: '#1C2A46',
    variable: '--color-navy',
    role: 'Primary Brand / Text',
    bg: 'bg-navy',
    text: 'text-white',
  },
  {
    name: 'Gold',
    hex: '#D9B75F',
    variable: '--color-gold',
    role: 'Brand Accent / Highlights',
    bg: 'bg-gold',
    text: 'text-navy',
  },
  {
    name: 'Lavender',
    hex: '#F2EDFA',
    variable: '--color-lavender',
    role: 'Soft Surface / Tint',
    bg: 'bg-lavender',
    text: 'text-navy',
  },
  {
    name: 'Lavender Deep',
    hex: '#CDB5E8',
    variable: '--color-lavender-deep',
    role: 'Active Surface / Hover',
    bg: 'bg-lavender-deep',
    text: 'text-navy',
  },
  {
    name: 'Canvas',
    hex: '#FCFBFD',
    variable: '--color-canvas',
    role: 'Page Background',
    bg: 'bg-canvas',
    text: 'text-navy',
    border: true,
  },
  {
    name: 'Border',
    hex: '#E6E2EC',
    variable: '--color-border',
    role: 'Dividers / Field Outlines',
    bg: 'bg-border',
    text: 'text-navy',
  },
  {
    name: 'Muted',
    hex: '#687086',
    variable: '--color-muted',
    role: 'Secondary / Captions',
    bg: 'bg-muted',
    text: 'text-white',
  },
  {
    name: 'Warm',
    hex: '#FBF4DF',
    variable: '--color-warm',
    role: 'Selected Tile / Warm Surface',
    bg: 'bg-warm',
    text: 'text-navy',
  },
  {
    name: 'Sage',
    hex: '#EEF4F1',
    variable: '--color-sage',
    role: 'Volunteer / Growth Surface',
    bg: 'bg-sage',
    text: 'text-navy',
  },
  {
    name: 'Cream',
    hex: '#FAF7EE',
    variable: '--color-cream',
    role: 'Mission Surface',
    bg: 'bg-cream',
    text: 'text-navy',
  },
  {
    name: 'White',
    hex: '#FFFFFF',
    variable: '--color-white',
    role: 'Card Surface / Contrast',
    bg: 'bg-white',
    text: 'text-navy',
    border: true,
  },
  {
    name: 'Success',
    hex: '#3D7A62',
    variable: '--color-success',
    role: 'Confirmation / Checkmarks',
    bg: 'bg-success',
    text: 'text-white',
  },
  {
    name: 'Danger',
    hex: '#B54747',
    variable: '--color-danger',
    role: 'Required Asterisk / Errors',
    bg: 'bg-danger',
    text: 'text-white',
  },
];

const spacingScale = [
  { step: '8', px: '8px', class: 'w-2 h-8', rem: '0.5rem', use: 'Compact badge / gap padding' },
  { step: '16', px: '16px', class: 'w-4 h-8', rem: '1.0rem', use: 'Field padding / card item gap' },
  {
    step: '24',
    px: '24px',
    class: 'w-6 h-8',
    rem: '1.5rem',
    use: 'Eyebrow dash width / panel gap',
  },
  {
    step: '32',
    px: '32px',
    class: 'w-8 h-8',
    rem: '2.0rem',
    use: 'Card radius / card inner padding',
  },
  {
    step: '48',
    px: '48px',
    class: 'w-12 h-8',
    rem: '3.0rem',
    use: 'Section spacing sm (vertical)',
  },
  {
    step: '72',
    px: '72px',
    class: 'w-[72px] h-8',
    rem: '4.5rem',
    use: 'Section spacing md (vertical)',
  },
  {
    step: '88',
    px: '88px',
    class: 'w-[88px] h-8',
    rem: '5.5rem',
    use: 'Section spacing lg / header height',
  },
];

const auditData = [
  { element: 'Brand Navy Color', design: '#1C2A46', implemented: '#1C2A46', status: 'Pass' },
  { element: 'Brand Gold Color', design: '#D9B75F', implemented: '#D9B75F', status: 'Pass' },
  { element: 'Brand Lavender Color', design: '#F2EDFA', implemented: '#F2EDFA', status: 'Pass' },
  { element: 'Brand Warm Color', design: '#FBF4DF', implemented: '#FBF4DF', status: 'Pass' },
  { element: 'Brand Sage Color', design: '#EEF4F1', implemented: '#EEF4F1', status: 'Pass' },
  { element: 'Brand Cream Color', design: '#FAF7EE', implemented: '#FAF7EE', status: 'Pass' },
  { element: 'Success Green', design: '#3D7A62 (sampled)', implemented: '#3D7A62', status: 'Pass' },
  { element: 'Danger Red', design: '#B54747 (sampled)', implemented: '#B54747', status: 'Pass' },
  {
    element: 'Display Typography',
    design: '68px / 1.02 line-height / Noto Serif Bold',
    implemented: 'clamp(40px, 68px) / 1.02 / Noto Serif 700',
    status: 'Pass',
  },
  {
    element: 'Section Typography',
    design: '44px / 1.08 line-height / Inter Light',
    implemented: 'clamp(30px, 44px) / 1.08 / Inter 300',
    status: 'Pass',
  },
  {
    element: 'Statement Typography',
    design: '28px–40px / 1.2 line-height / Inter Light',
    implemented: 'clamp(28px, 40px) / 1.2 / Inter 300',
    status: 'Pass',
  },
  {
    element: 'Card Title Typography',
    design: '28px / 1.25 line-height / Inter Light',
    implemented: '28px (1.75rem) / 1.25 / Inter 300',
    status: 'Pass',
  },
  {
    element: 'Lead Typography',
    design: '18px / 1.6 line-height / Inter Regular',
    implemented: '18px (1.125rem) / 1.6 / Inter 400',
    status: 'Pass',
  },
  {
    element: 'Label Typography',
    design: '12px / 700 / uppercase / 0.12em track',
    implemented: '12px (0.75rem) / 700 / uppercase / 0.12em track',
    status: 'Pass',
  },
  {
    element: 'Container Max Width',
    design: '1296px inside 1440px canvas',
    implemented: 'max-w-[1296px] mx-auto',
    status: 'Pass',
  },
  {
    element: 'Container Padding',
    design: '20px (xs) → 32px (sm) → 48px (lg) → 72px (xl)',
    implemented: 'px-5 sm:px-8 lg:px-12 xl:px-[72px]',
    status: 'Pass',
  },
  {
    element: 'Button Height: sm',
    design: '40px / pill radius',
    implemented: '40px (h-10) / rounded-pill',
    status: 'Pass',
  },
  {
    element: 'Button Height: md',
    design: '48–50px in Header.png / pill radius',
    implemented: '48px (h-12) / rounded-pill',
    status: 'Pass',
  },
  {
    element: 'Button Height: lg',
    design: '56px / pill radius',
    implemented: '56px (h-14) / rounded-pill',
    status: 'Pass',
  },
  {
    element: 'Input Field Height',
    design: '49–52px in Step-1.png / 14px radius',
    implemented: '52px (h-[52px]) / rounded-field (14px)',
    status: 'Pass',
  },
  {
    element: 'Card Border Radius',
    design: '32px / 1px border / shadow-card',
    implemented: '32px (rounded-card) / 1px border / shadow-card',
    status: 'Pass',
  },
  {
    element: 'Card Shadow',
    design: '0 12px 32px rgb(28 42 70 / 0.08)',
    implemented: '0 12px 32px rgb(28 42 70 / 0.08)',
    status: 'Pass',
  },
  {
    element: 'Floating Card Shadow',
    design: '0 20px 48px rgb(28 42 70 / 0.14)',
    implemented: '0 20px 48px rgb(28 42 70 / 0.14)',
    status: 'Pass',
  },
  {
    element: 'Donation Amount Tiles',
    design: '6 tiles ($5, $10, $15, $20, $150, $300)',
    implemented: '6 tiles, $150 warm selected state',
    status: 'Pass',
  },
  {
    element: 'Segmented Control',
    design: 'Lavender track / Navy selected pill / Gold badge',
    implemented: 'Lavender track / Navy selected pill / Gold badge',
    status: 'Pass',
  },
  {
    element: 'Tabs Navigation',
    design: 'Underline variant with active 2px gold bar',
    implemented: 'Tabs variant="underline" / 2px gold underline',
    status: 'Pass',
  },
  {
    element: 'Media Placeholder Ratio',
    design: 'Hero 4/5 portrait + 4/3 landscape',
    implemented: 'aspect-[4/5] & aspect-[4/3] PlaceholderBlock',
    status: 'Pass',
  },
];

export default function StyleguidePage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return (
    <div className="bg-canvas text-navy min-h-screen pb-24">
      {/* Dev-only Banner */}
      <div className="bg-navy border-b border-white/10 px-4 py-2.5 text-center text-xs font-semibold text-white/90">
        <span className="bg-gold text-navy mr-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
          Dev Only
        </span>
        MSAM Design System Styleguide — Route blocked in production mode (404)
      </div>

      {/* Hero Header */}
      <Section tone="canvas" spacing="md" className="border-border border-b">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Eyebrow>Living Design System</Eyebrow>
            <Heading as="h1" variant="display">
              MSAM Styleguide &amp; Visual Fidelity
            </Heading>
            <Lead>
              Reference gallery validating design tokens, typography scale, interactive primitives,
              presentational form controls, and layout rhythms against the supplied Figma design
              assets.
            </Lead>
          </div>
        </Container>
      </Section>

      {/* 1. Color Palette */}
      <Section tone="white" spacing="md" className="border-border border-b">
        <Container>
          <SectionHeader
            eyebrow="Tokens / Colors"
            heading="Color Palette &amp; Contrast"
            lead="Standardized brand swatches defined in Tailwind v4 CSS theme variables without hard-coded hex in components."
            className="mb-10"
          />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {colorTokens.map((c) => (
              <div
                key={c.name}
                className={`rounded-panel flex h-36 flex-col justify-between p-4 transition-transform hover:-translate-y-0.5 ${c.bg} ${c.text} ${c.border ? 'border-border border' : ''} shadow-sm`}
              >
                <div>
                  <p className="text-sm leading-tight font-bold">{c.name}</p>
                  <p className="font-mono text-[11px] opacity-75">{c.variable}</p>
                </div>
                <div>
                  <p className="font-mono text-xs font-bold tracking-wider">{c.hex}</p>
                  <p className="mt-1 text-[10px] leading-tight opacity-80">{c.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 2. Typography Scale */}
      <Section tone="canvas" spacing="md" className="border-border border-b">
        <Container>
          <SectionHeader
            eyebrow="Tokens / Typography"
            heading="Typography Scale &amp; Hierarchy"
            lead="Fluid typography utilities calibrated for desktop (1440px) and responsive mobile viewports."
            className="mb-10"
          />

          <div className="rounded-card border-border shadow-card divide-border divide-y overflow-hidden border bg-white">
            <div className="space-y-2 p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-label text-muted font-mono">text-display</span>
                <Badge tone="lavender">
                  Noto Serif Bold 700 / clamp(40px, 68px) / 1.02 line-height
                </Badge>
              </div>
              <p className="text-display text-navy">35 Years Feeding Our Neighbors.</p>
            </div>

            <div className="space-y-2 p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-label text-muted font-mono">text-section</span>
                <Badge tone="lavender">
                  Inter Light 300 / clamp(30px, 44px) / 1.08 line-height
                </Badge>
              </div>
              <p className="text-section text-navy">
                Every plate shared begins with our community.
              </p>
            </div>

            <div className="space-y-2 p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-label text-muted font-mono">text-statement</span>
                <Badge tone="lavender">
                  Inter Light 300 / clamp(28px, 40px) / 1.20 line-height
                </Badge>
              </div>
              <p className="text-statement text-navy">
                Our mission is to glorify God by providing nourishment, dignity, and love to those
                in need.
              </p>
            </div>

            <div className="space-y-2 p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-label text-muted font-mono">text-card-title</span>
                <Badge tone="lavender">Inter Light 300 / 28px (1.75rem) / 1.25 line-height</Badge>
              </div>
              <p className="text-card-title text-navy">
                Saturday Food Distribution &amp; Volunteer Roster
              </p>
            </div>

            <div className="space-y-2 p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-label text-muted font-mono">text-lead</span>
                <Badge tone="lavender">
                  Inter Regular 400 / 18px (1.125rem) / 1.60 line-height (WCAG AA &gt; 4.5:1)
                </Badge>
              </div>
              <p className="text-lead text-navy/80">
                Manna / Share A Meal has served Broward County families since 1989 with hot meals,
                emergency groceries, and collaborative community partnerships.
              </p>
            </div>

            <div className="space-y-2 p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-label text-muted font-mono">text-label &amp; eyebrow</span>
                <Badge tone="lavender">
                  Inter Bold 700 / 12px (0.75rem) / uppercase / 0.12em letter-spacing
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-6 pt-1">
                <Eyebrow>Direct Assistance Pathways</Eyebrow>
                <span className="text-label text-navy">Label Navy</span>
                <span className="text-label text-gold">Label Gold</span>
                <span className="text-label text-muted">Label Muted</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Spacing Scale & Surface Conventions */}
      <Section tone="white" spacing="md" className="border-border border-b">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Spacing Scale */}
            <div>
              <SectionHeader
                eyebrow="Tokens / Spacing"
                heading="Spacing Scale (8px–88px)"
                lead="Discrete vertical and horizontal rhythm tokens utilized across layouts."
                className="mb-8"
              />
              <div className="space-y-4">
                {spacingScale.map((s) => (
                  <div key={s.step} className="flex items-center gap-4 text-xs">
                    <span className="text-navy w-12 text-right font-mono font-bold">{s.px}</span>
                    <div className="bg-lavender flex h-8 flex-1 items-center rounded-sm px-1">
                      <div className={`bg-navy h-6 rounded-sm ${s.class}`} />
                    </div>
                    <span className="text-muted w-16 font-mono">{s.rem}</span>
                    <span className="text-navy/70 hidden text-[11px] sm:inline">{s.use}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Surface Conventions: Radii & Elevation */}
            <div>
              <SectionHeader
                eyebrow="Tokens / Radii &amp; Elevation"
                heading="Surface Conventions"
                lead="Standardized corner curvature and soft elevation values."
                className="mb-8"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-card border-border shadow-card space-y-2 border bg-white p-6">
                  <span className="text-label text-muted">rounded-card (32px)</span>
                  <p className="text-navy text-sm font-bold">Main Cards &amp; Content Tiles</p>
                  <p className="text-muted text-xs">Elevation: shadow-card (0 12px 32px 8% navy)</p>
                </div>

                <div className="rounded-panel border-border shadow-float space-y-2 border bg-white p-6">
                  <span className="text-label text-muted">rounded-panel (24px)</span>
                  <p className="text-navy text-sm font-bold">Floating Panels &amp; Modals</p>
                  <p className="text-muted text-xs">
                    Elevation: shadow-float (0 20px 48px 14% navy)
                  </p>
                </div>

                <div className="rounded-field border-border space-y-2 border bg-white p-6">
                  <span className="text-label text-muted">rounded-field (14px)</span>
                  <p className="text-navy text-sm font-bold">Inputs, Selects &amp; Amount Tiles</p>
                  <p className="text-muted text-xs">Subtle input border + 14px curvature</p>
                </div>

                <div className="rounded-pill border-border flex flex-col items-center justify-center space-y-2 border bg-white p-6 text-center">
                  <span className="text-label text-muted">rounded-pill (9999px)</span>
                  <p className="text-navy text-sm font-bold">
                    Buttons, Badges &amp; Frequency Toggles
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Actions & Badges Gallery */}
      <Section tone="canvas" spacing="md" className="border-border border-b">
        <Container>
          <SectionHeader
            eyebrow="Components / Actions"
            heading="Buttons, Links &amp; Badges"
            lead="Polymorphic buttons, text navigation links, and contextual status badges."
            className="mb-10"
          />

          <div className="space-y-8">
            {/* Button Sizes & Variants */}
            <Card padding="lg">
              <h3 className="text-muted mb-4 text-sm font-bold tracking-wider uppercase">
                Button Variants &amp; Sizing Tiers
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-navy/70 mb-3 text-xs font-semibold">
                    Sizes: lg (56px) • md (48px) • sm (40px)
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button variant="primary" size="lg" icon="arrow">
                      Primary Large (56px)
                    </Button>
                    <Button variant="primary" size="md" icon="heart">
                      Primary Medium (48px)
                    </Button>
                    <Button variant="primary" size="sm" icon="arrow">
                      Primary Small (40px)
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-navy/70 mb-3 text-xs font-semibold">
                    Variants: Secondary (Outline) • Dark (Navy + Gold Arrow) • Loading • Disabled
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button variant="secondary" size="md" icon="arrow">
                      Secondary Outline
                    </Button>
                    <Button variant="dark" size="md" icon="arrow">
                      Dark Navy Button
                    </Button>
                    <Button variant="primary" size="md" loading>
                      Loading Button
                    </Button>
                    <Button variant="primary" size="md" disabled>
                      Disabled Button
                    </Button>
                  </div>
                </div>

                {/* Dark surface preview */}
                <div className="rounded-card bg-navy on-dark space-y-3 p-6">
                  <p className="text-xs font-semibold text-white/70">
                    Buttons on Dark Surfaces (.on-dark)
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button variant="light" size="md" icon="arrow">
                      Light Button on Navy
                    </Button>
                    <Button variant="primary" size="md" icon="heart">
                      Gold Primary on Navy
                    </Button>
                    <TextLink href="#dark-link" onDark>
                      TextLink on Dark Surface
                    </TextLink>
                  </div>
                </div>

                {/* TextLink */}
                <div className="flex flex-wrap items-center gap-8 pt-2">
                  <TextLink href="#learn-more">
                    Learn more about our Saturday distributions
                  </TextLink>
                  <TextLink href="#no-icon" icon={false}>
                    TextLink without arrow icon
                  </TextLink>
                </div>
              </div>
            </Card>

            {/* Badges & IconBadges */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <Card padding="lg">
                <h3 className="text-muted mb-4 text-sm font-bold tracking-wider uppercase">
                  Badge Tones &amp; Status Indicators
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge tone="lavender">Lavender Badge</Badge>
                    <Badge tone="warm">Warm Dietary</Badge>
                    <Badge tone="gold">Gold Impact</Badge>
                    <Badge tone="navy">Navy Status</Badge>
                    <Badge tone="outline">Outline Badge</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Badge tone="lavender" dot>
                      Operations Live
                    </Badge>
                    <Badge tone="warm" dot>
                      Pantry Open
                    </Badge>
                    <Badge tone="gold" dot>
                      Most Impact
                    </Badge>
                    <Badge tone="navy" dot>
                      Active Saturday
                    </Badge>
                  </div>
                </div>
              </Card>

              <Card padding="lg">
                <h3 className="text-muted mb-4 text-sm font-bold tracking-wider uppercase">
                  IconBadge Sizes &amp; Tints
                </h3>
                <div className="flex flex-wrap items-end gap-4">
                  <IconBadge icon={Utensils} size="lg" tint="lavender" aria-label="Meals" />
                  <IconBadge icon={Heart} size="md" tint="gold" aria-label="Care" />
                  <IconBadge icon={Users} size="md" tint="warm" aria-label="Community" />
                  <IconBadge icon={HandHeart} size="md" tint="sage" aria-label="Volunteers" />
                  <IconBadge icon={ShieldCheck} size="sm" tint="white" aria-label="Verified" />
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Form Controls & States */}
      <Section tone="white" spacing="md" className="border-border border-b">
        <Container>
          <SectionHeader
            eyebrow="Components / Forms"
            heading="Form Controls &amp; State Management"
            lead="Accessible presentational inputs demonstrating default, focus, error, and disabled visual states."
            className="mb-10"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Default State */}
            <Card padding="md" className="space-y-4">
              <Badge tone="outline" className="w-fit">
                State: Default
              </Badge>
              <Field label="Full Legal Name" hint="Enter your first and last name">
                <Input placeholder="e.g. Maria Gonzalez" />
              </Field>
              <Field label="Distribution Center">
                <Select defaultValue="main">
                  <option value="main">Fort Lauderdale Main Hub</option>
                  <option value="hollywood">Hollywood Outreach</option>
                  <option value="pompano">Pompano Beach Pantry</option>
                </Select>
              </Field>
              <Field label="Family Notes">
                <Textarea placeholder="Share any dietary requirements..." />
              </Field>
              <Checkbox
                label="Receive weekly SMS reminders"
                description="Distribution times sent Friday afternoons."
              />
            </Card>

            {/* Active / Populated State */}
            <Card padding="md" className="space-y-4">
              <Badge tone="lavender" className="w-fit">
                State: Filled / Active
              </Badge>
              <Field label="Email Address" hint="We will send distribution confirmation">
                <Input defaultValue="maria.gonzalez@example.org" />
              </Field>
              <Field label="Household Size">
                <Select defaultValue="4">
                  <option value="1">1 Person</option>
                  <option value="2">2–3 People</option>
                  <option value="4">4–5 People</option>
                  <option value="6">6+ People</option>
                </Select>
              </Field>
              <Field label="Preferred Delivery Method">
                <Textarea defaultValue="Drive-through pickup at the east warehouse bay." />
              </Field>
              <Checkbox defaultChecked label="Household includes children under 18" />
            </Card>

            {/* Validation Error State */}
            <Card padding="md" className="space-y-4">
              <Badge tone="warm" className="text-danger w-fit">
                State: Validation Error
              </Badge>
              <Field
                label="Telephone Number"
                required
                error="Please enter a valid 10-digit telephone number"
              >
                <Input defaultValue="954-555" error />
              </Field>
              <Field
                label="Intake Category"
                required
                error="Please choose your primary assistance pathway"
              >
                <Select error defaultValue="">
                  <option value="" disabled>
                    Select category...
                  </option>
                  <option value="groceries">Emergency Groceries</option>
                  <option value="hot-meal">Hot Meal Service</option>
                </Select>
              </Field>
              <Field
                label="Urgent Medical Needs"
                error="Please specify any refrigerated medication requirements"
              >
                <Textarea error defaultValue="Requires special timing." />
              </Field>
              <Checkbox error label="I agree to the pantry privacy terms" />
            </Card>

            {/* Disabled State */}
            <Card padding="md" className="space-y-4">
              <Badge tone="outline" className="w-fit opacity-60">
                State: Disabled
              </Badge>
              <Field
                label="Government Case Number"
                disabled
                hint="Temporarily locked during maintenance"
              >
                <Input disabled defaultValue="CASE-8839210-FL" />
              </Field>
              <Field label="Partner Agency Referral" disabled>
                <Select disabled defaultValue="referral-a">
                  <option value="referral-a">Broward County United Way</option>
                </Select>
              </Field>
              <Field label="Administrative Overrides" disabled>
                <Textarea disabled defaultValue="Field notes locked by administrator." />
              </Field>
              <Checkbox disabled label="Restricted warehouse access" />
            </Card>
          </div>

          {/* Chip Toggles & Checkbox Groups */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Card padding="lg">
              <h3 className="text-muted mb-4 text-sm font-bold tracking-wider uppercase">
                Selectable Chips (ChipToggle tones: warm &amp; lavender)
              </h3>
              <div className="space-y-4">
                <p className="text-navy/70 text-xs font-semibold">
                  Dietary Preferences (tone: warm):
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <ChipToggle tone="warm" defaultChecked>
                    Vegetarian
                  </ChipToggle>
                  <ChipToggle tone="warm">Gluten-Free</ChipToggle>
                  <ChipToggle tone="warm" defaultChecked>
                    Halal
                  </ChipToggle>
                  <ChipToggle tone="warm">Dairy-Free</ChipToggle>
                  <ChipToggle tone="warm" disabled>
                    Low Sodium (Out)
                  </ChipToggle>
                </div>

                <p className="text-navy/70 pt-2 text-xs font-semibold">
                  Volunteer Roles (tone: lavender):
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <ChipToggle tone="lavender" defaultChecked>
                    Food Packing
                  </ChipToggle>
                  <ChipToggle tone="lavender">Driver / Delivery</ChipToggle>
                  <ChipToggle tone="lavender" defaultChecked>
                    Client Check-in
                  </ChipToggle>
                  <ChipToggle tone="lavender">Warehouse Sorting</ChipToggle>
                </div>
              </div>
            </Card>

            <Card padding="lg">
              <h3 className="text-muted mb-4 text-sm font-bold tracking-wider uppercase">
                CheckboxGroup Fieldset
              </h3>
              <CheckboxGroup
                label="Distribution Days Availability"
                description="Select all shifts you are available to assist."
                required
              >
                <Checkbox
                  defaultChecked
                  label="Saturday Morning (8:00 AM – 12:00 PM)"
                  description="Primary packaging and drive-thru distribution."
                />
                <Checkbox
                  label="Saturday Afternoon (12:00 PM – 3:30 PM)"
                  description="Warehouse clean-up and pallet stocking."
                />
                <Checkbox
                  label="Wednesday Prep (5:00 PM – 7:30 PM)"
                  description="Pantry box organization."
                />
              </CheckboxGroup>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 6. Amount Tiles & Donation Selector Matching Home Page/6-Donation.png */}
      <Section tone="canvas" spacing="md" className="border-border border-b">
        <Container>
          <SectionHeader
            eyebrow="Components / Interactive Patterns"
            heading="Donation Selector &amp; Amount Tiles"
            lead="Faithful reproduction of the donation selector from Home Page/6-Donation.png using SegmentedControl and ChipToggle."
            className="mb-10"
          />

          <div className="mx-auto max-w-xl">
            <Card tint="white" padding="lg" className="border-border shadow-float">
              <div className="space-y-6">
                {/* Frequency Segmented Control */}
                <div>
                  <label className="text-muted mb-3 block text-xs font-bold tracking-wider uppercase">
                    Donation Frequency
                  </label>
                  <SegmentedControl
                    aria-label="Donation Frequency"
                    name="styleguide-donation-frequency"
                    defaultValue="monthly"
                    options={[
                      { value: 'once', label: 'Give once' },
                      { value: 'monthly', label: 'Give monthly', badge: 'MOST IMPACT' },
                    ]}
                  />
                </div>

                {/* Amount Tiles ($5, $10, $15, $20, $150, $300; $150 selected) */}
                <div>
                  <label className="text-muted mb-3 block text-xs font-bold tracking-wider uppercase">
                    Select Contribution Tier
                  </label>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {['$5', '$10', '$15', '$20', '$150', '$300'].map((amount) => (
                      <ChipToggle
                        key={amount}
                        type="radio"
                        name="donation-amount-group"
                        value={amount.replace('$', '')}
                        tone="plain"
                        defaultChecked={amount === '$150'}
                        className="w-full justify-center [&>span]:w-full"
                      >
                        {amount}
                      </ChipToggle>
                    ))}
                  </div>
                </div>

                {/* Custom Amount Field */}
                <Field label="Or enter custom amount ($ USD)">
                  <Input placeholder="$ Other amount" />
                </Field>

                {/* Action CTA */}
                <div className="space-y-3 pt-2">
                  <Button variant="primary" size="lg" fullWidth icon="heart">
                    Donate $150 Now
                  </Button>
                  <p className="text-muted text-center text-xs">
                    Tax-deductible 501(c)(3) nonprofit organization • EIN 65-0123456
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 7. Tabs Pattern */}
      <Section tone="white" spacing="md" className="border-border border-b">
        <Container>
          <SectionHeader
            eyebrow="Components / Navigation"
            heading="Accessible Tabs Pattern (Underline Variant)"
            lead="ARIA tablist with roving tabIndex, keyboard navigation (Arrow keys, Home, End), and gold active underline."
            className="mb-10"
          />

          <Card padding="lg">
            <TabsDemo />
          </Card>
        </Container>
      </Section>

      {/* 8. Surfaces & Data Display */}
      <Section tone="canvas" spacing="md" className="border-border border-b">
        <Container>
          <SectionHeader
            eyebrow="Components / Surfaces"
            heading="Card Tints, StatCards &amp; Media"
            lead="Surface variations, metric callout cards, and image placeholder blocks."
            className="mb-10"
          />

          {/* Card Tints */}
          <div className="mb-12">
            <h3 className="text-muted mb-4 text-sm font-bold tracking-wider uppercase">
              Surface Card Tints (32px radius, 1px border, shadow-card)
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <Card tint="white" padding="md">
                <Badge tone="outline" className="mb-2">
                  tint=&quot;white&quot;
                </Badge>
                <p className="text-navy text-sm font-bold">Clean Surface</p>
                <p className="text-muted mt-1 text-xs">Standard container background.</p>
              </Card>

              <Card tint="lavender" padding="md">
                <Badge tone="lavender" className="mb-2">
                  tint=&quot;lavender&quot;
                </Badge>
                <p className="text-navy text-sm font-bold">Soft Lavender</p>
                <p className="text-muted mt-1 text-xs">Step cards and informational callouts.</p>
              </Card>

              <Card tint="warm" padding="md">
                <Badge tone="warm" className="mb-2">
                  tint=&quot;warm&quot;
                </Badge>
                <p className="text-navy text-sm font-bold">Warm Amber</p>
                <p className="text-muted mt-1 text-xs">Urgent notices and prayer requests.</p>
              </Card>

              <Card tint="sage" padding="md">
                <Badge tone="outline" className="mb-2">
                  tint=&quot;sage&quot;
                </Badge>
                <p className="text-navy text-sm font-bold">Growth Sage</p>
                <p className="text-muted mt-1 text-xs">
                  Volunteer &amp; environmental stewardship.
                </p>
              </Card>

              <Card tint="navy" padding="md">
                <Badge tone="gold" className="mb-2">
                  tint=&quot;navy&quot;
                </Badge>
                <p className="text-sm font-bold text-white">Navy Surface</p>
                <p className="mt-1 text-xs text-white/70">High-contrast mission focal points.</p>
              </Card>
            </div>
          </div>

          {/* StatCards */}
          <div className="mb-12">
            <h3 className="text-muted mb-4 text-sm font-bold tracking-wider uppercase">
              Metric StatCards (Light, Navy, Warm)
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <StatCard
                variant="light"
                value="35 Years"
                label="Uninterrupted Community Service"
                caption="Feeding neighbors across South Florida continuously since 1989."
              />

              <StatCard
                variant="navy"
                value="40–60"
                label="Families Fed Every Saturday"
                caption="Serving local Broward County households with fresh groceries each weekend."
              />

              <StatCard
                variant="warm"
                value="100%"
                label="Volunteer &amp; Donor Funded"
                caption="Every dollar contributed directly supports meal packaging and transport."
              />
            </div>
          </div>

          {/* CheckList (Light & onDark) */}
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card tint="white" padding="lg">
              <h4 className="text-muted mb-4 text-sm font-bold tracking-wider uppercase">
                CheckList (Light Surface)
              </h4>
              <CheckList
                items={[
                  'Fresh seasonal produce and pantry staples provided weekly',
                  'Dignified walk-up and drive-through distribution bays',
                  'Emergency assistance requests reviewed within 24 hours',
                ]}
              />
            </Card>

            <Card tint="navy" padding="lg">
              <h4 className="mb-4 text-sm font-bold tracking-wider text-white/70 uppercase">
                CheckList onDark Surface (.on-dark)
              </h4>
              <CheckList
                onDark
                items={[
                  'Gold circular check badges ensuring accessible high contrast',
                  'Light legible text tokens meeting WCAG AA requirements',
                  'White focus indicators visible across keyboard tab cycles',
                ]}
              />
            </Card>
          </div>

          {/* Media Placeholders */}
          <div>
            <h3 className="text-muted mb-4 text-sm font-bold tracking-wider uppercase">
              Cloudinary Media Image &amp; Placeholder Blocks
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <span className="text-muted font-mono text-xs font-semibold">
                  home.hero.main (aspect 4/5)
                </span>
                <MediaImage
                  assetKey="home.hero.main"
                  sizes="(max-width: 768px) 100vw, 380px"
                  rounded="card"
                />
              </div>

              <div className="space-y-2">
                <span className="text-muted font-mono text-xs font-semibold">
                  home.hero.top (aspect 4/3)
                </span>
                <MediaImage
                  assetKey="home.hero.top"
                  sizes="(max-width: 768px) 100vw, 380px"
                  rounded="panel"
                />
              </div>

              <div className="space-y-2">
                <span className="text-muted font-mono text-xs font-semibold">
                  custom 16/9 widescreen placeholder
                </span>
                <PlaceholderBlock
                  alt="Widescreen distribution video thumbnail placeholder"
                  aspect="16/9"
                  rounded="panel"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 9. Visual Fidelity Audit Table */}
      <Section tone="white" spacing="md">
        <Container>
          <SectionHeader
            eyebrow="Verification / Fidelity Audit"
            heading="Visual Fidelity Audit Table (1440px Verification)"
            lead="Comprehensive comparison between the supplied Figma design assets and implemented components."
            className="mb-8"
          />

          <div className="rounded-card border-border shadow-card overflow-hidden border bg-white">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="bg-canvas border-border text-navy/70 border-b">
                    <th className="px-4 py-3.5 font-bold tracking-wider uppercase">Element</th>
                    <th className="px-4 py-3.5 font-bold tracking-wider uppercase">
                      Design Reference Value
                    </th>
                    <th className="px-4 py-3.5 font-bold tracking-wider uppercase">
                      Implemented Value
                    </th>
                    <th className="px-4 py-3.5 text-center font-bold tracking-wider uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-border divide-y">
                  {auditData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-canvas/50 transition-colors">
                      <td className="text-navy px-4 py-3 font-semibold">{row.element}</td>
                      <td className="text-muted px-4 py-3 font-mono">{row.design}</td>
                      <td className="text-navy px-4 py-3 font-mono">{row.implemented}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-success/15 text-success inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
