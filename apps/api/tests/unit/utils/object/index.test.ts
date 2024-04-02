import { cleanKeysWithEmptyValue } from "@/shared/utils/objects/clean-keys";
import { describe, expect, it } from "bun:test";

describe("Test Clean Object null or undefined keys", () => {
  it("should clean null keys", () => {
    const object = {
      a: "string",
      f: null,
    };

    const cleanObject: Omit<typeof object, "f"> =
      cleanKeysWithEmptyValue(object);

    expect(cleanObject).not.toContainKey("f");
    expect(cleanObject).toContainKey("a");
    expect(cleanObject.a).toBe("string");
  });

  it("should clean undefined keys", () => {
    const object = {
      a: "string",
      f: undefined,
    };

    const cleanObject: Omit<typeof object, "f"> =
      cleanKeysWithEmptyValue(object);

    expect(cleanObject).not.toContainKey("f");
    expect(cleanObject).toContainKey("a");
    expect(cleanObject.a).toBe("string");
  });
});
