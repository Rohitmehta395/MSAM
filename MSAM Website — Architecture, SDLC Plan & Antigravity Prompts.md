# MSAM Website — Architecture, SDLC Plan & Antigravity Prompts

*Manna / Share A Meal · prepared 28 Oct 2026 · Claude as Architect, Tech Lead and PM*

**How to use this document.** Parts 1–8 are the analysis, architecture and roadmap. Part 9 holds one copy-paste prompt per implementation part. Give Antigravity **one prompt at a time**, bring its final report back to me, and I will review it (✅ / ⚠️ / ❌) before issuing the next prompt. Do not batch prompts.

---

## PART 1 — PROJECT UNDERSTANDING

### 1.1 What is in the ZIP

52 entries: **40 PNG design frames** (every one is 1440 px wide, desktop only), **1 logo SVG**, no copy deck, no Figma/HTML source, **no mobile or tablet frames**. All photography is placeholder. Folder map:

- `Visual Design Guide/` — Color system, Typography system, Layout system, Component library
- Root frames — `Top-Urgent message`, `Header`, `Final call to action and footer`
- `Assets/Logo.svg` (Illustrator export, 600×650 viewBox, gold `#DEB14E`, lavender `#CBB5D7`, white fills)
- `Home Page/` (7 frames) · `How it works Page/` (5) · `Mission Page/` (3 + globe illustration PNG 506×520)
- `Community Page/` — sub-navigation frame + `1-Food Providers/` (3), `2-Volunteers/` (3), `3-Partners/` (4)
- `Donations Page/` (3) · `Get Help Form/` (Step-1/2/3)

### 1.2 Page inventory

**8 distinct routes** (Community contains three sub-pages that share a sub-navigation).

**Page: Home — `/`**

- *Purpose:* introduce Manna, explain Saturday appointment-based support, route visitors to get help / partner / give.
- *Sections:* (1) Hero: eyebrow pill, serif H1 “35 Years Feeding Our Neighbors.”, lead, two CTAs, reassurance line, three-photo mosaic with a floating “Support by appointment” card, and a three-item trust strip overlapping the hero base. (2) Mission & origin: photo collage + lavender “Our origin” tile + mission copy, then a navy Impact panel with four stat cards. (3) Food journey: lavender band, four-step vertical timeline (gold numbered nodes, image, icon label, copy, check line), “The path continues” cue, white summary card with four stat chips joined by arrows. (4) Ways to take part: three tinted cards (lavender / warm / sage) + navy “Made of many hands” split band with 3-photo mosaic and tag chips. (5) Operational footprint: photo with floating “Saturday support” mini-timeline card, text, callout, three feature cards. (6) Donation: navy section, copy left, donation card right (once/monthly toggle, amount tiles, impact note, CTA, EIN line). (7) Contact pathways: three form cards with coloured top edge + privacy strip.
- *Reusable:* PageHero (split), SectionHeader, StatCard, CheckList, WaysToHelp cards, TimelineSteps, PathwayForm, DonationSelector.
- *Unique:* hero mosaic + floating card, origin tile, footprint mini-timeline card, “Made of many hands” band.
- *Interactive:* once/monthly toggle, amount selection, three forms.
- *Animations (inferred; none specified):* hover states, subtle scroll reveal, timeline line draw optional.
- *Images:* ≈13 placeholders (hero ×3, collage ×2, timeline ×4 — step 2 is a solid gold block in the design, band ×3, footprint ×1).
- *Responsive:* mosaic stacks to one hero image + horizontal scroll or 2-up; trust strip becomes a stacked card; stat cards 2×2; timeline keeps left rail on mobile; three-card rows stack; footprint floating card sits below image.

**Page: How it works — `/how-it-works`**

- *Purpose:* explain how to get food and who is served.
- *Sections:* (1) “Get Help” hero (H1 “Getting Food Is Simple”, call + prayer CTAs, 3-photo mosaic). (2) Three-step timeline (Call / Come as you are / Leave with more than food). (3) Who we serve (image + copy + warm callout). (4) Assistance request: “Manna Family Intake Form” (single-page form with photo upload). (5) Prayer callout band (“Need Prayer”, gold circular heart).
- *Reusable:* PageHero, TimelineSteps, SplitFeature (image + copy), Callout. *Unique:* intake form, prayer band.
- *Forms:* Family Intake (household name, people count, first/last, phone, email, package checkboxes, biological sex, photo upload).
- *Images:* hero ×3, timeline ×3, who-we-serve ×1.

**Page: Mission — `/mission`**

- *Sections:* (1) Regional growth goal: serif H1 “500 meals. Every region. Every month.”, globe illustration, “Regional monthly meters” panel with four region cards (zero state, “Awaiting update”, 0–500 progress bar with 125 milestones), navy “4 × 500 = 2,000 meals” summary card, legend, “How meals are counted” button. (2) Ways to take part (three tinted cards: Give Food / Give Time / Give Donation). (3) Contact pathways: “Help us expand Manna.” tabbed form card.
- *Unique:* region meters + summary band + globe. *Forms:* tabbed pathway form. *Images:* globe illustration (vector-style raster).

**Pages: Community — `/community/food-providers`, `/community/volunteers`, `/community/partners`**

- Shared **community sub-navigation** frame directly below the header: three tabs (“We Feed · Food Providers”, “We Serve · Volunteers”, “We Uplift · Partners”), active tab filled lavender `#CDB5E8`.
- *Food Providers:* hero “Become a Food Provider” + CTA; “Our Food Provider Partners” logo roster (5 logos on gold placeholder blocks, last one cropped → horizontal row/marquee); “We Pick Up The Food” split with “Give Food” form card.
- *Volunteers:* hero “Volunteers” + CTA; Appreciation (photo + floating “Volunteers are the heartbeat…” tile + copy); “Give Food. Give Time.” split with “What do you want to Donate” form (name, phone, email, checkbox group, details).
- *Partners:* hero “Our Community Partners” + Give Food / Give Time CTAs; partner logo roster; Appreciation (same as Volunteers); “Partner with us” onboarding form beside copy + photo.
- *Reusable:* PageHero, LogoRoster, AppreciationSplit, FormSplit (copy + image + form card).

**Page: Donate — `/donate`**

- *Sections:* centered hero “Donate time, food, or funding” (eyebrow pill, no image); Ways to take part (three tinted cards with text-link CTAs); “Pick a way to help and fellowship with Manna.” tabbed pathway form.

**Page: Get Help (food support) — `/get-help`**

- Three-step wizard under a centered hero (“A helping hand starts here.”, status badges). Stepper card (Step 1 Household details / Step 2 Family members / Step 3 Address & food). **Step 1:** household name, people count, head of household first/last, phone, email, annual income (wheel-style picker). **Step 2:** auto-populated head-of-household summary, “Add family member” list with Complete / In-progress statuses, expandable member editor (nationality, birthdate + age pickers, race/ethnicity, status chips, notes, Save member). **Step 3:** street/city/state/ZIP, dietary chips (multi-select), dietary notes, live “Review family details” summary, Back / Submit. “Your progress is saved as you go.” footer note and a “Help” button.
- *Header on this page shows the “Get food support” button in its active (lavender) state.*

### 1.3 Global elements

- **Top urgent message** (38 px navy bar): “Need Prayer? Call us: 954-406-7580” left, gold “Give monthly →” right.
- **Header** (88 px, white, bottom border): logo; nav (Our mission / How it works / Ways to help / Community); outline “Get Food Support →”; gold “Donate Now ♡”. Mobile navigation is not designed.
- **Footer** (navy): logo + mission statement + 3 social icons (Instagram, Facebook, LinkedIn); “Ways to help” and “About” link columns; newsletter email field with gold arrow button; email and phone; legal row (Privacy / Accessibility / Financial transparency). The file is named “Final call to action and footer” but contains **no CTA band** — only the footer.

### 1.4 Forms (13 surfaces, 5 submission shapes)

1. Home pathway forms ×3 (food support, partner, fund) 2. How it works Family Intake 3. Mission tabbed form (3 tabs) 4. Food Provider form 5. Volunteer form 6. Partner form 7. Donate tabbed form (3 tabs) 8. Get Help 3-step wizard 9. Footer newsletter 10. Donation selector (amount + frequency → payment hand-off).

They collapse into: **inquiry** (pathway/partner/fund/volunteer/provider variants), **intake-lite**, **household wizard**, **newsletter**, **donation intent**.

### 1.5 Interactions identified

Mobile menu (needed, undesigned) · active-nav state · Community sub-tabs (route-based) · pathway tabs (Give Food/Time/Donation, ARIA tabs) · once/monthly toggle · amount tiles · chip multi-select · checkbox groups · file attach · stepper with persisted draft · expandable member editor · progress meters · hover/focus states on cards and buttons · logo roster overflow.

### 1.6 Assets

Logo SVG (needs a white variant for the navy footer and a cleaned export) · globe illustration (PNG only — ask for the SVG original) · five partner logos (pixel-sampled on gold placeholder boxes; real logos needed) · \~25 photo slots, all placeholder → Cloudinary later.

### 1.7 Important observations and ambiguities

Items marked **\[ASK\]** need a client answer; I have chosen a default so work is not blocked.

