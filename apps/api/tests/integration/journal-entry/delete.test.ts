import { describe, expect, it, test } from "bun:test";
import { app } from "@/app";
import { EXAMPLE_DOCUMENT_CONTENT } from "@/tests/lib/constants";
import { createNewEntry } from "@/tests/lib/journal";
import { createUser } from "@/tests/lib/user";
import { endpointPath } from ".";

describe("Test DELETE method on journal entries endpoints", () => {
  describe("Delete own journal entry succesfully", async () => {
    const { cookie } = await createUser({});

    const { journalEntryId } = await createNewEntry(
      { title: "test", content: EXAMPLE_DOCUMENT_CONTENT, word_count: 0 },
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

    it("Should return status 202", () => {
      expect(res.status).toBe(202);
    });

    it("Should return empty object on body response", async () => {
      const body = await res.json();

      expect(body).toBeEmptyObject();
    });
  });

  test.todo("Delete journal entry not ownd by user", async () => {
    it("Should return status 401", () => {});

    it("Should return empty object on body response", async () => {});
  });

  describe("should not return deleted entry after delete", async () => {
    const { cookie } = await createUser({});

    const { journalEntryId } = await createNewEntry(
      { title: "test", content: EXAMPLE_DOCUMENT_CONTENT, word_count: 0 },
      cookie,
    );

    if (!journalEntryId) throw new Error("Journal entry not created");

    await app.handle(
      new Request(`${endpointPath}/${journalEntryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          cookie: cookie,
        },
      }),
    );

    const res = await app.handle(
      new Request(`${endpointPath}/${journalEntryId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          cookie: cookie,
        },
      }),
    );

    it("should not return 200", () => {
      expect(res.status).not.toBe(200);
    });

    it("should not return entry", async () => {
      const body = await res.json();

      expect(body).toBeEmptyObject();
    });
  });
});
