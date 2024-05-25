"use client";

import { useSearchEntryModalStore } from "@/app/app/(stores)/search-entry-command-modal";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { EntryList } from "./entry-list";
import { createPortal } from "react-dom";

export function EntrySearchModalProvider() {
  const showModal = useSearchEntryModalStore((state) => state.showModal);
  const toggleModal = useSearchEntryModalStore((state) => state.toggleModal);

  if (!showModal) return null;

  return (
    <>
      {createPortal(
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-neutral-900/20 z-50 overflow-y-hidden">
          <Command className="rounded-lg border border-gray-200 shadow-md dark:border-gray-800 max-w-2xl max-h-96">
            <CommandInput
              placeholder="Type an entry title to search for matches..."
              autoFocus
              className="text-base"
            />
            <CommandList>
              <CommandSeparator />
              <CommandGroup
                heading="Entries"
                className="[&_[cmdk-group-heading]]:text-sm"
              >
                <EntryList />
              </CommandGroup>
              <CommandSeparator />
            </CommandList>
          </Command>
        </div>,
        document.body,
      )}
    </>
  );
}
