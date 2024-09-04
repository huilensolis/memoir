"use client";

import { EntryService } from "@/models/api/entry";
import { ClientRoutingService } from "@/models/routing/client";
import type { Entry } from "@/types/entry";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function EntryList() {
  const [entryList, setEntryList] = useState<Entry[]>([]);

  useEffect(() => {
    async function fetchEntryList(signal: AbortSignal) {
      const { entryList, error } = await EntryService.getUserEntyList({
        signal,
      });

      if (error || !entryList || entryList.length === 0) return;

      setEntryList(entryList);
    }

    const ctrl = new AbortController();

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchEntryList(ctrl.signal);

    return () => {
      ctrl.abort();
    };
  }, []);

  return (
    <ul className="w-full flex flex-col gap-2">
      {entryList.length > 0 &&
        entryList.map((entry) => (
          <li key={entry.id}>
            <EntryItem entry={entry} />
          </li>
        ))}
    </ul>
  );
}

function EntryItem({ entry }: { entry: Entry }) {
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
        className={`p-2 hover:bg-zinc-200 ${isActive ? "bg-zinc-200" : ""} rounded-sm transition-all duration-150`}
      >
        <span className="font-semibold">{entry.title}</span>
      </article>
    </Link>
  );
}
