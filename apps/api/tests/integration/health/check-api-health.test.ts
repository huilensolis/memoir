import { describe, expect, it } from "bun:test";
import { endpointPath } from ".";
import { app } from "@/app";

describe("health endpoint tests", async () => {
  const res = await app.handle(
    new Request(`${endpointPath}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }),
  );

  it("should return status code 200", () => {
    expect(res.status).toBe(200);
  });
});
