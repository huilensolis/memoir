"use client";

import { CommandItem } from "@/components/ui/command";
import { ClientRoutingService } from "@/models/routing/client";
import type { Entry } from "@/types/entry";
import { File } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EntryItemSkeleton } from "./entry-item-skeleton";
import { EntryService } from "@/models/api/entry";
import { useSearchEntryModalStore } from "@/app/app/(stores)/search-entry-command-modal";
import { useAsideNavStore } from "../../aside-nav/store";

export function EntryList() {
  const toggleModal = useSearchEntryModalStore((state) => state.toggleModal);
  const closeDrawerMenu = useAsideNavStore((state) => state.closeDrawer);
  const openDrawerMenu = useAsideNavStore((state) => state.openDrawer);

  const [loading, setLoading] = useState(true);

  const [entries, setEntries] = useState<Entry[]>([]);

  function handleClickOnEntry() {
    toggleModal();

    closeDrawerMenu();

    setTimeout(() => {
      openDrawerMenu();
    }, 500);
  }

  useEffect(() => {
    // fetch entries
    async function fetchUserEntries({ signal }: { signal: AbortSignal }) {
      try {
        setLoading(true);
        const { entryList, error } = await EntryService.getUserEntyList({
          signal,
        });

        if (error || !entryList) throw new Error("error getting entry");

        setEntries(
          entryList.sort((entry, nextEntry) =>
            new Date(entry.updated_at) > new Date(nextEntry.updated_at)
              ? -1
              : 1,
          ),
        );
      } catch (error) {
        //
      } finally {
        setLoading(false);
      }
    }

    const ctrl = new AbortController();

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchUserEntries({ signal: ctrl.signal });

    return () => {
      ctrl.abort();
    };
  }, []);

  return (
    <>
      {loading &&
        Array(8)
          .fill("")
          .map((_, i) => <EntryItemSkeleton key={i} />)}

      {!loading &&
        entries.length > 0 &&
        entries.map((entry) => (
          <CommandItem
            className="w-full"
            key={entry.id}
            onClick={(e) => {
              e.preventDefault();
            }}
            value={entry.title}
          >
            <Link
              href={ClientRoutingService.app.entries.readById(entry.id)}
              className="w-full flex items-center gap-2 text-base"
              onClick={handleClickOnEntry}
            >
              <File className="mr-2 h-4 w-4" />
              <span>{entry.title}</span>
            </Link>
          </CommandItem>
        ))}
    </>
  );
}
