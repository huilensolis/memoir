"use client";

import { AuthService } from "@/models/api/auth";
import { type User } from "@/types/user";

export function useSession() {
  async function signUp({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }): Promise<{ error: Error | null }> {
    try {
      const { error } = await AuthService.signUp({
        email,
        name,
        password,
      });
      if (error) {
        throw new Error("error signing up");
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async function signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ error: string | null }> {
    try {
      const { error } = await AuthService.signIn({
        email,
        password,
      });

      if (error) {
        throw new Error("there is been an error trying to sign in");
      }

      return { error: null };
    } catch (error) {
      return { error: error as string };
    }
  }

  async function signOut() {
    await AuthService.signOut();
  }

  async function getUser(): Promise<{ user: User | null }> {
    const { user } = await AuthService.getUser({});

    return { user };
  }

  async function checkEmailAvailability({ email }: { email: string }) {
    const { isEmailAvailable } = await AuthService.checkEmail({ email });
    return { isEmailAvailable };
  }

  return { signUp, signIn, signOut, checkEmailAvailability, getUser };
}
