# MSAM — Manna / Share A Meal Website

Official web application for **Manna / Share A Meal**, a 501(c)(3) nonprofit food-support organization serving Broward County, Florida.

## Project Overview

- **Stack**: Next.js (App Router), React 19, TypeScript (strict mode), Tailwind CSS v4.
- **Form & Validation**: React Hook Form + Zod (planned in upcoming phases).
- **Media**: Cloudinary integration abstraction (planned in upcoming phases).
- **Design Source of Truth**: Desktop Figma exports (1440px frames) located in `./design-reference/`.
- **Current Status**: Phase 1 foundation complete (Part 1.1 initialization & Part 1.2 tooling, environment validation, site configuration, and folder skeleton). UI components, routes, and backend integrations are currently under development.

---

## Prerequisites

- **Node.js**: `>= 20.0.0`
- **pnpm**: `>= 10.0.0` (v11 recommended)

---

## Installation & Setup

1. **Clone the repository and install dependencies**:

   ```bash
   pnpm install
   ```

2. **Configure environment variables**:

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your local settings if needed (defaults are preconfigured for local development).

3. **Start development server**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Script              | Command                                            | Purpose                                  |
| :------------------ | :------------------------------------------------- | :--------------------------------------- |
| `pnpm dev`          | `next dev`                                         | Start development server with Turbopack  |
| `pnpm build`        | `next build`                                       | Create optimized production build        |
| `pnpm start`        | `next start`                                       | Start production server                  |
| `pnpm lint`         | `eslint`                                           | Run ESLint checks across project         |
| `pnpm typecheck`    | `tsc --noEmit`                                     | Run TypeScript strict compiler checks    |
| `pnpm format`       | `prettier --write .`                               | Format project source files              |
| `pnpm format:check` | `prettier --check .`                               | Check formatting without modifying files |
| `pnpm check`        | `pnpm typecheck && pnpm lint && pnpm format:check` | Run typecheck, lint, and format checks   |

---

## Environment Variables

Environment variables are validated with Zod across two distinct modules to guarantee boundary safety:

### Public Variables (`src/config/env.ts`)

Client-safe configuration accessible across both Server and Client Components:

- `NEXT_PUBLIC_SITE_URL`: Canonical site URL (default: `http://localhost:3000`).
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Optional Cloudinary cloud name for media assets.
- `NEXT_PUBLIC_DONATION_URL`: Optional external donation processing URL.

### Server-Only Variables (`src/config/server-env.ts`)

Protected by the `server-only` guard; importing this module in Client Components triggers a build-time compilation error to prevent secrets from entering client bundles:

- `CLOUDINARY_API_KEY`: Optional Cloudinary API key for server operations.
- `CLOUDINARY_API_SECRET`: Optional Cloudinary API secret for server operations.
- `SUBMISSION_SINK`: Form submission destination (default: `console`).

Refer to `.env.example` for comprehensive documentation and placeholders.

---

## Folder Structure

```text
├── design-reference/         # Visual design frames (desktop 1440px PNGs, Git-ignored)
├── public/
│   └── brand/               # Brand assets and logos
├── src/
│   ├── app/                 # Next.js App Router (pages, layout, globals.css)
│   ├── components/          # Reusable UI components
│   │   ├── layout/          # Navigation, Header, Footer, Container, Section
│   │   ├── ui/              # Buttons, Cards, Badges, Tabs, Primitives
│   │   ├── form/            # Input fields, Checkboxes, Selects, Toggles
│   │   ├── media/           # Media image wrappers and placeholder blocks
│   │   └── sections/        # Composite page section components
│   ├── config/              # Site constants (site.ts) and env validation (env.ts)
│   ├── content/             # Structured text, copy, and image metadata registries
│   ├── features/            # Feature-specific workflows
│   │   ├── forms/           # Form submission handlers and schemas
│   │   ├── donate/          # Donation intent handlers and selectors
│   │   └── get-help/        # Food support intake wizard logic
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Shared utilities (cn.ts, validation, API helpers)
│   └── types/               # Global TypeScript declarations and interfaces
```

---

## Design Reference

The `./design-reference/` directory contains extracted PNG frames, component specifications, and color/typography guides representing the visual source of truth for MSAM.

> **Note**: `./design-reference/` is intentionally excluded from Git (`.gitignore`) to keep the repository lightweight. It serves as local developer reference only.
