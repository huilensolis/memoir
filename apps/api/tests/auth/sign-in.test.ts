import { app } from "@/app";
import { db } from "@/config/database";
import { Users } from "@/features/user/schema";
import { describe, it, expect, beforeEach } from "bun:test";
import { createUser } from "../utils/user";

beforeEach(async () => await db.delete(Users));

describe("sign in tests", () => {
  it("should log in correctly on /auth/sign-in", async () => {
    const { token, user } = await createUser();

    if (!token || !user) throw new Error("user coul not be created");

    const res = await app.handle(
      new Request("http://localhost:3000/auth/sign-in", {
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
