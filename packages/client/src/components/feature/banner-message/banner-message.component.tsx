"use client";

import { X } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function BannerMessage() {
  const searchParams = useSearchParams();

  const pathname = usePathname();

  const router = useRouter();

  const message = searchParams.get("message");

  if (!message) return <></>;

  function clearMessage() {
    router.replace(pathname);
  }

  return (
    <header className="w-full flex justify-between items-center p-5 border-b border-neutral-300 bg-blue-400/20">
      <div>{message}</div>
      <div>
        <button onClick={clearMessage}>
          <X />
        </button>
      </div>
    </header>
  );
}
