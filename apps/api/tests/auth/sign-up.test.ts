import { app } from "@/app";
import { correctUser } from "./index.test";
import { describe, it, expect, beforeEach, afterAll } from "bun:test";
import { db } from "@/config/database";
import { Users } from "@/features/user/schema";

beforeEach(async () => await db.delete(Users));
afterAll(async () => await db.delete(Users));

describe("sign up tests", () => {
  it("should create a user correctly on /auth/sign-up", async () => {
    const res = await app.handle(
      new Request("http://localhost:3000/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...correctUser }),
      }),
    );

    const body: { token: string } = await res.json();

    expect(res.ok).toBe(true);
    expect(res.status).toBe(201);
    expect(body).toBeObject();
    expect(body).toContainKey("token");
    expect(body["token"]).toBeString();
  });

  it("should return an error if the email is not a email in /auth/sign-up", async () => {
    const res = await app.handle(
      new Request("http://localhost:3000/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: correctUser.name,
          password: correctUser.password,
          email: "incorrectemail",
        }),
      }),
    );

    const body = await res.json();

    expect(res.ok).toBeFalse();
    expect(res.status).toBe(400);
    expect(body).toContainKey("error");
  });
});
