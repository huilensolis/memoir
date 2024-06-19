import { Value } from "@sinclair/typebox/value";

import { describe, expect, it, test } from "bun:test";
import { app } from "@/app";
import {
  EntrySafeSchema,
  type TEntrySafe,
} from "@/features/entry/models/entry.models";
import { EXAMPLE_DOCUMENT_CONTENT } from "@/tests/lib/constants";
import { createNewEntry } from "@/tests/lib/entry";
import { createUser } from "@/tests/lib/user";
import { endpointPath } from ".";

describe("Test GET method on entries endpoints", () => {
  describe("GET private user entries", () => {
    describe("GET entry list of user", async () => {
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
        const body: TEntrySafe[] = await res.json();

        it("Should return object on body", () => {
          expect(body).toBeObject();
        });

        it("Should return entry list", () => {
          const areEntriesValid = body.every((entry) =>
            Value.Check(EntrySafeSchema, entry),
          );

          expect(areEntriesValid).toBeTrue();
        });
      });
    });
    describe("GET entry lists by title", async () => {});
    describe("GET entry by entryId", async () => {
      const { cookie } = await createUser({});

      const { EntryId } = await createNewEntry(
        { title: "Untitled", content: EXAMPLE_DOCUMENT_CONTENT, word_count: 8 },
        cookie,
      );

      const res = await app.handle(
        new Request(`${endpointPath}/${EntryId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            cookie: cookie,
          },
        }),
      );

      it("should return 200 status code", () => {
        expect(res.status).toBe(200);
      });

      it("should return entry on body", async () => {
        const body = await res.json();

        const isBodyAValidEntry = Value.Check(EntrySafeSchema, body);

        expect(isBodyAValidEntry).toBeTrue();
      });
    });
  });

  test.todo("GET public entries", () => {
    describe("GET public entries", () => {
      describe("GET public entry by entryId", async () => {});
    });
  });

  describe("GET private entry not owned by user", async () => {
    it("Should return 401", () => {});

    it("Should return empty object on body response", () => {});
  });
});
