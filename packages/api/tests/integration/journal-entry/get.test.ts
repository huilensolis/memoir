import { Value } from "@sinclair/typebox/value";

import { app } from "@/app";
import { createUser } from "@/tests/lib/user";
import { describe, expect, it, test } from "bun:test";
import { endpointPath } from ".";
import {
  JournalEntrySafeSchema,
  type TJournalEntrySafe,
} from "@/features/journal-entry/models/joruanl-entry.models";
import { createNewEntry } from "@/tests/lib/journal";
import { EXAMPLE_DOCUMENT_CONTENT } from "@/tests/lib/constants";

describe("Test GET method on journal entries endpoints", () => {
  describe("GET private user journal entries", () => {
    describe("GET Journal entry list of user", async () => {
      const { cookie } = await createUser({});

      await createNewEntry(
        {
          word_count: 0,
          title: "test entry 1",
          content: EXAMPLE_DOCUMENT_CONTENT,
        },
        cookie,
      );

      await createNewEntry(
        {
          word_count: 0,
          title: "test entry 2",
          content: EXAMPLE_DOCUMENT_CONTENT,
        },
        cookie,
      );

      await createNewEntry(
        {
          word_count: 0,
          title: "test entry 3",
          content: EXAMPLE_DOCUMENT_CONTENT,
        },
        cookie,
      );

      const res = await app.handle(
        new Request(`${endpointPath}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            cookie: cookie,
          },
        }),
      );

      it("Should return status code 200", () => {
        expect(res.status).toBe(200);
      });

      describe("test response body", async () => {
        const body: TJournalEntrySafe[] = await res.json();

        it("Should return object on body", () => {
          expect(body).toBeObject();
        });

        it("Should return journal entry list", () => {
          const areEntriesValid = body.every((entry) =>
            Value.Check(JournalEntrySafeSchema, entry),
          );

          expect(areEntriesValid).toBeTrue();
        });
      });
    });
    describe("GET journal entry lists by title", async () => {});
    describe("GET journal entry by entryId", async () => {});
  });

  test.todo("GET public journal entries", () => {
    describe("GET public journal entries", () => {
      describe("GET public journal entry by entryId", async () => {});
    });
  });

  describe("GET private journal entry not owned by user", async () => {
    it("Should return 401", () => {});

    it("Should return empty object on body response", () => {});
  });
});