1. **Typography conflict.** The guide says “a single clean sans-serif family” (Inter), but hero/page H1s and some H2s are a bold **serif** (looks like Noto Serif), while other H2s are light Inter. Default: Inter + Noto Serif Bold for display headings, Inter Light for section headings. **\[ASK\]**
2. **Desktop-only designs.** All mobile/tablet behaviour is my inference; I will review responsive output critically.
3. **Colours beyond the palette** (sampled from the frames): sage card tint `#EEF4F1`, Mission-page cream `#FAF7EE`, active-tab lavender `#CDB5E8`, plus a success green for check icons (sample in Part 2.1).
4. **Income field vs the promise.** The site repeats “No income verification, paperwork, or judgment,” yet Get Help Step 1 asks for **annual income**, Step 2 asks race/ethnicity, nationality, disability status, children’s birthdates, and the intake form asks for a photo and biological sex. This is sensitive data (including minors’). **\[ASK\]** confirm each field is required; I will build them behind a field config so they can be removed without rework.
5. **Forms need a real destination before launch** (email, CRM or database). The foundation is pluggable; going live with a console sink would silently lose requests.
6. **Placeholder copy** is heavily duplicated (“Families receive groceries and support…”, Mission cards titled Give Food/Time/Donation reusing food-request copy, all three tabs showing identical funding-form fields, Food Provider form with funding-form fields). Everything is placed in typed content files so the client can replace copy without touching components. **\[ASK\]** real copy and per-tab fields.
7. **Donation selector:** frame highlights $10 but the button reads “Donate $150” and the note says “$150 feeds one family”. I will make the button dynamic and default to $150. The component library shows $5–$300; the Home frame shows $5/$10/$15/$20/$150. **\[ASK\]** final amounts and payment provider (Stripe, Donorbox, etc.). Payment is out of scope; I add a hand-off adapter.
8. **Mission-page frame has an overlay**: a dimmed meters panel with a centred serif headline (“Feeding people across the nation is the goal.”) and a dark summary card floating above it. It reads like a layered design state. Default: render meters at full opacity and the headline as a statement line between the meters and the summary band. **\[ASK\]**
9. **Nav destinations:** “Ways to help” has no dedicated page. Default: `/donate`. Footer links to “Impact and stewardship”, “News and stories”, Privacy, Accessibility, Financial transparency have no designs. Default: Impact → `/mission#regional-growth`; News hidden until content exists; legal pages as noindex stubs.
10. **Hero copy mentions “sign in”** but no auth is designed. None will be built.
11. **Partner roster** last logo is cropped (carousel or marquee?). Default: data-driven row with scroll-snap and no auto-play.
12. **Food journey step 2** shows a solid gold block where an image should be; icons on steps 3/4 and the donation note look like placeholders. Treated as image/icon slots.
13. **Phone format** differs (954-406-7580 vs (954) 406-7580). Centralised in site config. **\[ASK\]** canonical format.
14. **Gold text on white** (`#D9B75F`) fails contrast; I will use gold only as a fill with navy text, or as text on navy. Muted text `#687086` on lavender is borderline for small sizes.
15. “Final call to action” is not designed; none will be built unless supplied.

---

## PART 2 — RECOMMENDED TECH STACK

| Choice | Why |
| --- | --- |
| **Next.js (latest stable, App Router)** | Server Components keep most pages zero-JS; route handlers for form APIs; metadata API for SEO; deploys cleanly to Vercel. Antigravity reports the exact version installed. |
| **TypeScript (strict)** | Shared types between schemas, forms and API. |
| **Tailwind CSS v4** | CSS-first `@theme` tokens map directly to the design guide. |
| **React Hook Form + Zod + @hookform/resolvers** | One Zod schema validates client and server; RHF handles the multi-step wizard and dynamic member list without re-render storms. |
| **next/font** (Inter, Noto Serif) | Self-hosted fonts, no layout shift. |
| **lucide-react** | Line icons match the design style; tree-shaken. Antigravity swaps any icon that does not visually match for inline SVG. |
| **clsx + tailwind-merge** | Small `cn()` helper for variants. |
| **Cloudinary via a custom `next/image` loader** | No SDK on the client. Server signing uses Node `crypto`, so **no `cloudinary` package** is needed. |
| **ESLint (next config) + Prettier + prettier-plugin-tailwindcss** | Consistent code, class order. |
| **Vitest, Playwright, @axe-core/playwright** (added in Phase 12 only) | Schema/unit tests, form smoke tests, automated accessibility checks. |
| **Optional, later:** Upstash Redis rate limiter, Cloudflare Turnstile | Only if the client approves the infrastructure (Phase 12.1); defaults are honeypot, time trap and in-memory limiting. |

**Deliberately not used:** Framer Motion/GSAP (static design; CSS transitions and one IntersectionObserver suffice), Redux/Zustand, shadcn/Radix (two hand-built accessible patterns — Tabs and mobile menu — cost less than the dependency), CMS, database, auth, analytics (add at deploy if required). Package manager: **pnpm**, Node 20+.

---

## PART 3 — SYSTEM ARCHITECTURE

**Application.** A single Next.js App Router app on Vercel. Static-first: all marketing pages are statically generated. The only dynamic server code is three form route handlers.

**Frontend.** Server Components by default. Client Components only where state or browser APIs are needed: `MobileMenu`, `Tabs`, `DonationSelector`, `PathwayForm` (and its tabbed wrapper), `NewsletterForm`, `IntakeForm`, the Get Help wizard, a reveal-on-scroll helper. Tokens live in `globals.css` (`@theme`); no hard-coded hex values in components.

**Backend / API.** Route handlers: `POST /api/contact` (inquiry kinds), `POST /api/intake` (intake-lite and household wizard), `POST /api/newsletter`, `POST /api/donate/intent` (returns hand-off URL), and later `POST /api/uploads/sign` (Cloudinary signature). Every handler runs one shared pipeline: parse → honeypot/time check → rate limit → Zod validate → `SubmissionSink.deliver()` → typed JSON envelope `{ ok, errors?, message? }`. Sinks are an interface (`ConsoleSink` in dev, email/CRM/DB later), so business logic plugs in without touching forms or routes.

**Data / content.** Typed TypeScript content modules (`src/content/*.ts`) for nav, footer links, stats, steps, cards, partner logos, region meters, form field configs and copy. No CMS. Repeated cards are data mapped to components. Structure is CMS-ready (plain objects, no JSX in data).

**Cloudinary.** Components never receive URLs. They reference an **asset key** (`home.hero.main`) resolved through `src/content/images.ts` to `{ publicId, alt, aspect }`. `MediaImage` renders `next/image` with a Cloudinary loader (`f_auto,q_auto,c_fill,w_{w}`) when a `publicId` exists, otherwise a branded neutral placeholder with the same aspect ratio. Env: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (public) and `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` (server only, only for signed upload). Naming: `msam/{page}/{section}-{slug}`. Replacing placeholders later means filling `publicId` values — no component edits.

**Forms.** RHF + Zod; schemas in `src/lib/validation`; one `useFormSubmission` hook handling idle/submitting/success/error and server field errors; shared `FormStatus` banner (`role="status"`/`alert`). Spam: hidden honeypot field + minimum-fill-time token + per-IP in-memory rate limit (interface-swappable). Integration points are single functions: `deliver()` (CRM/email/DB), `startDonation()` (payment provider), `signUpload()` (Cloudinary).

**SEO.** `metadataBase` from `NEXT_PUBLIC_SITE_URL`; a `buildMetadata()` helper (title template “… | Manna Share A Meal”, description, canonical, Open Graph, Twitter); `sitemap.ts`, `robots.ts`; JSON-LD `Organization/NGO` (name, phone, URL, logo, social) on Home; semantic headings (one H1 per page); descriptive alt text from the image registry; lowercase hyphenated URLs.

**Authentication.** None. “Sign in” wording in the hero copy is ignored.

**Security.** Secrets only in server env, validated at boot by `src/config/env.ts`; never `NEXT_PUBLIC_` for secrets; server-side Zod on every input; strings trimmed and length-capped; no request bodies in logs (intake data is sensitive); security headers in `next.config` (nosniff, frame-ancestors, referrer policy, permissions policy, CSP in Report-Only first); signed Cloudinary uploads restricted by folder, size and type; honeypot + rate limiting.

**Performance.** Server rendering and static generation; hero image `priority`, everything else lazy; `sizes` always set; fonts via `next/font` with `display: swap`; no animation library; dynamic-import the wizard and any heavy client code; `use client` boundaries kept at leaf components.

**Accessibility.** Semantic landmarks and skip link; visible focus ring on every control; labels above inputs with `aria-describedby` for errors; ARIA tabs pattern for pathway tabs; mobile menu with focus management and Escape; chip toggles and checkbox groups as real inputs; `prefers-reduced-motion` respected; selection never conveyed by colour alone (navy fill + check, per the component library).

**Responsive strategy.** Mobile-first with Tailwind breakpoints: base (<640), `sm` 640, `md` 768 (tablet), `lg` 1024, `xl` 1280, `2xl` 1440 (design canvas; content max-width 1296 px = 1440 − 2×72). Side padding scales 20 → 32 → 48 → 72 px. Display type scales fluidly (68 px desktop → \~40 px mobile). Sections intentionally redesigned on mobile: hero mosaic, trust strip, impact stat grid, timelines, floating overlay cards (become in-flow), tabbed forms (tabs become a scrollable segmented control), Get Help stepper (compact “Step 2 of 3” bar), member list/editor (stacked), region meters (single column).

**Animation.** CSS transitions and Tailwind only: button/card hover, tab underline, chip selection, progress-bar fill, accordion/collapse (height via grid trick), and a tiny `Reveal` (IntersectionObserver, opt-in, disabled under reduced motion). No page transitions, no carousels.

