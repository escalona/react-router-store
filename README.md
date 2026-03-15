# React Router Store

Small storefront built with React Router 7, Cloudflare Workers, and Stripe Checkout.

This repo is a focused example app rather than a full commerce platform. The catalog is static, cart state lives in an HTTP-only cookie, and checkout is handed off to Stripe's hosted flow.

## What It Includes

- Server-rendered React Router app deployed on Cloudflare Workers
- Product listing and product detail pages
- Cookie-backed cart with add, update, and remove actions
- Stripe Checkout session creation on the server
- Tailwind CSS 4 styling

## Stack

- React 19
- React Router 7
- Cloudflare Workers via Wrangler
- Stripe
- Tailwind CSS 4
- TypeScript

## Getting Started

### Prerequisites

- `pnpm`
- A Stripe test secret key
- A Cloudflare account if you plan to deploy

### Install

```bash
pnpm install
```

### Configure Local Environment

Copy the example env file and add your Stripe secret key:

```bash
cp .dev.vars.example .dev.vars
```

```dotenv
STRIPE_SECRET_KEY=sk_test_...
```

`STRIPE_SECRET_KEY` is required for the `/checkout` action, which creates the hosted Stripe Checkout session.

### Run Locally

```bash
pnpm dev
```

The app runs at `http://localhost:5173`.

## Available Scripts

- `pnpm dev` starts the local development server
- `pnpm build` creates the production build
- `pnpm preview` previews the production build locally
- `pnpm deploy` builds and deploys the Worker with Wrangler
- `pnpm test` runs the Vitest suite once
- `pnpm test:watch` starts Vitest in watch mode
- `pnpm cf-typegen` regenerates Cloudflare environment types
- `pnpm typecheck` regenerates types and runs TypeScript checks
- `pnpm lint` runs `oxlint`
- `pnpm lint:fix` applies safe lint fixes
- `pnpm fmt` formats the repo with `oxfmt`
- `pnpm fmt:check` checks formatting without writing changes

## Project Map

- `app/routes.ts` defines the storefront routes
- `app/routes/store-layout.tsx` renders the shared shell and cart count
- `app/data/products.ts` contains the static product catalog
- `app/lib/cart.server.ts` parses and serializes the cart cookie
- `app/test/setup.ts` configures shared Vitest and Testing Library behavior
- `app/test/render-with-router.tsx` wraps components in a router for UI tests
- `app/lib/stripe.server.ts` creates the Stripe client and checkout session
- `workers/app.ts` is the Cloudflare Worker entry point
- `.dev.vars.example` shows the local env shape

## Testing

Vitest and Testing Library are configured out of the box.

- Colocate tests with the source as `*.test.ts` or `*.test.tsx`
- Use `app/test/render-with-router.tsx` for route and component tests that need router context
- Current starter coverage includes cart cookie helpers, a product route action, and the home route UI

Before shipping changes, run:

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm fmt:check
```

## Checkout Flow

1. Products are defined in `app/data/products.ts`.
2. Adding an item writes the cart into the `__cart` HTTP-only cookie.
3. Posting to `/checkout` reads that cookie and creates a Stripe Checkout session.
4. Stripe redirects back to `/checkout/success`, which clears the cart cookie.

## Deploying

Set the production Stripe secret in Cloudflare before deploying:

```bash
npx wrangler secret put STRIPE_SECRET_KEY
```

Then deploy:

```bash
pnpm deploy
```

`pnpm deploy` runs the build first, then publishes the Worker using the configuration in `wrangler.jsonc`.

## Current Limits

- The product catalog is hard-coded
- Cart state is stored entirely in a cookie
- There is no database, inventory system, or order persistence
- The success page clears the cart, but there is no webhook-based fulfillment flow

If you want to turn this into a real store, the next steps are usually product data storage, order persistence, Stripe webhooks, and authenticated admin tooling.
