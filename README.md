# Todo Checklist

Production-ready Todo Checklist app built with the T3 stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- tRPC
- NextAuth.js credentials auth
- Drizzle ORM
- Neon Postgres
- pnpm

## Features

- Username and password signup/login
- Protected `/todos` route
- User-scoped todo CRUD
- Inline edit, completion toggle, delete
- Filters for all, active, and completed
- Loading, empty, and error states
- Responsive UI designed for Vercel deployment

## Requirements

- Node.js `22.13+`
- pnpm `11+`
- A Neon Postgres database

The repo includes [`.nvmrc`](./.nvmrc) pinned to `22.19.0`.

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Copy the environment file and fill in your values:

```bash
cp .env.example .env
```

3. Generate an auth secret:

```bash
pnpm exec auth secret
```

4. Run database migrations:

```bash
pnpm db:generate
pnpm db:migrate
```

5. Start the app:

```bash
pnpm dev
```

## Required Environment Variables

- `AUTH_SECRET`: Secret used by NextAuth.
- `DATABASE_URL`: Neon Postgres connection string.

## Database Commands

- `pnpm db:generate`: Generate SQL migrations from the Drizzle schema.
- `pnpm db:migrate`: Apply migrations to the configured database.
- `pnpm db:push`: Push schema changes directly without generating a migration.
- `pnpm db:studio`: Open Drizzle Studio.

## Verification

Run the required checks:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

If your shell defaults to an older Node version, run `nvm use` first.

## Vercel Deployment Notes

- Create a private GitHub repository and push this project.
- Import the repo into Vercel.
- Set `AUTH_SECRET` and `DATABASE_URL` in the Vercel project settings.
- Use the Neon pooled connection string for `DATABASE_URL`.
- Redeploy after running migrations against the production database.

## Loom Demo Checklist

- Show signup with a new username and password.
- Show login with the created account.
- Show that `/todos` redirects unauthenticated users away.
- Create a todo and refresh to confirm it loads from Neon.
- Toggle completion and show strikethrough styling.
- Edit a todo inline and save.
- Filter by `All`, `Active`, and `Completed`.
- Delete a todo.
- Show logout and the protected route behavior after logout.
