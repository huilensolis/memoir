"use client";

import { useState } from "react";

export function useCookies({ name }: { name: string }) {
  const [cookie, setCookie] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const allCookies = document.cookie.split(";");
    const thisCookieIndex = allCookies.findIndex(
      (keyValueCookie) => keyValueCookie.split("=")[0] === name,
    );
    if (thisCookieIndex === -1) return null;
    return allCookies[thisCookieIndex];
  });

  function createCookie({ value }: { value: string }) {
    const cookie = `${name}=${value}`;
    document.cookie = cookie;
    setCookie(cookie);
  }

  return { cookie, createCookie };
}
