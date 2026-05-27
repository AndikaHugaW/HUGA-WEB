# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Andika Huga Widyatama's personal portfolio website built with Next.js 14 (App Router). It features premium animations using Framer Motion, 3D effects via Three.js/R3F, smooth scroll with Lenis, and performance optimizations for mobile devices.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Page Structure
- **`src/app/page.tsx`** — Home page composing all sections
- **`src/app/projects/page.tsx`** — Dedicated projects gallery page
- **`src/app/api/send-email/route.ts`** — Contact form API using Nodemailer

### Component Organization
- **`src/components/sections/`** — Page sections (Hero, About, Projects, Contact, FAQ, etc.)
- **`src/components/ui/`** — Reusable UI components (TextReveal, vortex, canvas-reveal-effect, MagneticButton, CustomCursor)
- **`src/components/layout/`** — Navbar, Footer
- **`src/components/hero/`** — Hero section with profile photo and stats
- **`src/components/providers/`** — Context providers (SmoothScrollProvider for Lenis)

### Key Patterns

**Smooth Scroll:** Lenis is configured in `SmoothScrollProvider.tsx` and wraps the app in `layout.tsx`. All scroll animations should integrate with Lenis.

**3D/Heavy Components:** Three.js and canvas components use lazy loading and dynamic imports. They include FPS throttling (30fps), Visibility API pauses, and device performance detection.

**Animations:** Framer Motion is used for most animations. TextReveal component provides per-word/letter text reveal effects. Use `motion` import from `framer-motion`.

## Environment Variables

```env
GMAIL_APP_PASSWORD=your_gmail_app_password  # For contact form email delivery
```

## Image Configuration

Next.js image optimization is configured for:
- `images.unsplash.com`
- `randomuser.me`
- `placehold.co`

All static images use AVIF/WebP formats with aggressive caching headers.

## Performance Strategy

Components automatically detect device capability and adjust animation FPS. Three.js components are tree-shaken via `optimizePackageImports` in next.config.js. Console logs are stripped in production builds.