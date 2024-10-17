"use client";

import { DeleteEntryModalTrigger } from "@/components/feature/delete-entry-modal";
import { Trash } from "lucide-react";
import { EntryState } from "./entry-state";
import type { TRawEntry } from "@/types/entry";

export function EntryOptions({ entryId }: { entryId: TRawEntry["id"] }) {
  return (
    <ul className="w-full flex items-center gap-2 px-2 bg-neutral-100 border-t border-e-neutral-200">
      <li>
        <EntryState />
      </li>
      <li>
        <DeleteEntryModalTrigger entryId={entryId}>
          <button className="flex text-bold justify-center items-center gap-1 hover:bg-zinc-200 py-2 px-3 rounded-sm">
            Delete <Trash className="w-5 h-5" />
          </button>
        </DeleteEntryModalTrigger>
      </li>
    </ul>
  );
}
