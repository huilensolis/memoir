import { app } from "@/app";
import { describe, it, expect, beforeEach, afterAll } from "bun:test";
import { createUser } from "../utils/user";
import { db } from "@/config/database";
import { Users } from "@/features/user/schema";
import { endpointPath } from "./index.test";

beforeEach(async () => await db.delete(Users));
afterAll(async () => await db.delete(Users));

describe("sign in tests on /auth/sign-in", () => {
  it("should log in correctly", async () => {
    const { user } = await createUser();

    if (!user) throw new Error("user could not be created");

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

    const setCookie = res.headers.getSetCookie();

    const cookie = setCookie[0];

    expect(res.ok).toBeTrue();
    expect(res.status).toBe(202);

    expect(body).toBeObject();
    expect(body).toBeEmptyObject();
    expect(cookie).toBeString();
    expect(cookie).toStartWith("access_token=");
  });

  it("should reject log in if credentials are wrong", async () => {
    const { cookie, user } = await createUser();

    if (!cookie || !user) throw new Error("user could not be created");

    const res = await app.handle(
      new Request(`${endpointPath}/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json", cookies: cookie },
        body: JSON.stringify({
          email: "some wrong email",
          password: "some worng password",
        }),
      }),
    );

    const body = await res.json();

    const setCookie = res.headers.getSetCookie();

    const cookieOnHeaders = setCookie[0];

    expect(res.ok).toBeFalse();
    expect(res.status).toBe(401);
    expect(body).toContainKey("error");
    expect(cookieOnHeaders).toBeUndefined();
  });
});
