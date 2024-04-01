import { describe, expect, it, test } from "bun:test";
import { endpointPath } from ".";
import { app } from "@/app";
import { createUser } from "@/tests/utils/user";

describe("Test POST method on journal entries endpoints", () => {
  describe("Journal Entry created succesfully", async () => {
    const { cookie } = await createUser({});

    const res = await app.handle(
      new Request(`${endpointPath}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          cookie: cookie,
        },
        body: JSON.stringify({
          title: "test",
          content: JSON.stringify({}),
          wordCount: 291,
        }),
      }),
    );

    it("should return 201 status code", async () => {
      expect(res.status).toBe(201);
    });

    it("should return empty object on body response", async () => {
      const body = await res.json();

      expect(body).toBeEmptyObject();
    });
  });

  describe("Incorrect schema on body json", async () => {
    const { cookie } = await createUser({});

    const res = await app.handle(
      new Request(`${endpointPath}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          cookie: cookie,
        },
        body: JSON.stringify({
          title: 1233,
          content: "asdfas",
          wordCount: "asdf",
        }),
      }),
    );

    it("should return 400 status code", async () => {
      expect(res.status).toBe(400);
    });

    it("should return error message", async () => {
      const body = await res.json();

      expect(body).toContainKey("error");
    });
  });
});
