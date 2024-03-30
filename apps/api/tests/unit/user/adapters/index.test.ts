import { Value } from "@sinclair/typebox/value";

import { UserAdapter } from "@/features/user/adapters";
import { User } from "@/features/user/models";
import { SafeUserSchema } from "@/features/user/router/models";
import { describe, expect, it } from "bun:test";

const UNSAFE_USER: User = {
  id: "asdfasdfas",
  email: "anemail@gmail.com",
  name: "unsafe user",
  password: "a password hash",
  end_date: null,
};

describe("User adapter tests", () => {
  describe("Adapt to safe user", () => {
    it("should be a function", () => {
      expect(UserAdapter.toSafeUser).toBeFunction();
    });

    it("should receive a user as a parameter", () => {
      UserAdapter.toSafeUser({ user: UNSAFE_USER });
    });

    it("should return a safe user", () => {
      const { user: returnedUser } = UserAdapter.toSafeUser({
        user: UNSAFE_USER,
      });

      const isUserInSafeSchema = Value.Check(SafeUserSchema, returnedUser);

      expect(isUserInSafeSchema).toBeTrue();
    });
  });

  describe("Adapt to only active users", () => {
    it("Should be a function", () => {
      expect(UserAdapter.toOnlyActive).toBeFunction();
    });

    it("Should receive user as a parameter", () => {
      UserAdapter.toOnlyActive({ user: UNSAFE_USER });
    });

    it("should return null if user is not active", () => {
      const inactiveUser = {
        ...UNSAFE_USER,
        end_date: JSON.stringify(new Date()),
      };
      const { user: returnedUser } = UserAdapter.toOnlyActive({
        user: inactiveUser,
      });

      expect(returnedUser).toBeNull();
    });

    it("should return an object if it's user parameter is active", () => {
      const activeUser = { ...UNSAFE_USER, end_date: null };

      const { user: returnedUser } = UserAdapter.toOnlyActive({
        user: activeUser,
      });

      expect(returnedUser).toBeObject();
    });

    it("should return the same user used as a parameter if it is an active user", () => {
      const activeUser = { ...UNSAFE_USER, end_date: null };

      const { user: returnedUser } = UserAdapter.toOnlyActive({
        user: activeUser,
      });

      expect(returnedUser).toEqual(activeUser);
    });
  });
});
