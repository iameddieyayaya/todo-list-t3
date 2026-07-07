# Todo Checklist

Todo Checklist is a T3-stack todo app with username/password authentication, Neon Postgres persistence, and a responsive Tailwind UI.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- tRPC
- NextAuth.js credentials auth
- Drizzle ORM
- Neon Postgres
- pnpm

## Features

- Username and password signup
- Username and password login/logout
- Protected `/todos` route
- User-scoped todo CRUD
- Completion toggle with strikethrough state
- Inline editing
- Filters for `All`, `Active`, and `Completed`
- Loading, empty, and error states
- Basic auth tests with Node's built-in test runner

## Project Structure

- `src/app/page.tsx`: public landing page
- `src/app/todos/page.tsx`: protected todo page
- `src/app/_components/auth/*`: auth UI components
- `src/app/_components/todo/*`: todo UI components
- `src/server/api/routers/auth.ts`: signup API
- `src/server/api/routers/todo.ts`: todo CRUD API
- `src/server/auth/*`: NextAuth config and credential logic
- `src/server/db/schema.ts`: Drizzle schema
- `drizzle/`: generated SQL migration files
- `PROMPT.md`: assessment/prompt history for AI-assisted work

## Requirements

- Node.js `22.13+`
- pnpm `11+`
- Neon Postgres database

The repo includes [`.nvmrc`](./.nvmrc) pinned to `22.19.0`.

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Copy the environment file:

```bash
cp .env.example .env
```

3. Generate an auth secret:

```bash
pnpm exec auth secret
```

4. Set `DATABASE_URL` to your Neon Postgres connection string.

5. Run migrations:

```bash
pnpm db:generate
pnpm db:migrate
```

6. Start the app:

```bash
pnpm dev
```

## Environment Variables

- `AUTH_SECRET`: NextAuth secret
- `DATABASE_URL`: Neon Postgres connection string

See [`.env.example`](./.env.example) for the expected shape.

## Commands

- `pnpm dev`: run local development server
- `pnpm build`: production build
- `pnpm lint`: lint the project
- `pnpm typecheck`: run TypeScript checks
- `pnpm test`: run auth tests
- `pnpm db:generate`: generate Drizzle migrations
- `pnpm db:migrate`: apply Drizzle migrations
- `pnpm db:push`: push schema without generating SQL
- `pnpm db:studio`: open Drizzle Studio

## Verification

Run:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

If your shell is not already using the pinned Node version, run `nvm use` first.

## Assessment Deliverables

- Deploy to Vercel and add the live URL here
- Push to a private GitHub repository
- Invite GitHub users `axanthus` and `v3ceban`
- Record and link a Loom demo

### Loom Demo Checklist

- Show signup with username and password
- Show login and logout
- Show protected route behavior
- Show create/update/delete todo flows
- Show completion toggle and strikethrough state
- Show data loading from Neon on refresh
- Explain AI-assisted parts and your review process

## AI Usage

This repository includes [`PROMPT.md`](./PROMPT.md) to document the take-home instructions and the AI-agent usage guidance from the assessment.

## Notes

- The app currently uses lightweight local UI primitives in `src/app/_components/ui`.
- If you want stricter alignment with the assessment wording, you can still add official `shadcn/ui` installation metadata and swap some primitives to generated shadcn components.
