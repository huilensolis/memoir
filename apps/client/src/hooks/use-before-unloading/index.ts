"use client";

import { useEffect } from "react";

export function useBeforeUnloading(
  callback: (e: BeforeUnloadEvent) => void,
  dependencies: any[],
) {
  useEffect(() => {
    window.addEventListener("beforeunload", callback);

    return () => {
      window.removeEventListener("beforeunload", callback);
    };
  }, [...dependencies]);

  return;
}
