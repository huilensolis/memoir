"use client";

import { useEffect } from "react";
import FocusTrap from "focus-trap-react";
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
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function EntrySearchModalProvider() {
  const showModal = useSearchEntryModalStore((state) => state.showModal);
  const toggleModal = useSearchEntryModalStore((state) => state.toggleModal);

  useEffect(() => {
    if (!showModal) return;

    function toggleModalWhenPressingEsKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        toggleModal();
      }
    }

    document.addEventListener("keyup", toggleModalWhenPressingEsKey);

    document.getElementsByTagName("body")[0].style.overflowY = "hidden";

    return () => {
      if (!showModal) return;
      document.removeEventListener("keyup", toggleModalWhenPressingEsKey);
      document.getElementsByTagName("body")[0].style.overflowY = "auto";
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  if (!showModal) return null;

  return (
    <>
      {createPortal(
        <FocusTrap>
          <div
            className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-neutral-900/20 z-[9999] overflow-y-hidden"
            onClick={toggleModal}
          >
            <Command
              id="search-entry-command-modal"
              className="rounded-lg border border-gray-200 shadow-md dark:border-gray-800 lg:max-w-2xl lg:max-h-96"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="w-full flex items-center justify-between">
                <CommandInput
                  placeholder="Type an entry title to search for matches..."
                  autoFocus
                  className="text-base w-full"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleModal}
                  className="text-muted-foreground"
                >
                  <X />
                </Button>
              </div>
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
          </div>
        </FocusTrap>,
        document.body,
      )}
    </>
  );
}
