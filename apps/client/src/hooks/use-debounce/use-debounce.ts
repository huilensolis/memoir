"use client";

import { useEffect, useState } from "react";

export function useDebounce<T>({
  value,
  delay = 500,
}: {
  value: T;
  delay?: number;
}) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return { debouncedValue };
}
