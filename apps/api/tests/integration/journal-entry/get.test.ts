import { describe, it, test } from "bun:test";

describe("Test GET method on journal entries endpoints", () => {
  describe("GET private user journal entries", () => {
    describe("GET Journal entry list of user", async () => {});
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
