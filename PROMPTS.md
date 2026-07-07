# Prompt Record

This file records the take-home instructions and AI-agent usage guidance supplied for the Todo Checklist assessment.

## Assessment Brief

Thank you for considering Delta AI. This assessment will test your ability to work within our tech stack and your technical communication skills.

### Objective

Implement a Todo Checklist with the T3 app tech stack. The app should be hosted on Vercel and accessible via a link. Todo items should be stored in a database and retrieved on page load. Users should be able to sign up and log in via username and password.

### Requirements

The app should use the following technologies:

- Next.js with TypeScript
- TailwindCSS for styling
- Shadcn/UI when applicable
- tRPC for server API endpoints
- Neon database (Postgres)
- Drizzle ORM
- NextAuth.js for authentication
- Private code repository hosted on GitHub

A checklist item should have the following properties:

- Text content
- Date created
- Is-completed boolean represented by a checkbox

Additional properties are optional.

The checklist should have the following functionalities:

- Display all todo items
- Create a todo item
- Update a todo item
- Check off the todo with strikethrough text
- Modify todo text
- Delete a todo item

Styling is flexible, but the interface should be aesthetically pleasing.

### Demo Video

After implementation, record a narrated Loom video that demonstrates:

- Signing up with a username and password
- Logging in and out
- Todo-list CRUD operations

If AI coding agents were used, explain which parts were generated and describe the overall development process. Also explain challenges or extra features if relevant.

## Instructions For AI Coding Agents

Over the past year, AI coding agents like Claude Code and Codex have become dominant tools for writing code. Their use is allowed and encouraged for this project, with the following guidelines:

1. If you are unfamiliar with a technology or library such as tRPC, read the documentation, understand the core concepts, and write that portion yourself without agent help.
2. Agents can write code, but the human is responsible for deciding whether the code accomplishes the intended goal.
3. That judgment requires understanding the code, and the best way to build that understanding is hands-on work with the library or technology.
4. If you are already familiar with a technology and have the relevant domain knowledge, you may use an agent to help write the code.
5. For agent-generated code, document the prompts or instructions used as comments in the relevant files.
6. For prompts that affect multiple files, copy them into a repo-level prompt file.

The expectation is that you understand the code being produced and can justify the architectural decisions behind it.

## Deliverables

- A complete todo checklist app accessible via a Vercel link
- Access to the private GitHub repository with invites sent to `axanthus` and `v3ceban`
- A Loom demo video

## Scaffold Guidance

Use the T3 app CLI tool to scaffold the project:

```bash
pnpm create t3-app@latest
```

Suggested setup:

- Name the project `todo-list` or similar
- Select TypeScript
- Select TailwindCSS
- Select tRPC
- Select NextAuth.js
- Select Drizzle
- Select App Router
- Select PostgreSQL
- Select ESLint/Prettier
- Follow the Shadcn/UI installation instructions for Next.js
