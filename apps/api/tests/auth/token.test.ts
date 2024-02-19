import { app } from "@/app";
import { createUser } from "../utils/user";
import { describe, it, expect, beforeEach, afterAll } from "bun:test";
import { db } from "@/config/database";
import { Users } from "@/features/user/schema";
import { endpointPath } from "./index.test";
import jwt from "@elysiajs/jwt";

beforeEach(async () => await db.delete(Users));
afterAll(async () => await db.delete(Users));

describe("token validation endpoints", () => {
  it("should accept token", async () => {
    const { cookie } = await createUser();

    if (!cookie) throw new Error("error creating user");

    const res = await app.handle(
      new Request(`${endpointPath}/token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          cookie: cookie,
        },
      }),
    );

    const body = await res.json();

    expect(res.ok).toBeTrue();
    expect(res.status).toBe(202);
    expect(body).toBeEmptyObject();
  });
  it("should reject token if invalid", async () => {
    const res = await app.handle(
      new Request(`${endpointPath}/token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          cookie: `access_token=invalidToken`,
        },
      }),
    );

    const body = await res.json();

    expect(res.ok).toBeFalse;
    expect(res.status).toBe(401);
    expect(body).toContainKey("error");
  });
});
