"use client";

import { useSearchEntryModalStore } from "@/app/app/(stores)/search-entry-command-modal";
import { ReactNode } from "react";

export function EntrySearchModalTrigger({ children }: { children: ReactNode }) {
  const toggleSearchEntryCommandModal = useSearchEntryModalStore(
    (state) => state.toggleModal,
  );

  return (
    <button
      className="w-full h-full"
      onClick={() => toggleSearchEntryCommandModal()}
    >
      {children}
    </button>
  );
}
