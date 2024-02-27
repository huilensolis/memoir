import Ajv from "ajv";
import { describe, it, expect, beforeEach, afterAll } from "bun:test";

import { app } from "@/app";
import { createUser } from "../utils/user";
import { db } from "@/config/database";
import { Users } from "@/features/user/schema";
import { endpointPath } from "./index";
import { type SafeUser } from "@/features/user/models/user.model";
import { SafeUserSchema } from "@/features/user/router/models/";

beforeEach(async () => await db.delete(Users));
afterAll(async () => await db.delete(Users));

describe("get user on /user", () => {
  it("should get user correctly", async () => {
    const { user, cookie } = await createUser();

    if (!user || !cookie) throw new Error("user could not be created");

    const res = await app.handle(
      new Request(`${endpointPath}/`, {
        method: "GET",
        headers: { "Content-Type": "application/json", cookie: cookie },
      }),
    );

    expect(res.ok).toBeTrue();
    expect(res.status).toBe(200);

    const body: { user: SafeUser | undefined; error: string | undefined } =
      await res.json();

    expect(body).toBeObject();
    expect(body).toContainKey("user");

    const { user: userOnBody } = body;

    const validate = new Ajv().compile(SafeUserSchema);
    const isResponseValid = validate(userOnBody);

    expect(isResponseValid).toBeTrue();
  });

  it("should get rejected if no cookies is found in headers", async () => {
    const { user } = await createUser();

    if (!user) throw new Error("user could not be created");

    const res = await app.handle(
      new Request(`${endpointPath}/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    );

    expect(res.ok).toBeFalse();
    expect(res.status).toBe(401);

    const body: { error: string } = await res.json();

    expect(body).toBeObject();
    expect(body).toContainKey("error");
    expect(body.error).toBeString();
  });
});
