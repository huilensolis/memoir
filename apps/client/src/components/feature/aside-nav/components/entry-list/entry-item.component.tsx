"use client";

import { ClientRoutingService } from "@/models/routing/client";
import type { Entry } from "@/types/entry";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function EntryItem({ entry }: { entry: Entry }) {
  const [isActive, setIsActive] = useState<boolean>(false);

  const pathName = usePathname();

  useEffect(() => {
    if (pathName === ClientRoutingService.app.entries.readById(entry.id)) {
      setIsActive(true);
      return;
    }

    setIsActive(false);
  }, [pathName, entry.id]);

  return (
    <Link href={ClientRoutingService.app.entries.readById(entry.id)}>
      <article
        className={`flex flex-col p-2 hover:bg-zinc-200 ${isActive ? "bg-zinc-200" : ""} rounded-sm transition-all duration-150`}
      >
        <span className="font-semibold">{entry.title}</span>
        <span className="text-sm">
          {new Date(entry.updated_at).toLocaleString()}
        </span>
      </article>
    </Link>
  );
}
