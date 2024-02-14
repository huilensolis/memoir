"use client";

import { useEffect, useState } from "react";
import { useCookies } from "../use-cookies";
import { AuthService } from "@/models/api/auth";

export function useSession() {
  const [session, setSession] = useState<string | null>(null);

  const { cookie, updateCookie, deleteCookie } = useCookies({
    name: "access_token",
  });

  useEffect(() => {
    setSession(cookie);
  }, [cookie]);

  async function signUp({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }): Promise<{ error: string | null }> {
    try {
      const { token, error } = await AuthService.signUp({
        email,
        name,
        password,
      });

      if (error || !token) {
        throw new Error("error signing up");
      }

      updateCookie({ value: token });

      return { error: null };
    } catch (error) {
      return { error: error as string };
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
      const { token, error } = await AuthService.signIn({
        email,
        password,
      });

      if (error || !token) {
        throw new Error("there is been an error trying to sign in");
      }

      updateCookie({ value: token });

      return { error: null };
    } catch (error) {
      return { error: error as string };
    }
  }

  function signOut() {
    deleteCookie();
  }

  return { session, signUp, signIn, signOut };
}
