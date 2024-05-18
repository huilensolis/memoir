import { describe, it, expect, beforeEach, afterAll, test } from "bun:test";

import { app } from "@/app";
import { endpointPath } from "./index";
import { db } from "@/config/database";
import { Users } from "@/features/user/schema";
import type { NewUser } from "@/features/user/models";
import { getRandomString } from "../../lib/random-values";

beforeEach(async () => await db.delete(Users));
afterAll(async () => await db.delete(Users));

const correctUser: NewUser = {
  name: getRandomString({ length: 10 }),
  email: `${getRandomString({ length: 10 })}@mail.com`,
  password: getRandomString({ length: 16 }),
};

describe("Sign up", () => {
  describe("Succesfull sign up", async () => {
    const res = await app.handle(
      new Request(`${endpointPath}/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ ...correctUser }),
      }),
    );

    it("Should return 201 status code ", async () => {
      expect(res.status).toBe(201);
    });

    it("should contain a set cookie header with a cookie", async () => {
      const setCookie = res.headers.getSetCookie();
      const cookie = setCookie[0];

      expect(cookie).toBeString();
      expect(cookie).toStartWith("access_token=");
    });

    it("should contain empty object on body", async () => {
      const body = await res.json();

      expect(body).toBeEmptyObject();
    });
  });

  describe("Email is not an email", async () => {
    const res = await app.handle(
      new Request(`${endpointPath}/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: correctUser.name,
          password: correctUser.password,
          email: "notAnEmail",
        }),
      }),
    );

    it("should return 400 status code", () => {
      expect(res.status).toBe(400);
    });

    it("Should not return a set-cookie header", () => {
      const setCookie = res.headers.getSetCookie();
      const cookie = setCookie[0];

      expect(cookie).toBeUndefined();
    });

    it("should return an error on body", async () => {
      const body = await res.json();
      expect(body).toContainKey("error");
    });
  });

  describe("Email format is missing domain", async () => {
    const res = await app.handle(
      new Request(`${endpointPath}/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: correctUser.name,
          password: correctUser.password,
          email: "test@gmail",
        }),
      }),
    );

    it("Should return 400 status code", () => {
      expect(res.status).toBe(400);
    });

    it("Should not return a set-cookie header", () => {
      const setCookie = res.headers.getSetCookie();
      const cookie = setCookie[0];

      expect(cookie).toBeUndefined();
    });

    it("Should return an error on body", async () => {
      const body = await res.json();

      expect(body).toContainKey("error");
    });
  });

  test.todo("Email format is missing @ character");
  test.todo("Email format is missing local"); // understanding an email is formed by ${local}@${domain}
});
