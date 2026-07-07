import { z } from "zod";

import { verifyPassword } from "./password.ts";

type AuthorizableUser = {
  id: string;
  name: string;
  email: string;
  username: string;
  passwordHash: string;
};

type AuthorizeDependencies = {
  findUserByUsername: (username: string) => Promise<AuthorizableUser | null | undefined>;
  verifyPasswordFn?: typeof verifyPassword;
};

const credentialsSchema = z.object({
  username: z.string().trim().toLowerCase(),
  password: z.string().min(1),
});

export async function authorizeWithCredentials(
  credentials: Record<string, unknown> | undefined,
  deps: AuthorizeDependencies,
) {
  const parsedCredentials = credentialsSchema.safeParse(credentials);

  if (!parsedCredentials.success) {
    return null;
  }

  const user = await deps.findUserByUsername(parsedCredentials.data.username);

  if (!user) {
    return null;
  }

  const isPasswordValid = await (deps.verifyPasswordFn ?? verifyPassword)(
    parsedCredentials.data.password,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
  };
}
