"use client";

import { useBeforeUnloading } from "@/hooks/use-before-unloading";
import { useEntryStore } from "../../../(store)/entry-store";
import { Activity, PackageCheck } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export function EntryState() {
  const getEntryState = useEntryStore((state) => state.getState);
  const entryState = useEntryStore((state) => state.state);

  useBeforeUnloading(
    (e: BeforeUnloadEvent) => {
      if (getEntryState() === "up to date") return;

      e.preventDefault();
      e.returnValue = true;

      window.alert(
        "Are you sure you want to leave this page? your changes have not been saved yet",
      );
    },
    [entryState],
  );
  return (
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
  );
}
