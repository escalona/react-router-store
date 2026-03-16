# Repository Guidelines

## Project Structure & Module Organization

`app/` contains the React Router storefront. Use `app/routes.ts` for route registration and add route modules under `app/routes/` (for example, `store-layout.tsx`, `checkout.tsx`, `checkout-success.tsx`). Keep static catalog data in `app/data/`, shared helpers in `app/lib/`, reusable UI components in `app/components/`, and server-only code in `*.server.ts` files such as `app/lib/cart.server.ts`. Global styles live in `app/app.css`, the Worker entrypoint is `workers/app.ts`, and static assets belong in `public/`. Copy `.dev.vars.example` when setting up local secrets.

## Build, Test, and Development Commands

`pnpm install` installs dependencies and runs Cloudflare type generation.
`pnpm dev` starts the local app at `http://localhost:5173`.
`pnpm build` creates the production bundle.
`pnpm preview` serves the built app locally.
`pnpm deploy` builds first, then deploys with Wrangler.
`pnpm test` runs the Vitest suite once.
`pnpm test:watch` starts Vitest in watch mode.
`pnpm cf-typegen` refreshes Cloudflare binding types.
`pnpm typecheck` regenerates types and runs `tsc -b`.
`pnpm lint` / `pnpm lint:fix` run `oxlint`.
`pnpm fmt` / `pnpm fmt:check` format or verify formatting with `oxfmt`.

## Policies & Mandatory Rules

### Mandatory Skill Usage

#### `$code-change-verification`

Run `$code-change-verification` before marking work complete when changes affect runtime code, tests, or build/test behavior.

Run it when you change:

- `app/`, `workers/`, or `public/`
- Root build/test config such as `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `tsconfig*.json`, `eslint.config.*`, or `vitest*.ts`

You can skip `$code-change-verification` for docs-only or repo-meta changes (for example, `docs/`, `.agents/`, `README.md`, `AGENTS.md`, `.github/`), unless a user explicitly asks to run the full verification stack.

## Base UI Components

The project uses [Base UI](https://base-ui.com) (`@base-ui/react`) for accessible, unstyled primitives styled with Tailwind CSS. Components live in `app/components/` and each file exports both a styled wrapper (e.g. `StyledSelect`) and the raw Base UI namespace (e.g. `Select`). The barrel export is `app/components/index.ts`.

When building new UI, prefer Base UI primitives over raw HTML for interactive elements (buttons, dialogs, selects, tooltips, etc.) to get built-in accessibility, keyboard navigation, and focus management. Use the styled wrappers for standard cases and the raw primitives when you need full control over markup.

Style Base UI component states using Tailwind’s `data-*:` variant shorthand (e.g. `data-checked:bg-gray-900`, `data-disabled:opacity-50`). Use bracket syntax only for hyphenated attributes like `data-[starting-style]:` or `data-[popup-open]:`.

The root layout wraps content in a `div.root-layout` with `isolation: isolate` so Base UI portals (dialogs, selects, popovers, tooltips) render above page content.

## Coding Style & Naming Conventions

Write TypeScript and TSX using the repo’s existing style: formatter-managed spacing, two-space indentation, double quotes, and concise functions. Name route files in kebab-case (`checkout-success.tsx`), React components in PascalCase, and server-only modules with a `.server.ts` suffix. Prefer small helpers in `app/lib/` and keep product/content definitions centralized in `app/data/`.

## Testing Guidelines

Vitest and Testing Library are configured for the starter. Treat `pnpm test`, `pnpm typecheck`, `pnpm lint`, and `pnpm fmt:check` as the minimum pre-PR checks. Continue to manually verify the main storefront flows: home, product detail, cart updates, checkout redirect, and checkout success. Colocate tests with the source as `*.test.ts` or `*.test.tsx`, and use `app/test/` for shared test helpers.

## Commit & Pull Request Guidelines

Recent history uses short, imperative commit subjects such as `Add oxlint and oxfmt`. Follow that pattern and keep subjects focused on one change. Pull requests should summarize the user-visible behavior, list verification commands, mention any config or secret changes, and include screenshots for UI updates. Link the relevant issue when one exists.

## Security & Configuration Tips

Keep `STRIPE_SECRET_KEY` in `.dev.vars` for local work and out of git. Store deployed secrets with `wrangler secret put STRIPE_SECRET_KEY`. After changing Worker bindings or environment types, run `pnpm cf-typegen` before committing.
