// AI-assisted: Codex helped implement this protected todo route and server-side
// prefetching flow. See PROMPTS.md.
import { redirect } from "next/navigation";

import { TodoApp } from "~/app/_components/todo/todo-app";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function TodosPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  void api.todo.getAll.prefetch();

  return (
    <HydrateClient>
      <TodoApp username={session.user.username} />
    </HydrateClient>
  );
}
