import { describe, it, expect, beforeEach, afterAll } from "bun:test";

import { app } from "@/app";
import { createUser } from "../../utils/user";
import { db } from "@/config/database";
import { Users } from "@/features/user/schema";
import { endpointPath } from "./index";

beforeEach(async () => await db.delete(Users));
afterAll(async () => await db.delete(Users));

describe("Token validation endpoints", () => {
  describe("Valid token", async () => {
    const { cookie } = await createUser({});

    const res = await app.handle(
      new Request(`${endpointPath}/token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          cookie: cookie,
        },
      }),
    );

    it("Should return 202 status code", () => {
      expect(res.status).toBe(202);
    });

    it("Should return empty objec ton body response", async () => {
      const body = await res.json();

      expect(body).toBeEmptyObject();
    });
  });

  describe("Invalid token", async () => {
    const res = await app.handle(
      new Request(`${endpointPath}/token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          cookie: "access_token" + "=" + "invalidToken",
        },
      }),
    );

    it("Should return 401 status code", () => {
      expect(res.status).toBe(401);
    });
  });
});