---

## PART 4 — PROJECT FOLDER STRUCTURE

```text
msam-site/
├── design-reference/            # extracted MSAM.zip (git-ignored, local reference only)
├── public/
│   └── brand/                   # logo.svg, logo-white.svg, favicon set
├── src/
│   ├── app/                     # routes, layouts, metadata, route handlers
│   │   ├── layout.tsx           # global shell: UrgentMessage + Header + {children} + Footer
│   │   ├── page.tsx  (+ _components/)
│   │   ├── how-it-works/  mission/  donate/  get-help/   # each: page.tsx (+ _components/)
│   │   ├── community/           # layout.tsx = sub-nav; page.tsx redirects
│   │   │   └── food-providers/  volunteers/  partners/
│   │   ├── api/                 # contact/ intake/ newsletter/ donate/intent/ uploads/sign/
│   │   ├── not-found.tsx  error.tsx  global-error.tsx
│   │   ├── robots.ts  sitemap.ts
│   │   └── globals.css          # Tailwind v4 + @theme tokens
│   ├── components/
│   │   ├── layout/              # UrgentMessage, Header, MobileMenu, Footer, CommunitySubNav, SkipLink
│   │   ├── ui/                  # Button, TextLink, Badge, IconBadge, Card, CheckList, StatCard, Tabs, Reveal
│   │   ├── form/                # Field, Input, Textarea, Select, Checkbox, CheckboxGroup, ChipToggle, FileAttach, FormStatus
│   │   ├── media/               # MediaImage, Logo
│   │   └── sections/            # shared sections: PageHero, SectionHeader, TimelineSteps, WaysToHelp, SplitFeature,
│   │                            #   Callout, StatsPanel, LogoRoster, AppreciationSplit, FormSplit
│   ├── features/
│   │   ├── forms/               # PathwayForm, TabbedPathwayForm, IntakeForm, NewsletterForm, useFormSubmission
│   │   ├── donate/              # DonationSelector
│   │   └── get-help/            # wizard shell, steps, draft store, member editor
│   ├── content/                 # typed copy + data: navigation, footer, stats, steps, cards, logos, meters, images, form configs
│   ├── config/                  # site.ts (phone, email, EIN, socials), env.ts (Zod-validated)
│   ├── lib/                     # cn.ts, cloudinary.ts, metadata.ts, structured-data.ts
│   │   ├── validation/          # Zod schemas (shared client + server)
│   │   └── api/                 # pipeline.ts, rate-limit.ts, sinks/, responses.ts
│   ├── hooks/                   # useMediaQuery (only if needed), useReveal
│   └── types/
├── tests/                       # unit + e2e (Phase 12)
├── .env.example   next.config.ts   eslint.config.mjs   .prettierrc   package.json
```

**Why each directory exists.**

- `app/` — only routing concerns: pages compose sections, nothing more. Page-specific pieces live beside their page in `_components/` (private folders), so they do not pollute shared code.
- `components/ui` — design-system primitives with no business knowledge. `components/form` — form controls only. `components/layout` — the global shell. `components/sections` — sections used on two or more pages.
- `features/` — stateful, client-side behaviour with its own logic (forms, donation selector, wizard). Keeps `components/` presentational.
- `content/` — every string, list and data table the client will edit. Components import data, they do not embed it.
- `config/` — values that must exist once (phone number, EIN, socials) and validated environment variables.
- `lib/` — framework-agnostic helpers; `lib/api` is the pluggable backend seam (sinks, rate limit, pipeline).
- `design-reference/` is git-ignored: 15 MB of PNGs should not live in history, but Antigravity needs them on disk.

---

## PART 5 — ROUTE MAP

```text
/                              Home
├── /how-it-works              How it works (+ intake form)
├── /mission                   Mission (+ regional meters)
├── /community                 redirects → /community/food-providers
│   ├── /community/food-providers
│   ├── /community/volunteers
│   └── /community/partners
├── /donate                    Donate (also the “Ways to help” destination)
├── /get-help                  Food support wizard (header “Get Food Support”)
│
├── /privacy  /accessibility  /financial-transparency   stubs, noindex (footer; no design, content from client)
├── /api/contact  /api/intake  /api/newsletter  /api/donate/intent  /api/uploads/sign
├── /sitemap.xml  /robots.txt
└── not-found / error boundaries
```

Not built (no design, no content): `/impact`, `/news`, authentication pages. Footer “Impact and stewardship” points to `/mission#regional-growth`; “News and stories” is hidden until the client supplies content. No route groups are needed: one root layout serves every page; only `/community` has a nested layout (sub-navigation). Loading UI is unnecessary because pages are static; the wizard shows its own inline states.

---

## PART 6 — COMPONENT ARCHITECTURE

**Global** (`components/layout`): `UrgentMessage`, `Header` (logo, `PrimaryNav`, two CTAs), `MobileMenu` (client), `Footer` (brand block, link columns, `NewsletterForm`, legal row), `CommunitySubNav` (route-aware tabs), `SkipLink`.

**UI primitives** (`components/ui`): `Container`, `Section` (bg variants: canvas / lavender / warm / navy / cream), `Heading` (variants: display-serif, section-light, card), `Eyebrow` (gold dash + 12/700 label), `Lead`, `Button` (primary gold / secondary outline / dark navy / white, sizes, arrow & heart icon slots), `TextLink`, `Badge`/`Pill`, `IconBadge` (rounded tinted tile), `Card` (32 px radius, 1 px border, soft shadow; tints lavender/warm/sage), `CheckList`, `StatCard` (light and navy), `Tabs` (ARIA tabs, client), `Reveal` (client).

**Form** (`components/form`): `Field` (label above, hint, error, `aria-describedby`), `Input`, `Textarea`, `Select`, `Checkbox`, `CheckboxGroup`, `ChipToggle` (navy fill + check when selected), `FileAttach`, `FormStatus`, `ConsentCheckbox`.

**Media**: `MediaImage` (asset key → Cloudinary or placeholder), `Logo` (colour / white).

**Shared sections** (`components/sections`): `PageHero` (split with media mosaic, or centred), `SectionHeader`, `TimelineSteps` (Home food journey and How it works), `WaysToHelp` (3 tinted cards; Home, Mission, Donate variants), `SplitFeature`, `Callout`, `StatsPanel`, `LogoRoster` (Food Providers, Partners), `AppreciationSplit` (Volunteers, Partners), `FormSplit` (copy + image + form card; Providers, Volunteers, Partners).

**Forms** (`features/forms`): `PathwayForm` (config-driven: field list + schema kind), `TabbedPathwayForm` (Mission, Donate), `IntakeForm`, `NewsletterForm`, `useFormSubmission`.

**Page-specific** (`app/<route>/_components`): Home hero mosaic + floating card + trust strip, origin tile, operational footprint card, “Made of many hands” band, `DonationSection`; Mission `RegionMeters`, `GoalSummary`, globe hero; Get Help wizard internals (`Stepper`, `MemberList`, `MemberEditor`, `ReviewSummary`).

**Boundaries.** A component is shared only when it appears on two or more pages with the same structure. Data never lives inside JSX. Client Components never import server-only modules. Forms never know where data is delivered.

---

## PART 7 — SDLC PHASES

**Phase 0 — Discovery & Architecture** *(done: this document).* Goal: scope, architecture, plan. Deliverable: Parts 1–8. Dependency: the ZIP. Why first: every later decision depends on knowing the full scope, including the five forms and the missing mobile designs.

**Phase 1 — Project Foundation.** Goal: a clean, buildable Next.js + Tailwind v4 + TypeScript repo with tooling, env validation and folder skeleton. Depends on: Phase 0. Why: nothing else can start without it.

**Phase 2 — Design System.** Goal: tokens, fonts, layout primitives, buttons, cards, form controls, media abstraction, plus a dev-only styleguide to compare with the Visual Design Guide. Depends on: 1. Why: every page is assembled from these; fixing them later would ripple everywhere.

**Phase 3 — Global Shell.** Goal: urgent bar, header, mobile menu, footer, root layout, route stubs, 404/error. Depends on: 2. Why: appears on every page; stubs make navigation testable from day one.

**Phase 4 — Forms Foundation.** Goal: schemas, API pipeline, client form kit, newsletter wired. Depends on: 2 (controls) and 3 (footer). Why before pages: eight pages contain forms; building the engine once prevents eight divergent implementations. *Parallelisable with Phase 5 sections that contain no forms*, but I recommend serial execution.

**Phase 5 — Home Page.** Goal: all seven Home sections. Depends on: 2, 3, 4. Why: the richest page; it creates most shared sections (TimelineSteps, WaysToHelp, StatsPanel) that later pages reuse.

**Phase 6 — How it works & Mission.** Goal: both pages. Depends on: 5 (shared sections), 4. Why: heavy reuse, so fast.

**Phase 7 — Community & Donate.** Goal: community layout + three sub-pages + Donate. Depends on: 4, 5. Why: mostly composition of existing pieces.

**Phase 8 — Get Help Wizard.** Goal: three-step intake with persisted draft. Depends on: 4. Why late: the most complex client logic; it benefits from a mature design system and form kit.

**Phase 9 — Cloudinary Integration.** Goal: real asset mapping and signed upload for the intake photo. Depends on: 2.5, 6.3. Why here: the abstraction exists since Phase 2, so only wiring remains; it needs the client’s Cloudinary account.

