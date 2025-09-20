# Alcott Shipping Service

A Next.js 14 app (App Router) with Tailwind v4 and shadcn/ui, for shipping and tracking packages.

## Tech
- Next.js 14, React 18
- Tailwind CSS v4, OKLCH design tokens
- shadcn/ui (Radix primitives), lucide-react
- Vercel Analytics

## Getting started
```bash
pnpm i
pnpm dev
# build
pnpm build && pnpm start
```

## Project structure
```
app/                # App Router, routes and layout
  layout.tsx       # Root layout, fonts, analytics
  globals.css      # Tailwind layers and theme tokens
  page.tsx         # Landing page
components/
  theme-provider.tsx
  ui/              # shadcn/ui components
hooks/
  use-mobile.ts
  use-toast.ts     # Re-export of components/ui/use-toast
lib/
  utils.ts         # cn() utility
public/            # Static assets (logo, images, placeholder.svg)
```

## Conventions
- Use `@/*` import alias (see `tsconfig.json`).
- Prefer `components/ui/*` for shared primitives; re-export hooks under `hooks/*` if needed.
- Keep `app/globals.css` as the single source of global styles and tokens.
- Use `cn()` from `lib/utils.ts` for class composition.

## Scripts
- dev: run the development server
- build: production build
- start: start production server

## Deployment
Vercel . Re-enable TypeScript/ESLint checks in `next.config.mjs` before production.
