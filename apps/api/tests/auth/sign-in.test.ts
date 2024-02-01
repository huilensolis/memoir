import { app } from "@/app";
import { describe, it, expect, beforeEach, afterAll } from "bun:test";
import { createUser } from "../utils/user";
import { db } from "@/config/database";
import { Users } from "@/features/user/schema";
import { endpointPath } from "./index.test";

beforeEach(async () => await db.delete(Users));
afterAll(async () => await db.delete(Users));

describe("sign in tests", () => {
  it("should log in correctly on /auth/sign-in", async () => {
    const { token, user } = await createUser();

    if (!token || !user) throw new Error("user coul not be created");

    const res = await app.handle(
      new Request(`${endpointPath}/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      }),
    );

    const body: { token: string } = await res.json();

    expect(res.ok).toBe(true);
    expect(res.status).toBe(200);

    expect(body).toBeObject();
    expect(body).toContainKey("token");
    expect(body.token).toBeString();
  });
});