**Phase 10 — SEO.** Goal: metadata system, JSON-LD, sitemap, robots. Depends on: all pages exist.

**Phase 11 — Responsive, Accessibility, Performance.** Goal: audit and fix across all pages. Depends on: pages complete.

**Phase 12 — Security & Testing.** Goal: headers, spam/rate hardening, automated tests. Depends on: forms complete.

**Phase 13 — Deployment.** Goal: production config, CI, launch verification. Depends on: 12 and client decisions (form destination, domain, payment link).

**Parallelism note.** Phases 9, 10 and 12.1 are independent of each other once pages exist, but because you run one Antigravity prompt at a time, the order above is the recommended sequence.

---

## PART 8 — PHASE → PART BREAKDOWN

Format: **Goal · Dependencies · Deliverables.** 49 parts in total.

### Phase 1 — Project Foundation

- **1.1 Initialize project.** Goal: create the Next.js app. Dep: none. Deliver: App Router + TS strict + Tailwind v4 + pnpm, `src/` dir, `@/` alias, git, `design-reference/` placed and git-ignored.
- **1.2 Tooling, env & skeleton.** Goal: quality gates and structure. Dep: 1.1. Deliver: ESLint, Prettier (+tailwind plugin), `typecheck`/`lint`/`format` scripts, `cn()` helper, `config/env.ts`, `config/site.ts`, `.env.example`, empty folder skeleton, `lucide-react`, `clsx`, `tailwind-merge`.

### Phase 2 — Design System

- **2.1 Tokens, fonts & typography.** Dep: 1.2. Deliver: colours, radii, shadows, spacing, `next/font` Inter + Noto Serif, type utilities (display, section, lead, label).
- **2.2 Layout primitives.** Dep: 2.1. Deliver: `Container`, `Section`, `Eyebrow`, `Heading`, `Lead`, `SectionHeader`.
- **2.3 Actions & surfaces.** Dep: 2.2. Deliver: `Button`, `TextLink`, `Badge`, `IconBadge`, `Card`, `CheckList`, `StatCard`.
- **2.4 Form primitives & Tabs.** Dep: 2.3. Deliver: `Field`, `Input`, `Textarea`, `Select`, `Checkbox`, `CheckboxGroup`, `ChipToggle`, `Tabs`.
- **2.5 Media abstraction.** Dep: 2.2. Deliver: `MediaImage`, Cloudinary loader, `content/images.ts` registry, placeholder block, `next.config` image settings.
- **2.6 Styleguide & fidelity check.** Dep: 2.1–2.5. Deliver: dev-only `/styleguide` route reproducing the Visual Design Guide; fidelity report.

### Phase 3 — Global Shell

- **3.1 Brand, nav data & UrgentMessage.** Dep: 2.x. Deliver: `Logo` (colour + white from `Logo.svg`), `content/navigation.ts`, `UrgentMessage`.
- **3.2 Header (desktop).** Dep: 3.1. Deliver: `Header` with active nav state and two CTAs.
- **3.3 Mobile navigation.** Dep: 3.2. Deliver: client `MobileMenu`, accessible, below `lg`.
- **3.4 Footer.** Dep: 3.1. Deliver: `Footer` with link columns, socials, newsletter field UI (static), legal row.
- **3.5 Layout wiring, stubs & error pages.** Dep: 3.2–3.4. Deliver: root layout, `SkipLink`, eight route stubs + three legal stubs, `not-found`, `error`.

### Phase 4 — Forms Foundation

- **4.1 Schemas & types.** Dep: 2.4. Deliver: Zod schemas for inquiry kinds, intake-lite, household, newsletter, donation intent; inferred types; field-config types.
- **4.2 Submission pipeline & API.** Dep: 4.1. Deliver: `lib/api` pipeline, honeypot, in-memory limiter, `SubmissionSink` + `ConsoleSink`, four route handlers, response envelope.
- **4.3 Client form kit.** Dep: 4.1, 4.2. Deliver: `useFormSubmission`, `FormStatus`, `ConsentCheckbox`, config-driven `PathwayForm`.
- **4.4 Newsletter wiring.** Dep: 4.3, 3.4. Deliver: working footer `NewsletterForm`.

### Phase 5 — Home Page

- **5.1 Hero & trust strip.** Dep: 3.5. Deliver: `PageHero` (split + mosaic), floating card, trust strip.
- **5.2 Mission, origin & impact.** Dep: 5.1. Deliver: collage, origin tile, `StatsPanel` (navy).
- **5.3 Food journey.** Dep: 5.1. Deliver: `TimelineSteps`, summary stat chips, “path continues” cue.
- **5.4 Ways to help & Many Hands.** Dep: 5.1. Deliver: `WaysToHelp`, mosaic band with tag chips.
- **5.5 Operational footprint.** Dep: 5.1. Deliver: image + floating mini-timeline, callout, 3 feature cards.
- **5.6 Donation section.** Dep: 5.1. Deliver: `DonationSelector`, `/api/donate/intent` hand-off.
- **5.7 Contact pathways & Home review.** Dep: 4.3, 5.1–5.6. Deliver: three pathway forms, privacy strip, Home assembled with metadata.

### Phase 6 — How it works & Mission

- **6.1 Hero & steps.** Dep: 5.3. Deliver: How it works hero + 3-step timeline.
- **6.2 Who we serve & prayer.** Dep: 6.1. Deliver: `SplitFeature`, `Callout`, prayer band.
- **6.3 Family intake form.** Dep: 4.3. Deliver: `IntakeForm` with `FileAttach` (client validation only).
- **6.4 Regional growth & meters.** Dep: 5.4. Deliver: hero, globe, `RegionMeters`, `GoalSummary`, legend.
- **6.5 Mission ways & tabbed form.** Dep: 5.4, 4.3. Deliver: reuse `WaysToHelp`, `TabbedPathwayForm`.

### Phase 7 — Community & Donate

- **7.1 Community layout.** Dep: 3.5. Deliver: nested layout, `CommunitySubNav`, index redirect.
- **7.2 Food Providers.** Dep: 7.1, 4.3. Deliver: hero, `LogoRoster`, `FormSplit`.
- **7.3 Volunteers.** Dep: 7.2. Deliver: hero, `AppreciationSplit`, volunteer form.
- **7.4 Partners.** Dep: 7.3. Deliver: hero, roster, appreciation, partner form.
- **7.5 Donate page.** Dep: 5.4, 6.5. Deliver: centred hero, `WaysToHelp` (link variant), tabbed form.

### Phase 8 — Get Help Wizard

- **8.1 Shell, stepper & draft state.** Dep: 4.3. Deliver: hero, `Stepper`, wizard container, sessionStorage draft, step navigation.
- **8.2 Step 1 — household.** Dep: 8.1. Deliver: fields + validation + pickers.
- **8.3 Step 2 — family members.** Dep: 8.2. Deliver: auto-populated head, member list/editor, statuses.
- **8.4 Step 3 — address, food & submit.** Dep: 8.3. Deliver: address, dietary chips, review summary, submission to `/api/intake`.

### Phase 9 — Cloudinary

- **9.1 Asset wiring.** Dep: client Cloudinary account. Deliver: real `publicId`s in registry, folder convention doc, alt-text audit.
- **9.2 Signed upload.** Dep: 6.3. Deliver: `/api/uploads/sign`, `FileAttach` upload to Cloudinary, folder/size/type constraints.

### Phase 10 — SEO

- **10.1 Metadata system.** Deliver: `buildMetadata`, per-page metadata, canonical, OG/Twitter.
- **10.2 Structured data, sitemap, robots.** Deliver: JSON-LD, `sitemap.ts`, `robots.ts`, default OG image hook.

### Phase 11 — Responsive, Accessibility, Performance

- **11.1 Responsive pass.** **11.2 Accessibility pass.** **11.3 Performance pass.** Each: audit every page, fix, report with before/after evidence.

### Phase 12 — Security & Testing

- **12.1 Headers, spam & rate-limit hardening.** **12.2 Automated tests** (Vitest schemas/helpers; Playwright form smoke; axe checks).

### Phase 13 — Deployment

- **13.1 Production readiness & CI.** **13.2 Deploy & launch verification.**

---

## GIT / CHECKPOINT STRATEGY

One branch per phase (`phase-2-design-system`) merged to `main` after my review; **one commit per approved part** (a part that I send back for fixes gets a second `fix:` commit). Tag each merged phase (`v0.2-design-system`). Suggested messages:

```text
chore: initialize next.js project              (1.1)
chore: add tooling, env validation, skeleton   (1.2)
feat(ds): design tokens and typography         (2.1)   … feat(ds): button, card, badge (2.3)
feat(layout): header / mobile nav / footer     (3.2–3.4)
feat(forms): schemas, api pipeline, form kit   (4.x)
feat(home): hero | mission | journey | …       (5.x)
feat(community): food providers page           (7.2)
feat(get-help): step 2 family members          (8.3)
fix(home): hero mosaic spacing                 (review fixes)
perf: / a11y: / sec: / seo: / test: / ci:      (phases 10–13)
```

Commit **after** I approve a part, not before, so every commit on `main` is reviewed. If a part goes wrong, `git reset --hard` to the previous approved commit and re-run the corrected prompt.

---

## DEFINITION OF DONE (applies to every part)

