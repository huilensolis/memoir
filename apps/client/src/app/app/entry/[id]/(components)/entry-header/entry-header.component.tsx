"use client";

import { DeleteEntryModalTrigger } from "@/components/feature/delete-entry-modal";
import { Trash } from "lucide-react";
import { EntryState } from "./entry-state";
import type { Entry } from "@/types/entry";

export function EntryHeader({ entryId }: { entryId: Entry["id"] }) {
  return (
    <header className="w-full flex justify-end gap-2">
      <EntryState />
      <DeleteEntryModalTrigger entryId={entryId}>
        <button className="hover:bg-zinc-200 py-2 px-3 rounded-sm">
          <Trash className="w-5 h-5" />
        </button>
      </DeleteEntryModalTrigger>
    </header>
  );
}
