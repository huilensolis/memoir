import { describe, it, expect, beforeEach, afterAll, test } from "bun:test";

import { app } from "@/app";
import { createUser } from "../../utils/user";
import { db } from "@/config/database";
import { Users } from "@/features/user/schema";
import { endpointPath } from "./index";

beforeEach(async () => await db.delete(Users));
afterAll(async () => await db.delete(Users));

describe("Put method on path /user", () => {
  describe("Success with valid body", async () => {
    const { cookie } = await createUser({});

    const res = await app.handle(
      new Request(`${endpointPath}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", cookie: cookie },
        body: JSON.stringify({
          name: "testasdfasfas",
          email: "mynewemail@gmail.com",
          password: "mynewPassword1234aasdf",
        }),
      }),
    );

    it("Should return 201 status code", async () => {
      expect(res.status).toBe(201);
    });

    it("Should return empty object on response body", async () => {
      const body = await res.json();
      expect(body).toBeEmptyObject();
    });
  });

  describe("Request body doesnt match scheme", async () => {
    const { cookie } = await createUser({});

    const res = await app.handle(
      new Request(`${endpointPath}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", cookie: cookie },
        body: JSON.stringify({
          name: 123,
          email: {},
          password: [123, [123]],
        }),
      }),
    );

    it("Should return 400 status code", async () => {
      expect(res.status).toBe(400);
    });
  });

  describe("New email is not available", async () => {
    const EMAIL = "example@gmail.com";

    await createUser({ customEmail: EMAIL });

    const { cookie } = await createUser({});

    const res = await app.handle(
      new Request(`${endpointPath}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", cookie: cookie },
        body: JSON.stringify({
          email: EMAIL,
        }),
      }),
    );

    it("Should return 400 status code", () => {
      expect(res.status).toBe(400);
    });
  });

  test.todo("New email is malformatted");
});