A part is complete only when: the implementation exists and matches the named design frame(s) reasonably (spacing, type, colour, radius); responsive behaviour works at 375 / 768 / 1024 / 1440 px; no console errors or hydration warnings; `pnpm typecheck`, `pnpm lint` and `pnpm build` pass; existing functionality is not broken; accessibility basics hold (semantic landmarks, labels, visible focus, keyboard operation); required interactions work; no secrets are exposed; the architecture rules in Parts 3–6 are respected (tokens only, data in `content/`, `use client` only at leaves, no new dependencies unless the prompt lists them); and the final report is complete.

---

## ANTIGRAVITY SETUP (before Part 1.1)

1. Create an empty folder `msam-site`. 2. Extract `MSAM.zip` somewhere Antigravity can read; Part 1.1 tells it to place the contents at `design-reference/`. 3. Open the folder in Antigravity. 4. Paste the Part 1.1 prompt. 5. Paste its final report back to me.

## CLAUDE REVIEW PROTOCOL

Paste Antigravity’s **final report** (and, for visual parts, screenshots at 1440 and 375 px, plus any file you want me to see). I review architecture, implementation completeness, design fidelity, code quality, performance, accessibility, security and testing, then answer in this form: **REVIEW RESULT — Status** (✅ APPROVED / ⚠️ APPROVED WITH FIXES / ❌ NOT APPROVED), **Issues found**, **Required fixes**. If fixes are needed I issue a correction prompt and we do not advance until the part is sound. Each next prompt assumes the repo state I last approved.

---

## PART 9 — ANTIGRAVITY IMPLEMENTATION PROMPTS

Give Antigravity **one prompt at a time.** Each prompt is self-contained and ends with the same Standing Rules and report format. Do not skip ahead; each assumes the repo state I approved.

### ==== PHASE 1 — PROJECT FOUNDATION ====

#### PART 1.1 — PROJECT INITIALIZATION

