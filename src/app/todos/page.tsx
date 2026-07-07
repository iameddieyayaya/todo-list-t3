import { redirect } from "next/navigation";

import { TodoApp } from "~/app/_components/todo-app";
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
