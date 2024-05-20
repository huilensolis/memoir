import { describe, it, expect, beforeEach, afterAll } from "bun:test";

import { app } from "@/app";
import { db } from "@/config/database";
import { Users } from "@/features/user/schema";
import { endpointPath } from "./index";
import { createUser } from "../../lib/user";

beforeEach(async () => await db.delete(Users));
afterAll(async () => await db.delete(Users));

describe("check email availability routes", () => {
  describe("Email is available", async () => {
    const res = await app.handle(
      new Request(`${endpointPath}/email/myuniqueemail@gmail.com`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }),
    );
    it("Should return 200 status code", () => {
      expect(res.status).toBe(200);
    });

    it("Should return empty obejct on body response", async () => {
      const body = await res.json();

      expect(body).toBeEmptyObject();
    });
  });

  describe("Email is already in use", async () => {
    const { user } = await createUser({});

    const res = await app.handle(
      new Request(`${endpointPath}/email/${user?.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json charset=utf-8",
        },
      }),
    );

    it("Should return 409 status code", () => {
      expect(res.status).toBe(409);
    });

    it("Should return empty object on body response", async () => {
      const body = await res.json();

      expect(body).toBeEmptyObject();
    });
  });

  describe("Email is missing local", async () => {
    const res = await app.handle(
      new Request(`${endpointPath}/email/@gmail.com`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json charset=utf-8",
        },
      }),
    );

    it("Should return 400 status code", () => {
      expect(res.status).toBe(400);
    });

    it("Should return empty object on body response", async () => {
      const body = await res.json();

      expect(body).toBeObject();
    });
  });

  describe("Email is missing @", async () => {
    const res = await app.handle(
      new Request(`${endpointPath}/email/testgmail.com`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json charset=utf-8",
        },
      }),
    );

    it("Should return 400 status code", () => {
      expect(res.status).toBe(400);
    });

    it("Should return empty object on body response", async () => {
      const body = await res.json();

      expect(body).toBeObject();
    });
  });

  describe("Email is missing domain", async () => {
    const res = await app.handle(
      new Request(`${endpointPath}/email/test@`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json charset=utf-8",
        },
      }),
    );

    it("Should return 400 status code", () => {
      expect(res.status).toBe(400);
    });

    it("Should return empty object on body response", async () => {
      const body = await res.json();

      expect(body).toBeObject();
    });
  });
});
