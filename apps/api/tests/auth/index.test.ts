import { app } from "@/app";
import { db } from "@/config/database";
import { Users } from "@/features/user/schema";
import { describe, it, expect, beforeAll } from "bun:test";

beforeAll(async () => await db.delete(Users));

describe("auth tests", () => {
  const correctUser = {
    name: "Huilen Solis",
    email: "huilensolis@skiff.com",
    password: Array(16).fill("h").join(""), // we send a password of 16 characteres
  };

  it("should create a user correctly on /auth/sign-up", async () => {
    const res = await app.handle(
      new Request("http://localhost:3000/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(correctUser),
      }),
    );

    const body: { token: string } = await res.json();

    expect(res.ok).toBe(true);
    expect(res.status).toBe(201);
    expect(body).toBeObject();
    expect(body).toContainKey("token");
    expect(body["token"]).toBeString();
  });

  it("should log in correctly on /auth/sign-in", async () => {
    const res = await app.handle(
      new Request("http://localhost:3000/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: correctUser.email,
          password: correctUser.password,
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

  it("should return an error if the gmail is not a gmail in /auth/sign-up", async () => {
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
