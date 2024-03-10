import { app } from "@/app";
import { createUser } from "../utils/user";
import { describe, it, expect, beforeEach, afterAll } from "bun:test";
import { db } from "@/config/database";
import { Users } from "@/features/user/schema";
import { endpointPath } from "./index";

beforeEach(async () => await db.delete(Users));
afterAll(async () => await db.delete(Users));

describe("check availability path", () => {
  it("should return OK if email is available", async () => {
    const res = await app.handle(
      new Request(`${endpointPath}/email/myuniqueemail@gmail.com`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }),
    );

    const body = await res.json();

    expect(res.ok).toBeTrue();
    expect(res.status).toBe(200);
    expect(body).toBeEmptyObject();
  });

  it("should return CONFLICT if email is already in use", async () => {
    const { cookie, user } = await createUser();

    if (!cookie) throw new Error("error creating user");

    const res = await app.handle(
      new Request(`${endpointPath}/email/${user?.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          cookie: "access_token" + "=" + "invalidToken",
        },
      }),
    );

    const body = await res.json();

    expect(res.ok).toBeFalse();
    expect(res.status).toBe(409);
    expect(body).toContainKey("error");
  });

  it("should return BAD REQUEST if email is malformatted", async () => {
    const res = await app.handle(
      new Request(`${endpointPath}/email/malformattedemail@`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          cookie: "access_token" + "=" + "invalidToken",
        },
      }),
    );

    const body = await res.json();

    expect(res.ok).toBeFalse();
    expect(res.status).toBe(400);
    expect(body).toBeObject();
    expect(body).toContainKey("error");
  });
});
