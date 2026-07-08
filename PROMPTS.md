# AI Usage Prompts

This project used Codex as a coding assistant, reviewer, and learning aid during implementation and cleanup. The notes below document the main instructions that materially shaped the codebase. They are intentionally high-level and do not imply that every line in the listed files was AI-generated. I remained the primary implementer and used Codex to explain concepts, review decisions, validate correctness, and suggest improvements.

## Project Setup And Architecture

Prompt:

> Review the overall project setup for a Todo Checklist app built with the T3 stack. Check whether the Next.js App Router structure, TypeScript usage, TailwindCSS setup, tRPC configuration, Neon Postgres connection, Drizzle ORM setup, NextAuth.js configuration, ESLint/Prettier setup, and pnpm workflow are reasonable and aligned with the project requirements. Suggest improvements only where needed.

Affected files:

- `package.json`
- `src/app/page.tsx`
- `src/app/todos/page.tsx`
- `src/server/api/root.ts`
- `src/server/api/trpc.ts`
- `src/server/auth/config.ts`
- `src/server/db/*`
- `README.md`

## Authentication

Prompt:

> Implement username/password signup and login with NextAuth credentials auth. Add password hashing, protect todo routes, handle login and logout, and add password confirmation to signup.

Affected files:

- `src/app/_components/auth/auth-panel.tsx`
- `src/app/_components/auth/auth-fields.tsx`
- `src/app/_components/auth/auth-mode-toggle.tsx`
- `src/server/api/routers/auth.ts`
- `src/server/auth/config.ts`
- `src/server/auth/credentials.ts`
- `src/server/auth/password.ts`
- `src/server/auth/credentials.test.ts`


## Drizzle ORM Review

Prompt:

> “I’m familiar with Prisma but newer to Drizzle ORM. Please review my schema and queries for this todo app and explain whether the table definitions, relations, and query patterns follow good Drizzle practices. Point out anything that looks incorrect or less idiomatic, but do not rewrite the implementation unless there is a clear issue.”

Purpose:

Used Codex to compare Drizzle concepts against existing Prisma experience and verify that the database layer was structured correctly.

Affected files:

- `src/server/db/schema.ts`
- Any Drizzle query/helper files used by the todo routes

## tRPC Router Review

Prompt:

> “I’ve used Express APIs before, but I’m newer to tRPC. Please review my todo router and explain how the procedures map to typical REST concepts like GET, POST, PATCH, and DELETE. Check that the input validation, auth handling, and returned data shapes are reasonable for a T3 app.”

Purpose:

Used Codex to validate my understanding of tRPC procedures and confirm the API layer was implemented cleanly.

Affected files:

- `src/server/api/routers/todo.ts`
- `src/server/api/root.ts`
- Any related tRPC client usage files

## Type Safety And Validation Check

Prompt:

> “Please double-check that my TypeScript types flow correctly between the Drizzle schema, tRPC procedures, and React components. Look for places where I may have used weak typing, unnecessary `any`, or duplicated types that could be inferred more cleanly.”

Purpose:

Used Codex as a reviewer to catch type-safety issues and improve consistency across the stack.

Affected files:

- Todo router files
- Todo UI component files
- Shared schema or validation files

## Senior-Level Code Review

Prompt:

> “Review this todo app like a senior engineer reviewing a take-home assessment. Focus on readability, separation of concerns, error handling, naming, and whether the implementation is simple but production-minded. Suggest small improvements only; avoid over-engineering.”

Purpose:

Used Codex to review the codebase and identify cleanup opportunities before submission.

Affected files:

- Multiple files across the app

## Todo CRUD Review

Prompt:

> Review the tRPC todo CRUD implementation for correctness, maintainability, and alignment with the project requirements.

Affected files:

- `src/server/api/routers/todo.ts`
- `src/server/api/routers/todo-input.ts`
- `src/server/api/routers/todo-service.ts`
- `src/app/todos/page.tsx`
- `src/app/_components/todo/todo-app.tsx`

## UI And Styling

Prompt:

> Use Tailwind and shadcn-style UI patterns for a polished interface. Break up components where possible, keep code easy to read, and later adapt the todo experience into a kanban-style board with backlog, in-progress, and completed lanes.

Affected files:

- `src/app/page.tsx`
- `src/app/_components/auth/*`
- `src/app/_components/todo/*`
- `src/styles/globals.css`

## Testing

Prompt:

> Add tests for authentication and todo behavior. Cover todo creation, editing, completion, and deletion, and keep the tests straightforward.

Affected files:

- `src/server/auth/credentials.test.ts`
- `src/server/api/routers/todo-input.test.ts`

## Cleanup And Refactoring

Prompt:

> Do a senior-level cleanup pass without changing intended behavior. Remove dead code, improve naming and readability, tighten TypeScript types, review auth and tRPC consistency, improve obvious accessibility states, and keep the cleanup easy to review.

Affected files:

- `src/app/_components/todo/todo-app.tsx`
- `src/app/_components/todo/todo-list-card.tsx`
- `src/app/_components/todo/todo-item.tsx`
- `src/server/auth/config.ts`
- `README.md`

## Notes

- AI assistance was used for scaffolding, implementation, UI iteration, learning, review, validation, tests, and cleanup.
- Codex was especially helpful when learning Drizzle ORM and tRPC, and for reviewing the resulting implementation against familiar patterns.
- Final code selection, review, and acceptance decisions were made manually.
