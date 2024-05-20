import { describe, it, expect, beforeAll, afterAll } from "bun:test";

import { app } from "@/app";
import { createUser } from "../../lib/user";
import { db } from "@/config/database";
import { Users } from "@/features/user/schema";
import { endpointPath } from "./index";

beforeAll(async () => await db.delete(Users));
afterAll(async () => await db.delete(Users));

describe("Delete user on path /user", () => {
  describe("Delete user successfully", async () => {
    const { cookie } = await createUser({});

    const res = await app.handle(
      new Request(`${endpointPath}/`, {
        method: "DELETE",
        headers: { "content-type": "application/json", cookie: cookie },
        body: JSON.stringify({}),
      }),
    );

    it("Should return 201 code status", async () => {
      expect(res.status).toBe(201);
    });

    it("Should return empty body obejct", async () => {
      const body = await res.json();

      expect(body).toBeEmptyObject();
    });
  });
});
