"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function PrefetchOnRender({ path }: { path: string }) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(path);
  }, []);

  return <></>;
}
