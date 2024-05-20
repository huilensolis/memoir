import { describe, it, expect, beforeEach, afterAll } from "bun:test";

import { app } from "@/app";
import { db } from "@/config/database";
import { Users } from "@/features/user/schema";
import { endpointPath } from "./index";
import { createUser } from "@/tests/lib/user";

beforeEach(async () => await db.delete(Users));
afterAll(async () => await db.delete(Users));

describe("Sign in on path /auth/sign-in", () => {
  describe("Succesfull sign in", async () => {
    const { user } = await createUser({});

    const res = await app.handle(
      new Request(`${endpointPath}/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      }),
    );

    it("Should return status code of 202", async () => {
      expect(res.status).toBe(202);
    });

    it("Should return an empty obejct on body response", async () => {
      const body = await res.json();
      expect(body).toBeEmptyObject();
    });

    it("Should return a set-cookie header", async () => {
      const setCookie = res.headers.getSetCookie();

      const cookie = setCookie[0];

      expect(cookie).toBeString();
      expect(cookie).toStartWith("access_token=");
    });
  });

  describe("Credentials are wrong", async () => {
    const { cookie } = await createUser({});

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

    it("Should return status code of 401", async () => {
      expect(res.status).toBe(401);
    });

    it("Should return an empty obejct on body response", async () => {
      const body = await res.json();
      expect(body).toBeObject();
    });

    it("Should not contain a set-cookie header", async () => {
      const setCookie = res.headers.getSetCookie();

      const cookieOnHeaders = setCookie[0];

      expect(cookieOnHeaders).toBeUndefined();
    });
  });
});
