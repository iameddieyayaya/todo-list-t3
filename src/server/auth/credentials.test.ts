import assert from "node:assert/strict";
import test from "node:test";

import { authorizeWithCredentials } from "./credentials.ts";

const baseUser = {
  id: "user_123",
  name: "demo",
  email: "demo@todo.local",
  username: "demo",
  passwordHash: "stored-hash",
};

void test(
  "authorizeWithCredentials normalizes username and returns a sanitized user",
  async () => {
    let lookedUpUsername = "";

    const user = await authorizeWithCredentials(
      {
        username: "  Demo ",
        password: "hunter2",
      },
      {
        findUserByUsername: async (username) => {
          lookedUpUsername = username;
          return baseUser;
        },
        verifyPasswordFn: async (password, storedHash) => {
          assert.equal(password, "hunter2");
          assert.equal(storedHash, "stored-hash");
          return true;
        },
      },
    );

    assert.equal(lookedUpUsername, "demo");
    assert.deepEqual(user, {
      id: "user_123",
      name: "demo",
      email: "demo@todo.local",
      username: "demo",
    });
  },
);

void test("authorizeWithCredentials rejects invalid passwords", async () => {
  const user = await authorizeWithCredentials(
    {
      username: "demo",
      password: "wrong-password",
    },
    {
      findUserByUsername: async () => baseUser,
      verifyPasswordFn: async () => false,
    },
  );

  assert.equal(user, null);
});

void test(
  "authorizeWithCredentials rejects malformed credentials before lookup",
  async () => {
    let lookupCalled = false;

    const user = await authorizeWithCredentials(
      {
        username: "demo",
        password: "",
      },
      {
        findUserByUsername: async () => {
          lookupCalled = true;
          return baseUser;
        },
      },
    );

    assert.equal(user, null);
    assert.equal(lookupCalled, false);
  },
);