```text
PROJECT: MSAM — website for Manna / Share A Meal, a nonprofit food-support organization in Broward County. Stack: Next.js App Router, TypeScript (strict), Tailwind CSS v4, React Hook Form + Zod, Cloudinary for images. The visual design source of truth is the extracted MSAM.zip (PNG frames, 1440px desktop).

CURRENT STATE: Empty project folder. The extracted contents of MSAM.zip are available at <PATH_TO_EXTRACTED_ZIP> (the user will tell you the path).

OBJECTIVE: Create the Next.js project foundation and nothing else.

DO:
1. Initialize with `pnpm create next-app@latest .` using: TypeScript, ESLint, Tailwind CSS, `src/` directory, App Router, import alias `@/*`. Confirm Tailwind is v4 (CSS-first: `@import "tailwindcss"` in globals.css, no tailwind.config file needed). Use the latest stable Next.js.
2. Copy the extracted ZIP contents into `./design-reference/` (keep the folder names exactly: "Visual Design Guide", "Home Page", "How it works Page", "Mission Page", "Community Page", "Donations Page", "Get Help Form", "Assets", plus the root PNGs). Add `design-reference/` to `.gitignore`.
3. Enable TypeScript strict mode. Add `"engines": { "node": ">=20" }` to package.json.
4. Strip boilerplate: remove default page content, default SVGs in /public, and the default Geist font wiring. `src/app/page.tsx` renders a single `<main><h1>MSAM</h1></main>`. Set `<html lang="en">`.
5. `git init` and make a first commit: `chore: initialize next.js project`.

FILES: standard create-next-app output only, plus `design-reference/` and `.gitignore` change.

DO NOT: add any dependency beyond create-next-app defaults; create components, tokens, routes or styling.

VERIFY: `pnpm dev` serves `/`; `pnpm build` passes; `ls design-reference` shows all design folders. In your report, state the exact versions of next, react, tailwindcss, typescript and node.

STANDING RULES: First inspect the repository and extend what exists; never recreate or overwrite existing work. design-reference/ PNGs are the visual source of truth. Use design tokens (no hard-coded hex), Server Components by default, strict TypeScript (no any), no new dependencies unless listed above, mobile-first responsive (designs are desktop-only, infer tablet/mobile), semantic accessible HTML. Run typecheck, lint and build and check 375/768/1024/1440 px where UI exists. FINAL REPORT in exactly this format: Implemented / Files created / Files modified / Dependencies added / Tests/checks performed / Known issues / Things that require review.
```

#### PART 1.2 — TOOLING, ENV & FOLDER SKELETON

```text
PROJECT: MSAM — Manna / Share A Meal nonprofit website (Next.js App Router, TypeScript strict, Tailwind v4). Design reference PNGs live in ./design-reference/.

CURRENT STATE: Part 1.1 complete: bare Next.js project, strict TS, Tailwind v4, design-reference/ in place and git-ignored.

OBJECTIVE: Add quality tooling, environment validation, site constants and the empty folder skeleton.

DO:
1. Dependencies: `clsx`, `tailwind-merge`, `lucide-react`, `zod`, `server-only`; dev: `prettier`, `prettier-plugin-tailwindcss`.
2. ESLint: keep the Next.js config; add `no-console` as warn (allow warn/error).
3. Prettier config (`.prettierrc`): no semicolons off (use semicolons), single quotes, trailing commas, printWidth 100, tailwind plugin.
4. package.json scripts: `typecheck` (tsc --noEmit), `lint`, `format`, `format:check`, `check` (typecheck + lint + format:check).
5. `src/lib/cn.ts`: `cn()` = clsx + tailwind-merge.
6. `src/config/site.ts` exporting `siteConfig`: name "Manna — Share A Meal", shortName "Share A Meal", tagline "Fed by Faith. Driven by Love.", phoneDisplay "(954) 406-7580", phoneHref "tel:+19544067580", email "hello@shareameal.org", ein "65-0637594", missionStatement "Our mission is to glorify God by providing nourishment, spiritual encouragement, emotional support, and practical assistance.", socials {instagram, facebook, linkedin} with placeholder `#` URLs marked TODO, serviceArea "Broward County".
7. `src/config/env.ts`: Zod-validated env. Public: NEXT_PUBLIC_SITE_URL (default http://localhost:3000), NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME (optional), NEXT_PUBLIC_DONATION_URL (optional). Server-only (file imports `server-only`, separate export `serverEnv`): CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET (optional), SUBMISSION_SINK (default "console"). Fail fast with a readable error on invalid values.
8. `.env.example` documenting every variable; ensure `.env*.local` is git-ignored.
9. Create the empty folder skeleton with `.gitkeep`: components/{layout,ui,form,media,sections}, features/{forms,donate,get-help}, content, lib/{validation,api}, hooks, types, public/brand.
10. Replace README with a short one: scripts, env vars, folder map, link to design-reference note.

DO NOT: create UI components, tokens, routes, or any page content; do not change `page.tsx`.

VERIFY: `pnpm check` and `pnpm build` pass; importing `serverEnv` from a client file must fail the build (confirm by reasoning or a quick temporary test, then remove it).

STANDING RULES: First inspect the repository and extend what exists; never recreate or overwrite existing work. design-reference/ PNGs are the visual source of truth. Use design tokens (no hard-coded hex), Server Components by default, strict TypeScript (no any), no new dependencies unless listed above, mobile-first responsive (designs are desktop-only, infer tablet/mobile), semantic accessible HTML. Run typecheck, lint and build and check 375/768/1024/1440 px where UI exists. FINAL REPORT in exactly this format: Implemented / Files created / Files modified / Dependencies added / Tests/checks performed / Known issues / Things that require review.
```

### ==== PHASE 2 — DESIGN SYSTEM ====

#### PART 2.1 — TOKENS, FONTS & TYPOGRAPHY

```text
PROJECT: MSAM — Manna / Share A Meal nonprofit website (Next.js App Router, TS strict, Tailwind v4). Design frames in ./design-reference/.

CURRENT STATE: Parts 1.1–1.2 complete: tooling, `cn()`, `siteConfig`, env validation, empty folders.

OBJECTIVE: Implement the design tokens, fonts and typography utilities. First study these frames: design-reference/Visual Design Guide/{Color system,Typography system,Layout system,Component library}.png and the hero in design-reference/Home Page/1-Hero.png.

TECHNICAL REQUIREMENTS (src/app/globals.css using Tailwind v4 `@theme`):
- Colours: navy #1C2A46, lavender #F2EDFA, lavender-deep #CDB5E8 (active community tab), gold #D9B75F, canvas #FCFBFD, border #E6E2EC, muted #687086, warm #FBF4DF, sage #EEF4F1 (third card tint, Home 4-Ways frame), cream #FAF7EE (Mission page background), white. ALSO sample from the PNGs with a script (PIL) and add: success green (check icons, e.g. Home Page/4-Ways to take part.png) and danger red ("Remove" link in Get Help/Step-2.png). Report the sampled values.
- Radii: field 14px, panel 24px, card 32px, pill 9999px. Shadows: `card` (soft, e.g. 0 12px 32px rgb(28 42 70 / .08)) and `float` (stronger, for floating overlay cards).
- Spacing rhythm: Tailwind's 4px base already covers 8/16/24/32/48; add section spacing tokens 72 and 88 px.
- Fonts via `next/font/google` in `src/app/layout.tsx`: Inter (300,400,500,600,700) → `--font-sans`; Noto Serif (600,700) → `--font-serif`; `display: swap`. The designs use a bold serif for page titles and Inter for the rest; verify Noto Serif against the hero headline and report if it looks wrong.
- Typography utilities (via `@utility` or a components layer): `text-display` (serif bold, 68/1.02 desktop, fluid down to ~40px on mobile), `text-section` (Inter light, 44/1.08, fluid down to ~30px), `text-statement` (Inter light ~40/1.2, for large statement paragraphs), `text-card-title` (Inter ~28 light), `text-lead` (18/1.6, muted), `text-label` (12px, 700, uppercase, tracking ~0.12em).
- Base styles: body bg canvas, text navy, antialiased, `scroll-behavior: smooth` (disabled under prefers-reduced-motion), global `:focus-visible` ring (2px navy, 2px offset; light ring on navy surfaces via a `.on-dark` helper), reduced-motion rule that removes transitions/animations.

DO NOT: build components or pages; do not hard-code hex outside the token block; do not add a tailwind.config file.

VERIFY: temporarily render swatches/type samples in page.tsx, compare with the Visual Design Guide at 1440px, then restore page.tsx to `<h1>MSAM</h1>`. Report sampled colours and font observations.

STANDING RULES: First inspect the repository and extend what exists; never recreate or overwrite existing work. design-reference/ PNGs are the visual source of truth. Use design tokens (no hard-coded hex), Server Components by default, strict TypeScript (no any), no new dependencies unless listed above, mobile-first responsive (designs are desktop-only, infer tablet/mobile), semantic accessible HTML. Run typecheck, lint and build and check 375/768/1024/1440 px where UI exists. FINAL REPORT in exactly this format: Implemented / Files created / Files modified / Dependencies added / Tests/checks performed / Known issues / Things that require review.
```

#### PART 2.2 — LAYOUT PRIMITIVES

```text
PROJECT: MSAM — Manna / Share A Meal website (Next.js, TS strict, Tailwind v4 tokens in globals.css).

CURRENT STATE: Tokens, fonts and typography utilities exist (Part 2.1).

OBJECTIVE: Build the layout primitives in src/components/ui/ (Server Components). Study design-reference/Visual Design Guide/Layout system.png and the section rhythm in design-reference/Home Page/*.png.

COMPONENTS:
- `Container`: max content width 1296px centred inside a 1440 canvas; horizontal padding 20 → 32 (sm) → 48 (lg) → 72px (xl).
- `Section`: props `tone` (canvas | white | lavender | warm | cream | navy), `spacing` (sm 48 | md 72 | lg 88 px vertical, reduced on mobile), `as`, `id`, `className`. Navy tone sets light text colours via the `.on-dark` helper. Wraps children in Container unless `bleed` is set.
- `Eyebrow`: 24px gold dash + `text-label` text (navy; `onDark` variant light).
- `Heading`: props `as` (h1–h4), `variant` (display | section | statement | card). Variant controls style only, not the tag.
- `Lead`: muted 18/1.6 paragraph, optional `onDark`.
- `SectionHeader`: composes Eyebrow + Heading + Lead, `align` (left | center), optional right-hand slot (see "Food journey" and "Contact pathways" headings with right-aligned copy in design-reference/Home Page/3 and 7).

RULES: Accept and merge `className` with `cn()`. No data, no copy. Typed props with JSDoc one-liners.

DO NOT: build buttons, cards, forms or any page. Do not edit tokens unless a token is missing (report it).

VERIFY: temporarily render each component in page.tsx at 375/768/1440, confirm section tone backgrounds against the frames, then restore page.tsx.

STANDING RULES: First inspect the repository and extend what exists; never recreate or overwrite existing work. design-reference/ PNGs are the visual source of truth. Use design tokens (no hard-coded hex), Server Components by default, strict TypeScript (no any), no new dependencies unless listed above, mobile-first responsive (designs are desktop-only, infer tablet/mobile), semantic accessible HTML. Run typecheck, lint and build and check 375/768/1024/1440 px where UI exists. FINAL REPORT in exactly this format: Implemented / Files created / Files modified / Dependencies added / Tests/checks performed / Known issues / Things that require review.
```

#### PART 2.3 — ACTIONS & SURFACES

```text
PROJECT: MSAM — Manna / Share A Meal website (Next.js, TS strict, Tailwind v4).

CURRENT STATE: Tokens and layout primitives exist.

OBJECTIVE: Build actions and surface components in src/components/ui/. Study design-reference/Visual Design Guide/Component library.png, Header.png, and the buttons/cards in design-reference/Home Page/4-Ways to take part.png and 2-Mission and origin.png.

COMPONENTS:
- `Button`: polymorphic (renders `next/link` when `href` is given, otherwise `<button>`). Variants: `primary` (gold fill, navy text), `secondary` (white/transparent, 1px navy outline), `dark` (navy fill, white text, gold trailing arrow), `light` (white fill, navy text, for use on navy). Sizes: `sm` (40px), `md` (48px), `lg` (56px, full-width form submits). Pill radius. Props `icon` ('arrow' | 'heart' | none) as a trailing lucide icon, `loading` (disabled + `aria-busy` + spinner, width stable), `fullWidth`. Hover/active/focus/disabled states.
- `TextLink`: bold navy text + arrow icon, underline on hover.
- `Badge`: pill; tones `lavender | warm | navy | outline | gold`; optional leading dot (see "Operations live", "Most impact" in design-reference/Home Page/6-Donation.png and Get Help Form/Step-1.png).
- `IconBadge`: rounded tile (sizes sm/md/lg) with tint `lavender | warm | sage | white | gold`, takes a lucide icon.
- `Card`: 32px radius, 1px border, `shadow-card`, generous padding; props `tint` (white | lavender | warm | sage | navy), `padding`.
- `CheckList`: green check + text items, `onDark` variant.
- `StatCard`: big number + bold label + muted caption; variants `light | navy | warm` (gold numbers on navy, see Home Mission/Impact frame).

RULES: Choose lucide icons that visually match the frames (heart, hand-heart, handshake, utensils, etc.); if one does not match, create a small inline SVG icon in `src/components/ui/icons/` and note it. Variants are plain typed maps; do not add class-variance-authority.

DO NOT: build form controls or sections; do not hard-code colours.

VERIFY: temporary render of every variant at 375 and 1440; compare button heights/radius with Header.png; keyboard focus visible on every interactive element; restore page.tsx.

STANDING RULES: First inspect the repository and extend what exists; never recreate or overwrite existing work. design-reference/ PNGs are the visual source of truth. Use design tokens (no hard-coded hex), Server Components by default, strict TypeScript (no any), no new dependencies unless listed above, mobile-first responsive (designs are desktop-only, infer tablet/mobile), semantic accessible HTML. Run typecheck, lint and build and check 375/768/1024/1440 px where UI exists. FINAL REPORT in exactly this format: Implemented / Files created / Files modified / Dependencies added / Tests/checks performed / Known issues / Things that require review.
```

#### PART 2.4 — FORM PRIMITIVES & TABS

```text
PROJECT: MSAM — Manna / Share A Meal website (Next.js, TS strict, Tailwind v4).

CURRENT STATE: Tokens, layout primitives, Button/Card/Badge/etc. exist.

OBJECTIVE: Build presentational form controls (no validation logic, no submission) in src/components/form/ and an accessible Tabs/SegmentedControl in src/components/ui/. Study: design-reference/Visual Design Guide/Component library.png (Forms & selection, Donation selector), Home Page/7-Contact pathways.png, Home Page/6-Donation.png, How it works Page/4-Assistance request.png, Get Help Form/Step-1/2/3.png, Mission Page/3-Contact pathways.png.

COMPONENTS (all accept `ref` and standard HTML props so React Hook Form `register` works):
- `Field`: label above the control (14px medium navy), optional required asterisk (danger colour), hint text, error message (`role="alert"` not needed; link via `aria-describedby`), sets `aria-invalid` on the child.
- `Input` (14px radius, 1px border token, white bg, muted placeholder, navy focus ring, ~52px tall), `Textarea` (min-height ~112px, resize-y), `Select` (native `<select>` styled with chevron).
- `Checkbox`: real input, 20px box, navy fill + white check when checked (selection must not rely on colour alone), label text beside it. `CheckboxGroup`: `<fieldset>` + `<legend>`, horizontal wrap layout.
- `ChipToggle`: pill built on a visually hidden checkbox/radio; selected state = tinted fill + 1px gold or navy border + leading check icon (tones: `warm` for dietary chips in Get Help Step-3, `lavender` for status chips in Step-2, `plain` for amount tiles in the donation selector where selection = warm fill + gold border).
- `SegmentedControl`: radiogroup (lavender track, navy selected pill, optional small gold badge such as "MOST IMPACT") for "Give once / Give monthly".
- `Tabs` (client): ARIA tabs pattern — tablist/tab/tabpanel, roving tabindex, ArrowLeft/Right, Home/End, controlled and uncontrolled, `variant="underline"` (gold underline on active tab with icon + label, as in Mission/Donate form cards; on mobile the tablist scrolls horizontally).
- Visible focus on all controls; disabled and error states (danger border + message).

DO NOT: add Zod/RHF usage here; do not build FileAttach (comes with the intake form); do not add dependencies.

VERIFY: temporary render of all states; keyboard-only walkthrough of Tabs and chips; screen-reader names correct (label ↔ input); restore page.tsx.

STANDING RULES: First inspect the repository and extend what exists; never recreate or overwrite existing work. design-reference/ PNGs are the visual source of truth. Use design tokens (no hard-coded hex), Server Components by default, strict TypeScript (no any), no new dependencies unless listed above, mobile-first responsive (designs are desktop-only, infer tablet/mobile), semantic accessible HTML. Run typecheck, lint and build and check 375/768/1024/1440 px where UI exists. FINAL REPORT in exactly this format: Implemented / Files created / Files modified / Dependencies added / Tests/checks performed / Known issues / Things that require review.
```

#### PART 2.5 — MEDIA ABSTRACTION (CLOUDINARY-READY)

```text
PROJECT: MSAM — Manna / Share A Meal website (Next.js, TS strict, Tailwind v4). Every photo in design-reference/ is a PLACEHOLDER; real images will come from Cloudinary later.

CURRENT STATE: Design system primitives exist. env.ts exposes NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME (optional).

OBJECTIVE: Build the image abstraction so replacing placeholders later requires no component edits.

DESIGN:
1. `src/content/images.ts`: a typed registry (`as const satisfies Record<string, ImageAsset>`) where `ImageAsset = { publicId?: string; alt: string; aspect: '1/1' | '4/3' | '3/2' | '16/9' | '4/5' | '3/4' | '2/3' | string }`. `publicId` is undefined for now. Seed it with the Home hero mosaic keys: `home.hero.main` (large portrait ~ 422×540 in the 1440 frame → 4/5), `home.hero.top`, `home.hero.bottom` (~4/3). Add a header comment documenting the naming convention `msam/{page}/{section}-{slug}` for Cloudinary public IDs. Later parts will add keys.
2. `src/lib/cloudinary-loader.ts`: default-export loader `({ src, width, quality }) => https://res.cloudinary.com/<cloud>/image/upload/f_auto,q_<quality|auto>,c_limit,w_<width>/<src>`; `src` is the public ID. Read the cloud name from NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME.
3. `next.config.ts`: `images: { loader: 'custom', loaderFile: './src/lib/cloudinary-loader.ts' }` (functions cannot be passed from Server Components to next/image, so use loaderFile). Consequence: every next/image `src` is a Cloudinary public ID; the logo/SVGs are inline SVG or plain files, not next/image.
4. `src/components/media/MediaImage.tsx` (Server Component): props `assetKey: ImageKey`, `sizes` (required), `priority?`, `className?`, `rounded?: 'none'|'panel'|'card'`, `fit?: 'cover'|'contain'`. Renders an `aspect-ratio` container with `overflow-hidden` + radius, and `next/image fill` when a publicId AND cloud name exist; otherwise renders `PlaceholderBlock` (lavender gradient with a subtle image icon, identical aspect and radius, `role="img"` with the registry alt text so layout and a11y stay correct).
5. `src/components/media/PlaceholderBlock.tsx`.
6. `src/lib/cloudinary.ts`: helper `cloudinaryUrl(publicId, { width, height, crop })` for non-next/image uses (e.g., OG images) and constants for folder names.
7. `.env.example`: document the Cloudinary variables.

DO NOT: add `next-cloudinary` or the `cloudinary` package; do not hard-code any image URL in components; do not import `serverEnv` here.

VERIFY: with no env set, `<MediaImage assetKey="home.hero.main" />` renders the placeholder at the correct aspect; with `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=demo` and a temporary `publicId: 'sample'` it requests a well-formed Cloudinary URL (then revert the temporary publicId). `pnpm build` passes.

STANDING RULES: First inspect the repository and extend what exists; never recreate or overwrite existing work. design-reference/ PNGs are the visual source of truth. Use design tokens (no hard-coded hex), Server Components by default, strict TypeScript (no any), no new dependencies unless listed above, mobile-first responsive (designs are desktop-only, infer tablet/mobile), semantic accessible HTML. Run typecheck, lint and build and check 375/768/1024/1440 px where UI exists. FINAL REPORT in exactly this format: Implemented / Files created / Files modified / Dependencies added / Tests/checks performed / Known issues / Things that require review.
```

#### PART 2.6 — STYLEGUIDE ROUTE & FIDELITY CHECK

```text
PROJECT: MSAM — Manna / Share A Meal website (Next.js, TS strict, Tailwind v4).

CURRENT STATE: Tokens, layout primitives, actions/surfaces, form primitives, Tabs, MediaImage exist.

OBJECTIVE: Create a dev-only `/styleguide` page that reproduces the Visual Design Guide so we can verify design-system fidelity before building pages.

BUILD (src/app/styleguide/page.tsx, with `export const metadata = { robots: { index: false } }`; call `notFound()` when `process.env.NODE_ENV === 'production'`):
- Colour swatches with hex values; typography hierarchy (Display 68/1.02, Section 44/1.08, Lead 18/1.6, Label 12/700, plus statement and card-title); spacing scale (8,16,24,32,48,72,88); surface conventions (14 / 24 / 32px radii).
- Interface patterns: all Button variants/sizes, TextLink, Badge tones, form controls in default/focus/error/disabled states, Checkbox, ChipToggle tones, SegmentedControl, Tabs, an amount-tile grid ($5, $10, $15, $20, $150, $300; $150 selected) matching the Donation selector, Card tints, StatCard variants (light, navy "40–60 / Families Fed Every Saturday", warm), CheckList, IconBadge, MediaImage placeholder.

FIDELITY CHECK: compare the page at 1440px against design-reference/Visual Design Guide/*.png and design-reference/Header.png. List every measurable difference (colour, radius, font size/weight, spacing, button height) and FIX the components, not the styleguide. Include a table in your report: element → design value → implemented value → status.

DO NOT: link the styleguide from navigation; add dependencies; start on global layout.

VERIFY: page renders at 375 and 1440; no console errors; `pnpm build` output shows `/styleguide` returns 404 in production mode (confirm with `pnpm start`).

STANDING RULES: First inspect the repository and extend what exists; never recreate or overwrite existing work. design-reference/ PNGs are the visual source of truth. Use design tokens (no hard-coded hex), Server Components by default, strict TypeScript (no any), no new dependencies unless listed above, mobile-first responsive (designs are desktop-only, infer tablet/mobile), semantic accessible HTML. Run typecheck, lint and build and check 375/768/1024/1440 px where UI exists. FINAL REPORT in exactly this format: Implemented / Files created / Files modified / Dependencies added / Tests/checks performed / Known issues / Things that require review.
```

### ==== PHASE 3 — GLOBAL SHELL ====

#### PART 3.1 — BRAND, NAV DATA & URGENT MESSAGE

```text
PROJECT: MSAM — Manna / Share A Meal website (Next.js, TS strict, Tailwind v4).

CURRENT STATE: Design system complete and verified (Phase 2). `siteConfig` holds phone/email/EIN/socials.

OBJECTIVE: Create the logo component, the navigation/content data, and the UrgentMessage bar. Study design-reference/Top-Urgent message.png, Header.png, Final call to action and footer.png, and render design-reference/Assets/Logo.svg.

DO:
1. Logo: inspect Assets/Logo.svg (Illustrator export with hidden `display:none` layers, fills #DEB14E, #CBB5D7, white). Determine whether it contains the full lockup or only the hexagon/hands icon. Produce a cleaned `public/brand/logo.svg` and a `Logo` component (src/components/media/Logo.tsx, inline SVG so colours can be themed) with two variants: `header` (icon + vertical divider + "SHARE·A·MEAL" wordmark with gold dots, navy/black on white, as in Header.png) and `footer` (white icon + "MANNA / SHARE A MEAL ✦" stacked lockup as in the footer frame). If the SVG only supplies the icon, build the wordmark as SVG text with Inter, tracking and weight matched to the frames, and report that final wordmark artwork is needed. Accessible name: "Manna Share A Meal — home" when used as a link.
2. `src/content/navigation.ts` (typed): `primaryNav` = Our mission → /mission, How it works → /how-it-works, Ways to help → /donate, Community → /community/food-providers (active for any /community/*); `headerCtas` = Get Food Support → /get-help, Donate Now → /donate; `urgentMessage` = { text: "Need Prayer? Call us: 954-406-7580" (build from siteConfig, tel link), action: { label: "Give monthly", href: "/donate" } }; `footerColumns`: Ways to help (Request groceries and support → /get-help; Donate food → /community/food-providers; Host a distribution → /community/partners; Volunteer → /community/volunteers; Fund the mission → /donate), About (Our mission → /mission; How food moves → /how-it-works; Community members → /community/food-providers; Impact and stewardship → /mission#regional-growth; News and stories → /news with `hidden: true`), `legalLinks` (Privacy → /privacy, Accessibility → /accessibility, Financial transparency → /financial-transparency). These destinations are working assumptions; keep them in this one file.
3. `UrgentMessage` (src/components/layout/UrgentMessage.tsx, Server Component): 38px navy bar, phone as a `tel:` link in white 13–14px semibold, gold "Give monthly →" link right-aligned, aligned to the Container. On mobile keep a single line (shorten spacing, never wrap; if needed drop the arrow).

DO NOT: build Header/Footer yet; do not hard-code phone numbers outside siteConfig; do not make the bar sticky or dismissible.

VERIFY: temporary render of Logo variants (light and navy backgrounds) and UrgentMessage at 375/1440 against the frames; then restore page.tsx.

STANDING RULES: First inspect the repository and extend what exists; never recreate or overwrite existing work. design-reference/ PNGs are the visual source of truth. Use design tokens (no hard-coded hex), Server Components by default, strict TypeScript (no any), no new dependencies unless listed above, mobile-first responsive (designs are desktop-only, infer tablet/mobile), semantic accessible HTML. Run typecheck, lint and build and check 375/768/1024/1440 px where UI exists. FINAL REPORT in exactly this format: Implemented / Files created / Files modified / Dependencies added / Tests/checks performed / Known issues / Things that require review.
```

#### PART 3.2 — HEADER (DESKTOP)

```text
PROJECT: MSAM — Manna / Share A Meal website (Next.js, TS strict, Tailwind v4).

CURRENT STATE: Logo, navigation data, UrgentMessage exist.

OBJECTIVE: Build the desktop Header. Study design-reference/Header.png (88px tall, white, 1px bottom border) and the header in design-reference/Get Help Form/Step-1.png (active "Get food support" button in lavender).

BUILD:
- `src/components/layout/Header.tsx` (Server Component): Container with logo left, primary nav centred, CTAs right: secondary Button "Get Food Support →" and primary Button "Donate Now ♡" (heart icon). Not sticky. Semantic `<header>` with `<nav aria-label="Primary">`.
- `NavLink` (small client component using `usePathname`): sets `aria-current="page"`; active style = semibold + 2px gold underline offset below the text. "Community" is active for any path starting with /community. The Get Food Support button, when on /get-help, uses the lavender-deep fill (pass an `active` prop to Button via a small `HeaderCta` client wrapper).
- Layout: full desktop nav at `lg` and above. Below `lg`, render only the logo and an empty slot reserved for the mobile menu trigger (Part 3.3) — add a clearly marked placeholder comment, no hamburger yet.
- Nav text ~15px regular navy with comfortable hit areas (min 44px height).

DO NOT: implement the mobile menu; change the Button API except adding the small `active` state if required (report it); do not wire the Header into layout.tsx yet (Part 3.5).

VERIFY: temporary render in page.tsx at 1440 and 1024 against Header.png; keyboard tab order logo → nav → CTAs; active states checked by temporarily mocking pathname or via the stub routes later (note which). Restore page.tsx.

STANDING RULES: First inspect the repository and extend what exists; never recreate or overwrite existing work. design-reference/ PNGs are the visual source of truth. Use design tokens (no hard-coded hex), Server Components by default, strict TypeScript (no any), no new dependencies unless listed above, mobile-first responsive (designs are desktop-only, infer tablet/mobile), semantic accessible HTML. Run typecheck, lint and build and check 375/768/1024/1440 px where UI exists. FINAL REPORT in exactly this format: Implemented / Files created / Files modified / Dependencies added / Tests/checks performed / Known issues / Things that require review.
```

#### PART 3.3 — MOBILE NAVIGATION

```text
PROJECT: MSAM — Manna / Share A Meal website (Next.js, TS strict, Tailwind v4).

CURRENT STATE: Desktop Header built (Part 3.2) with a reserved slot below `lg`. Mobile navigation is NOT in the designs; design it consistent with the system (navy/white/gold, pill buttons, 32px radii).

OBJECTIVE: Build the accessible mobile menu.

BUILD (`src/components/layout/MobileMenu.tsx`, client component):
- Hamburger/close icon button in the Header (visible below `lg`), `aria-expanded`, `aria-controls`, accessible label "Open menu"/"Close menu", min 44px hit area.
- Panel implemented with a native `<dialog>` opened via `showModal()` (free focus trap, Escape to close, inert background). Full-height sheet sliding in from the right or a full-screen overlay; white background, large readable links (18–20px), the Community item expanded to show its three sub-links (Food Providers, Volunteers, Partners), then two full-width Buttons (Get Food Support, Donate Now), then the prayer phone link (`tel:`).
- Behaviour: close on link click, on route change, on Escape, on backdrop click, and when the viewport becomes ≥ `lg`; return focus to the trigger on close; lock body scroll while open; respect prefers-reduced-motion (no slide animation).
- Data from `content/navigation.ts`; no duplicated link lists.

DO NOT: add a dialog/animation library; change desktop Header appearance; alter navigation data except to add the Community children if missing (report it).

VERIFY: at 375 and 768px: open/close, keyboard (Tab cycles inside, Escape closes, focus returns), screen-reader labels, no body scroll while open, no layout shift. Restore page.tsx afterwards.

STANDING RULES: First inspect the repository and extend what exists; never recreate or overwrite existing work. design-reference/ PNGs are the visual source of truth. Use design tokens (no hard-coded hex), Server Components by default, strict TypeScript (no any), no new dependencies unless listed above, mobile-first responsive (designs are desktop-only, infer tablet/mobile), semantic accessible HTML. Run typecheck, lint and build and check 375/768/1024/1440 px where UI exists. FINAL REPORT in exactly this format: Implemented / Files created / Files modified / Dependencies added / Tests/checks performed / Known issues / Things that require review.
```

#### PART 3.4 — FOOTER

```text
PROJECT: MSAM — Manna / Share A Meal website (Next.js, TS strict, Tailwind v4).

CURRENT STATE: Logo (footer variant), navigation data and design system exist.

OBJECTIVE: Build the Footer. Study design-reference/Final call to action and footer.png (navy, ~410px tall at 1440). Note: despite the filename there is NO call-to-action band in the frame; build only what is shown.

BUILD:
- `src/components/layout/Footer.tsx` (Server Component): four columns at `lg` (brand block | Ways to help | About | Newsletter). Brand block: white logo, `siteConfig.missionStatement`, three circular social buttons (Instagram, Facebook, LinkedIn icons; ~38px, translucent white fill + subtle border; links from siteConfig, `aria-label`s, open in new tab with `rel="noopener noreferrer"`). Link columns: gold uppercase `text-label` heading, links from `content/navigation.ts` (skip items with `hidden: true`). Newsletter: gold label, short description ("Monthly stories, volunteer opportunities, and practical ways to help."), pill email field with a gold circular arrow submit button inside it, then email and community line ("Community line: (954) 406-7580") from siteConfig. Divider, then bottom row: "© {current year} Manna / Share A Meal. All rights reserved." left, legal links right.
- `src/features/forms/NewsletterForm.tsx` (client): visual form only for now — visually hidden `<label>` "Email address", `type="email"` input, submit button with `aria-label="Subscribe to newsletter"`; submit handler calls `preventDefault` and does nothing (Part 4.4 wires it). Leave a TODO.
- Mobile: brand block first; the two link columns side by side (2-up); newsletter full width; legal row stacks and centres; touch targets ≥ 44px.

DO NOT: add validation or API calls; do not hard-code contact details or link lists; do not wire into layout.tsx (Part 3.5).

VERIFY: temporary render at 1440 vs the frame (column x-positions, 72px margins, spacing), plus 768 and 375; restore page.tsx.

STANDING RULES: First inspect the repository and extend what exists; never recreate or overwrite existing work. design-reference/ PNGs are the visual source of truth. Use design tokens (no hard-coded hex), Server Components by default, strict TypeScript (no any), no new dependencies unless listed above, mobile-first responsive (designs are desktop-only, infer tablet/mobile), semantic accessible HTML. Run typecheck, lint and build and check 375/768/1024/1440 px where UI exists. FINAL REPORT in exactly this format: Implemented / Files created / Files modified / Dependencies added / Tests/checks performed / Known issues / Things that require review.
```

#### PART 3.5 — LAYOUT WIRING, ROUTE STUBS & ERROR PAGES

```text
PROJECT: MSAM — Manna / Share A Meal website (Next.js, TS strict, Tailwind v4).

CURRENT STATE: UrgentMessage, Header (+MobileMenu), Footer exist but are not mounted.

OBJECTIVE: Assemble the global shell via the root layout and create stub routes so every link resolves.

DO:
1. `src/app/layout.tsx`: `<body>` as a flex column with `min-h-screen`: SkipLink ("Skip to main content", visible on focus) → UrgentMessage → Header → `<main id="main" tabIndex={-1}>{children}</main>` → Footer. Pages must NOT render their own `<main>`, header or footer. Minimal default metadata: title default "Manna — Share A Meal", template "%s | Manna Share A Meal", `metadataBase` from env.
2. Stub pages (each `export const metadata = { title }`, one `<h1>`, short "Page under construction" text in a Container/Section): /how-it-works, /mission, /community/food-providers, /community/volunteers, /community/partners, /donate, /get-help. `/community` redirects (permanent) to /community/food-providers. Legal stubs /privacy, /accessibility, /financial-transparency with `robots: { index: false }`. Home page.tsx also a stub (return a fragment, no `<main>`).
3. `not-found.tsx`: friendly 404 (heading, one sentence, primary Button "Back to home", prayer/phone line). `error.tsx` (client, with `reset` button) and `global-error.tsx`, styled with the design system.

DO NOT: build real page content; add a sticky header; add providers or global state.

VERIFY: click every header link, footer link and the mobile-menu links — none may 404 (except hidden items); active nav states work on /how-it-works, /mission, /community/*, /get-help; skip-link works with keyboard; one `<main>` per page; compare the shell against design-reference/Home Page/1-Hero.png top area at 1440 and against 375px. `pnpm build` passes.

STANDING RULES: First inspect the repository and extend what exists; never recreate or overwrite existing work. design-reference/ PNGs are the visual source of truth. Use design tokens (no hard-coded hex), Server Components by default, strict TypeScript (no any), no new dependencies unless listed above, mobile-first responsive (designs are desktop-only, infer tablet/mobile), semantic accessible HTML. Run typecheck, lint and build and check 375/768/1024/1440 px where UI exists. FINAL REPORT in exactly this format: Implemented / Files created / Files modified / Dependencies added / Tests/checks performed / Known issues / Things that require review.
```
