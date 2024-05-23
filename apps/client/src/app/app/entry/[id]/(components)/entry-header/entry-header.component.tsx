"use client";

import { Activity, PackageCheck } from "lucide-react";
import { useEntryStore } from "../../(store)/entry-store";
import { Spinner } from "@/components/ui/spinner";

export function EntryHeader() {
  const entryState = useEntryStore((state) => state.state);
  return (
    <header className="w-full flex justify-end">
      <div className="flex justify-center items-center gap-1">
        {entryState}
        {entryState === "up to date" ? (
          <PackageCheck className="w-5 h-5" />
        ) : entryState === "waiting" ? (
          <Activity className="w-5 h-5" />
        ) : (
          <Spinner />
        )}
      </div>
    </header>
  );
}
