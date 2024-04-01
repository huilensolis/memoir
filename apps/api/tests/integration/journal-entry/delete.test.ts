import { describe, it } from "bun:test";

describe("Test DELETE method on journal entries endpoints", () => {
  describe("Delete own journal entry succesfully", async () => {
    it("Should return status 201", () => {});

    it("Should return empty object on body response", async () => {});
  });

  describe("Delete journal entry not ownd by user", async () => {
    it("Should return status 401", () => {});

    it("Should return empty object on body response", async () => {});
  });
});
