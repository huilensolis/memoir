import { describe, it } from "bun:test";

describe("Journal Entry guard", () => {
  describe("Unauthenticated user should not be able to perform requests to endpoint", () => {
    describe("Should not be able to perform PATCH", async () => {
      it("should return 401 status code", async () => {});
      it("should return empty objec ton body response", async () => {});
    });
    describe("Should not be able to perform GET", async () => {
      it("should return 401 status code", async () => {});
      it("should return empty objec ton body response", async () => {});
    });
    describe("Should not be able to perform DELETE", async () => {
      it("should return 401 status code", async () => {});
      it("should return empty objec ton body response", async () => {});
    });
    describe("Should not be able to perform POST", async () => {
      it("should return 401 status code", async () => {});
      it("should return empty objec ton body response", async () => {});
    });
  });

  describe("User should not be able to get private entry of other user", async () => {});
});
