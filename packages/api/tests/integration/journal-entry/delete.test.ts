import { app } from "@/app";
import { describe, expect, it } from "bun:test";
import { endpointPath } from ".";
import { createUser } from "@/tests/lib/user";
import { createNewEntry } from "@/tests/lib/journal";

describe("Test DELETE method on journal entries endpoints", () => {
  describe("Delete own journal entry succesfully", async () => {
    const { cookie } = await createUser({});

    const { journalEntryId } = await createNewEntry(
      { title: "test", content: [], word_count: 0 },
      cookie,
    );

    if (!journalEntryId) throw new Error("Journal entry not created");

    const res = await app.handle(
      new Request(`${endpointPath}/${journalEntryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          cookie: cookie,
        },
      }),
    );

    it("Should return status 201", () => {
      expect(res.status).toBe(201);
    });

    it("Should return empty object on body response", async () => {
      const body = await res.json();

      expect(body).toBeEmptyObject();
    });
  });

  describe("Delete journal entry not ownd by user", async () => {
    it("Should return status 401", () => {});

    it("Should return empty object on body response", async () => {});
  });
});
