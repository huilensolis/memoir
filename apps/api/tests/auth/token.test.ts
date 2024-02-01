import { app } from "@/app";
import { createUser } from "../utils/user";
import { describe, it, expect, beforeEach, afterAll } from "bun:test";
import { db } from "@/config/database";
import { Users } from "@/features/user/schema";
import { endpointPath } from "./index.test";

beforeEach(async () => await db.delete(Users));
afterAll(async () => await db.delete(Users));

describe("token validation endpoints", () => {
  it("should accept token", async () => {
    const { user, token } = await createUser();

    if (!user || !token) throw new Error("error creating user");

    const cookie = `access_token=${token}`;

    const res = await app.handle(
      new Request(`${endpointPath}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: cookie,
        },
      }),
    );

    expect(res.ok).toBeTrue();
    expect(res.status).toBe(200);
  });
});
